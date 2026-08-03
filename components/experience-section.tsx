"use client"

import { motion } from "framer-motion"
import { experiences } from "@/content/experience"
import { profile } from "@/content/profile"

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-secondary/20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-foreground"
          >
            Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            {profile.yearsInTech} years building resilient infrastructure and the teams that run it
          </motion.p>

          <div className="grid gap-6 relative">
            {/* Subtle timeline line for desktop */}
            <div className="hidden md:block absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent z-0" />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 
                           [transition-property:color,background-color,border-color,box-shadow] duration-300 hover:border-primary/50 hover:bg-card/80
                           hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] relative z-10 md:ml-6"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute -left-[29px] top-6 w-3 h-3 rounded-full bg-primary/30 border border-primary z-20" />
                
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <span className="font-mono text-sm text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-primary font-medium mt-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-1.5">{exp.scope}</p>
                  </div>
                </div>

                <ul className="space-y-2 mb-4">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-primary mt-1.5 shrink-0">
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </section>
  )
}
