/**
 * Blueprint's drawing vocabulary.
 *
 * Karthik rejected the graph-paper background in the first pitch — it is the
 * one thing every "blueprint" template does, and it is wallpaper. So the
 * drafting language here is carried entirely by *drawing conventions* that
 * encode something real: a title block that holds the facts a recruiter
 * screens on, dimension rules that measure the section they head, and sheet
 * numbers that are genuinely sequential.
 */

/** A dimension line with witness ticks, labelling the section beneath it. */
export function DimRule({ label, sheet }: { label: string; sheet?: string }) {
  return (
    <div className="flex items-center gap-4 text-primary">
      <span className="h-2.5 w-px shrink-0 bg-current" aria-hidden />
      <span className="h-px flex-1 bg-current/45" aria-hidden />
      <span className="shrink-0 font-mono text-micro uppercase tracking-[0.18em]">
        {sheet ? <span className="text-foreground/55">{sheet} — </span> : null}
        {label}
      </span>
      <span className="h-px flex-1 bg-current/45" aria-hidden />
      <span className="h-2.5 w-px shrink-0 bg-current" aria-hidden />
    </div>
  )
}

/** A labelled cell in a title block. Cell borders come from the parent's
    `divide-*`, so the last cell never draws a hanging edge. */
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-4">
      <dt className="label mb-1.5">{label}</dt>
      <dd className="font-display text-body font-semibold uppercase tracking-wide text-foreground">
        {children}
      </dd>
    </div>
  )
}
