---
name: premium-portfolio-ui
description: Structural and aesthetic constraints for building UI in this portfolio. Read before changing any component, token or layout.
---

# Portfolio UI

Constraints for building and refining UI here. `ARCHITECTURE.md` holds the
system-level reasoning; this file is the working rulebook.

## 1. Trigger conditions

**Use for:** new sections, redesigns, spacing/layout/grid changes, Tailwind
aesthetic work, Framer Motion entrances, token edits.

**Do not use for:** content edits, typo fixes, or React state bugs with no
styling component.

## 2. The design is "control room"

Deep desaturated purple-graphite base, translucent glass panels with real
elevation, one cyan-teal accent. Read the tokens in `app/globals.css` before
adding a colour — the answer is almost always already there.

**These rules are load-bearing. Each one exists because breaking it produced a
specific, observed failure.**

- **`--ok` / `--warn` / `--err` mean an actual state.** Never decoration. They
  appear on the "all gates pass" line, in the FinOps diagram, and on the
  Chose/Instead-of markers. Nowhere else. When these were used ornamentally the
  page lost any way to signal that something mattered.
- **Product logos keep their brand colour** on a neutral chip. Recognition is
  the entire point of a logo; desaturating them costs scannability for nothing.
- **`glass`** is the panel surface. **`glass-hover`** adds lift *and* the cursor
  spotlight — so it marks things that are clickable. Never put `glass-hover` on
  a large static surface: a 14rem radial inside a full-width panel reads as a
  smudge, which is exactly what it did on Tech Skills.
- **Use the type scale** (`text-micro` … `text-display-lg`) and the radius scale
  (`--radius-sm` … `--radius-2xl`). No arbitrary `text-[13px]`, no
  `rounded-[1.25rem]`. The page previously carried five ad-hoc radii and eight
  ad-hoc font sizes.
- **Type roles:** IBM Plex Sans carries claims, Plex Mono carries anything
  measured or labelled. The `label` utility is the eyebrow role.

## 3. Anti-patterns

- **Framer Motion + `transition-all`.** Never apply Tailwind `transition-all`
  to an element Framer is animating — the CSS and JS engines fight and the
  result stutters. Scope the transition to specific properties.
- **One texture for the whole page.** Sections deliberately do not share a
  shape: Projects are cards, Experience is a hairline timeline rail, Tech Skills
  is one dense panel, Contact is a full-bleed band. When everything was a glass
  rectangle the page read as assembled rather than designed. Do not collapse
  them back.
- **Restraint applied everywhere.** Spend boldness in *one* place and keep the
  rest quiet — but keep the one. An earlier pass applied restraint uniformly and
  produced a page that read as a formatted document, which on a portfolio is a
  worse failure than being loud.
- **Decorative numbering** (01 / 02 / 03) unless the content is genuinely
  sequential. Experience is; projects are not.
- **The AI-generated look.** Near-black plus a single acid accent; spammed
  purple gradients; glow on everything. Note the distinction: a deep desaturated
  purple *base* is fine and is what this site uses. The failure mode was
  saturation plus an acid accent plus glow, not the hue.
- **Section wrappers.** Do not wrap whole sections in glass containers; use
  `max-w-6xl mx-auto` and let panels sit on the page.

## 4. Motion

Every animation respects `prefers-reduced-motion` — the global block in
`globals.css` neutralises durations, and canvas work must render one static
frame instead. Canvas must also stop when the tab is hidden.

The page-load sequence uses CSS `animation-delay` on the `rise` utility rather
than JS, so it costs nothing. Scroll reveals are opacity plus a small
translate — nothing bouncy, nothing staggered down the whole page.

## 5. Images

`output: 'export'` with `images.unoptimized: true` means **no image optimizer
exists at runtime.** Use plain `<img>` with explicit `width`/`height`,
`loading` and `decoding`. `next/image` would add markup and optimize nothing;
its lint rule is disabled deliberately. Icons are self-hosted in `public/icons`
at pinned versions — never add a CDN `@latest` URL.

## 6. Verification

Changing layout or components means updating `__tests__` and
`components/navbar.test.tsx`. The suite covers render integrity, image
attributes, content sourcing, project links, and the rule that no section
renders the word "Staff".

Check **both themes**. Light mode once shipped as 0.72-alpha white glass on a
near-white wash — invisible, and it survived review because nobody looked.

## 7. Improving this file

If a rule here is wrong, fix it and say why in the commit. If a new failure is
found and fixed, add it to §3 with the observed symptom, not just the rule —
the symptom is what makes the rule stick.
