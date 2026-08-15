"use client"

import { motion } from "framer-motion"
import { experiences } from "@/content/experience"
import { profile } from "@/content/profile"

/**
 * A stepped list — the timeline read as depth rather than as a line.
 *
 * Each older role steps further right and sheds a little elevation, so the
 * career recedes into the page the same way the hero deck's lower planes do.
 * The indent is the *only* thing that encodes recency here; the entries keep
 * full text contrast, because fading old roles to grey would make fifteen
 * years of history the least readable thing on the page.
 *
 * Deliberately not Aurora's rail-and-panel: two skins that resolve the same
 * section the same way are one skin with two palettes.
 */
export function SpatialExperience() {
  return (
    <section id="experience" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <header className="mb-12">
          <p className="label mb-3">Experience</p>
          <h2 className="max-w-2xl font-display text-display font-extrabold tracking-[-0.028em] text-foreground text-balance">
            {profile.yearsInTech} years building infrastructure and the teams that run it
          </h2>
        </header>

        <ol className="space-y-5">
          {experiences.map((exp, i) => {
            const current = exp.period.toLowerCase().includes("present")
            return (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: Math.min(i, 3) * 0.06 }}
                style={{ "--depth": i } as React.CSSProperties}
                className="ml-0 lg:ml-[calc(var(--depth)*2.25rem)]"
              >
                <article
                  className={`rounded-xl border bg-card-solid p-6 sm:p-8 ${
                    current
                      ? "border-primary/45 shadow-glow"
                      : "border-border shadow-elevation"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="label tabular">{exp.period}</p>
                    <p className="label">
                      {current ? (
                        <span className="text-primary">Current</span>
                      ) : (
                        <span>Step {experiences.length - i} of {experiences.length}</span>
                      )}
                    </p>
                  </div>

                  <h3 className="mt-2 text-h3 font-bold text-foreground">{exp.title}</h3>
                  <p className="mt-1 text-body font-semibold text-primary">{exp.company}</p>
                  <p className="mt-1 text-small text-muted-foreground text-pretty">{exp.scope}</p>

                  <ul className="mt-5 max-w-3xl space-y-2.5">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-small leading-relaxed text-muted-foreground"
                      >
                        <span
                          className="mt-[0.72em] h-1 w-1 shrink-0 rounded-full bg-primary/60"
                          aria-hidden
                        />
                        <span className="text-pretty">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-border bg-secondary px-2 py-1 font-mono text-micro text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
