import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { posts, getPost } from "@/content/writing"
import { getProject } from "@/content/projects"
import { profile } from "@/content/profile"
import { Navbar } from "@/components/navbar"
import { Prose } from "@/components/prose"

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}

  const title = `${post.title} | ${profile.name}`
  return {
    title,
    description: post.summary,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      url: `${profile.siteUrl}/writing/${post.slug}`,
      title,
      description: post.summary,
      publishedTime: post.date,
      images: ["/og-image.png"],
    },
  }
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const project = post.project ? getProject(post.project) : undefined

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <Link
          href="/writing"
          className="label inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden />
          All writing
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <time dateTime={post.date} className="label tabular">
              {formatDate(post.date)}
            </time>
            <span className="label" aria-hidden>
              ·
            </span>
            <span className="label">{post.readingMinutes} min read</span>
          </div>

          <h1 className="mt-4 font-display text-display font-semibold tracking-tight text-foreground">
            {post.title}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">{post.summary}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-1 font-mono text-micro text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <article className="mt-12">
          <Prose blocks={post.body} />
        </article>

        {project && (
          <aside className="glass glass-hover mt-16 rounded-xl p-6">
            <p className="label mb-2">From the build</p>
            <Link href={`/work/${project.slug}`} className="group">
              <h2 className="flex items-start gap-2 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                {project.title}
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </h2>
              <p className="mt-2 text-small text-muted-foreground">{project.summary}</p>
            </Link>
          </aside>
        )}

        <footer className="mt-12 border-t border-border pt-8">
          <Link
            href="/writing"
            className="text-small text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All writing
          </Link>
        </footer>
      </main>
    </>
  )
}
