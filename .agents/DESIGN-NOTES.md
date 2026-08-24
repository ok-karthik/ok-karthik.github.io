# Design notes — ideas worth keeping

Things that were built, evaluated and then removed, but which Karthik wants
available when a future layout is designed. Keep this short: it is a shelf for
*specific* ideas that earned their keep, not a graveyard for everything tried.

---

## From the Spatial skin (built 2026-08-15, removed 2026-08-15)

Spatial was one of three candidate designs behind the runtime skin flag. It was
cut because Aurora and Blueprint were the two Karthik wanted to develop, not
because these two ideas failed — both of these he called out by name.

### 1. The funnel timeline — older roles step narrower

Experience rendered as a stack of plates where **each older role indents
further and sheds elevation**, so the career recedes into the page rather than
running down a rail. Reads as depth, and encodes recency without a date scan.

Implementation was one CSS custom property on the list item, so it costs
almost nothing to reintroduce:

```tsx
<li
  style={{ "--depth": i } as React.CSSProperties}
  className="ml-0 lg:ml-[calc(var(--depth)*2.25rem)]"
>
```

The indent is `--depth * 2.25rem`, applied only at `lg` — below that the roles
stack flush, because a 4-step indent on a 390px viewport eats the text column.
The current role kept a lit border (`border-primary/45 shadow-glow`); the
others were plain.

**Constraint if this comes back:** do *not* fade older roles' text as well as
indenting them. Reducing opacity with depth was considered and rejected —
fifteen years of history becoming the least readable thing on the page is a
worse outcome than a flat-looking list. The indent alone carries it.

Recovered with: `git show 0f3b70a:components/skins/spatial/experience.tsx`

### 2. The two-lume gradient — violet from the top left, teal from the bottom right

Not a single accent glow: **two opposing hues at opposite corners of a fixed
backdrop.** That is what made flat panels between them read as solids with two
lit faces, and it is why the deck's planes looked like objects rather than
rectangles.

```css
--primary: #9b82ff;   /* violet, top-left  */
--lume-2:  #2fd6b0;   /* teal,  bottom-right */
```

```tsx
background:
  "radial-gradient(900px 620px at 12% -6%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 65%)," +
  "radial-gradient(760px 560px at 96% 108%, color-mix(in oklab, var(--lume-2) 22%, transparent), transparent 62%)"
```

Two notes on why it worked and a third on where it nearly didn't:

- **CSS, not canvas.** One paint, nothing after. Aurora already spends a rAF
  loop on moving light; a second animated backdrop would have been two ambient
  layers fighting.
- **`--lume-2` is deliberately *not* `--ok`.** It is a light source, not a
  status. The repo's rule that the status triple only ever means an actual
  state survives this.
- Light mode needed different values entirely (`#5433c9` / `#0e8f74`) — the
  dark violet measures 2.9:1 on white. Any reuse has to re-derive both.

Recovered with: `git show 0f3b70a:components/skins/spatial/lumes.tsx`

---

## Rejected, and why — so they don't get re-proposed

- **Gridlines at full strength** (Blueprint, first pitch). Every "blueprint"
  template does this and it reads as wallpaper. They came back at 2–4% ink,
  two pitches, masked to one corner — see `components/skins/blueprint/paper.tsx`.
- **Rust / terracotta accent** (`#9c3524`). Reads as Claude's brand colour, not
  Karthik's. Now drafting blue `#1552b8`.
- **Drafting-office vocabulary** ("general arrangement", "issued for
  construction", "rev 4", "fig. 01"). Made a portfolio read as a building plan.
  Rule: if a term wouldn't appear on a CV, it doesn't go on the page.
- **Aurora's cyan / coral / violet colourway.** Three saturated hues is a
  rainbow on a page arguing for infrastructure judgement.
- **A rule line between Tech Skills groups, and a pipe as the note separator**
  (both tried 2026-08-24). The rule duplicated a signal the header + whitespace
  gap already sent and read as spreadsheet gridlines; the pipe broke the dot
  convention used everywhere else on the page. Full reasoning in
  `.agents/AGENTS.md`'s "Tech Skills panel layout" section — this is the
  don't-re-propose pointer, that's the why.
- **4 columns for the Tech Skills panel**, considered twice (once before the
  masonry fix, once after, "since there's free space now"). Narrower columns
  reintroduce the multi-item-note wrapping that moving to 3 columns fixed the
  first time. Stays at 3.
