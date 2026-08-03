# Karthik Orugonda | Project Architecture

Persistent context for agents working on `ok-karthik.github.io`. It records the
decisions, not just the layout — where something looks odd, the reason is
usually here.

## Purpose

Portfolio for **Karthik Orugonda**, Senior Platform Engineer & SRE, targeting
Senior Platform / SRE / AI Infrastructure roles in Germany.

Two positioning rules govern the content, and both are load-bearing:

1. **Never claim a Staff title.** Karthik's title on paper is DevOps Specialist
   (previously Senior IT Consultant); LinkedIn and the CV both say *Senior
   Platform Engineer & SRE*. The portfolio must match, because a recruiter
   reads it with LinkedIn open. A test in `__tests__/components.test.tsx`
   asserts no section renders the word "Staff".
2. **Lead with scope and trade-offs, not tools.** In Karthik's own scraped
   market data (1,329 German postings, Jun–Jul 2026) no individual tool showed
   a significant lift toward better-paid roles, while *technical strategy and
   direction* was the largest gap between how Senior and Staff roles are
   written (+32pp). Hence project pages built around documented decisions, and
   a Tech Skills section that is deliberately not the largest thing on the page.

## Stack

- **Next.js 16 (App Router)**, `output: 'export'` — static, no server at runtime
- **Tailwind CSS v4**, tokens in `app/globals.css`
- **Framer Motion** for scroll reveals; CSS animations for the page-load sequence
- **next-themes** (class strategy), dark default
- **Radix Dialog** — the only component dependency that survived the prune (47 → 9)

## Layout

```
app/
  page.tsx              Hero → Projects → Experience → Tech Skills
                        → Certifications → Contact
  work/[slug]/          Statically generated project pages
  writing/[slug]/       Statically generated posts
  sitemap.ts robots.ts  Generated from content/
content/                SINGLE SOURCE OF TRUTH — see below
components/             Sections, plus architecture diagrams and the palette
public/icons/           23 self-hosted SVGs, pinned versions
```

### `content/` is the source of truth

`profile.ts` · `experience.ts` · `projects.ts` · `skills.ts` · `writing.ts`

Nothing about the title, years, location or skill list may be written inline in
a component. This exists because the site previously drifted out of sync with
itself — the terminal, hero, metadata and footer each carried their own version
of the title, and the skills list in the terminal had fallen behind the grid.

`projects.ts` decisions are sourced from the repo READMEs (fetched 2026-08-03),
not inferred. Two earlier inferences were wrong: the FinOps schedule annotation
sits on the *namespace*, not the workload, and the server-side `field_selector`
decision had been missed. If you add a decision, check the README first.

## Design system — "control room"

Deep blue-graphite base, translucent glass panels with real elevation, cyan-teal
accent (`#2bc8dd` dark / `#0d7f94` light).

- **Product logos keep their brand colour.** Recognition is the point of a logo.
- **`--ok` / `--warn` / `--err` mean an actual state**, never decoration. They
  appear in the FinOps diagram, the "all gates pass" line, and the Chose/Instead-of
  markers on decision cards. Nowhere else.
- **Type:** IBM Plex Sans + Plex Mono. Proportional carries claims; mono carries
  anything measured or labelled. Use the scale (`text-micro` … `text-display-lg`)
  — no arbitrary `text-[13px]`.
- **Radii:** `--radius-sm` … `--radius-2xl`. No arbitrary values.
- **`glass`** is the panel surface. **`glass-hover`** adds lift *and* the cursor
  spotlight, so it marks things that are clickable. Do not put `glass-hover` on
  large static surfaces — a 14rem radial inside a full-width panel reads as a
  smudge, which is exactly the bug it caused on Tech Skills.

### Rhythm

Sections deliberately do not share one shape. Projects are cards, Experience is
a hairline timeline rail, Tech Skills is one dense panel, Contact is a full-bleed
band. When every section was a glass rectangle the page read as assembled rather
than designed — don't collapse them back.

## Performance and motion

- **`NeuralMesh`** bins particles into a uniform grid sized to the link distance,
  so each tests its own cell plus 8 neighbours. The original compared every pair
  — ~47,000 distance checks per frame at 1440p. Don't reintroduce a pair loop.
- A **flow-field** alternative was built and rejected: trails accumulating over a
  large dark area read as a scratchy, matted texture. Don't rebuild it.
- The background is masked to fade out below the hero. Ambient should carry the
  opening and then get out of the way.
- **Everything animated respects `prefers-reduced-motion`**, and canvas work
  stops when the tab is hidden.
- `Spotlight` uses one delegated `pointermove` listener, throttled to one write
  per frame, skipped on touch.

## Images

`output: 'export'` with `images.unoptimized: true` means **there is no image
optimizer at runtime** — `next/image` would add wrapper markup and optimize
nothing. Use plain `<img>` with explicit `width`/`height` (prevents layout
shift), `loading` and `decoding`. `@next/next/no-img-element` is disabled for
this reason; it assumes a server this deployment does not have.

*(This corrected an earlier rule mandating `next/image`, which was wrong for a
static export and sent agents chasing a non-fix.)*

## Deployment

Static export to GitHub Pages and Cloudflare Pages. `profile.siteUrl` is the
canonical host — the two deployments would otherwise compete as duplicate
content.

**Analytics:** Vercel Analytics was removed because it POSTs to
`/_vercel/insights`, which exists only on Vercel, so it collected nothing on
either host. Cloudflare Web Analytics is the intended replacement and needs a
token from the dashboard.

## Rules

1. Both themes must work. Light mode was once glass at 0.72-alpha white on a
   near-white wash — invisible. Check both.
2. `typescript.ignoreBuildErrors` stays `false`. It has already caught a real
   broken build that would otherwise have shipped.
3. Keep dependencies lean. The prune from 47 to 9 was deliberate; adding a
   component library back would undo it.
4. Update tests when sections change. The suite covers render integrity, image
   attributes, content sourcing, project links and the no-Staff rule.
5. Never invent a metric. Every number on the site must be one Karthik can
   defend in an interview.
