"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/content/projects"
import { iconFor } from "@/content/tag-icons"
import { ArchitecturePreview } from "@/components/architecture"
import { AssemblingDiagram } from "@/components/skins/assembling-diagram"

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        const icon = iconFor(tag)
        return (
          <li
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 py-1 pl-1 pr-2.5"
          >
            {icon ? (
              <span className="logo-chip h-5 w-5 rounded-full p-[3px]">
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
              <span className="h-5 w-5 rounded-full border border-border bg-muted" aria-hidden />
            )}
            <span className="font-mono text-micro text-muted-foreground">{tag}</span>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Selected work, weighted.
 *
 * The lead project gets a diagram large enough to actually read — the whole
 * argument of this section is "here is the architecture and here is why", and
 * a 4px-tall mono label makes that argument invisible. It draws itself on
 * entry (`AssemblingDiagram`), which is the one place on the page where motion
 * carries information rather than decorating a fade.
 *
 * The two remaining featured projects sit beside each other at thumbnail
 * scale, and the rest are rows. Three sizes, in demand order — see the
 * ordering note in `content/projects.ts`.
 */
export function AuroraWork() {
  const featured = projects.filter((p) => p.featured)
  const [lead, ...others] = featured
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="label rule-label mb-4">Projects</p>
            <h2 className="font-display text-display font-semibold tracking-tight text-foreground text-balance">
              What I built, and the decisions behind it
            </h2>
          </div>
          <p className="label hidden shrink-0 tabular sm:block">{projects.length} projects</p>
        </header>

        {lead ? (
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="glass sheen glass-hover overflow-hidden rounded-2xl"
          >
            <Link href={`/work/${lead.slug}`} className="group block">
              <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.15fr] lg:items-center">
                <div className="min-w-0">
                  <p className="label tabular">
                    Lead project · {lead.decisions.length} documented decisions
                  </p>
                  <h3 className="mt-3 flex items-start gap-2 font-display text-h2 font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {lead.title}
                    <ArrowUpRight
                      className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-3 max-w-xl text-body leading-relaxed text-muted-foreground text-pretty">
                    {lead.problem}
                  </p>
                  <Tags tags={lead.tags} />
                </div>

                <AssemblingDiagram
                  slug={lead.slug}
                  className="h-56 [--arch-scale:0.5] sm:h-64 sm:[--arch-scale:0.68] lg:h-72 lg:[--arch-scale:0.74]"
                  fadeFrom="78%"
                />
              </div>
            </Link>
          </motion.article>
        ) : null}

        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {others.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass glass-hover rounded-xl"
            >
              <Link href={`/work/${project.slug}`} className="group block p-6">
                <ArchitecturePreview
                  slug={project.slug}
                  className="h-28 [--arch-scale:0.42]"
                  fadeFrom="62%"
                />
                <p className="label mt-4 tabular">
                  {project.decisions.length} documented decisions
                </p>
                <h3 className="mt-2 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-muted-foreground text-pretty">
                  {project.summary}
                </p>
              </Link>
            </motion.li>
          ))}
        </ul>

        <h3 className="label mb-4 mt-12">More projects</h3>
        <ul className="grid gap-3">
          {rest.map((project) => (
            <li key={project.slug} className="glass glass-hover rounded-xl">
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="label shrink-0 tabular">
                      {project.decisions.length} documented decisions
                    </span>
                  </div>
                  <p className="mt-1.5 text-small leading-relaxed text-muted-foreground text-pretty">
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
