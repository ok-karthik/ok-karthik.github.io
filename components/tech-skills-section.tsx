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
  const dim = size === "sm" ? "h-9 w-9" : "h-11 w-11"
  const iconDim = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  if (Lucide) {
    return (
      <span
        className={`flex ${dim} shrink-0 items-center justify-center rounded-[12px] border border-primary/25 bg-secondary/80 shadow-sm group-hover/item:border-primary/50 group-hover/item:shadow-[0_0_12px_rgba(0,255,231,0.2)] transition-all duration-300`}
      >
        <Lucide className={`${iconDim} text-primary`} aria-hidden />
      </span>
    )
  }

  if (skill.icon) {
    return (
      <span className={`flex ${dim} shrink-0 items-center justify-center rounded-[12px] bg-white/95 p-2 shadow-md border border-white/20 overflow-hidden group-hover/item:scale-105 group-hover/item:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all duration-300`}>
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          width={size === "sm" ? 22 : 28}
          height={size === "sm" ? 22 : 28}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return (
    <span
      className={`flex ${dim} shrink-0 items-center justify-center rounded-[12px] border border-border bg-muted font-mono text-xs text-muted-foreground`}
    >
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

function panelGridBorders(i: number, total: number, mdCols: number, lgCols: number) {
  const isLastRow = (cols: number) => i >= total - (total % cols || cols)
  const isLastCol = (cols: number) => i % cols === cols - 1

  return [
    i === total - 1 ? "" : "border-b border-border/40",
    isLastRow(mdCols) ? "md:border-b-0" : "md:border-b md:border-border/40",
    isLastCol(mdCols) ? "" : "md:border-r md:border-border/40",
    isLastRow(lgCols) ? "lg:border-b-0" : "lg:border-b lg:border-border/40",
    isLastCol(lgCols) ? "" : "lg:border-r lg:border-border/40",
  ].join(" ")
}

export function TechSkillsSection() {
  return (
    <section id="tech-skills" className="py-24 px-6 relative z-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Tech Skills
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <p className="font-mono text-xs text-muted-foreground hidden shrink-0 tabular-nums sm:block">
              {skillGroups.length} core domains
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight heading-gradient text-balance">
            The stack I build platforms with
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Multi-cloud platform, Kubernetes orchestration, SRE reliability, and AI tooling
          </p>
        </header>

        {/* 3x3 Master Deck with Dot-Separated Subtitles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <div
                key={group.title}
                className={`p-6 md:p-7 flex flex-col justify-between hover:bg-card/20 transition-colors ${panelGridBorders(i, skillGroups.length, 2, 3)}`}
              >
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {group.title}
                  </h3>
                  <ul className="space-y-4">
                    {[...group.skills]
                      .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                      .map((skill) => (
                        <li
                          key={skill.name}
                          className={`flex gap-3.5 group/item ${skill.note ? "items-start" : "items-center"}`}
                        >
                          <SkillIcon skill={skill} />
                          <div className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors leading-snug">
                              {skill.name}
                            </span>
                            {skill.note && skill.note.length > 0 && (
                              <span className="mt-1 block font-mono text-micro leading-snug text-muted-foreground">
                                {skill.note.join(" · ")}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
