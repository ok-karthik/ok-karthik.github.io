/**
 * One comparison diagram per writing post, keyed by name from content/writing.ts.
 *
 * Same visual rules as `architecture.tsx`: structure is achromatic, --primary
 * marks the thing the post is arguing for, no glow, no looping animation.
 * Each is a side-by-side of the two options the post compares, because every
 * post is a trade-off and the picture should show both sides. Labels are real
 * text at reading size so they hold up on a phone and in both themes — the
 * Algoroq-style isometric version was declined for exactly that reason (see
 * docs/2026-09-algoroq-teardown-plan-declined.md).
 *
 * Nothing here carries a number. Where an option is "slower", the caption says
 * what the wait is made of, not how long it is — unmeasured durations would be
 * invented metrics.
 */

import type { ReactNode } from "react"

export type PostDiagramName = "gpu-sharing" | "collector-hop" | "parallel-gates"

/* --------------------------------- atoms --------------------------------- */

function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="my-10 rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
      <figcaption className="mt-5 border-t border-border pt-3 text-center font-mono text-micro text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  )
}

function Panel({
  title,
  note,
  chosen,
  children,
}: {
  title: string
  note: string
  /** The side the post recommends for its main case gets the accent border. */
  chosen?: boolean
  children: ReactNode
}) {
  return (
    <div
      className={`flex min-w-0 flex-col rounded-lg border p-4 ${
        chosen ? "border-primary/45" : "border-border"
      }`}
    >
      <p className={`label ${chosen ? "text-primary" : ""}`}>{title}</p>
      <div className="mt-4 flex-1">{children}</div>
      <p className="mt-4 text-small leading-snug text-muted-foreground">{note}</p>
    </div>
  )
}

