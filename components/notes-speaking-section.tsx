import Link from "next/link"
import { ArrowUpRight, Calendar, MapPin } from "lucide-react"
import { sortedPosts } from "@/content/writing"
import { speaking } from "@/content/profile"

const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Date(iso).toLocaleDateString("en-GB", opts)

/**
 * Writing and speaking, deliberately not shaped like Qualifications.
 *
 * These are active, ongoing signals rather than static facts — a scroll row
 * for posts (there will be more of these) and a single banner for the next
 * talk, not a grid cell sized to hold exactly one item.
 */
export function NotesSpeakingSection() {
  return (
    <section id="notes" className="section-tight scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6">
        <p className="label rule-label mb-4">Writing &amp; Speaking</p>
        <h2 className="mb-10 font-display text-display font-semibold tracking-tight text-foreground">
          Notes from the work
        </h2>

        <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
          {sortedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="glass glass-hover group block w-[19rem] shrink-0 snap-start rounded-xl p-5"
            >
              <p className="label tabular">
                {formatDate(post.date, { year: "numeric", month: "short", day: "numeric" })} ·{" "}
                {post.readingMinutes} min
              </p>
              <h3 className="mt-2.5 flex items-start gap-1.5 font-display text-body-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {post.title}
                <ArrowUpRight
                  className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                  aria-hidden
                />
              </h3>
              <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                {post.summary}
              </p>
            </Link>
          ))}

          <Link
            href="/writing"
            className="glass glass-hover group flex w-40 shrink-0 snap-start flex-col items-start justify-center gap-2 rounded-xl p-5 text-foreground"
          >
            <span className="font-display text-body-lg font-semibold transition-colors group-hover:text-primary">
              All writing
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              aria-hidden
            />
          </Link>
        </div>

        {speaking.length > 0 && (
          <div className="mt-8">
            {speaking.map((talk) => (
              <a
                key={talk.url}
                href={talk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover group flex flex-col gap-5 rounded-xl p-5 sm:flex-row sm:items-center sm:p-6"
              >
                <img
                  src={talk.screenshot}
                  alt={`${talk.event} speaker listing for Karthik Orugonda`}
                  width={140}
                  height={200}
                  loading="lazy"
                  decoding="async"
                  className="h-32 w-auto shrink-0 self-start rounded-lg border border-border object-cover object-top sm:self-center"
                />
                <div className="min-w-0 flex-1">
                  <p className="label text-primary">Upcoming talk</p>
                  <h3 className="mt-1.5 flex items-start gap-1.5 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {talk.event}
                    <ArrowUpRight
                      className="mt-1.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-2 text-small leading-relaxed text-muted-foreground">
                    {talk.session}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-micro text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />
                      {formatDate(talk.date, { year: "numeric", month: "long", day: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {talk.location}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
