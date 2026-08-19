"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Quote } from "lucide-react"
import { profile, recommendations } from "@/content/profile"

export function RecommendationsSection() {
  return (
    <section id="recommendations" className="py-24 px-6 relative z-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Recommendations
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <a
              href={`${profile.social.linkedin}/details/recommendations/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline bg-primary/10 border border-primary/20 px-3 py-1 rounded-full transition-colors hover:bg-primary/20"
            >
              View on LinkedIn
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight heading-gradient text-balance">
            What colleagues say
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Direct endorsements from engineering managers, team members, and peers
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          {recommendations.map((rec, index) => (
            <motion.figure
              key={rec.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:border-primary/40 hover:bg-card/40 hover:shadow-xl transition-all duration-300"
            >
              <div>
                <Quote className="w-6 h-6 text-primary/60 mb-4" />
                <blockquote className="text-sm text-foreground/90 leading-relaxed font-sans italic">
                  &ldquo;{rec.quote}&rdquo;
                </blockquote>
              </div>
              
              <figcaption className="mt-6 pt-4 border-t border-border/40">
                <div className="font-display text-sm font-bold text-foreground">
                  {rec.name}
                </div>
                <div className="text-xs text-primary font-medium mt-0.5">
                  {rec.title}
                </div>
                <div className="font-mono text-[11px] text-muted-foreground mt-1.5 leading-snug">
                  {rec.relationship}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
