# Portfolio redesign — state, recommendation, and what to review

**Branch:** `redesign-explore` (3 commits ahead of `main`, nothing pushed)
**Date:** 2026-08-16
**Written for:** a second and third opinion from other models before Karthik commits to one direction.

> **Status: decided, 2026-08-17.** Ship **Aurora Glass**; delete Blueprint, the
> `current`-skin control, and the comparison flag. See **§9** for the full decision
> and the implementation checklist. §§0–8 below are kept as-is as the record of how
> the decision was reached — skip to §9 for the outcome.

---

## 0. If you are the reviewer, read this first

You are being asked to **help choose between two finished, working designs**. Both
are built and running; neither is a sketch. §4 lays out three defensible positions
— ship Aurora, ship Blueprint, or hybridise — each argued at its strongest, then
one author's pick with an explicit list of that author's likely biases.

You are *not* being asked to propose a fresh direction from scratch. Four rounds of
that already happened, and §5 records what was rejected and why. If you want to
propose something new, first say which of the two candidates it beats and on what
specific ground.

The most useful review answers these, in order:

1. **Which of the three positions in §4 is right, and why?** Do not default to the
   author's pick (§4.4) — §4.4 lists five reasons that pick may be biased. Weigh
   §4.1 and §4.3 on their own merits first.
2. What is the weakest part of the design you land on, *as an artefact a recruiter
   and a hiring manager will actually read* — not as a visual composition?
3. Which of the biases in §4.4 is doing the most damage to the author's judgement?
4. What in §5 was rejected for a bad reason and deserves another look?

Please avoid: generic 2026 trend lists, "add a bento grid", "use a gradient",
advice that ignores §2's constraints, and agreeing with §4.4 because it is stated
last and at greatest length.

---

## 1. What this is

Karthik Orugonda's personal portfolio, live at **ok-karthik.github.io**. He is a
**Senior Platform Engineer & SRE** with 15 years in tech / 10 in cloud-native,
based in Berlin, actively job-hunting for Senior/Staff/Lead Platform, SRE, DevOps
and (secondarily) AI Platform roles in the German market.

**Two audiences, gating in sequence:**

1. A **recruiter** screening against a job description. Bounces in seconds if the
   stack doesn't match. If they bounce, nobody else ever reads the page.
2. A **hiring manager / staff engineer** who decides. Convinced by evidence of
   judgement, not by a tool list.

**The site's actual differentiator** — and this matters more than any visual
decision below — is that it carries **five real projects with 30 documented
architecture decisions** (what was chosen, what it was chosen *over*, and why),
each with a **real architecture diagram built as DOM, not an image**. Almost no
competing portfolio has this. Any design that buries it is wrong regardless of how
it looks.

**Stack:** Next.js 16.2.12 App Router, `output: 'export'` (fully static, GitHub
Pages, no server at runtime), Tailwind v4 (`@theme inline`, all tokens in
`app/globals.css`), next-themes (`attribute="class"`, `defaultTheme="dark"`,
`enableSystem={false}`), Framer Motion, `next/font/google` (self-hosted at build
time — no runtime CDN).

**Quality gate:** `pnpm verify` = ESLint + 47 Vitest tests + 14 design evals
(`.agents/skills/premium-portfolio-ui/scripts/evaluate.py`) + `audit:html` (parses
the exported HTML for heading hierarchy, duplicate ids, missing alt/width/height).
It is green on this branch.

---

## 2. Hard constraints — a design that breaks these is not viable

From `.agents/AGENTS.md` (repo rules, non-negotiable) and the platform:

| Constraint | Why |
|---|---|
| Never claim a **Staff** title in the Experience section | LinkedIn and the CV say Senior. Reference-check risk. Stating which levels he's *open to* is fine. |
| **Static export only** — no server, no runtime data | GitHub Pages. `images.unoptimized`; `next/image` is not used. |
| **No runtime CDN** for fonts or icons | All 25 product logos are self-hosted SVGs in `public/icons/`. Previously a 49-logo CDN grid; it was removed. |
| **AA contrast (4.5:1)** on every text/ground pair | The body gradient is `background-attachment: fixed` and runs to a darker deep end, so a colour must clear AA on the *deepest* wash, not just the lightest. Every accent in this repo is numerically verified, not eyeballed. |
| `prefers-reduced-motion` must neutralise all motion | Already global in `globals.css`. |
| The **CV link stays a Google Docs export URL** | It auto-updates. A committed PDF goes stale, and a stale CV is worse than anything the link risks. |
| Don't collapse the four section shapes into one | Projects are cards, Experience is a timeline, Skills is a grid, Contact is rows. Uniformity reads as assembled, not designed. |
| Content lives in `content/*.ts` | Nothing about the title, years or location is written inline anywhere. |

