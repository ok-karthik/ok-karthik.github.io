/**
 * Spatial's two light sources.
 *
 * Deliberately CSS, not canvas. Aurora already spends a rAF loop on moving
 * light; Spatial's depth comes from opaque panels casting shadow, so its
 * background only has to be *lit*, not *alive*. Two fixed radials cost one
 * paint and nothing after that.
 *
 * Violet from the top left, teal from the bottom right — opposing hues at
 * opposite corners are what make a flat panel between them read as a solid
 * with two faces.
 */
export function SpatialLumes() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(900px 620px at 12% -6%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 65%)," +
          "radial-gradient(760px 560px at 96% 108%, color-mix(in oklab, var(--lume-2) 22%, transparent), transparent 62%)",
      }}
    />
  )
}
