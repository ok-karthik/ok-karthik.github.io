import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { sortedPosts } from "@/content/writing"
import { profile } from "@/content/profile"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: `Writing | ${profile.name}`,
  description:
    "Notes on platform engineering, GPU infrastructure and observability — mostly the trade-offs behind decisions rather than the tools involved.",
  alternates: { canonical: "/writing" },
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })

export default function WritingIndex() {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <header className="mb-14">
          <p className="label rule-label mb-4">Writing</p>
          <h1 className="font-display text-display font-semibold tracking-tight text-foreground">
            Notes on the decisions
          </h1>
          <p className="mt-4 max-w-2xl text-body-lg text-muted-foreground">
            Mostly trade-offs rather than tools — the reasoning behind choices I&apos;ve made
            building platforms, and what each one cost.
          </p>
        </header>

        <ul className="grid gap-4">
          {sortedPosts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="glass glass-hover group block rounded-xl p-6">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <time dateTime={post.date} className="label tabular">
                    {formatDate(post.date)}
                  </time>
                  <span className="label" aria-hidden>
                    ·
                  </span>
                  <span className="label">{post.readingMinutes} min read</span>
                </div>

                <h2 className="mt-3 flex items-start gap-2 font-display text-h2 font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                  <ArrowUpRight
                    className="mt-2 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                    aria-hidden
                  />
                </h2>

                <p className="mt-3 max-w-2xl text-small leading-relaxed text-muted-foreground">
                  {post.summary}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-micro text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