Also true and worth knowing: **content ordering is derived from market data, not
taste.** Projects are ordered by how often each subject appears in 3,212 scraped
German job postings (observability 71% → leads; GPU/CUDA 11% → does not). Section
order is Hero → Tech Skills → Projects → Experience for the recruiter-gate reason
in §1. **Do not propose reordering these on aesthetic grounds.**

---

## 3. Where we got to

Four rounds of direction pitches happened (three of mockups, one of built code).
Three candidate designs were then **built for real** behind a runtime feature flag,
so they could be compared on the actual content at an actual viewport rather than
from a screenshot. One has since been cut. Two remain, plus the live site as a
control.

### How the flag works

`data-skin` on `<html>`, set **before first paint** by a blocking inline script
(the same technique next-themes uses for `.dark`), so there's no flash. Tokens in
`globals.css` key off the attribute; `components/skins/skin-stage.tsx` swaps the
composition. `?skin=blueprint` in the URL overrides and persists, which is how a
design gets shared for review. A floating switcher sits bottom-right.

**Skinning is token-level, not component-level** — `--ui-sans/display/mono` and
`--panel-bg/border/blur/sat/shadow`. That's why the shared sections (Tech Skills,
Credentials, Contact) restyle themselves for both designs without a fork, and it's
the only reason carrying two candidates doesn't cost 2×.

The exported HTML contains **exactly one** composition (Aurora, the default), so
the heading hierarchy stays valid and ids stay unique for `audit:html`.

> This whole mechanism is **temporary**. `content/skins.ts` records that the losing
> skin, the switcher and the flag all get deleted once a choice is made.

### To look at it

```bash
pnpm build && npx serve out -l 4173
```

- `localhost:4173/?skin=aurora` — Aurora Glass (default)
- `localhost:4173/?skin=blueprint` — Blueprint
- `localhost:4173/?skin=current` — what is live today, as the control

---

### Candidate A — **Aurora Glass**

*Dark, lit, contemporary. The "premium dev-tool" lane.*

- **Ground:** `#070e15`, with a live canvas aurora behind everything — three
  additive radial blooms drifting on a long loop, paused when the tab is hidden,
  one static frame under reduced motion.
- **Accent:** anodized blue `#6cc0f0` (dark) / `#0a5566` (light).
- **Type:** Geist + Geist Mono.
- **Surface:** thick glass — 26px blur at 185% saturation with a bright top edge,
  against the current site's 16px over a 4% white fill that has nothing behind it.
  *Glass only reads as glass when something is moving underneath.*
- **Hero:** one large glass slab containing everything — claim, portrait, focus
  areas — with the three KPIs fused to its bottom edge behind a hairline. Not five
  separate panels whose edges compete.
- **Signature moment:** the lead project's architecture diagram **draws itself**
  when it scrolls into view — a left-to-right clip wipe with a bright edge
  travelling ahead of it. Fires once. It is the one place on the page where motion
  carries information rather than decorating a fade.
- **Second moment:** a "Three layers, one owner" section — three CSS-3D planes in
  perspective, each **printing the logos of the tools that run at that tier**
  (OTel/Prometheus/Grafana/Loki over Kubernetes/ArgoCD/Helm/Kyverno over
  Terraform/AWS/Azure/GCP). Hovering a row in the list lights its plane.
- **Experience:** timeline rail with each entry on a glass panel; current role has
  a lit marker.

### Candidate B — **Blueprint**

*Daylight technical sheet. The "restrained, serious" lane.*

- **Ground:** paper `#eaeef2`, with gridlines at **2–4% ink** at two pitches (16px
  minor, 96px major), masked to the top-left so the sheet has a drawing corner and
  a clean margin. Also has a dark "darkroom sheet" variant (`#0b1a26`).
- **Accent:** drafting blue `#1552b8` (light) / `#79b8ff` (dark).
- **Type:** Barlow Condensed (display, uppercase) + Archivo (body) + Plex Mono.
- **Surface:** paper. `--panel-blur: 0`, highlight off, 1px rules, no radius, no
  glass anywhere.
- **Hero:** a **title block** — the name at ~92px in condensed caps, a framed
  portrait in its own corner cell, and a four-cell strip holding *Focus / Based in
  / Availability / Right to work*. Below it, a **contents index** (01 Overview →
  06 Contact) that doubles as jump navigation.
