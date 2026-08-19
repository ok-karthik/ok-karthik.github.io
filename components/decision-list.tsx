import { Check, X } from "lucide-react"
import type { Decision } from "@/content/projects"

/**
 * Decisions as ADR-style cards.
 *
 * The previous rendering was heading + paragraph on a hairline rule, which
 * flattened the one thing that makes this section worth reading: a decision is
 * a *choice between* options, and the rejected option is half the information.
 * Putting "chose" against "instead of" makes the trade-off the structure
 * rather than something buried in prose.
 *
 * The tick and cross are the only place status colour appears on these pages,
 * and here it means something literal — this was taken, that was not.
 */

/**
 * How many decisions render as full cards. The rest fall through to the
 * compact tail — see the ORDER IS MEANINGFUL note in content/projects.ts.
 */
const PRIMARY = 3

/**
 * Below this, every decision stays a full card. Splitting 4 into 3 + 1 leaves
 * a single orphaned row under its own heading, which reads like an oversight
 * rather than a ranking. Only the 5-, 6- and 7-decision projects split.
 */
const MIN_TO_SPLIT = 5

function PrimaryCard({ decision }: { decision: Decision }) {
  return (
    <li className="glass glass-hover rounded-xl p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex gap-3">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-ok" aria-hidden />
          <div className="min-w-0">
            <p className="label mb-1.5 text-ok">Chose</p>
            <p className="text-body font-semibold text-foreground">{decision.decision}</p>
          </div>
        </div>

        {decision.insteadOf && (
          <div className="flex gap-3 border-t border-border pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <X className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <div className="min-w-0">
              <p className="label mb-1.5">Instead of</p>
              <p className="text-body text-muted-foreground">{decision.insteadOf}</p>
            </div>
          </div>
        )}
      </div>

      <p className="mt-5 border-t border-border pt-5 text-body leading-relaxed text-muted-foreground">
        {decision.rationale}
      </p>
    </li>
  )
}

/**
 * The tail: same information at roughly half the height.
 *
 * Deliberately not a <details> disclosure — the rationale is the part worth
 * reading and nobody expands a collapsed section on a portfolio. So it stays
 * visible; only the chrome goes. The glass panel, the two-column split and the
 * status icons drop away, and "instead of" becomes an inline clause.
 */
function TailRow({ decision }: { decision: Decision }) {
  return (
    <li className="border-t border-border py-4">
      <p className="flex flex-wrap items-baseline gap-x-2 text-body text-foreground">
        {decision.decision}
        {decision.insteadOf && (
          <span className="text-small text-muted-foreground">
            <span className="label mr-1.5">not</span>
            {decision.insteadOf}
          </span>
        )}
      </p>
      <p className="mt-1.5 text-small leading-relaxed text-muted-foreground">
        {decision.rationale}
      </p>
    </li>
  )
}

export function DecisionList({ decisions }: { decisions: Decision[] }) {
  const split = decisions.length >= MIN_TO_SPLIT
  const primary = split ? decisions.slice(0, PRIMARY) : decisions
  const tail = split ? decisions.slice(PRIMARY) : []

  return (
    <>
      <ul className="grid gap-4">
        {primary.map((decision) => (
          <PrimaryCard key={decision.decision} decision={decision} />
        ))}
      </ul>

      {tail.length > 0 && (
        <div className="mt-10">
          <h3 className="label mb-1">Also decided</h3>
          <ul>
            {tail.map((decision) => (
              <TailRow key={decision.decision} decision={decision} />
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
