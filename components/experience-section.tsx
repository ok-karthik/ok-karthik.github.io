"use client"

import { motion } from "framer-motion"
import { experiences } from "@/content/experience"
import { profile } from "@/content/profile"

/**
 * A timeline rail, not a stack of cards.
 *
 * Experience is the one section that genuinely *is* a sequence, so it gets the
 * only structure on the page that encodes order: a hairline rail with period
 * markers, content floating beside it. It also breaks the card rhythm — when
 * every section is a glass rectangle the page reads as assembled rather than
 * designed.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <header className="mb-14">
          <p className="label rule-label mb-4">Experience</p>
          <h2 className="max-w-2xl font-display text-h2 font-semibold text-foreground">
            {profile.yearsInTech} years building infrastructure and the teams that run it
          </h2>
        </header>

        <ol className="relative">
          {/* The rail. Fades at both ends so it reads as a continuing thread
              rather than a bounded box. */}
          <span
            aria-hidden
            className="absolute left-0 top-2 bottom-2 hidden w-px bg-gradient-to-b from-transparent via-border-strong to-transparent md:block"
          />

          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.07 }}
              className="group relative pb-14 last:pb-0 md:pl-10"
            >
              {/* Marker sits on the rail and lights up with its entry. */}
              <span
                aria-hidden
                className="absolute -left-[4.5px] top-2 hidden h-2.5 w-2.5 rounded-full border border-border-strong bg-background transition-colors duration-300 group-hover:border-primary group-hover:bg-primary md:block"
              />

              <p className="label tabular">{exp.period}</p>

              <h3 className="mt-2 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                {exp.title}
              </h3>
              <p className="mt-1 text-body font-medium text-foreground/80">{exp.company}</p>
              <p className="mt-1 text-small text-muted-foreground">{exp.scope}</p>

              <ul className="mt-5 max-w-3xl space-y-3">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-body text-muted-foreground">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-border-strong" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {exp.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-micro text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