- **Projects:** each is a numbered sheet with a consistent header strip (project
  number, decision count), the diagram in a ruled frame with a caption, text in the
  facing column.
- **Experience:** period annotated out in a wide left margin, one hairline per
  entry. Explicitly **not** a table — an earlier ledger-like version was rejected.

---

## 4. The three defensible positions

Deliberately written as **three arguments, not one recommendation**, so the review
isn't just a referendum on my taste. Each is stated at its strongest, by its own
lights. My own pick is §4.4, flagged as one opinion among three, with the places I
know I could be biased.

### 4.1 — Position A: ship **Aurora Glass**

*Held by: the "meet the category standard, execute it better" school.*

- **First impression is a real currency.** A hiring manager opens twelve tabs. The
  dark, lit, glass-over-aurora look registers as *expensive* in under a second, and
  the self-drawing diagram gives them a reason to stay. Blueprint's opening move —
  a white sheet with a table of four facts — is correct and unexciting.
- **It matches the audience's own tools.** The people screening Karthik use Linear,
  Vercel, Grafana, Datadog. Dark, precise, glassy *is* their visual habitat. Meeting
  a reader's existing aesthetic expectation is not a lack of imagination; it is
  fluency.
- **Dark mode is where engineers live.** Blueprint's dark variant exists, but the
  design is *argued* in light — the drafting language, the paper, the ruled grid all
  assume a sheet. It is a light design with a dark mode, not a design that is equally
  itself in both.
- **Lower typographic risk.** Geist is neutral and modern. Barlow Condensed
  uppercase is a strong flavour applied to every heading and every company name,
  and strong flavours age faster and divide opinion more.
- **The differentiators still get their moment** — the lead card's diagram is large
  and legible, and the layer deck is a section of its own.

**Weakest point of this position:** the crowded lane. If ten candidates' portfolios
look like this, execution quality is the only axis left, and Karthik is competing
on that against people with more time.

### 4.2 — Position B: ship **Blueprint**

*Held by: the "differentiate, and make the page do recruiter work" school.*

- **Its structure earns interviews, not just admiration.** The title block answers
  *Focus / Based in / Availability / Right to work* above the fold in four labelled
  cells. For someone applying in Germany, **"German Permanent Residence" answered
  before a recruiter has to ask** removes the single most common silent
  disqualification. Aurora puts the same facts in a pill and a bio paragraph. This
  is the only argument on this page that is about outcomes rather than looks.
- **Restraint reads as seniority in a noisy category.** The current consensus is
  that WebGL, shaders and bento grids are commodity, and that restraint and point of
  view are what differentiate at the top. A light technical sheet is rare among
  infra portfolios; it signals someone who does not need to shout.
- **The diagrams look best on it.** Dark line-work on white in a ruled frame reads
  as documentation you can trust. The same diagram inside a glass panel reads as a
  UI element. The diagrams are the site's real asset, so the surface that flatters
  them wins a big argument.
- **Better in the contexts that actually happen.** Recruiters skim on office
  laptops in daylight, and the page prints and PDFs cleanly.
- **It is memorable.** A year later, "the guy with the technical-drawing portfolio"
  is a thing someone can recall. "The dark blue glassy one" is not.

**Weakest point of this position:** it is a considered look, not an instantly
impressive one, and it asks the reader to slow down before it rewards them. Plus
the uppercase-condensed type is a genuine risk — at scale it can read as shouty.

### 4.3 — Position C: **Blueprint's structure, Aurora's finish** (the hybrid)

*Held by: the "the argument is about layout, not lighting" school.*

The two candidates differ on **two independent axes** that this exercise has been
treating as one:

| Axis | Aurora | Blueprint |
|---|---|---|
| **Information architecture** | claim-led hero, facts distributed | title block + contents index, facts front-loaded |
| **Surface & palette** | dark, glass, lit backdrop | light, paper, ruled |

Nothing forces those to move together. The strongest version of the site may be
**Blueprint's information architecture rendered in Aurora's dark, lit surface** —
a title block and contents index, but on graphite with a blue accent and glass
reserved for the nav and floating panels only (which is also the disciplined
"Glassmorphism 2.0" recommendation: glass on modals and toolbars, never as a
full-page treatment, always at 4.5:1).

**Weakest point of this position:** hybrids are how you get a design with no
opinion. It also costs another build round, and Karthik has already sat through
four. It should only be taken if a reviewer can name *which* Blueprint structures
survive the transplant and which don't.

### 4.4 — My pick, and where I might be wrong

**I would ship Blueprint (Position B), and port three things into it from Aurora.**

