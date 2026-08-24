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
  `writing/` and `writing/[slug]` (3 posts, see the publish-status note below),
  `not-found.tsx`, `sitemap.ts`, `robots.ts`.
- `scripts/audit-build.py` — checks the exported HTML.
- `.agents/skills/premium-portfolio-ui/` — design rules + an enforcing eval harness.
- `public/speaking/` — archived screenshots of third-party event pages cited in
  `content/profile.ts`'s `speaking` array. Not design assets — evidence, taken
  because event sites routinely come down within weeks of the event date.

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

**This has been violated by other agents and cost real fact-checking time.**
On 2026-08-18 a Gemini-authored branch added `failureMode` entries to
`content/projects.ts` and stats to `components/project-playground.tsx` that
read as plausible but weren't checked against the actual repos. Fetching the
READMEs via `gh api repos/ok-karthik/<repo>/readme` (and, better, any
`DISASTER_RECOVERY.md` / `docs/troubleshooting.md` / `docs/labs/*.md` the repo
carries) found two claims that directly contradicted the source repo — one
said a system had "per-pod memory ceilings" where the README explicitly says
there is no per-pod limit; another described automatic HPA-state
reconciliation that the README lists as roadmap, not built. **Before trusting
a specific technical claim in this codebase — yours, another agent's, or
your own past session's — fetch the repo it's about and check.** `FailureMode`
in `content/projects.ts` has an optional `sourceUrl`/`sourceLabel` pair for
exactly this: link the claim to the doc it's grounded in rather than asserting
it bare. Numbers that can't be sourced this way (e.g. the CI-timing figures in
the playground) get an explicit "modeled from typical run-times, not measured"
caption instead of silently reading as production telemetry. The same bar
applies to `speaking` and `recommendations` in `content/profile.ts` — real,
independently verifiable only (an event page, a public LinkedIn
recommendation), never a plausible-sounding placeholder.

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
8. **`/writing` is live (since 2026-08-18) but not fully Karthik-reviewed.**
   A Gemini-authored branch restored the routes/nav/palette/sitemap entries
   that a prior session had deliberately pulled pending his read-through —
   Karthik's call on discovering this was to keep it live but treat the
   review as still outstanding. One factual error was already found and fixed
   (a g6/L4 instance-family claim with no support in the actual repo). Check
   `content/writing.ts`'s header for current status before assuming any
   first-person claim in it has been personally verified by Karthik.
9. **Do NOT swap the CV link for a committed PDF.** The Google Docs export
   auto-updates; a PDF would need re-exporting on every edit and a stale CV is
   the worse failure. Reasoning is recorded in `content/profile.ts`.
10. **Do NOT collapse the sections into one shape.** Projects are cards,
    Experience is a hairline timeline rail, Tech Skills is one dense panel,
    Contact is a full-bleed band, Credentials is a 3-column fact grid, Notes &
    Speaking is a horizontal scroll row + a banner, Recommendations is
    pull-quotes. When everything was a glass rectangle the page read as
    assembled rather than designed. (Speaking was briefly a 4th column inside
    Credentials — reverted 2026-08-18: a live conference talk is a different
    *kind* of fact than a certification, and the 4th column read visibly
    thinner than the other three. It's its own shape now.)
11. **Do NOT append a decision to the end of a project's list.** Order is
    meaningful — the first three render as full cards, the rest as compact
    rows. Put a new decision where it ranks. See the header of
    `content/projects.ts`.
12. **Do NOT propose dropping "Staff" from `openToRoles`.** Karthik's
    job-market-radar notes document an A/B test showing more inbound after
    dropping "Staff" from his LinkedIn headline and CV title line — it's
    tempting to extend that logic to the portfolio's Open to Roles list too.
    Raised and explicitly declined 2026-08-18: the "open to" framing there is
    a target, not a claim (the distinction Rule 1 above already relies on),
    and the headline/CV finding was about search-string performance on a
    different surface. Don't re-propose it on the strength of that same data.
13. **Do NOT add "On-Premise / Private Cloud" to the Cloud Platforms group.**
    Checked 2026-08-24 against `karthik-job-market-radar`'s own numbers
    (984-posting sample): on-prem/bare-metal is 3.3% required / 12.9%
    mentioned — below every other item already in this group — and the source
    doc's own conclusion for that segment is "take the calls, do NOT build a
    track" (two real recruiter approaches came in, but on-prem postings'
    apparent pay premium over the rest of the market is €6,500 at p = 0.551,
    i.e. noise, not signal). The portfolio shapes inbound as much as it
    describes Karthik; a card here would pull toward exactly the segment the
    plan says not to cultivate.
