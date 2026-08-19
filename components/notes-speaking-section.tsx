"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, MapPin, BookOpen, Radio } from "lucide-react"
import { sortedPosts } from "@/content/writing"
import { speaking } from "@/content/profile"

const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-GB", opts)

export function NotesSpeakingSection() {
  return (
    <section id="notes" className="py-24 px-6 relative z-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Writing &amp; Speaking
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <p className="font-mono text-xs text-muted-foreground hidden shrink-0 tabular-nums sm:block">
              {sortedPosts.length} posts · {speaking.length} talks
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
            Notes, architecture deep dives, and talks
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Technical writing on Kubernetes, telemetry, and platform engineering
          </p>
        </header>

        {/* Writing row */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Technical Notes
            </h3>
            <Link 
              href="/writing"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/20"
            >
              All writing
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link
                  href={`/writing/${post.slug}`}
                  className="block h-full bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 hover:border-primary/40 hover:bg-card/40 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-muted-foreground mb-3">
                      <span>{formatDate(post.date, { year: "numeric", month: "short" })}</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <h4 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2.5 line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-2 text-xs font-mono text-primary">
                    <span>Read note</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Speaking row */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <Radio className="w-5 h-5 text-primary" />
              Conference Talks
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {speaking.map((talk, i) => (
              <motion.div
                key={talk.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 hover:border-primary/40 hover:bg-card/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs text-primary font-bold bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                      {talk.event}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {talk.date}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-foreground leading-snug">
                    {talk.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                    {talk.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {talk.location}
                  </span>
                  <span className="text-primary font-semibold">{talk.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
