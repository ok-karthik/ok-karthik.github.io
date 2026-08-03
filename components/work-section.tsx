"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/content/projects"

/**
 * Selected work.
 *
 * The gutter carries the documented-decision count rather than an index.
 * Sequence numbers would be decoration — these projects aren't ordered — but
 * "how many trade-offs are written down" is the thing that actually separates
 * these pages from a list of repositories, so it earns the position.
 */
export function WorkSection() {
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label mb-3">Selected work</p>
            <h2 className="font-display text-h2 font-semibold text-foreground">
              Systems I built, and why they are shaped that way
            </h2>
          </div>
          <p className="label hidden shrink-0 tabular sm:block">
            {projects.length} projects
          </p>
        </header>

        <ul className="border-t border-border">
          {featured.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.06 }}
              className="border-b border-border"
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-4 py-8 sm:flex-row sm:gap-8"
              >
                <p className="label shrink-0 tabular sm:w-32 sm:pt-1.5">
                  {project.decisions.length} decisions
                </p>

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-start gap-2 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </h3>

                  {/* The problem, before any technology is named. */}
                  <p className="mt-3 max-w-2xl text-body text-muted-foreground">
                    {project.problem}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5">
                    {project.tags.map((tag) => (
                      <li key={tag} className="font-mono text-micro text-muted-foreground">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <h3 className="label mb-1 mt-12">Also built</h3>
        <ul>
          {rest.map((project) => (
            <li key={project.slug} className="border-b border-border">
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="label shrink-0 tabular sm:w-32">
                  {project.decisions.length} decisions
                </p>
                <div className="min-w-0 flex-1">
                  <span className="text-body-lg text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </span>
                  <p className="mt-1 text-small text-muted-foreground">{project.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
