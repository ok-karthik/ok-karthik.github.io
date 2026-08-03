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
export function DecisionList({ decisions }: { decisions: Decision[] }) {
  return (
    <ul className="grid gap-4">
      {decisions.map((decision) => (
        <li key={decision.decision} className="glass glass-hover rounded-xl p-6">
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
      ))}
    </ul>
  )
}
