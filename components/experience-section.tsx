"use client"

import { motion } from "framer-motion"
import { experiences, experienceDeck } from "@/content/experience"
import { profile } from "@/content/profile"

/**
 * The timeline, on glass.
 *
 * Experience is the one section that genuinely *is* a sequence, so it keeps
 * the rail. What changes for Aurora is that each entry is a panel rather than
 * loose text: over a live backdrop, unbacked body copy loses contrast wherever
 * a bloom drifts under it. The rail runs outside the panels so the sequence is
 * still legible as a thread.
 *
 * The current role gets a filled marker. Everything else is hollow — that is
 * the only piece of state a reader scanning dates actually wants.
 *
 * Two columns from `lg` (2026-10-05): when / what / where on the left, scope
 * and bullets on the right. Single-column cards capped the bullets at
 * max-w-3xl inside a full-width panel, which left the right third of every
 * card empty and spent ~110px per role stacking the header above the text.
 * The two oldest roles also drop a step in padding and title size — the same
 * weighting Projects uses — without hiding anything.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="section-base scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12">
          <p className="label rule-label mb-4">Experience</p>
          <h2 className="max-w-2xl font-display text-display font-semibold tracking-tight text-foreground text-balance">
            {profile.yearsInTech} years building infrastructure and the teams that run it
          </h2>
          <p className="mt-2 max-w-2xl text-body text-muted-foreground">{experienceDeck}</p>
        </header>

        <ol className="relative md:pl-8">
          <span
            aria-hidden
            className="absolute left-0 top-3 bottom-3 hidden w-px bg-rail md:block"
          />

          {experiences.map((exp, i) => {
            const current = exp.period.toLowerCase().includes("present")
            // The two most recent roles carry the platform/SRE case; the
            // older two are context. They keep every bullet, just less weight.
            const recent = i < 2
            return (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.07 }}
                className="group relative pb-4 last:pb-0"
              >
                <span
                  aria-hidden
                  className={`absolute -left-8 top-8 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full border md:block ${
                    current
                      ? "border-primary bg-primary shadow-glow"
                      : "border-border-strong bg-background"
                  }`}
                />

                <div
                  className={`glass grid gap-x-10 gap-y-4 rounded-xl lg:grid-cols-[17rem_1fr] ${
                    recent ? "p-6 sm:p-8" : "px-6 py-5 sm:px-8 sm:py-6"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <p className="label tabular">{exp.period}</p>
                      {current ? <p className="label text-primary">Current</p> : null}
                    </div>
                    <h3
                      className={`mt-2 font-display font-semibold text-foreground text-balance ${
                        recent ? "text-h3" : "text-body-lg"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-body font-medium text-primary">{exp.company}</p>
                  </div>

                  <div className="min-w-0">
                    <p className="text-small text-foreground/85 text-pretty">{exp.scope}</p>

                    <ul className="mt-4 space-y-2.5">
                      {exp.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-small leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-[0.75em] h-px w-3 shrink-0 bg-border-strong" aria-hidden />
                          <span className="text-pretty">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* One nowrap unit per tag with its " ·" glued on, so a
                        wrapped line never starts with a separator — same
                        rule as the Tech Skills notes. */}
                    <p className="mt-5 flex flex-wrap gap-x-2 font-mono text-micro text-muted-foreground/80">
                      {exp.tags.map((tag, t) => (
                        <span key={tag} className="whitespace-nowrap">
                          {tag}
                          {t < exp.tags.length - 1 ? " ·" : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
