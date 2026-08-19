"use client"

import { motion } from "framer-motion"
import {
  Cpu,
  Sparkles,
  Key,
  ShieldCheck,
  ScanSearch,
  Terminal,
  Network,
  Waypoints,
  Layers,
  Server,
  Activity,
  Cloud,
} from "lucide-react"
import { skillGroups, type Skill, type Tier } from "@/content/skills"

const lucideMap = {
  Cpu,
  Sparkles,
  Key,
  ShieldCheck,
  ScanSearch,
  Terminal,
  Network,
  Waypoints,
  Layers,
}

const TIER_ORDER: Record<Tier, number> = { deep: 0, production: 1, working: 2 }

function SkillIcon({ skill, size = "md" }: { skill: Skill; size?: "sm" | "md" }) {
  const Lucide = skill.lucide ? lucideMap[skill.lucide] : undefined
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10"
  const iconDim = size === "sm" ? "h-4 w-4" : "h-[18px] w-[18px]"

  if (Lucide) {
    return (
      <span
        className={`flex ${dim} shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10`}
      >
        <Lucide className={`${iconDim} text-primary`} aria-hidden />
      </span>
    )
  }

  if (skill.icon) {
    return (
      <span className={`logo-chip ${dim} shrink-0`}>
        <img
          src={skill.icon}
          alt=""
          width={size === "sm" ? 20 : 26}
          height={size === "sm" ? 20 : 26}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return (
    <span
      className={`flex ${dim} shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-micro text-muted-foreground`}
    >
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

/* ========================================================================== */
/* OPTION 1: 3D Layered Platform Architecture Stack                           */
/* ========================================================================== */

const architectureLayers = [
  {
    layerNumber: "Layer 4",
    title: "Workloads, Code & Agentic Workflows",
    description: "Application runtime, custom operators, automation, and AI tooling",
    flowLabel: "↑ telemetry emitted to observability layer ↑",
    icon: Terminal,
    categories: ["Software Engineering", "AI & GPU Infrastructure"],
  },
  {
    layerNumber: "Layer 3",
    title: "Observability & SRE Reliability",
    description: "Distributed tracing, telemetry collection, metrics, and incident recovery",
    flowLabel: "↑ manages workloads on platform control plane ↑",
    icon: Activity,
    categories: ["Observability & Reliability"],
  },
  {
    layerNumber: "Layer 2",
    title: "Platform, Orchestration & Security",
    description: "Kubernetes control plane, GitOps reconciliation, and admission guardrails",
    flowLabel: "↑ provisioned on cloud foundation & compute ↑",
    icon: Server,
    categories: ["Containers & Orchestration", "Security & Governance"],
  },
  {
    layerNumber: "Layer 1",
    title: "Cloud & Core Infrastructure",
    description: "Multi-cloud foundation, declarative IaC modules, VPC networking, and hardware compute",
    flowLabel: undefined,
    icon: Cloud,
    categories: ["Cloud Platforms", "IaC & GitOps", "Linux & Networking"],
  },
]

export function TechSkillsLayered() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option 1 (3D Layered Architecture Stack ⭐)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Layered Platform Architecture Stack
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Top-to-bottom production system topology
        </span>
      </div>

      <div className="space-y-3">
        {architectureLayers.map((layer) => {
          const layerSkills = skillGroups
            .filter((g) => layer.categories.includes(g.title))
            .flatMap((g) => g.skills)
            .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])

          const IconComponent = layer.icon

          return (
            <div key={layer.layerNumber} className="space-y-3">
              {/* Dimensional Glass Layer Slab */}
              <div className="glass relative overflow-hidden rounded-2xl border border-border p-5 shadow-lg sm:p-6">
                {/* Header Strip with Sheen */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/40 bg-primary/10">
                      <IconComponent className="h-4 w-4 text-primary" aria-hidden />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-micro font-bold uppercase tracking-wider text-primary">
                          {layer.layerNumber}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <h4 className="font-display text-body-lg font-semibold text-foreground">
                          {layer.title}
                        </h4>
                      </div>
                      <p className="font-mono text-micro text-muted-foreground">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-micro text-muted-foreground">
                    {layerSkills.length} tools
                  </span>
                </div>

                {/* Horizontal Tool Cards Grid */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {layerSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex flex-col justify-between rounded-xl border border-border/70 bg-card/50 p-3 transition-colors hover:border-border hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2.5">
                        <SkillIcon skill={skill} size="sm" />
                        <span className="min-w-0 flex-1 truncate text-small font-medium text-foreground">
                          {skill.name}
                        </span>
                      </div>

                      {skill.note && skill.note.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1 border-t border-border/40 pt-2">
                          {skill.note.map((item) => (
                            <span
                              key={item}
                              className="rounded border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-micro text-muted-foreground"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Connector between layers */}
              {layer.flowLabel && (
                <div className="flex items-center justify-center gap-2 py-1 select-none font-mono text-micro text-muted-foreground/60">
                  <span className="h-3 w-px bg-border" />
                  <span>{layer.flowLabel}</span>
                  <span className="h-3 w-px bg-border" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ========================================================================== */
/* OPTION 3: Option Pills (Icon Rows with Bordered Evidence Pills)             */
/* ========================================================================== */

/* Divider borders for a single-panel grid whose column count changes per
   breakpoint (1 → 2 → 4). Only the last row/column of each layout should
   skip its divider, and "last row" and "last column" both depend on which
   breakpoint is active — a plain `i % cols` check gets it wrong the moment
   more than one breakpoint is in play. */
function panelGridBorders(i: number, total: number, mdCols: number, lgCols: number) {
  const isLastRow = (cols: number) => i >= total - (total % cols || cols)
  const isLastCol = (cols: number) => i % cols === cols - 1

  return [
    i === total - 1 ? "" : "border-b",
    isLastRow(mdCols) ? "md:border-b-0" : "md:border-b",
    isLastCol(mdCols) ? "" : "md:border-r",
    isLastRow(lgCols) ? "lg:border-b-0" : "lg:border-b",
    isLastCol(lgCols) ? "lg:border-r-0" : "lg:border-r",
  ].join(" ")
}

export function TechSkillsPills() {
  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="grid md:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group, i) => (
          <div
            key={group.title}
            className={`border-border p-6 ${panelGridBorders(i, skillGroups.length, 2, 4)}`}
          >
            <h3 className="label mb-4">{group.title}</h3>
            <ul className="space-y-5">
              {[...group.skills]
                .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                .map((skill) => (
                  <li
                    key={skill.name}
                    className={`flex gap-3 ${skill.note ? "items-start" : "items-center"}`}
                  >
                    <SkillIcon skill={skill} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-small leading-snug text-foreground">
                        {skill.name}
                      </span>
                      {skill.note && skill.note.length > 0 && (
                        <span className="mt-1 block font-mono text-micro leading-snug text-muted-foreground">
                          {skill.note.join(" · ")}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ========================================================================== */
/* OPTION 5: Layered Shelf Stack (depth via shape/shadow, fully legible)      */
/* ========================================================================== */

export function TechSkillsShelfStack() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option 5 (Layered Shelf Stack)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Plated Layers, Full-Size &amp; Readable
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Depth from silhouette and shadow, not rotation
        </span>
      </div>

      <div className="space-y-10 pt-4">
        {architectureLayers.map((layer) => {
          const layerSkills = skillGroups
            .filter((g) => layer.categories.includes(g.title))
            .flatMap((g) => g.skills)
            .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])

          return (
            <div key={layer.layerNumber} className="relative">
              <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-card-solid px-4 py-1.5 font-mono text-micro font-bold uppercase tracking-wider text-foreground shadow-sm">
                {layer.layerNumber} · {layer.title}
              </span>

              <div className="shelf-plate rounded-2xl px-6 pb-14 pt-9 sm:px-10 sm:pb-16 lg:px-14">
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {layerSkills.map((skill) => (
                    <div key={skill.name} className="flex flex-col items-center gap-2 text-center">
                      <SkillIcon skill={skill} />
                      <span className="text-small font-semibold uppercase tracking-wide text-foreground">
                        {skill.name}
                      </span>
                      {skill.note && skill.note.length > 0 && (
                        <span className="font-mono text-micro leading-snug text-muted-foreground">
                          {skill.note.join(" · ")}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ========================================================================== */
/* Main TechSkillsSection Container                                           */
/* ========================================================================== */

export function TechSkillsSection() {
  return (
    <section id="tech-skills" className="section-tight scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10">
          <p className="label rule-label mb-4">Tech Skills</p>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
            The stack I build platforms with
          </h2>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <TechSkillsPills />
        </motion.div>

        {/* TechSkillsLayered (Option 1) and TechSkillsShelfStack (Option 5) are
            kept below but intentionally not rendered — revisiting them later. */}
      </div>
    </section>
  )
}
