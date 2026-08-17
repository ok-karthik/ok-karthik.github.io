import type { Block } from "@/content/writing"

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
