"use client"

import { motion } from "framer-motion"
import { Cpu, Sparkles, Key, ShieldCheck, ScanSearch } from "lucide-react"
import { skillGroups, type Skill, type Tier } from "@/content/skills"

const lucideMap = { Cpu, Sparkles, Key, ShieldCheck, ScanSearch }

/**
 * One dense panel.
 *
 * Reference material — nobody reads it linearly, they scan it for a keyword —
 * so it behaves like a datasheet: a single surface, tight rows, clear column
 * rules. A pill layout and a pill/panel hybrid were both built and rendered
 * for comparison; the panel won on being simultaneously more compact (1052px
 * vs 1484 and 1238) and easier to scan. Don't re-litigate it from description
 * alone — the variants were judged side by side.
 *
 * Tier still orders each column strongest-first but is no longer rendered:
 * at CV-screen stage a visible "1 of 3" reads as a weakness, and the note line
 * ("CKA + CKAD", "Shared libraries for 150+ teams") is stronger evidence anyway.
 */
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
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted font-mono text-[10px] text-muted-foreground">
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

export function TechSkillsSection() {
  return (
    <section id="tech-skills" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24">
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
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="grid md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((group, i) => (
              <div
                key={group.title}
                className={`border-border p-6 ${
                  // Interior rules only, so the panel reads as one surface
                  // divided rather than as tiles butted together.
                  i % 2 === 0 ? "md:border-r xl:border-r" : "xl:border-r"
                } ${i < skillGroups.length - (skillGroups.length % 2 === 0 ? 2 : 1) ? "border-b md:border-b" : ""} last:xl:border-r-0`}
              >
                <h3 className="label mb-4">{group.title}</h3>
                <ul className="space-y-3">
                  {[...group.skills]
                    .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                    .map((skill) => (
                      <li key={skill.name} className="flex items-center gap-3">
                        <SkillIcon skill={skill} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-small text-foreground">{skill.name}</span>
                          {skill.note && (
                            <span className="block font-mono text-[10px] leading-snug text-muted-foreground">
                              {skill.note}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
