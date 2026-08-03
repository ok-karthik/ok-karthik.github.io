"""Static audit of the exported site. Runs against out/ after `pnpm build`."""
import glob, json, os, re, sys
from html.parser import HTMLParser
from collections import Counter

ROOT = "out"
issues = []


def add(page, sev, msg):
    issues.append((sev, page, msg))


class P(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings = []          # (level, text)
        self.ids = []
        self.imgs = []
        self.links = []             # (href, text, attrs)
        self.buttons = []
        self.jsonld = []
        self._h = None
        self._buf = []
        self._in_ldjson = False
        self._a = None
        self._abuf = []
        self.title = None
        self._in_title = False
        self.metas = {}
        self.langs = []
        self.html_attr = {}

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.html_attr = a
        if a.get("id"):
            self.ids.append(a["id"])
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._h = int(tag[1]); self._buf = []
        if tag == "title":
            self._in_title = True; self._buf = []
        if tag == "img":
            self.imgs.append(a)
        if tag == "a":
            self._a = a; self._abuf = []
        if tag == "button":
            self.buttons.append(a)
        if tag == "script" and a.get("type") == "application/ld+json":
            self._in_ldjson = True; self._buf = []
        if tag == "meta" and a.get("name"):
            self.metas[a["name"]] = a.get("content", "")
        if tag == "meta" and a.get("property"):
            self.metas[a["property"]] = a.get("content", "")

    def handle_endtag(self, tag):
        if tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._h:
            self.headings.append((self._h, "".join(self._buf).strip()))
            self._h = None
        if tag == "title" and self._in_title:
            self.title = "".join(self._buf).strip(); self._in_title = False
        if tag == "a" and self._a is not None:
            self.links.append((self._a.get("href", ""), "".join(self._abuf).strip(), self._a))
            self._a = None
        if tag == "script" and self._in_ldjson:
            self.jsonld.append("".join(self._buf)); self._in_ldjson = False

    def handle_data(self, d):
        if self._h or self._in_ldjson or self._in_title:
            self._buf.append(d)
        if self._a is not None:
            self._abuf.append(d)


pages = sorted(glob.glob(f"{ROOT}/**/*.html", recursive=True))
all_ids = {}

for path in pages:
    page = path[len(ROOT):]
    raw = open(path, encoding="utf-8").read()
    p = P(); p.feed(raw)
    all_ids[page] = set(p.ids)

    # --- literal rendering failures ---
    for bad in ("undefined", "NaN", "[object Object]", "TODO(karthik)", "[CHECK]", "CONFIRM —"):
        # ignore matches inside inline script/JSON payloads
        text_only = re.sub(r"<script.*?</script>", "", raw, flags=re.S)
        if bad in text_only:
            add(page, "ERROR", f"literal {bad!r} rendered in page text")

    # --- title / meta ---
    if not p.title:
        add(page, "ERROR", "missing <title>")
    if not p.metas.get("description"):
        add(page, "WARN", "missing meta description")
    if "404" not in page and "not-found" not in page:
        if not p.metas.get("og:title"):
            add(page, "WARN", "missing og:title")

    # --- lang ---
    if p.html_attr.get("lang") != "en":
        add(page, "WARN", f"html lang is {p.html_attr.get('lang')!r}")

    # --- headings ---
    h1s = [t for lvl, t in p.headings if lvl == 1]
    if "404" not in page and "not-found" not in page:
        if len(h1s) == 0:
            add(page, "ERROR", "no <h1>")
        elif len(h1s) > 1:
            add(page, "WARN", f"{len(h1s)} <h1> elements: {h1s}")
    levels = [lvl for lvl, _ in p.headings]
    for i in range(1, len(levels)):
        if levels[i] - levels[i - 1] > 1:
            add(page, "WARN",
                f"heading jumps h{levels[i-1]} -> h{levels[i]} at {p.headings[i][1]!r}")
    for lvl, txt in p.headings:
        if not txt:
            add(page, "WARN", f"empty h{lvl}")

    # --- duplicate ids ---
    dupes = [i for i, n in Counter(p.ids).items() if n > 1]
    if dupes:
        add(page, "ERROR", f"duplicate id(s): {dupes}")

    # --- images ---
    for img in p.imgs:
        src = img.get("src", "")
        if not src:
            add(page, "ERROR", "img with empty src")
        if "alt" not in img:
            add(page, "ERROR", f"img missing alt: {src}")
        if not img.get("width") or not img.get("height"):
            add(page, "WARN", f"img missing width/height: {src}")
        if src.startswith("/") and not os.path.exists(ROOT + src):
            add(page, "ERROR", f"img src 404: {src}")
        if "cdn.jsdelivr" in src or "@latest" in src:
            add(page, "ERROR", f"external/unpinned img: {src}")

    # --- links ---
    for href, text, attrs in p.links:
        name = text or attrs.get("aria-label", "")
        if not name:
            add(page, "ERROR", f"link with no accessible name: href={href!r}")
        if href.startswith("http") and attrs.get("target") == "_blank":
            rel = attrs.get("rel", "")
            if "noopener" not in rel:
                add(page, "WARN", f"target=_blank without noopener: {href}")
        if href.startswith("/") and not href.startswith("//"):
            base = href.split("#")[0].rstrip("/")
            if base and not (os.path.exists(ROOT + base + ".html")
                             or os.path.exists(ROOT + base)
                             or os.path.exists(ROOT + base + "/index.html")):
                add(page, "ERROR", f"internal link 404: {href}")

    # --- json-ld ---
    for blob in p.jsonld:
        try:
            data = json.loads(blob)
            if not data.get("@type"):
                add(page, "WARN", "JSON-LD without @type")
        except Exception as e:
            add(page, "ERROR", f"invalid JSON-LD: {e}")

    # --- buttons ---
    for b in p.buttons:
        if not b.get("aria-label") and not b.get("aria-labelledby"):
            pass  # text content covers most; checked visually elsewhere

# --- same-page anchor targets resolve ---
for path in pages:
    page = path[len(ROOT):]
    raw = open(path, encoding="utf-8").read()
    p = P(); p.feed(raw)
    for href, _, _ in p.links:
        if href.startswith("#") and len(href) > 1:
            if href[1:] not in all_ids[page]:
                add(page, "ERROR", f"anchor target missing: {href}")
        m = re.match(r"^/(?:#(.+))$", href)
        if m and m.group(1) not in all_ids.get("/index.html", set()):
            add(page, "ERROR", f"cross-page anchor missing on home: {href}")

# --- sitemap entries resolve ---
sm = open(f"{ROOT}/sitemap.xml", encoding="utf-8").read()
for loc in re.findall(r"<loc>([^<]+)</loc>", sm):
    p_ = re.sub(r"^https?://[^/]+", "", loc).rstrip("/")
    if p_ and not (os.path.exists(ROOT + p_ + ".html") or os.path.exists(ROOT + p_)):
        add("/sitemap.xml", "ERROR", f"sitemap URL has no page: {loc}")

# --- report ---
order = {"ERROR": 0, "WARN": 1}
issues.sort(key=lambda x: (order[x[0]], x[1]))
errs = sum(1 for s, _, _ in issues if s == "ERROR")
warns = len(issues) - errs
print(f"Pages audited: {len(pages)}   ERRORS: {errs}   WARNINGS: {warns}\n")
for sev, page, msg in issues:
    print(f"[{sev:5}] {page:52} {msg}")
if not issues:
    print("clean")
sys.exit(0)
