"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/content/projects"
import { iconFor } from "@/content/tag-icons"
import { ArchitecturePreview } from "@/components/architecture"

/**
 * Elevated cards on a two-column grid.
 *
 * No glass anywhere in this section — every card is an opaque plate lifted off
 * the page by shadow, which is the same physics as the hero deck. The lead
 * project spans both columns so the grid has a top edge to hang from rather
 * than reading as a uniform tile wall.
 *
 * Hover raises the plate. On Aurora the equivalent gesture lights the surface,
 * because glass responds to light and a solid responds to being moved.
 */
function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      {tags.map((tag) => {
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
              <span className="h-5 w-5 rounded-md border border-border bg-muted" aria-hidden />
            )}
            <span className="font-mono text-micro text-muted-foreground">{tag}</span>
          </li>
        )
      })}
    </ul>
  )
}

const plate =
  "rounded-xl border border-border bg-card-solid shadow-elevation transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-glow"

export function SpatialWork() {
  const featured = projects.filter((p) => p.featured)
  const [lead, ...others] = featured
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-10">
          <p className="label mb-3">Projects</p>
          <h2 className="max-w-2xl font-display text-display font-extrabold tracking-[-0.028em] text-foreground text-balance">
            What I built, and the decisions behind it
          </h2>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {lead ? (
            <motion.article
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45 }}
              className={`${plate} lg:col-span-2`}
            >
              <Link
                href={`/work/${lead.slug}`}
                className="group grid gap-7 p-7 sm:p-9 lg:grid-cols-[1.1fr_1fr] lg:items-center"
              >
                <div className="min-w-0">
                  <p className="label tabular">
                    Lead project · {lead.decisions.length} documented decisions
                  </p>
                  <h3 className="mt-3 flex items-start gap-2 text-h2 font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
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
                <ArchitecturePreview
                  slug={lead.slug}
                  className="h-52 [--arch-scale:0.5] sm:h-60 sm:[--arch-scale:0.66]"
                  fadeFrom="76%"
                />
              </Link>
            </motion.article>
          ) : null}

          {others.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
              className={plate}
            >
              <Link href={`/work/${project.slug}`} className="group block p-7">
                <ArchitecturePreview
                  slug={project.slug}
                  className="h-32 [--arch-scale:0.44]"
                  fadeFrom="66%"
                />
                <p className="label mt-5 tabular">
                  {project.decisions.length} documented decisions
                </p>
                <h3 className="mt-2 text-h3 font-bold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-muted-foreground text-pretty">
                  {project.summary}
                </p>
              </Link>
            </motion.article>
          ))}

          {rest.map((project, i) => (
            <motion.article
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.42, delay: i * 0.06 }}
              className={plate}
            >
              <Link href={`/work/${project.slug}`} className="group block p-7">
                <p className="label tabular">
                  {project.decisions.length} documented decisions
                </p>
                <h3 className="mt-2 text-h3 font-bold text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-2 text-small leading-relaxed text-muted-foreground text-pretty">
                  {project.summary}
                </p>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
