import type { Block } from "@/content/writing"

function PipelineDiagram() {
  return (
    <div className="my-8 overflow-hidden rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        {/* Step 1: Input */}
        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-border bg-muted px-3.5 py-2 font-mono text-small text-foreground">
            change
          </div>
          <span className="font-mono text-muted-foreground">→</span>
          <div className="rounded-lg border border-border bg-muted px-3.5 py-2 font-mono text-small text-foreground">
            plan
          </div>
        </div>

        {/* Fan Out Connector & Gates */}
        <div className="flex items-center gap-3">
          <div className="hidden h-28 w-px bg-primary/40 sm:block" />
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-6 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-1.5 font-mono text-small text-primary">
              <span>TFLint</span>
              <span className="text-micro text-muted-foreground">static syntax</span>
            </div>
            <div className="flex items-center justify-between gap-6 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-1.5 font-mono text-small text-primary">
              <span>Conftest</span>
              <span className="text-micro text-muted-foreground">security policy</span>
            </div>
            <div className="flex items-center justify-between gap-6 rounded-lg border border-primary/40 bg-primary/5 px-3.5 py-1.5 font-mono text-small text-primary">
              <span>Infracost</span>
              <span className="text-micro text-muted-foreground">cost delta</span>
            </div>
          </div>
          <div className="hidden h-28 w-px bg-primary/40 sm:block" />
        </div>

        {/* Step 3: Merge */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-muted-foreground">→</span>
          <div className="rounded-lg border border-primary/60 bg-primary/10 px-4 py-2 font-mono text-small font-semibold text-primary">
            merge
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-border pt-3 text-center font-mono text-micro text-muted-foreground">
        one round trip · every class of failure reported in parallel
      </div>
    </div>
  )
}

/**
 * Renders a post body.
 *
 * Deliberately a small typed block renderer rather than MDX: the posts are
 * structured prose, not documents needing arbitrary components, and this keeps
 * the static export free of an extra toolchain.
 */
export function Prose({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                className="mt-12 font-display text-h3 font-semibold text-foreground first:mt-0"
              >
                {block.text}
              </h2>
            )

          case "p":
            return (
              <p key={i} className="mt-5 text-body-lg leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            )

          case "ul":
            return (
              <ul key={i} className="mt-5 space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-body-lg leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-border-strong" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            )

          case "quote":
            return (
              <blockquote
                key={i}
                className="my-8 border-l-2 border-primary pl-5 font-display text-h3 font-medium text-foreground"
              >
                {block.text}
              </blockquote>
            )

          case "code":
            if (block.lang === "pipeline") {
              return <PipelineDiagram key={i} />
            }
            return (
              <pre
                key={i}
                className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted p-5 font-mono text-small leading-normal text-foreground"
              >
                {block.text}
              </pre>
            )
        }
      })}
    </div>
  )
}
