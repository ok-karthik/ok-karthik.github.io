"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projects } from "@/content/projects"
import { skillGroups } from "@/content/skills"
import { ArchitecturePreview } from "@/components/architecture"

/** Tag -> self-hosted logo, resolved from the skills catalogue plus a few aliases. */
const iconFor = (tag: string): string | undefined => {
  const all = skillGroups.flatMap((g) => g.skills)
  const hit = all.find((s) => s.name.toLowerCase() === tag.toLowerCase())
  if (hit?.icon) return hit.icon
  const alias: Record<string, string> = {
    "gpu operator": "/icons/nvidia.svg",
    "cuda": "/icons/nvidia.svg",
    "time slicing": "/icons/nvidia.svg",
    "karpenter": "/icons/aws.svg",
    "observability": "/icons/opentelemetry.svg",
    "lgtm stack": "/icons/grafana.svg",
    "loki": "/loki.svg",
    "tempo": "/tempo.svg",
    "terragrunt": "/terragrunt.svg",
    "aws": "/icons/aws.svg",
    "opa/conftest": "/icons/kubernetes.svg",
    "github actions": "/icons/githubactions.svg",
    "idp": "/icons/kubernetes.svg",
    "gitops": "/icons/argocd.svg",
    "argo cd": "/icons/argocd.svg",
    "kubernetes": "/icons/kubernetes.svg",
    "kubernetes operator": "/icons/kubernetes.svg",
    "python": "/icons/python.svg",
    "kopf": "/icons/python.svg",
    "helm": "/icons/helm.svg",
    "oci registry": "/icons/docker.svg",
    "library chart": "/icons/helm.svg",
    "terraform": "/icons/terraform.svg",
    "prometheus": "/icons/prometheus.svg",
    "grafana": "/icons/grafana.svg",
    "opentelemetry": "/icons/opentelemetry.svg",
  }
  return alias[tag.toLowerCase()]
}

function TagRow({ tags }: { tags: readonly string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        const icon = iconFor(tag)
        return (
          <li
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 py-1 pl-1 pr-2.5 transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            {icon ? (
              <span className="logo-chip h-5 w-5 rounded-full p-[3px]">
                <img src={icon} alt="" width={12} height={12} loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </span>
            ) : (
              <span className="h-5 w-5 rounded-full border border-border bg-muted" />
            )}
            <span className="font-mono text-micro text-muted-foreground">{tag}</span>
          </li>
        )
      })}
    </ul>
  )
}

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
    <section id="projects" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="label rule-label mb-4">Projects</p>
            <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
              What I built, and the decisions behind it
            </h2>
          </div>
          <p className="label hidden shrink-0 tabular sm:block">
            {projects.length} projects
          </p>
        </header>

        <ul className="grid gap-4">
          {featured.map((project, i) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.06 }}
              className="glass glass-hover rounded-xl"
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-4 p-6 sm:flex-row sm:gap-8"
              >
                <div className="shrink-0 sm:w-56">
                  <ArchitecturePreview slug={project.slug} />
                  <p className="label mt-3 tabular">
                    {project.decisions.length} documented decisions
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="flex items-start gap-2 font-display text-h2 font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                    <ArrowUpRight
                      className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </h3>

                  {/* The problem, before any technology is named. */}
                  <p className="mt-3 max-w-2xl text-small leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>

                  <TagRow tags={project.tags} />
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>

        <h3 className="label mb-4 mt-12">More projects</h3>
        <ul className="grid gap-4 sm:grid-cols-2">
          {rest.map((project) => (
            <li key={project.slug} className="glass glass-hover rounded-xl">
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <p className="label shrink-0 tabular sm:w-32">
                  {project.decisions.length} documented decisions
                </p>
                <div className="min-w-0 flex-1">
                  <span className="font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </span>
                  <p className="mt-1.5 text-small leading-relaxed text-muted-foreground">{project.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