function Box({
  children,
  active,
  className = "",
}: {
  children: ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-md border px-2.5 py-1.5 text-center font-mono text-micro ${
        active
          ? "border-primary/50 bg-primary/5 text-primary"
          : "border-border bg-muted text-foreground"
      } ${className}`}
    >
      {children}
    </div>
  )
}

/* ----------------------------- gpu-sharing ------------------------------- */

function GpuSharing() {
  const turns = ["A", "B", "C", "A", "B", "C"]
  return (
    <Figure caption="same card, two ways to share it">
      <Panel title="Time slicing" note="Pods take turns. Memory is shared, so one greedy pod can crash another.">
        <div className="rounded-md border border-border p-3">
          <p className="font-mono text-micro text-muted-foreground">1 GPU</p>
          <div className="mt-2 grid grid-cols-6 gap-1">
            {turns.map((t, i) => (
              <Box key={i} className="px-0">
                {t}
              </Box>
            ))}
          </div>
          <p className="mt-1.5 text-center font-mono text-micro text-muted-foreground">
            compute · taking turns →
          </p>
          <Box className="mt-3">memory · shared by A, B, C</Box>
        </div>
      </Panel>

      <Panel title="MIG" note="Split in hardware. Each pod gets its own slice and can't touch the others.">
        <div className="rounded-md border border-border p-3">
          <p className="font-mono text-micro text-muted-foreground">1 GPU · split into slices</p>
          {/* Rows, not three columns: at the sm breakpoint a third of the
              panel was narrower than the word "memory". */}
          <div className="mt-2 space-y-1.5">
            {["A", "B", "C"].map((t) => (
              <div key={t} className="flex items-center gap-2 rounded-md border border-border p-1.5">
                <Box className="w-8 shrink-0 px-0">{t}</Box>
                <p className="min-w-0 font-mono text-micro text-muted-foreground">
                  own memory · own compute
                </p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </Figure>
  )
}

/* ---------------------------- collector-hop ------------------------------ */

/**
 * Wiring is SVG (lines only) behind DOM labels, so the text stays real text. viewBox is 0..100 in both axes and stretched with
 * preserveAspectRatio="none"; strokes use vector-effect so stretching doesn't
 * thicken them.
 */
function Wires({ lines }: { lines: [number, number, number, number][] }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className="stroke-border-strong"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  )
}

const APPS = ["app 1", "app 2", "app 3"]
const VENDORS = ["vendor A", "vendor B"]
// Column centres (% of width) for a 3-up and a 2-up row.
const APP_X = [16.7, 50, 83.3]
const VENDOR_X = [25, 75]

type Line = [number, number, number, number]

/**
 * Laid out top-to-bottom (apps, then vendors), not left-to-right: three
 * columns of boxes side by side overflowed the panel at every width, because
 * each panel is only ~230px wide at the `sm` breakpoint. Rows of boxes fit any
 * width. Line endpoints are percentages of the wiring area, set to the edges
 * of the box rows so no line runs through a translucent box.
 */
function Row({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`absolute inset-x-0 grid gap-2 ${className}`} style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
      {items.map((label, i) => (
        <div key={label} className="flex justify-center" style={{ gridColumn: i + 1 }}>
          <Box className="w-full max-w-28 px-1">{label}</Box>
        </div>
      ))}
    </div>
  )
}

function CollectorHop() {
  // Direct: h-44; app row bottom edge ≈ 18%, vendor row top edge ≈ 82%.
  const direct: Line[] = APP_X.flatMap((ax) => VENDOR_X.map((vx) => [ax, 18, vx, 82] as Line))
  // Via collector: h-56; apps end ≈ 15%, collector spans ≈ 43–57%, vendors start ≈ 85%.
  const via: Line[] = [
    ...APP_X.map((ax) => [ax, 15, 50, 43] as Line),
    ...VENDOR_X.map((vx) => [50, 57, vx, 85] as Line),
  ]

  return (
    <Figure caption="every app × every vendor, or everything through one place">
      <Panel
        title="Direct to vendor"
        note="Each app carries each vendor's SDK and config. Switching vendors means touching every app."
      >
        <div className="relative h-44">
          <Wires lines={direct} />
          <Row items={APPS} className="top-0" />
          <Row items={VENDORS} className="bottom-0 px-6" />
        </div>
      </Panel>

      <Panel
        chosen
        title="Through a collector"
        note="Apps only speak OTLP. The vendor is one exporter config in one place."
      >
        <div className="relative h-56">
          <Wires lines={via} />
          <Row items={APPS} className="top-0" />
          <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-center">
            <Box active className="px-4 py-2">
              OTel Collector
            </Box>
          </div>
          <Row items={VENDORS} className="bottom-0 px-6" />
        </div>
      </Panel>
    </Figure>
  )
}

/* ---------------------------- parallel-gates ----------------------------- */

const GATES = ["TFLint", "Conftest", "Infracost"]

function Arrow({ dir = "↓" }: { dir?: string }) {
  return (
    <p aria-hidden className="text-center font-mono text-micro text-muted-foreground">
      {dir}
    </p>
  )
}

function ParallelGates() {
  return (
    <Figure caption="same checks, same plan, different wait">
      <Panel
        title="In a chain"
        note="The first failure hides the rest. You wait for every step, one after another, and find problems one push at a time."
      >
        <div className="space-y-1">
          <Box>plan</Box>
          {GATES.map((g) => (
            <div key={g} className="space-y-1">
              <Arrow />
              <Box>{g}</Box>
            </div>
          ))}
          <Arrow />
          <Box>merge</Box>
        </div>
      </Panel>

      <Panel
        chosen
        title="In parallel"
        note="Every check runs on the same plan at once. One run shows every problem; you only wait for the slowest check."
      >
        <div className="space-y-1">
          <Box>plan</Box>
          <Arrow />
          {/* flex-wrap, not a 3-column grid: at narrow panel widths
              "Infracost" overflowed a fixed third. Boxes size to their text
              and wrap as whole units instead. */}
          <div className="flex flex-wrap justify-center gap-1.5 rounded-md border border-primary/30 p-1.5">
            {GATES.map((g) => (
              <Box key={g} active className="flex-1">
                {g}
              </Box>
            ))}
          </div>
          <Arrow />
          <Box>merge</Box>
        </div>
      </Panel>
    </Figure>
  )
}

export const postDiagrams: Record<PostDiagramName, () => ReactNode> = {
  "gpu-sharing": GpuSharing,
  "collector-hop": CollectorHop,
  "parallel-gates": ParallelGates,
}