The deciding factor is §4.2's first bullet. Every other argument here is about how
the page *looks*; that one is about whether a recruiter in Berlin gets the four
facts they screen on before they close the tab. On a page whose entire job is
getting Karthik interviews, an argument about outcomes should beat an argument
about impressions.

Port from Aurora, because all three are skin-agnostic and good:
- the **self-drawing diagram reveal** — arguably *better* as a technical drawing
  being drafted than as glass being lit
- the **platform deck** with tool logos on the planes, as a section (it already
  lives in its own module, `components/skins/platform-deck.tsx`, precisely so it
  can move)
- the **breathing availability dot** — one piece of life on a static sheet

**Where I could be biased, and a reviewer should discount me accordingly:**

1. **I built Blueprint most recently and fixed it most.** Three rounds of Karthik's
   notes went into it — the palette, the vocabulary, the grid, the layout. Recency
   and sunk effort both push me toward it. Aurora has had fewer correction cycles,
   which may mean it is *less refined*, not less good.
2. **I am over-weighting "differentiation".** It is the argument a designer reaches
   for, and it is not obviously what wins a screening. A recruiter matching keywords
   may not care at all what the page looks like, in which case Position A's "look
   expensive, cost nothing" is the more rational bet.
3. **I have not tested any of this on a real recruiter.** Every claim in §4.1 and
   §4.2 about what a reader does in the first two seconds is inference. Karthik has
   actual scraped market data for content decisions; there is no equivalent evidence
   behind these visual ones, and I should not pretend otherwise.
4. **My "Blueprint prints well" argument is thin** — nobody prints portfolios.
5. **Trend research cuts both ways.** The same sources that say "restraint
   differentiates" also say dark-mode techno-futurist is one of the two dominant
   2026 aesthetics — i.e. it is dominant *because it works*, not only because it is
   crowded. I leaned on the half that supported my pick. A reviewer should read the
   sources in §8 independently rather than trusting my summary of them.

### 4.5 — What all three positions agree on

Useful for the reviewer: these are not in dispute, so don't spend the round on them.

- **Delete the losing skin** — plus the switcher, the boot script,
  `content/skins.ts` and the unused fonts — and move the winner's tokens up into the
  base blocks. Two designs is a decision aid; keeping both permanently makes every
  future change cost double.
- **Merge or rebase onto `premium-ui-pass` first.** It holds improvements (`--rail`,
  `section-*` rhythm, text-wrap balance, an AA fix to `--primary`) that this branch
  was cut before and does not have.
- **The four screening facts belong above the fold**, whichever design wins. If the
  review lands on Aurora, that is the single highest-value change to make to it.
- **The diagrams and the documented decisions are the asset.** Any surface treatment
  that competes with them for attention is wrong.
- **Do not chase Apple's Liquid Glass.** On the web `backdrop-filter` is a blur, not
  refraction, so you get a costume version; Apple's own implementation drew sustained
  legibility criticism and iOS 27 shipped an *intensity slider* to turn it down; and
  it reads as **Apple's** brand, not Karthik's — the same objection that killed the
  rust accent for reading as Claude's.

---

## 5. Rejected, with reasons — please don't re-propose these

Each of these was built or pitched and specifically rejected. Full detail in
`.agents/DESIGN-NOTES.md`.

| Rejected | Why |
|---|---|
| **Full-strength gridlines** on Blueprint | Every "blueprint" template does it; reads as wallpaper. Returned at 2–4%, masked to one corner. |
| **Rust / terracotta accent** `#9c3524` | Reads as Claude's brand colour, not Karthik's. Now `#1552b8`. |
| **Drafting-office vocabulary** — "general arrangement", "issued for construction", "rev 4", "fig. 01", "also drawn" | Made a portfolio read as a building plan. **Rule: if a term wouldn't appear on a CV, it doesn't go on the page.** Draw like a drawing, write like a portfolio. |
| **Aurora's cyan / coral / violet colourway** | Three saturated hues is a rainbow on a page arguing for infrastructure judgement. |
| **The Spatial skin** (Manrope, violet+teal, opaque plates, 3D-deck hero) | Cut 2026-08-16. Not a failure — two ideas from it are being kept (below). |
| **A ledger / table layout** for Experience | Rejected on sight. Prose squeezed into cells. |
| **Empty 3D slabs** with no content | "A shape, not a statement." They now carry tool logos. |
| **Neumorphism** | Contrast is unfixable at AA. |
| **Neubrutalism / anti-design** | Reads junior for a Senior/Staff infra role. |
| **Bento grid as a hero device** | Commodity in 2026; adds no signal. |
| **Blueprint (Position B / C)** | Decided against 2026-08-17 — Karthik didn't like the light/paper "drafting sheet" direction on sight, independent of §4.2's recruiter-facts argument for it. See §9. |
| Rebuilding the **flow-field background** | Built once, rejected — trails matte into a scratchy texture over large dark areas. |
| Reintroducing the **O(n²) particle loop** | Performance. The mesh uses a spatial hash. |
| A **committed PDF CV** | See §2. |