14. **Do NOT split or merge Tech Skills groups to hit a specific grid cell
    count** (e.g. splitting one group into two just to reach 12 for a 4×3
    layout — tried 2026-08-24, reverted). The panel is a masonry/
    independent-height layout specifically so a group's size never has to
    satisfy grid math — see "Tech Skills panel layout" below. The IaC / GitOps
    / CI-CD split that *is* live happened because it's a more accurate
    taxonomy (Argo CD is genuinely GitOps; Jenkins, GitHub Actions and GitLab
    CI aren't), not to hit a count — that accuracy bar is what makes a future
    split legitimate, not the resulting number of groups.
15. **Do NOT label anything "AIOps" on this site** until `sre-agent-guardrails`
    (parked, see Context below) has an actual running triage loop. The Aldi
    Süd MTTR work is real and already carried by the `~30% MTTR reduction`
    stat and the bio — that's the defensible claim today. "AIOps" specifically
    invites "tell me about your AIOps work," and right now the honest answer
    is a plan doc, not a build. Considered and declined for the Site
    Reliability Engineering focus-area detail 2026-08-24 for this reason;
    "Burn-rate alerts" shipped instead — true today, and more specific than
    "AIOps" would have been anyway.

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

**Tech Skills notes are chips (`note?: string[]`), not a wrapped string.**
Karthik flagged the old single-string notes as looking "sloppy" and
"misaligned" 2026-08-18 — the note-text container is only ~175px at 1440px,
so anything over ~21 characters wrapped, and a mix of 1-line and 2-line notes
in the same column read as broken rhythm. First fix was shortening every note
to fit one line; that traded away real content to solve a layout problem,
which is backwards, and it undersells this section's actual purpose — see
`content/skills.ts`'s TODO to defend each tier in an interview. Second fix: each note became an array rendered as one bordered pill per item
(reusing the tag style from Writing post tags). That broke a different way —
without `whitespace-nowrap`, a single long item (e.g. "AWS Secrets Manager")
wrapped its own text *inside* the pill, and the border/padding on ~20 rows
visibly grew the whole panel ("too big and consuming too much space,"
Karthik's words). **Final fix**, both applied: `whitespace-nowrap` on each
item so a chip is always one line — if it doesn't fit the row it moves to the
next line as a whole unit, never internally — and no border/background at
all, just muted-foreground text tokens with a trailing " ·" glued onto every
item but the last (glued so the separator can never end up orphaned at the
start of a wrapped line). If you add a note, make it a short array of 2-3
word items, not a sentence, and keep any future styling change on
`whitespace-nowrap` — that's the one non-negotiable part.

**Tech Skills panel layout — masonry, not a row-synced grid (2026-08-24).**
Columns render at independent heights, each group flowing to its own content
length, rather than a CSS grid where every row is forced to match its tallest
cell. Tried and reverted: a row-synced 3×3 grid left visible dead space under
short groups (Containers & Orchestration at 5 items, row-mates at 7).
Reshuffling group order didn't fix it — the two largest groups already anchor
different rows about as well as the numbers allow — and reordering is a
losing game regardless, since item counts change every time a skill is added
or removed. Masonry makes "does this divide evenly" permanently not a
question worth asking again. Stayed at **3 columns**, not 4: checked, and 4
narrows each tile enough that multi-item notes (e.g. "AWS Secrets Manager ·
Azure Key Vault") wrap to two lines — the exact problem the earlier move from
4 to 3 columns fixed.

**Separator is the middle dot (·), never a pipe.** Matches the hero pill
("Open to opportunities · Berlin or remote") and the subtitle scan-line — one
inline-list convention for the whole page. A pipe separator was tried on the
Tech Skills notes and rejected: visually heavier (reads as a divider, not a
soft list) and breaks that page-wide consistency for no gain.

**Group headers: uppercase + letter-spacing + muted colour only — no bold,
no underline, no rule line between groups.** The whitespace gap plus that
header treatment already signals "new group" unambiguously. A horizontal
rule between groups was tried and reverted — it duplicated a signal already
being sent twice (header text + gap); at low contrast it read as accidental,
at higher contrast it read as spreadsheet gridlines, pulling the page toward
"dashboard" and away from the editorial feel the rest of it has. Underline is
avoided everywhere on the site for section-style labels specifically because
on the web it reads as a link affordance, and these aren't links.

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
light-mode accent at 4.04:1, below AA (re-verified clean with axe-core,
2026-08-18 — AA holds on every route checked, both themes).

**Two more screenshot traps, found 2026-08-18:** `fullPage: true` without
scrolling captures Framer `whileInView` sections blank — scroll in ~700px
steps with a wait at each before capturing. And Playwright's
`colorScheme: 'light'` does nothing here (`app/layout.tsx` forces
`defaultTheme="dark"`) — force it with
`ctx.addInitScript(() => localStorage.setItem('theme','light'))` before `goto`.

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
- **`karthik-job-market-radar`** (sibling repo, not this one) is Karthik's own
  job-scraping pipeline and learning plan —
  `stats_and_learning_plan.md` is the canonical source for any claim about
  market demand, salary bands, or title strategy. It's large (2,700+ lines)
  and revised often; grep for a heading rather than reading it whole, and
  check for `⚠️ STALE` markers before quoting a percentage — the document
  supersedes its own older numbers in place rather than deleting them.
