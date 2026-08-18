"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
}

const TIER_ORDER: Record<Tier, number> = { deep: 0, production: 1, working: 2 }

function SkillIcon({ skill }: { skill: Skill }) {
  const Lucide = skill.lucide ? lucideMap[skill.lucide] : undefined

  if (Lucide) {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10">
        <Lucide className="h-[18px] w-[18px] text-primary" aria-hidden />
      </span>
    )
  }

  if (skill.icon) {
    return (
      <span className="logo-chip h-10 w-10 shrink-0">
        <img
          src={skill.icon}
          alt=""
          width={26}
          height={26}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-micro text-muted-foreground">
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

/* ========================================================================== */
/* OPTION A: Uniform Grid + Interactive Capability Spotlight Bar               */
/* ========================================================================== */

export function TechSkillsOptionA() {
  const firstSkillWithNote =
    skillGroups[0]?.skills.find((s) => s.note && s.note.length > 0) || skillGroups[0]?.skills[0]
  const [activeSkill, setActiveSkill] = useState<Skill | undefined>(firstSkillWithNote)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option A (Interactive Spotlight)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Uniform Grid + Active Capability Spotlight Bar
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Hover or tap any skill to inspect scope
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
              <ul className="space-y-2.5">
                {[...group.skills]
                  .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                  .map((skill) => {
                    const isSelected = activeSkill?.name === skill.name
                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveSkill(skill)}
                          onClick={() => setActiveSkill(skill)}
                          className={`flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                            isSelected
                              ? "border border-primary/40 bg-primary/10 shadow-sm"
                              : "border border-transparent hover:border-border hover:bg-muted/50"
                          }`}
                        >
                          <SkillIcon skill={skill} />
                          <span className="min-w-0 flex-1 truncate text-small font-medium text-foreground">
                            {skill.name}
                          </span>
                          {skill.note && skill.note.length > 0 && (
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                isSelected ? "bg-primary" : "bg-muted-foreground/40"
                              }`}
                              aria-hidden
                            />
                          )}
                        </button>
                      </li>
                    )
                  })}
              </ul>
            </div>
          ))}
        </div>

        {/* Spotlight Bar */}
        <div className="border-t border-border bg-muted/40 p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {activeSkill ? (
              <motion.div
                key={activeSkill.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3.5">
                  <SkillIcon skill={activeSkill} />
                  <div>
                    <p className="font-display text-body-lg font-semibold text-foreground">
                      {activeSkill.name}
                    </p>
                    <p className="mt-0.5 font-mono text-micro text-muted-foreground">
                      Production capability & scope
                    </p>
                  </div>
                </div>

                {activeSkill.note && activeSkill.note.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {activeSkill.note.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-border bg-card px-3 py-1 font-mono text-micro text-foreground shadow-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="font-mono text-micro text-muted-foreground">
                    Core production platform tool
                  </span>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* OPTION B: Categorized Stack with Dedicated Domain Pill Cloud               */
/* ========================================================================== */

export function TechSkillsOptionB() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option B (Domain Pill Cloud)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Categorized Stack with Dedicated Domain Pill Cloud
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Tools grouped at top, capabilities grouped at bottom
        </span>
      </div>

      <div className="glass overflow-hidden rounded-2xl">
        <div className="grid md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, i) => {
            const allDomainNotes = Array.from(
              new Set(
                group.skills
                  .filter((s) => s.note && s.note.length > 0)
                  .flatMap((s) => s.note || [])
              )
            )

            return (
              <div
                key={group.title}
                className={`flex flex-col justify-between border-border p-6 ${
                  i % 2 === 0 ? "md:border-r xl:border-r" : "xl:border-r"
                } ${
                  i < skillGroups.length - (skillGroups.length % 2 === 0 ? 2 : 1)
                    ? "border-b md:border-b"
                    : ""
                } last:xl:border-r-0`}
              >
                <div>
                  <h4 className="label mb-4">{group.title}</h4>
                  <ul className="space-y-3">
                    {[...group.skills]
                      .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                      .map((skill) => (
                        <li key={skill.name} className="flex items-center gap-3">
                          <SkillIcon skill={skill} />
                          <span className="min-w-0 flex-1 truncate text-small font-medium text-foreground">
                            {skill.name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                {allDomainNotes.length > 0 && (
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="label mb-2.5 text-primary">Domain Capabilities</p>
                    <div className="flex flex-wrap gap-1.5">
                      {allDomainNotes.map((noteItem) => (
                        <span
                          key={noteItem}
                          className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-micro text-muted-foreground"
                        >
                          {noteItem}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* OPTION C: Current Baseline (Inline Text with Dots)                         */
/* ========================================================================== */

export function TechSkillsOptionC() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
        <div>
          <span className="label text-primary">Option C (Current Baseline)</span>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Inline Wrapped Text with Separator Dots
          </h3>
        </div>
        <span className="font-mono text-micro text-muted-foreground">
          Current implementation for comparison
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
                          <span className="mt-1 flex flex-wrap gap-x-2.5 gap-y-1">
                            {skill.note.map((item, idx) => (
                              <span
                                key={item}
                                className="whitespace-nowrap font-mono text-micro leading-snug text-muted-foreground"
                              >
                                {item}
                                {idx < skill.note!.length - 1 ? " ·" : ""}
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
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        <header>
          <p className="label rule-label mb-4">Tech Skills — Comparison</p>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
            The stack I build platforms with
          </h2>
          <p className="mt-2 text-body text-muted-foreground">
            Compare all 3 presentation options below on your live screen to decide which design you
            prefer.
          </p>
        </header>

        {/* Option A */}
        <TechSkillsOptionA />

        {/* Option B */}
        <TechSkillsOptionB />

        {/* Option C */}
        <TechSkillsOptionC />
      </div>
    </section>
  )
}
