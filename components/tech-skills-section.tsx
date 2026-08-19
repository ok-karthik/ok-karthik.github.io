"use client"

import { useState } from "react"
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
  Siren,
  Layers,
  Database,
  Server,
  Activity,
  GitBranch,
  Cloud,
  MessageSquare,
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
  Siren,
  Layers,
  Database,
  MessageSquare,
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
    categories: ["Software Engineering & Databases", "AI & GPU Infrastructure"],
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
/* OPTION 2: The Interactive Tabbed Command Center (4 Pillars)                */
/* ========================================================================== */

const tabPillars = [
  {
    id: "platform",
    title: "Platform & Cloud",
    icon: Cloud,
    summary: "Multi-region cloud infrastructure, VPC architecture, and Kubernetes orchestration",
    categories: ["Containers & Orchestration", "Cloud Platforms", "Linux & Networking"],
  },
  {
    id: "gitops",
    title: "GitOps & Delivery",
    icon: GitBranch,
    summary: "Declarative infrastructure as code, automated pipelines, and zero-touch deployment",
    categories: ["IaC & GitOps", "Security & Governance"],
  },
  {
    id: "observability",
    title: "Observability & SRE",
    icon: Activity,
    summary: "Distributed tracing, telemetry collection, alerting frameworks, and incident recovery",
    categories: ["Observability & Reliability"],
  },
  {
    id: "engineering",
    title: "AI & Software Engineering",
    icon: Cpu,
    summary: "GPU workload provisioning, custom platform operators, and automation tooling",
    categories: ["Software Engineering & Databases", "AI & GPU Infrastructure"],
  },
]

export function TechSkillsTabbed() {
  const [activeTabId, setActiveTabId] = useState(tabPillars[0].id)
  const currentPillar = tabPillars.find((p) => p.id === activeTabId) || tabPillars[0]

  const pillarSkills = skillGroups
    .filter((g) => currentPillar.categories.includes(g.title))
    .flatMap((g) => g.skills)
    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option 2 (Tabbed Command Center)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Interactive Domain Pillars
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Select a pillar to inspect domain capabilities
        </span>
      </div>

      {/* Tabs Bar */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tabPillars.map((pillar) => {
          const isActive = pillar.id === activeTabId
          const TabIcon = pillar.icon
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setActiveTabId(pillar.id)}
              className={`flex items-center gap-2.5 rounded-xl border p-3.5 text-left transition-colors ${
                isActive
                  ? "border-primary/50 bg-primary/10 text-primary shadow-sm"
                  : "border-border bg-card/60 text-muted-foreground hover:border-border hover:bg-muted"
              }`}
            >
              <TabIcon
                className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                aria-hidden
              />
              <span className="truncate font-display text-small font-semibold">{pillar.title}</span>
            </button>
          )
        })}
      </div>

      {/* Active Tab Panel */}
      <div className="glass rounded-xl p-6 sm:p-7">
        <div className="border-b border-border pb-4">
          <p className="label text-primary">{currentPillar.title} Domain</p>
          <p className="mt-1 text-small text-muted-foreground">{currentPillar.summary}</p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pillarSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col justify-between rounded-lg border border-border bg-muted/40 p-4 transition-colors hover:border-border hover:bg-muted/60"
            >
              <div className="flex items-center gap-3">
                <SkillIcon skill={skill} />
                <span className="min-w-0 flex-1 truncate text-small font-semibold text-foreground">
                  {skill.name}
                </span>
              </div>

              {skill.note && skill.note.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
                  {skill.note.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border bg-card px-2.5 py-0.5 font-mono text-micro text-muted-foreground"
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
    </div>
  )
}

/* ========================================================================== */
/* OPTION 3: Option Pills (Icon Rows with Bordered Evidence Pills)             */
/* ========================================================================== */

export function TechSkillsPills() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option 3 (Current Pills Grid)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            8-Category Matrix with Bordered Evidence Pills
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Classic datasheet grid
        </span>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className={`border-border p-6 ${
                i % 2 === 0 ? "md:border-r xl:border-r" : "xl:border-r"
              } ${
                i < skillGroups.length - (skillGroups.length % 2 === 0 ? 2 : 1)
                  ? "border-b md:border-b"
                  : ""
              } last:xl:border-r-0`}
            >
              <h4 className="label mb-4">{group.title}</h4>
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
                        {skill.note && (
                          <span className="mt-1.5 flex flex-wrap gap-1.5">
                            {skill.note.map((item) => (
                              <span
                                key={item}
                                className="whitespace-nowrap rounded border border-border bg-card px-2 py-0.5 font-mono text-micro text-muted-foreground"
                              >
                                {item}
                              </span>
                            ))}
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
    </div>
  )
}

/* ========================================================================== */
/* Main TechSkillsSection Container (Renders All 3 for Comparison)            */
/* ========================================================================== */

export function TechSkillsSection() {
  return (
    <section id="tech-skills" className="section-tight scroll-mt-24">
      <div className="mx-auto max-w-6xl space-y-20 px-6">
        <header>
          <p className="label rule-label mb-4">Tech Skills — Comparison</p>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
            The stack I build platforms with
          </h2>
          <p className="mt-2 text-body text-muted-foreground">
            Compare all 3 architectural presentation options below on your live screen.
          </p>
        </header>

        {/* Option 1 */}
        <TechSkillsLayered />

        {/* Option 2 */}
        <TechSkillsTabbed />

        {/* Option 3 */}
        <TechSkillsPills />
      </div>
    </section>
  )
}
