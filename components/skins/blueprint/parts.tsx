/**
 * Blueprint's drawing vocabulary.
 *
 * The first version of this skin borrowed the *words* off a construction
 * drawing as well as the layout — "general arrangement", "issued for
 * construction", "rev 4", "also drawn". Karthik's note was that it read as a
 * building plan rather than as his portfolio, which is right: a recruiter
 * scanning for "Kubernetes" should not have to translate a drafting term
 * first. The costume is gone; what stays is the *structure*, which is doing
 * real work — a title block that holds the facts you screen on, ruled section
 * heads, numbered sections that follow reading order, figure captions on
 * diagrams.
 *
 * Rule for anything added here: if a term wouldn't appear on a CV, it doesn't
 * go on the page. Draw like a drawing, write like a portfolio.
 */

/** A dimension line with witness ticks, heading a section. */
export function DimRule({ label, index }: { label: string; index?: string }) {
  return (
    <div className="flex items-center gap-4 text-primary">
      <span className="h-2.5 w-px shrink-0 bg-current" aria-hidden />
      <span className="h-px flex-1 bg-current/45" aria-hidden />
      <span className="shrink-0 font-mono text-micro uppercase tracking-[0.18em]">
        {index ? <span className="text-foreground/55">{index} — </span> : null}
        {label}
      </span>
      <span className="h-px flex-1 bg-current/45" aria-hidden />
      <span className="h-2.5 w-px shrink-0 bg-current" aria-hidden />
    </div>
  )
}

/**
 * A ruled section head: the index rule, then a real `<h2>`.
 *
 * The rule alone used to *be* the heading, which left the page jumping from
 * `h1` straight to the `h3`s inside each card. It looked fine and read wrong
 * to anything not using its eyes.
 */
export function SheetHead({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <header className="mb-10">
      <DimRule index={index} label={eyebrow} />
      <h2 className="mx-auto mt-7 max-w-3xl text-center font-display text-display font-semibold uppercase tracking-wide text-foreground text-balance">
        {title}
      </h2>
      {children ? (
        <div className="mx-auto mt-3 max-w-2xl text-center text-body text-muted-foreground text-pretty">
          {children}
        </div>
      ) : null}
    </header>
  )
}

/** A labelled cell in the title block. Cell borders come from the parent's
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
