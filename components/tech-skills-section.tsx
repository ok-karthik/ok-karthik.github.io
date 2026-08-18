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

export function TechSkillsSection() {
  return (
    <section id="tech-skills" className="section-tight scroll-mt-24">
      <div className="mx-auto max-w-6xl space-y-8 px-6">
        <header>
          <p className="label rule-label mb-4">Tech Skills</p>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground">
            The stack I build platforms with
          </h2>
        </header>

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
    </section>
  )
}
