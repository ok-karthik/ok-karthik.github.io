/**
 * Ruled paper.
 *
 * Gridlines were in the first Blueprint pitch and Karthik rejected them —
 * correctly. That version was a uniform full-strength grid, which is the thing
 * every "blueprint" template does and reads as wallpaper behind the content
 * rather than stock underneath it.
 *
 * Three things changed:
 *   strength   the ruling is 2–4% ink, so it registers as texture and never
 *              competes with a line of body copy for the eye
 *   pitch      two scales, 16px minor and 96px major, which is engineering
 *              paper rather than a CSS checkerboard
 *   falloff    it is masked to the top-left and gone by the lower right, so
 *              the sheet has a drawing corner and a clean margin instead of
 *              being tiled edge to edge
 *
 * Fixed, so it behaves like the paper the page is printed on rather than
 * something that scrolls with a section. One paint, no animation.
 */
export function BlueprintPaper() {
  const grid =
    // Major rules first so the minor ones sit under them where they cross.
    "linear-gradient(var(--rule-ink) 1px, transparent 1px)," +
    "linear-gradient(90deg, var(--rule-ink) 1px, transparent 1px)," +
    "linear-gradient(var(--rule-ink-minor) 1px, transparent 1px)," +
    "linear-gradient(90deg, var(--rule-ink-minor) 1px, transparent 1px)"

  const fade = "radial-gradient(140% 118% at 0% 0%, #000 0%, #000 48%, transparent 94%)"

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage: grid,
        backgroundSize: "96px 96px, 96px 96px, 16px 16px, 16px 16px",
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  )
}
