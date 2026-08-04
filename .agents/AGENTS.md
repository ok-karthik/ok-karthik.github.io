# 🤖 Agent Guidelines

Customization root for `ok-karthik.github.io`. `CLAUDE.md` points here.

## 🧭 Orientation (read this first — you rarely need the whole repo)

**What this is:** the professional portfolio of **Karthik Orugonda**, Senior
Platform Engineer & SRE in Berlin, targeting Senior Platform / SRE / AI
Infrastructure roles in Germany. Statically exported Next.js, deployed to
GitHub Pages and Cloudflare Pages.

**Run it:** `pnpm build && npx serve@latest out`. Karthik keeps this running
himself on **:3000** — `pnpm dev` overheats his machine, so he doesn't use it.
**Never `pkill` a serve/node process by pattern**; it kills his too. If you need
a server for headless rendering, use a different port and stop only the PID you
started.

**Verify:** `pnpm verify` = lint + test + eval + audit:html. Details below.

**Where things live:**
- `content/` — **single source of truth** for all copy. Nothing about the title,
  years, location or skills may be written inline in a component.
- `components/` — sections, architecture diagrams, the ⌘K palette, the canvas.
- `app/` — routes. `page.tsx` (landing), `work/[slug]` (6 static project pages),
  `not-found.tsx`, `sitemap.ts`, `robots.ts`.
- `scripts/audit-build.py` — checks the exported HTML.
- `.agents/skills/premium-portfolio-ui/` — design rules + an enforcing eval harness.

## 🎯 Positioning — two rules that outrank aesthetics

**1. Never claim a Staff title.** Karthik's title on paper is *DevOps Specialist*
(previously Senior IT Consultant). LinkedIn and the CV both say **Senior Platform
Engineer & SRE**, and the site must match — a recruiter reads it with LinkedIn
open, and a mismatch is a credibility risk at reference check. A vitest case and
`eval-012` both guard this.

*Stating which roles he is **open to** may say Staff* — "Open to Senior and Staff
Platform Engineering / SRE roles" is naming a target, not claiming a title held.

**2. Lead with scope and trade-offs, not tools.** In Karthik's own scraped market
data (1,329 German postings, Jun–Jul 2026) **no individual tool** showed a
significant lift toward better-paid roles, while *technical strategy and
direction* was the largest gap between how Senior and Staff roles are written
(**+32pp**). Hence project pages built around documented decisions.

**Never invent a metric.** Every number on the site must be one Karthik can
defend in an interview. Project decisions are sourced from the repo READMEs
(fetched 2026-08-03); check the README before adding one.

## 🚫 Standing "do NOT do" list

Each of these was tried, or caused an observed failure.

1. **Do NOT `pkill` by process pattern.** See Orientation.
2. **Do NOT push without asking.** Local commits are fine. `main` deploys on
   push, so a push is a publish. (Violated twice in the 2026-08-03 session by
   not checking the current branch first — check `git branch --show-current`.)
3. **Do NOT name a pnpm script `audit`.** It is a built-in pnpm command and
   silently shadows yours — the HTML audit appeared to run for a whole session
   while `pnpm audit` was actually scanning dependency CVEs. It is `audit:html`.
4. **Do NOT rebuild the flow-field background.** Built and rejected: trails
   accumulating over a large dark area read as a scratchy, matted texture.
5. **Do NOT reintroduce an O(n²) particle loop.** `NeuralMesh` bins particles
   into a uniform grid sized to the link distance. The original compared every
   pair — ~47,000 distance checks per frame at 1440p.
6. **Do NOT put `glass-hover` on large static surfaces.** It carries the cursor
   spotlight, which reads as a smudge on a full-width panel. Observed on Tech
   Skills. `eval-006` guards it.
7. **Do NOT convert `<img>` to `next/image`.** `output: 'export'` with
   `images.unoptimized` means no optimizer exists at runtime — it adds markup
   and optimizes nothing. Use explicit `width`/`height`. `eval-009` guards it.
8. **Do NOT publish `/writing`.** Three drafts live in `content/writing.ts` and
   are unpublished pending Karthik's review; restore instructions are in that
   file's header.
