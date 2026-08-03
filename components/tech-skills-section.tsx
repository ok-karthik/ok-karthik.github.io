"use client"

import { motion } from "framer-motion"
import { Cpu, Sparkles, Key, ShieldCheck, ScanSearch } from "lucide-react"
import { skillGroups, type Skill, type Tier } from "@/content/skills"

const lucideMap = { Cpu, Sparkles, Key, ShieldCheck, ScanSearch }

/**
 * Tier still orders the list — strongest first inside each group — but it is
 * no longer rendered.
 *
 * The visible three-notch meter was cut deliberately: at CV-screen stage a
 * recruiter skimming "Go — 1 of 3" reads a weakness, not calibration, and in a
 * market where every competing portfolio implies uniform mastery that is a
 * pure own goal. The honest signal survives in `note` — "CKA + CKAD",
 * "Shared libraries for 150+ teams" — which is stronger evidence than a meter
 * and costs nothing to claim.
 */
const TIER_ORDER: Record<Tier, number> = { deep: 0, production: 1, working: 2 }

function SkillIcon({ skill }: { skill: Skill }) {
  const Lucide = skill.lucide ? lucideMap[skill.lucide] : undefined

  if (Lucide) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-primary/10">
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
          width={22}
          height={22}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain"
        />
      </span>
    )
  }

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-mono text-micro text-muted-foreground">
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

export function TechSkillsSection() {
  return (
    <section id="tech-skills" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-12">
          <p className="label mb-3">Tech Skills</p>
          <h2 className="font-display text-h2 font-semibold text-foreground">
            The stack I build platforms with
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Grouped the way a platform is actually assembled — from the cluster up through
            delivery, observability and governance.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.05 }}
              className="glass glass-hover rounded-xl p-5"
            >
              <h3 className="label mb-4 border-b border-border pb-3">{group.title}</h3>
              <ul className="space-y-3">
                {[...group.skills]
                  .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
                  .map((skill) => (
                    <li key={skill.name} className="flex items-center gap-3">
                      <SkillIcon skill={skill} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-body text-foreground">{skill.name}</span>
                        {skill.note && (
                          <span className="block font-mono text-micro text-muted-foreground">
                            {skill.note}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
