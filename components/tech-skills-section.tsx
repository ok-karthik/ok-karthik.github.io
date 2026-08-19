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
import { skillGroups, type Skill } from "@/content/skills"

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

function SkillIcon({ skill }: { skill: Skill }) {
  const Lucide = skill.lucide ? lucideMap[skill.lucide] : undefined

  if (Lucide) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10">
        <Lucide className="h-4 w-4 text-primary" aria-hidden />
      </span>
    )
  }

  if (skill.icon) {
    return (
      <span className="logo-chip h-9 w-9 shrink-0">
        <img
          src={skill.icon}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-micro text-muted-foreground">
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

/* ========================================================================== */
/* Clean Capability Spotlight Tech Skills Section                             */
/* ========================================================================== */

export function TechSkillsSection() {
  const defaultSkill =
    skillGroups[0]?.skills.find((s) => s.note && s.note.length > 0) || skillGroups[0]?.skills[0]
  const [activeSkill, setActiveSkill] = useState<Skill | undefined>(defaultSkill)

  return (
    <section id="tech-skills" className="section-tight scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10">
          <p className="label rule-label mb-4">Tech Skills</p>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
            The stack I build platforms with
          </h2>
        </header>

        <div className="glass overflow-hidden rounded-2xl border border-border shadow-xl">
          {/* Main 4-Column Datasheet Grid */}
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
                <h3 className="label mb-4">{group.title}</h3>
                <ul className="space-y-2">
                  {group.skills.map((skill) => {
                    const isSelected = activeSkill?.name === skill.name
                    const hasNote = skill.note && skill.note.length > 0

                    return (
                      <li key={skill.name}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveSkill(skill)}
                          onClick={() => setActiveSkill(skill)}
                          className={`group flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors ${
                            isSelected
                              ? "border border-primary/50 bg-primary/10 shadow-sm"
                              : "border border-transparent hover:border-border hover:bg-muted/50"
                          }`}
                        >
                          <SkillIcon skill={skill} />
                          <span className="min-w-0 flex-1 text-small font-medium text-foreground transition-colors group-hover:text-foreground">
                            {skill.name}
                          </span>
                          {hasNote && (
                            <span
                              className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                                isSelected ? "bg-primary" : "bg-muted-foreground/30"
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

          {/* Interactive Capability Spotlight Footer Bar */}
          <div className="border-t border-border bg-card/80 p-5 backdrop-blur-md sm:p-6">
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
                      <p className="font-mono text-micro text-muted-foreground">
                        Production platform scope
                      </p>
                    </div>
                  </div>

                  {activeSkill.note && activeSkill.note.length > 0 ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {activeSkill.note.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-border bg-muted px-3 py-1 font-mono text-micro text-foreground shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="font-mono text-micro text-muted-foreground">
                      Core platform production tool
                    </span>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
