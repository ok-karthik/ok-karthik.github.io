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

### 1. Writing: plain-language rewrite (Karthik's voice), then one diagram per post

The three posts are accurate, but they read polished in a way that feels
generated. They lean on aphorisms ("It is not capacity management. It is
hoping."), rhetorical headings ("The part people skip"), and have no
contractions. The fix is about voice, not facts.

**Voice rules:**
- Open with what happened to you: "When I set up GPU nodes on EKS…", not a thesis.
- Write short sentences, the way you'd say them out loud. Use contractions.
- Give one concrete example per idea: a real config, a real number from the repo, a real mistake.
- No punchline quotes or closing aphorisms. End on what you'd do next time.
- Plain headings: "When to use time slicing", not "The part people skip".
- Every first-person claim must be checked against the repo (the existing rule).

**Process:**
1. Karthik shares 1–2 things he wrote himself (LinkedIn posts, a Slack
   explanation) as the voice sample.
2. Rewrite one post.
3. Karthik edits it, and that edited post becomes the template for the other two.

**Diagrams,** one per post, in the same flat style as `architecture.tsx`
(no isometric, no glow, no looping animation):
- *Time slicing vs MIG:* one card split two ways, side by side. On the
  left, pods taking turns on a shared card (shared memory). On the right,
  fixed hardware slices, each with its own memory.
- *Why the Collector earns its hop:* N services × M backends wired directly,
  next to everything going through one Collector.
- *Governance gates in parallel:* four gates in a chain (total time = sum),
  next to the same four side by side (total time = slowest one). Durations
  stay unlabelled, or marked "illustrative", unless measured.

Build these as DOM components like `architecture.tsx`, not images, so they
work in both themes and on phones.

**References** for flat explainer diagrams:
- https://tailscale.com/blog/how-tailscale-works
- https://samwho.dev/load-balancing/

### 2. Small follow-ups

- **CV title.** `cv/content/master.md` now heads with "Staff Platform Engineer
  & SRE". The site deliberately says Senior (AGENTS.md rule 1, enforced by a
  test). Karthik decides whether the CV or the site moves. Don't change the
  site's title without his say.
- **CV "AIOps".** The Aldi bullet in the CV still says "AIOps"; the site
  doesn't. Karthik decides.
- **Cloudflare Pages.** The hostname isn't recorded in the repo. Add it to
  AGENTS.md so post-deploy checks can cover both hosts.