9. **Do NOT swap the CV link for a committed PDF.** The Google Docs export
   auto-updates; a PDF would need re-exporting on every edit and a stale CV is
   the worse failure. Reasoning is recorded in `content/profile.ts`.
10. **Do NOT collapse the sections into one shape.** Projects are cards,
    Experience is a hairline timeline rail, Tech Skills is one dense panel,
    Contact is a full-bleed band. When everything was a glass rectangle the page
    read as assembled rather than designed.
11. **Do NOT append a decision to the end of a project's list.** Order is
    meaningful — the first three render as full cards, the rest as compact
    rows. Put a new decision where it ranks. See the header of
    `content/projects.ts`.

## 🛠 Stack

- **Next.js 16.2.12** (App Router), `output: 'export'` — no server at runtime
- **Tailwind v4**, all tokens in `app/globals.css`
- **IBM Plex Sans + Plex Mono** — proportional carries claims, mono carries
  anything measured or labelled
- **Framer Motion** for scroll reveals; CSS `animation-delay` for the page-load
  sequence
- **`@radix-ui/react-dialog`** — the only UI library left after a deliberate
  47 → 8 dependency prune. Do not add a component library back.

`typescript.ignoreBuildErrors` is **false** and stays false — it has already
caught a broken build that would otherwise have shipped.

## 🎨 Design — "control room"

Deep desaturated purple-graphite base, translucent glass panels, one cyan-teal
accent. Full rules in `.agents/skills/premium-portfolio-ui/SKILL.md`.

The three that break most often:
- **`--ok` / `--warn` / `--err` mean an actual state**, never decoration.
- **Use the scales** — `text-micro`…`text-display-lg`, `rounded-sm`…`rounded-2xl`.
  No arbitrary `text-[13px]`.
- **Product logos keep their brand colour** on a neutral chip, self-hosted in
  `public/icons` at pinned versions. Never a CDN `@latest` URL.

Both themes must work. Light mode once shipped as 0.72-alpha white glass on a
near-white wash — invisible, and it survived review because nobody looked.

## ✅ Verification — run `pnpm verify` before claiming done

| Command | What it checks |
|---|---|
| `pnpm test` | 26 vitest cases — render integrity, image attributes, content sourcing, work-page links, the no-Staff rule |
| `pnpm eval` | 14 design rules enforced against the codebase; 2 report MANUAL because they genuinely cannot be checked statically |
| `pnpm audit:html` | Every exported page — heading hierarchy, duplicate ids, image attrs, link names, anchor targets, internal 404s, JSON-LD, sitemap, literal `undefined`/`TODO` leaking into text |
| `pnpm verify` | All of the above |

**Static checks are not enough for UI work.** Render it. A visual pass shipped
once without ever being looked at and missed badly. Headless Playwright in the
scratchpad has caught a navbar wrapping at 768px, a truncated contact email at
1440, and 17px tap targets — none of which static analysis could see. Compute
WCAG contrast for token pairs directly rather than eyeballing; that found a
light-mode accent at 4.04:1, below AA.

## 📋 Behaviours

- **`git pull` first.** Check `git branch --show-current` before committing.
- **Ask before pushing.** `main` deploys.
- **After a deploy**, verify *both* production URLs and the nested `/work/<slug>`
  routes — GitHub Pages can return 200 on the homepage while nested routes 404.
- **Explain the why.** Karthik wants the reasoning, not just the diff.
- **Record rejected options** in the file they concern, with the symptom that
  killed them. A rule with its failure attached survives; a bare assertion gets
  argued with.

## 📊 Context worth knowing

- **Analytics:** Cloudflare Web Analytics, token in `components/analytics.tsx`,
  registered for `ok-karthik.github.io`. Verified firing (`204` on `/cdn-cgi/rum`).
  Expect undercounting — this audience blocks trackers heavily.
- **Canonical host is `ok-karthik.github.io`.** LinkedIn flags `*.pages.dev`
  links as possible malicious content, so that is the URL Karthik shares.
- **Parked by request:** an `sre-agent-guardrails` project, and publishing the
  LinkedIn scraper as a seventh project (would need a sanitized fork — the
  personal learning plan, salary targets and employment dates must not ship).
- **`REVIEW.md`** in the repo root is a generated, gitignored review sheet for
  Karthik. Not part of the site.
