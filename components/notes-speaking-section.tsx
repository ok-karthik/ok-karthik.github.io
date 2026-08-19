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
            Notes from the work, and conference sessions
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Technical writing on Kubernetes, telemetry, and platform automation
          </p>
        </header>

        {/* Technical Notes Row */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Technical Notes
            </h3>
            <Link 
              href="/writing"
              className="text-xs font-mono text-primary hover:underline flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 transition-colors hover:bg-primary/20"
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
                      <span>{post.readingMinutes} min read</span>
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

        {/* Conference Talks Banner */}
        {speaking.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
                <Radio className="w-5 h-5 text-primary animate-pulse" />
                Conference Talks
              </h3>
            </div>

            <div className="space-y-4">
              {speaking.map((talk, i) => (
                <motion.div
                  key={talk.url}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                >
                  <a
                    href={talk.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl p-6 sm:p-7 hover:border-primary/40 hover:bg-card/40 hover:shadow-2xl transition-all duration-300 group flex flex-col sm:flex-row sm:items-center gap-6"
                  >
                    {talk.screenshot && (
                      <div className="relative shrink-0 overflow-hidden rounded-xl border border-border/70 bg-black/40 shadow-md self-start sm:self-center">
                        <img
                          src={talk.screenshot}
                          alt={`${talk.event} speaker listing for Karthik Orugonda`}
                          width={140}
                          height={200}
                          loading="lazy"
                          decoding="async"
                          className="h-32 sm:h-36 w-auto object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
                          Upcoming Talk
                        </span>
                      </div>

                      <h4 className="flex items-start gap-1.5 font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary leading-snug">
                        {talk.event}
                        <ArrowUpRight
                          className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                          aria-hidden
                        />
                      </h4>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-sans">
                        {talk.session}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-foreground/80">
                          <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden />
                          {formatDate(talk.date, { year: "numeric", month: "long", day: "numeric" })}
                        </span>
                        <span className="flex items-center gap-1.5 text-foreground/80">
                          <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden />
                          {talk.location}
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
