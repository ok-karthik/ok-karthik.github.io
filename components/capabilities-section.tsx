"use client"

import { motion } from "framer-motion"
import { skillGroups, tiers, type Tier } from "@/content/skills"

/** Filled notches per tier. Achromatic on purpose — see CapabilityMeter. */
const NOTCHES: Record<Tier, number> = {
  working: 1,
  production: 2,
  deep: 3,
}

/**
 * A calibrated reading, not a rating.
 *
 * Deliberately achromatic: mapping tiers onto the status palette would imply
 * "working knowledge" is a fault state, which is both wrong and self-defeating.
 * Filled notches use foreground, empty use border — the scale reads as a
 * measurement against a known range, the way an instrument would show it.
 */
function CapabilityMeter({ tier }: { tier: Tier }) {
  const filled = NOTCHES[tier]
  return (
    <span
      className="inline-flex items-center gap-[3px] shrink-0"
      role="img"
      aria-label={`${tiers[tier].label} — ${filled} of 3`}
    >
      {[1, 2, 3].map((notch) => (
        <span
          key={notch}
          className={`block h-[10px] w-[3px] rounded-[1px] ${
            notch <= filled ? "bg-foreground" : "bg-border"
          }`}
        />
      ))}
    </span>
  )
}

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-12">
          <p className="label mb-3">Capabilities</p>
          <h2 className="font-display text-h2 font-semibold text-foreground">
            What I know, and how well
          </h2>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">
            Calibrated rather than listed. A tool I&apos;ve read about and a tool I&apos;ve
            operated at 3am are not the same claim, and a flat logo grid can&apos;t tell
            you which is which.
          </p>
        </header>

        {/* Legend — defines the scale before any reading is shown. */}
        <dl className="glass mb-12 grid gap-x-8 gap-y-4 rounded-xl p-5 sm:grid-cols-3">
          {(Object.keys(tiers) as Tier[])
            .slice()
            .reverse()
            .map((tier) => (
              <div key={tier} className="flex gap-3">
                <span className="mt-[3px]">
                  <CapabilityMeter tier={tier} />
                </span>
                <div>
                  <dt className="text-small font-semibold text-foreground">
                    {tiers[tier].label}
                  </dt>
                  <dd className="mt-1 text-small text-muted-foreground">
                    {tiers[tier].blurb}
                  </dd>
                </div>
              </div>
            ))}
        </dl>

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
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3">
                    {skill.icon ? (
                      <span className="logo-chip h-8 w-8 shrink-0">
                        <img
                          src={skill.icon}
                          alt=""
                          width={20}
                          height={20}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </span>
                    ) : (
                      <span className="h-8 w-8 shrink-0 rounded-sm border border-border bg-muted" />
                    )}

                    <span className="min-w-0 flex-1">
                      <span className="block text-body text-foreground">{skill.name}</span>
                      {skill.note && (
                        <span className="block font-mono text-micro text-muted-foreground">
                          {skill.note}
                        </span>
                      )}
                    </span>

                    <span className="shrink-0">
                      <CapabilityMeter tier={skill.tier} />
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