### Kept from Spatial for future use

**The funnel timeline** — each older role indents further and sheds elevation, so
the career recedes into the page instead of running down a rail. One CSS custom
property (`--depth × 2.25rem`, `lg` only). **Constraint:** indent, but never fade
the older roles' text — fifteen years of history becoming the least readable thing
on the page is the worse outcome.

**The two-lume gradient** — violet `#9b82ff` top-left, teal `#2fd6b0` bottom-right.
Two *opposing* hues at opposite corners is what makes flat panels read as solids
with two lit faces; a single accent glow does not do that. Light mode needs
different values entirely (`#5433c9` / `#0e8f74`) — the dark violet measures 2.9:1
on white.

---

## 6. Two lessons from this process, for whoever picks it up

**Verification traps that have already burned us** (also in memory / `AGENTS.md`):

- A Playwright `fullPage` screenshot captures Framer's `whileInView` content as
  **blank bands** unless you scroll the page first. Always scroll, then shoot.
- Playwright's `colorScheme` option does **nothing** here — next-themes runs with
  `enableSystem={false}`. Force the theme with
  `localStorage.setItem('theme', 'light')` in `addInitScript`.
- Contrast is computed in Python (sRGB linearisation, alpha compositing) against
  the *deepest* wash, never eyeballed.

