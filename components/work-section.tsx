"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects, projectsDeck } from "@/content/projects"
import { iconFor } from "@/content/tag-icons"
import { ArchitecturePreview } from "@/components/architecture"
import { AssemblingDiagram } from "@/components/assembling-diagram"

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
 * The top two projects get full-width cards with diagrams that draw themselves
 * on entry (`AssemblingDiagram`), so the two primary architecture proofs are
 * legible at scale.
 *
 * The remaining two featured projects sit beside each other in a 2-column grid,
 * and the fifth is a compact row.
 */
export function WorkSection() {
  const featured = projects.filter((p) => p.featured)
  const fullWidth = featured.slice(0, 2)
  const halfTiles = featured.slice(2)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="section-loud scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="label rule-label flex-1">Projects</p>
            <p className="label hidden shrink-0 tabular sm:block">{projects.length} projects</p>
          </div>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground text-balance">
            What I built, and the decisions behind it
          </h2>
          <p className="mt-2 text-body text-muted-foreground">{projectsDeck}</p>
        </header>

        {/* 2 Full-Width Primary Project Cards */}
        <div className="space-y-6">
          {fullWidth.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass sheen glass-hover overflow-hidden rounded-2xl"
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/80 px-7 py-3 sm:px-9">
                  <p className="label font-mono tabular text-primary">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="label tabular">
                    {project.decisions.length} documented decisions
                  </p>
                </div>

                <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.15fr] lg:items-center">
                  <div className="min-w-0">
                    <h3 className="flex items-start gap-2 font-display text-h2 font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                      <ArrowUpRight
                        className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </h3>
                    <p className="mt-3 max-w-xl text-body leading-relaxed text-muted-foreground text-pretty">
                      {project.problem}
                    </p>
                    <Tags tags={project.tags} />
                  </div>

                  <AssemblingDiagram
                    slug={project.slug}
                    className="h-56 [--arch-scale:0.5] sm:h-64 sm:[--arch-scale:0.68] lg:h-72 lg:[--arch-scale:0.74]"
                    fadeFrom="78%"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* 2 Half-Tile Secondary Project Cards */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {halfTiles.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass glass-hover overflow-hidden rounded-xl"
            >
              <Link href={`/work/${project.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/80 px-6 py-2.5">
                  <p className="label font-mono tabular">
                    Project {String(fullWidth.length + i + 1).padStart(2, "0")}
                  </p>
                  <p className="label tabular">
                    {project.decisions.length} documented decisions
                  </p>
                </div>
                <div className="p-6">
                  <ArchitecturePreview
                    slug={project.slug}
                    className="h-28 [--arch-scale:0.42]"
                    fadeFrom="62%"
                  />
                  <h3 className="mt-4 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-muted-foreground text-pretty">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* 1 More Projects Row */}
        <h3 className="label mb-4 mt-12">More projects</h3>
        <ul className="grid gap-3">
          {rest.map((project, i) => (
            <li key={project.slug} className="glass glass-hover rounded-xl">
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="label shrink-0 font-mono tabular sm:w-28">
                  Project {String(featured.length + i + 1).padStart(2, "0")}
                </p>
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
