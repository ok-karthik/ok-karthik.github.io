# Portfolio — what's next

**Updated:** 2026-10-05
**History:** the August 2026 Aurora/Blueprint decision record is in
`docs/2026-08-redesign-decision.md`. The September Algoroq-style isometric
proposal was declined; it's kept, with the reasons, in
`docs/2026-09-algoroq-teardown-plan-declined.md`.

## Done in the 2026-10-05 pass (for context, don't redo)

- Section spacing cut ~30%; Experience is two columns from `lg`, older roles lighter.
- Tech Skills: compact chips on phones, with "Show details" for the notes.
- Project cards: full-size diagrams on the two lead cards; one-line `FlowStrip` on the tiles.
- Writing row fills the width on desktop. Header links for "All writing" and "View on LinkedIn".
- Nav scroll spy covers every section. Hero bio is shorter on phones only.
- `trailingSlash: true`. "AIOps" is removed from the site.
- Experience bullets re-synced with `cv/content/master.md` (shortened, same claims).

## Next

### 1. Writing: Karthik's read-through (only thing left)

Done 2026-10-05: all three posts were rewritten in plain, conversational
language (modelled on how Karthik writes in chat, since there's no recent
long-form sample), with the same arguments and first-person claims. Each post
now has one flat comparison diagram (`components/post-diagrams.tsx`). The
placeholder `code`/`pipeline` block was replaced by a typed `diagram` block.

Left: Karthik reads all three end to end. If he edits one, that edit becomes
the voice reference for future posts.

**Voice rules for new posts:**
- Open with the problem in plain words, not a thesis.
- Short sentences, contractions. No punchline endings or aphorism quotes.
- Plain headings ("So which one?", not "The part people skip").
- Every first-person claim must be checkable in the repo.

### 2. Small follow-ups

- **CV title.** `cv/content/master.md` now heads with "Staff Platform Engineer
  & SRE". The site deliberately says Senior (AGENTS.md rule 1, enforced by a
  test). Karthik decides whether the CV or the site moves. Don't change the
  site's title without his say.
- **CV "AIOps".** The Aldi bullet in the CV still says "AIOps"; the site
  doesn't. Karthik decides.
