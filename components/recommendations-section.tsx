import { ArrowUpRight, Quote } from "lucide-react"
import { profile, recommendations } from "@/content/profile"

/**
 * Three real LinkedIn recommendations, quoted verbatim.
 *
 * Pull-quotes, not cards — the shape signals "someone else said this" rather
 * than another fact panel. Links to the live recommendations page so none of
 * it has to be taken on trust.
 */
export function RecommendationsSection() {
  return (
    <section id="recommendations" className="section-tight scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label rule-label mb-4">Recommendations</p>
            <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
              What colleagues say
            </h2>
          </div>
          <a
            href={`${profile.social.linkedin}/details/recommendations/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-1.5 font-mono text-micro text-muted-foreground transition-colors hover:text-primary"
          >
            View on LinkedIn
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <figure key={rec.name} className="flex flex-col">
              <Quote className="h-6 w-6 shrink-0 text-primary/50" aria-hidden />
              <blockquote className="mt-3 flex-1 text-body leading-relaxed text-foreground">
                &ldquo;{rec.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="font-mono text-small font-semibold text-foreground">{rec.name}</p>
                <p className="mt-0.5 text-micro text-muted-foreground">{rec.title}</p>
                <p className="mt-1.5 font-mono text-micro text-muted-foreground">
                  {rec.relationship}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