**The process lesson:** the early rounds of this redesign were bad, and the cause
was not model capability — it was designing without references and without knowing
what Karthik reacts to. It improved the moment he rejected things *specifically*
("too many colours", "that's Claude's colour", "why is a portfolio using
construction terms"). Any reviewer should feel free to be that blunt.

---

## 7. Files, if you want to read the code

```
content/skins.ts                       the flag registry + when to delete it all
components/skins/skin-boot.tsx         pre-paint attribute, no flash
components/skins/skin-stage.tsx        picks the composition
components/skins/skin-switcher.tsx     the bottom-right control
components/skins/platform-deck.tsx     the 3D layer deck + its tool data
components/skins/assembling-diagram.tsx the self-drawing diagram wrapper
components/skins/aurora/               hero, work, layers, experience
components/skins/blueprint/            hero, work, experience, paper, parts
components/architecture.tsx            the five real architecture diagrams
app/globals.css                        all tokens; the SKINS block is temporary
.agents/AGENTS.md                      repo rules (the constraints in §2)
.agents/DESIGN-NOTES.md                kept ideas + full rejection log
```

Commits on this branch: `e1d143c` (three skins behind the flag) → `0f3b70a` (cut
the colourway, re-pitch Blueprint, put the stack on the deck) → `098f05a` (remove
Spatial).

---

## 8. Sources behind the trend claims

Read these rather than trusting §4's summary of them — §4.4 admits to having
quoted the half that supported its conclusion.

**On Liquid Glass and whether it is worth chasing**
- [CSS-Tricks — Getting clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/)
- [Liquid Glass on the web](https://master.dev/blog/liquid-glass-on-the-web/) — why CSS `backdrop-filter` can't match it
- [TechTimes — iOS 27 brings Liquid Glass refinements](https://www.techtimes.com/articles/317975/20260608/apple-liquid-glass-ios-27-wwdc-2026-brings-refinements-developers-must-adopt-today.htm) — the intensity slider and accessibility fixes, plus the ~15% vs 63% adoption figure

**On what differentiates in 2026**
- [Web design trends 2026: what actually held up after six months](https://studiomeyer.io/en/blog/webdesign-trends-2026-reality-check)
- [20 best SaaS website designs in 2026](https://gridrebels.studio/post/20-best-saas-website-designs-in-2026-examples-that-actually-convert) — the "restraint differentiates" and "Anthropic's paper-like aesthetic" claims, and equally the "techno-futurist is one of two dominant aesthetics" claim that cuts the other way
- [Glassmorphism in 2026: frosted glass without killing UX](https://www.orizon.co/blog/glassmorphism-in-2026-how-to-use-frosted-glass-without-killing-ux) — the "glass on modals and toolbars only, at 4.5:1" rule in §4.3

**Reference sites worth opening side by side with the two candidates**
- Precision instrument: [linear.app](https://linear.app), [vercel.com](https://vercel.com)
- Editorial / paper seriousness: [anthropic.com](https://www.anthropic.com)
- Gradient and shader craft: [stripe.com](https://stripe.com)
- Disciplined glass: [resend.com](https://resend.com), [clerk.com](https://clerk.com)
- Galleries: [land-book.com](https://land-book.com) (filterable by style, colour, typography), [godly.website](https://godly.website), [refero.design](https://refero.design)

---

## 9. Decision & next steps — 2026-08-17

**Ship Aurora Glass (§4.1 / Position A).** Blueprint is rejected outright — Karthik
reviewed both live and didn't like the light/paper direction, independent of §4.2's
"facts above the fold" argument for it. That argument doesn't transfer to Aurora as
a reason to switch; it transfers as a **to-do inside Aurora** (§9.2).

Flagged per §4.4's own honesty standard: this is a preference call, not one backed
by recruiter-outcome evidence the way §4.2's argument was. Bias #3 in §4.4 — "I have
not tested any of this on a real recruiter" — still applies. Decided anyway, because
Karthik has to be able to live with the page, and a design he's lukewarm on doesn't
get maintained past launch.

### 9.1 — "Which glassmorphism is better?" — resolved, and it wasn't the question

Comparing `localhost:3000` (current `redesign-explore` HEAD) against the still-live
`ok-karthik.github.io` surfaced a mix-up worth recording before it causes confusion
later: **they are not two different skins.** Both are Aurora Glass — the deployed
site is simply an earlier point in Aurora's own history, from before the
2026-08-15 colourway cut recorded in `content/skins.ts`'s header comment. So it
still carries the original three-hue cyan/coral/violet accent and a visible
constellation/node-mesh backdrop; local is post-cut, down to a single blue accent,
and the mesh isn't visibly rendering in a static capture of local at all (worth a
look — intentional simplification from the later "restore clean unboxed hero
layout" commits, or a regression, is unconfirmed).

Net: **the `.glass` panel treatment itself — 26px blur, 185% saturation, the top
specular highlight — is identical in both builds.** What Karthik is responding to
in the deployed version is the backdrop layer underneath the glass, not the glass.
That's an axis §5 already has an answer for and specifically kept rather than
deleting:

> **The two-lume gradient** — violet `#9b82ff` top-left, teal `#2fd6b0`
> bottom-right (light-mode-safe values `#5433c9` / `#0e8f74`). Two *opposing* hues
> at *two* corners, not three hues at full saturation — the thing that got cut was
> specifically **three** saturated hues reading as a rainbow.

**Update, confirmed in code:** the missing mesh is not a regression. Aurora dark
sets `--mesh-opacity: 0` explicitly, with a comment on the line above it: "the
aurora canvas is the backdrop; the neural mesh on top of it is two ambient layers
fighting." Someone already tried the mesh at full strength alongside the canvas
blooms and turned it off on purpose. That call was made without knowing Karthik
would independently respond to exactly that layered look on the deployed build, so
it's worth one more look, but re-enabling it at whatever value caused "fighting"
would just reproduce the original complaint.

**Action:** reintroduce the two-lume gradient (violet/teal only, not the cut
cyan/coral/violet trio) as Aurora's backdrop wash, and bring `--mesh-opacity` back
in at a low, non-zero value (try ~0.08–0.15, not a full revert) so the constellation
texture reads without repeating the "two layers fighting" problem the original
implementer flagged. Tune by eye against the aurora canvas at that value — don't
just flip the switch back to whatever it was before.

### 9.2 — Section order, the jump-index row, and the "Three layers" section

Karthik's preferred order — **Hero → Tech Skills → Projects → Experience** —
matches §2's existing hard constraint on that ordering (job-posting keyword
frequency, not aesthetics). No conflict; nothing to relitigate there.

**Cut the jump-index row** (`01 Overview → 07 Contact`) that currently sits
directly under the hero. It's a second navigation system duplicating the sticky
top navbar in the same first-viewport real estate that §1 says matters most for
the recruiter-bounce-in-seconds case, and it isn't even fully redundant in a good
way — its few non-overlapping entries (Overview, Architecture, Capabilities,
Credentials) aren't sections a recruiter needs a dedicated jump link for, and
Architecture loses its case for one anyway once demoted below. One nav system, not
two: if a section genuinely needs a direct link, add it to the top navbar instead.

The "Three layers, one owner" section (the 3D isometric platform deck) is **not**
one of the four constrained sections, so it's free to move. Karthik's read: nice
visual, but it doesn't carry differentiated signal the way the project diagrams
do — the projects section is already this site's stated asset (§1, §4.5). Demote
it. In ascending order of effort:

1. Cut the 3D deck; keep the three-tier grouping as a compact left-aligned text
   list, placed near the Tech Skills intro or beside the lead project.
2. Keep the 3D deck but shrink it and move it out of its own full-width section —
   e.g. to the end of Tech Skills, not between Hero and Tech Skills.
3. Cut it entirely; fold the three-tier grouping into Tech Skills' existing
   category labels, which already group tools similarly.

No pick made yet — worth looking at option 1 built small before choosing between
these, per Karthik's own hunch that the 3D rendering isn't earning its section.

Also confirmed, no action needed: the 2-column grid for secondary project cards,
already landed on `redesign-explore` via the Position C hybrid commits (`8a77529`
onward), is being kept as-is — though see §10.2 for a change to which projects sit
in which tier. (The jump-index nav landed in that same commit range
but is the one piece of it being reversed — see above.)

### 9.3 — `premium-ui-pass`: what to port, what's already covered

There's a second branch, `premium-ui-pass` (commit `0752ae9`), cut from the same
`main` commit `redesign-explore` branched from — a sibling, not an ancestor, so
**don't `git merge` it.** It edits the pre-skin base components
(`components/hero-section.tsx`, `experience-section.tsx`, `work-section.tsx`,
`architecture.tsx`) that now only back the `current` control skin being deleted in
§9.4. What matters is whether its five fixes are still needed *inside Aurora's own
files*. Checked against current `redesign-explore` HEAD:

| Fix | Status | Action |
|---|---|---|
| **P1** — lead project diagram at legible scale (`--arch-scale`, replacing a fixed 0.38 thumbnail that rendered 12px labels at ~4.6px) | Already on Aurora — `components/architecture.tsx` has near-identical `--arch-scale` logic | None |
| **P5** — light-mode accent under AA (`--primary` measured 4.49:1 on the deep end of the fixed gradient) | Already handled, and better — Aurora's light accent `#0a5566` ships with its own measured comment: "5.9:1 on the deepest wash. The obvious #0a6b7d only reaches 4.5." | None |
| **P2** — experience rail invisible at 0.16 alpha (1.5:1) | Aurora's timeline is its own build, not the patched base component — the rail reuses `--border-strong` (0.24 alpha), not a separate under-tuned token, so the specific bug doesn't appear to exist here | None; optional spot-check of `--border-strong` contrast at 1440 if there's time |
| **P4** — `section-tight/-base/-loud` rhythm tokens replacing ad hoc `py-24`, plus `text-wrap: balance/pretty` | Genuinely missing — no such tokens in `app/globals.css` | **Port.** Cheap, systemic, no design risk |
| **P3** — hero's three stat cards fused into one hairline-divided strip (plus `animate-ping` → a slower opacity breathe on the availability dot) | **Missing, and it's a regression** — §3's own description of Candidate A already calls for exactly this ("the three KPIs fused to its bottom edge behind a hairline. Not five separate panels whose edges compete"), but the current hero renders three separate rounded tiles with gaps between them. A later hero-layout commit reverted this | **Fix.** Not just an optional import from another branch — it's drifted from this document's own stated design intent. `premium-ui-pass`'s implementation is a working reference for the fused-strip layout |

### 9.4 — Cleanup, once §9.1–9.3 are settled

Per §4.5 (already agreed by all three positions before this decision) — delete the
decision-aid machinery, don't leave it running permanently:

- `content/skins.ts`, `components/skins/skin-switcher.tsx`, `skin-stage.tsx`,
  `skin-boot.tsx`, `use-skin.ts`
- `components/skins/blueprint/` (whole directory) and `components/skins/current.tsx`
- The `html[data-skin='blueprint']` / `html[data-skin='current']` token blocks in
  `app/globals.css` — promote Aurora's tokens directly into `:root` / `.dark`
- The `SkinBootScript` call in `app/layout.tsx`; `app/page.tsx` renders the Aurora
  composition directly instead of `<SkinStage />`

Do this cleanup **last**, after §9.1 and §9.2 land — the flag is still useful for
A/B-ing the backdrop restoration and the layers-section demotion while they're in
progress, and it's cheaper to delete once than to delete and partially rebuild.

---

## 10. Hero card, Projects section shape, and a header bug — 2026-08-17

Three more items from a walkthrough of `?skin=current` vs `?skin=aurora`, all
checked against the actual component code, not just the screenshots.

### 10.1 — Hero card: add the fact that's missing, not any other content

The Focus Areas card (photo, four focus areas, GitHub/LinkedIn/Email) is
well-argued — `content/profile.ts` documents the reasoning behind nearly every
word on the page. It's fine as content. But it's missing something that used to
be there: an earlier screenshot of this same branch shows "Karthik Orugonda /
Berlin, Germany / German Permanent Residence" set directly beside the photo. That
got dropped somewhere in the redesign and nothing replaced it — the only place
"German Permanent Residence" appears now is the footer, below the fold.

Not a style nit. §4.2 already made the strongest outcomes-based argument on this
entire document: *"'German Permanent Residence' answered before a recruiter has
to ask removes the single most common silent disqualification."* That argument
was made in service of Blueprint, which lost — but the argument doesn't depend on
Blueprint, and §4.5's "what all three positions agree on" already says the four
screening facts belong above the fold regardless of which design won. Right now
none of Karthik's designs are actually doing that.

**Action:** add a compact line under or beside the photo — `Berlin, Germany ·
German Permanent Residence` or equivalent. Doesn't need Blueprint's four-cell
title-block treatment, just needs to exist above the fold instead of only in the
footer.

### 10.2 — Projects: drop "Lead project," promote a second card to full width

Two changes, both in `components/work-section.tsx`.

**Cut the "Lead project" label** — line 87, `Project 01 · Lead project`. Just
"Project 01," matching how 02–05 are labelled. The "Lead" framing doesn't carry
information a recruiter uses and implies a hierarchy the site doesn't otherwise
argue for.

**Promote IDP & GitOps Reference Architecture into the full-width tier alongside
OpenTelemetry & LGTM Platform**, instead of it sharing the half-tile grid with
Enterprise AWS. New shape: **2 full-width → 2 half-tile → 1 "more projects" row**
(currently 1 → 2 → 2).

This doesn't touch project *order* — `content/projects.ts` keeps the existing
job-posting-frequency order from §2 (observability leads), and the two promoted
are already the top two by that same ordering. Only the shape tier each project
sits in changes, which §2's ordering constraint doesn't cover.

Implementation isn't a pure content edit — the current data model only has two
tiers (`featured` → one lead + a half-tile grid; everything else → "more
projects" rows), and this needs three:

- `content/projects.ts`: flip `AI Infrastructure on Amazon EKS` (currently
  `featured: false`, ~line 272) to `featured: true`. `featuredProjects` becomes
  4 items; only `FinOps Kubernetes Operator` stays `featured: false`.
- `components/work-section.tsx` line 59: `const [lead, ...others] = featured`
  takes one item as the full-width "lead" and puts the rest in the half-tile
  grid. Change to take the first **two** as full-width, leaving the remaining
  two (`Enterprise AWS Infrastructure`, `AI Infrastructure on Amazon EKS`) in the
  half-tile grid, and `rest` (FinOps) as the sole "more projects" row.
- Open question worth deciding while in there: the full-width tier currently
  gets `AssemblingDiagram` (the self-drawing reveal, lines 109–113) while
  everything else gets the static `ArchitecturePreview`. If IDP & GitOps joins
  the full-width tier, it should probably get the same self-drawing treatment
  for consistency — two full-width cards that behave differently would read as
  inconsistent, not intentional.

### 10.3 — Projects header rule doesn't reach the edge — found the cause

The eyebrow rule next to "PROJECTS" stops short of the content edge, unlike Tech
Skills' or Experience's, which run the full width. Confirmed why, by comparing
the three headers directly:

- `tech-skills-section.tsx:87-88` and `experience-section.tsx:23-24` put the
  `rule-label` `<p>` directly inside a plain `<header className="mb-10/12">`, so
  its `::after` rule fills the full `max-w-6xl` content width.
- `work-section.tsx:65-73` does it differently: `<header>` is
  `sm:flex sm:justify-between`, and the eyebrow/h2/deck text sit inside an inner
  `<div>` that's only the *first* flex item — the "N projects" label is the
  second. An auto-width flex item stretches only to fit its own content, so the
  rule fills up to that inner div's edge, well short of where "N projects" sits.

**Fix:** stop nesting the eyebrow inside the two-column flex div. Either make
`rule-label` a direct child of `<header>` (matching the other two sections) and
move the "N projects" count elsewhere — next to the eyebrow text, or beside the
H2 — or restructure so the rule's containing block is the full header width
regardless of where the count label ends up.
