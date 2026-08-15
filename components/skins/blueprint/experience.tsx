"use client"

import { motion } from "framer-motion"
import { experiences } from "@/content/experience"
import { profile } from "@/content/profile"
import { DimRule } from "./parts"

/**
 * A revision history.
 *
 * Every drawing carries one: what changed, when, and who signed it off. It is
 * the closest real drafting convention to a career, and unlike a table of
 * dates it keeps the prose readable — the period sits in the margin as a
 * dimension, the role reads as a heading, the bullets stay full sentences.
 *
 * Karthik rejected the first light direction for looking like a ledger, so
 * this is explicitly *not* a table: no cell borders, no zebra rows, one
 * hairline per entry and a wide left margin doing the alignment.
 */
export function BlueprintExperience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <DimRule
          label={`${profile.yearsInTech} years building infrastructure and the teams that run it`}
          sheet="Sheet 04"
        />

        <ol className="mt-10">
          {experiences.map((exp, i) => {
            const current = exp.period.toLowerCase().includes("present")
            return (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.42, delay: Math.min(i, 3) * 0.06 }}
                className="grid gap-x-10 gap-y-3 border-t border-border-strong py-9 last:border-b md:grid-cols-[13rem_1fr]"
              >
                <div className="md:sticky md:top-24 md:self-start">
                  <p className="label tabular">Rev {experiences.length - i}</p>
                  <p className="mt-1 font-mono text-small tabular text-foreground">{exp.period}</p>
                  {current ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.18em] text-primary">
                      <span className="breathe h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                      Issued for construction
                    </p>
                  ) : null}
                </div>

                <div className="min-w-0">
                  <h3 className="font-display text-h2 font-semibold uppercase tracking-wide text-foreground">
                    {exp.title}
                  </h3>
                  <p className="mt-1 font-display text-h3 font-semibold uppercase tracking-wide text-primary">
                    {exp.company}
                  </p>
                  <p className="mt-2 text-small text-muted-foreground text-pretty">{exp.scope}</p>

                  <ul className="mt-5 max-w-3xl space-y-2.5">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-small leading-relaxed text-foreground/80"
                      >
                        <span
                          className="mt-[0.72em] h-px w-3 shrink-0 bg-primary/60"
                          aria-hidden
                        />
                        <span className="text-pretty">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 font-mono text-micro uppercase tracking-[0.14em] text-muted-foreground">
                    {exp.tags.join("  /  ")}
                  </p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
