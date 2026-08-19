"use client"

import { motion } from "framer-motion"
import { certifications, education, languages } from "@/content/profile"

export function CredentialsSection() {
  return (
    <section id="credentials" className="py-24 px-6 relative z-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Qualifications
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <p className="font-mono text-xs text-muted-foreground hidden shrink-0 tabular-nums sm:block">
              Certifications &amp; Education
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            Verified credentials and foundation
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            CNCF certifications, academic degree, and spoken languages
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Certifications */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 hover:border-primary/40 hover:bg-card/40 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="font-mono text-xs uppercase text-primary tracking-wider font-bold mb-5 border-b border-border/40 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Certifications
              </h3>
              <ul className="space-y-4">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-white/95 border border-border/60 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                      <img
                        src={cert.badge}
                        alt={cert.name}
                        width={36}
                        height={36}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-mono text-sm font-bold text-foreground">
                        {cert.name}
                      </p>
                      <p className="text-xs text-muted-foreground leading-snug mt-0.5">{cert.fullName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Card 2: Education */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 hover:border-primary/40 hover:bg-card/40 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <h3 className="font-mono text-xs uppercase text-primary tracking-wider font-bold mb-5 border-b border-border/40 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Education
              </h3>
              <div className="space-y-2">
                <p className="font-mono text-sm font-bold text-foreground">
                  {education.degree}
                </p>
                <p className="text-xs text-muted-foreground">
                  {education.field}
                </p>
                <p className="text-xs text-primary font-mono mt-2">
                  {education.institution}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {education.period}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Languages */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 hover:border-primary/40 hover:bg-card/40 hover:shadow-xl transition-all flex flex-col justify-between sm:col-span-2 lg:col-span-1"
          >
            <div>
              <h3 className="font-mono text-xs uppercase text-primary tracking-wider font-bold mb-5 border-b border-border/40 pb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Languages
              </h3>
              <ul className="space-y-4">
                {languages.map((lang) => (
                  <li key={lang.name} className="flex items-center justify-between border-b border-border/30 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-sm font-semibold text-foreground font-sans">
                      {lang.name}
                    </span>
                    <span className="font-mono text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                      {lang.level}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
