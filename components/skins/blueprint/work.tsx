"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/content/projects"
import { iconFor } from "@/content/tag-icons"
import { ArchitecturePreview } from "@/components/architecture"
import { SheetHead } from "./parts"

/**
 * Each project is a sheet.
 *
 * The diagram gets a ruled frame and a caption, the text gets the facing
 * column, and every card's header strip carries the same two fields — the
 * project's number and how many decisions are written down. Consistency is
 * the point: you learn the layout once and read the fifth card as fast as the
 * first.
 *
 * The numbers are real. Projects are ordered by market demand (see the note in
 * `content/projects.ts`), so 01 is telling a reader what to look at first
 * rather than decorating the margin.
 */
export function BlueprintWork() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SheetHead index="03" eyebrow="Projects" title="What I built, and the decisions behind it">
          Every project below documents what was chosen and what it was chosen over. Describing a
          stack is table stakes; defending a trade-off is not.
        </SheetHead>

        <ul className="space-y-5">
          {featured.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.05 }}
              className="border border-border-strong bg-card"
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border-strong px-6 py-3">
                  <p className="label tabular">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="label tabular">
                    {project.decisions.length} documented decisions
                  </p>
                </div>

                <div className="grid gap-7 p-6 sm:p-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                  <div className="min-w-0">
                    <h3 className="flex items-start gap-2 font-display text-h2 font-semibold uppercase tracking-wide text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                      <ArrowUpRight
                        className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </h3>
                    <p className="mt-3 max-w-xl text-body leading-relaxed text-muted-foreground text-pretty">
                      {project.problem}
                    </p>
                    <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                      {project.tags.map((tag) => {
                        const icon = iconFor(tag)
                        return (
                          <li key={tag} className="flex items-center gap-1.5">
                            {icon ? (
                              <span className="logo-chip h-5 w-5 p-[3px]">
                                <img
                                  src={icon}
                                  alt=""
                                  width={12}
                                  height={12}
                                  loading="lazy"
                                  decoding="async"
                                  className="h-full w-full object-contain"
                                />
                              </span>
                            ) : (
                              <span
                                className="h-5 w-5 border border-border bg-muted"
                                aria-hidden
                              />
                            )}
                            <span className="font-mono text-micro uppercase tracking-wider text-muted-foreground">
                              {tag}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  {/* The child selector, not `rounded-none` on the preview: a
                      bare utility ties with the component's own `rounded-lg`
                      and which one wins is down to stylesheet order. Nothing
                      on a drawing has a radius, so this must not be a
                      coin toss. */}
                  <figure className="min-w-0 [&>div]:rounded-none">
                    <ArchitecturePreview
                      slug={project.slug}
                      className="h-44 border-border-strong [--arch-scale:0.48] sm:h-52 sm:[--arch-scale:0.62]"
                      fadeFrom="82%"
                    />
                    <figcaption className="label mt-2">
                      Architecture — {project.title}
                    </figcaption>
                  </figure>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <h3 className="label mb-3 mt-12">More projects</h3>
        <ul className="border-t border-border-strong">
          {rest.map((project, i) => (
            <li key={project.slug} className="border-b border-border-strong">
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="label shrink-0 tabular sm:w-28">
                  Project {String(featured.length + i + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-display text-h3 font-semibold uppercase tracking-wide text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="label shrink-0 tabular">
                      {project.decisions.length} documented decisions
                    </span>
                  </div>
                  <p className="mt-1.5 max-w-3xl text-small leading-relaxed text-muted-foreground text-pretty">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
