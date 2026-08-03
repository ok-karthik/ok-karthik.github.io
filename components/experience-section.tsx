"use client"

import { motion } from "framer-motion"
import { experiences } from "@/content/experience"
import { profile } from "@/content/profile"

/**
 * The gutter carries the period. This is one of the few places on the page
 * where a sequence is real — the roles are chronological and the reader needs
 * the dates to judge scope — so putting them in the structural position is
 * information rather than decoration.
 */
export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-12">
          <p className="label mb-3">Experience</p>
          <h2 className="font-display text-h2 font-semibold text-foreground">
            {profile.yearsInTech} years building infrastructure and the teams that run it
          </h2>
        </header>

        <ol className="border-t border-border">
          {experiences.map((exp, i) => (
            <motion.li
              key={exp.company}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.06 }}
              className="border-b border-border py-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <p className="label shrink-0 tabular sm:w-32 sm:pt-1.5">{exp.period}</p>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-h3 font-semibold text-foreground">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-body text-primary">{exp.company}</p>
                  <p className="mt-1 text-small text-muted-foreground">{exp.scope}</p>

                  <ul className="mt-5 space-y-3">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-body text-muted-foreground">
                        <span
                          className="mt-[0.65em] h-px w-3 shrink-0 bg-border"
                          aria-hidden
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                    {exp.tags.map((tag) => (
                      <li key={tag} className="font-mono text-micro text-muted-foreground">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
