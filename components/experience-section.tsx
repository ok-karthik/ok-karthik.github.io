"use client"

import { motion } from "framer-motion"
import { experiences, experienceDeck } from "@/content/experience"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 relative z-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Experience
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <p className="font-mono text-xs text-muted-foreground hidden shrink-0 tabular-nums sm:block">
              {experiences.length} roles · 10+ years
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight heading-gradient text-balance">
            Where I built platforms and operated systems
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">{experienceDeck}</p>
        </header>

        <div className="space-y-6">
          {experiences.map((exp, index) => {
            const isCurrent = exp.period.toLowerCase().includes("present")
            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-8 
                           transition-all duration-300 hover:border-primary/40 hover:bg-card/40 
                           hover:shadow-2xl relative"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-bold text-foreground font-display">{exp.title}</h3>
                      <span className="text-base text-primary font-semibold">@ {exp.company}</span>
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mt-1.5 leading-snug">
                      {exp.scope}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 self-start md:self-auto">
                    {isCurrent && (
                      <span className="font-mono text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted-foreground bg-secondary/80 border border-border/60 px-3 py-1 rounded-full tabular-nums shrink-0">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 my-5">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="text-xs sm:text-sm text-foreground/90 flex items-start gap-2.5">
                      <span className="text-primary mt-1 text-xs shrink-0">✦</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-full bg-secondary/60 text-muted-foreground border border-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
