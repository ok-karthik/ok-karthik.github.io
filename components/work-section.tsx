"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects, projectsDeck } from "@/content/projects"
import { AssemblingDiagram } from "@/components/assembling-diagram"
import { ArchitecturePreview } from "@/components/architecture"
import { iconFor } from "@/content/tag-icons"

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => {
        const icon = iconFor(tag)
        return (
          <li
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 py-1 pl-1.5 pr-3 transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            {icon ? (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 p-[3px] shadow-sm">
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
              <span className="h-2 w-2 rounded-full bg-primary/60" aria-hidden />
            )}
            <span className="font-mono text-xs text-muted-foreground">{tag}</span>
          </li>
        )
      })}
    </ul>
  )
}

const fullWidthDiagramProps: Record<string, { className: string; fadeFrom: string }> = {
  "opentelemetry-platform-on-eks": {
    className: "h-52 [--arch-scale:0.5] sm:h-56 sm:[--arch-scale:0.68] lg:h-64 lg:[--arch-scale:0.75]",
    fadeFrom: "82%",
  },
  "internal-developer-platform": {
    className: "h-44 [--arch-scale:0.55] sm:h-48 sm:[--arch-scale:0.72] lg:h-52 lg:[--arch-scale:0.84]",
    fadeFrom: "88%",
  },
}

export function WorkSection() {
  const featured = projects.filter((p) => p.featured)
  const fullWidth = featured.slice(0, 2)
  const halfTiles = featured.slice(2)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-24 px-6 relative z-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Projects
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <p className="font-mono text-xs text-muted-foreground hidden shrink-0 tabular-nums sm:block">
              {projects.length} projects
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            What I built, and the decisions behind it
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">{projectsDeck}</p>
        </header>

        {/* 2 Full-Width Primary Feature Cards */}
        <div className="space-y-8">
          {fullWidth.map((project, i) => {
            const diagram = fullWidthDiagramProps[project.slug] ?? {
              className: "h-52 [--arch-scale:0.5] sm:h-56 sm:[--arch-scale:0.68] lg:h-64 lg:[--arch-scale:0.75]",
              fadeFrom: "82%",
            }

            return (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl overflow-hidden shadow-2xl hover:border-primary/40 hover:bg-card/40 transition-all duration-300 group"
              >
                <Link href={`/work/${project.slug}`} className="block">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border/60 px-6 py-3 sm:px-8 bg-card/20">
                    <p className="font-mono text-xs font-bold tabular-nums text-primary">
                      Project {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground tabular-nums">
                      {project.decisions.length} documented decisions
                    </p>
                  </div>

                  <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
                    <div className="min-w-0">
                      <h3 className="flex items-start gap-2 font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                        <ArrowUpRight
                          className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden
                        />
                      </h3>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                        {project.problem}
                      </p>
                      <Tags tags={project.tags} />
                    </div>

                    <AssemblingDiagram
                      slug={project.slug}
                      className={diagram.className}
                      fadeFrom={diagram.fadeFrom}
                    />
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* 2 Half-Tile Secondary Feature Cards */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {halfTiles.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl overflow-hidden shadow-xl hover:border-primary/40 hover:bg-card/40 transition-all duration-300 group"
            >
              <Link href={`/work/${project.slug}`} className="block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/60 px-6 py-3 bg-card/20">
                  <p className="font-mono text-xs font-bold tabular-nums text-primary">
                    Project {String(fullWidth.length + i + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground tabular-nums">
                    {project.decisions.length} documented decisions
                  </p>
                </div>
                <div className="p-6 sm:p-7">
                  <ArchitecturePreview
                    slug={project.slug}
                    className="h-32 [--arch-scale:0.46]"
                    fadeFrom="68%"
                  />
                  <h3 className="mt-5 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {project.summary}
                  </p>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* 1 More Projects Row */}
        <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4 mt-12">
          Additional Systems
        </h3>
        <ul className="grid gap-3">
          {rest.map((project, i) => (
            <li 
              key={project.slug} 
              className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-2xl overflow-hidden hover:border-primary/40 hover:bg-card/40 transition-all duration-300 group"
            >
              <Link
                href={`/work/${project.slug}`}
                className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="font-mono text-xs font-bold tabular-nums text-primary shrink-0 sm:w-28">
                  Project {String(featured.length + i + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <span className="font-display text-base font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground shrink-0 tabular-nums">
                      {project.decisions.length} documented decisions
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
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
