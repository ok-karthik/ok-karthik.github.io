import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import { projects, getProject } from "@/content/projects"
import { posts } from "@/content/writing"
import { profile } from "@/content/profile"
import { architectureBySlug } from "@/components/architecture"
import { DecisionList } from "@/components/decision-list"
import { ProjectPlayground } from "@/components/project-playground"
import { Navbar } from "@/components/navbar"

type Params = { slug: string }

/** Static export: every project page is prerendered at build time. */
export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  const title = `${project.title} | ${profile.name}`
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `${profile.siteUrl}/work/${project.slug}`,
      title,
      description: project.summary,
      images: ["/og-image.png"],
    },
  }
}

export default async function WorkPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const Architecture = architectureBySlug[project.slug]
  const relatedPosts = posts.filter((p) => p.project === project.slug)

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-4xl px-6 pb-24 pt-28">
        <Link
          href="/#projects"
          className="label -my-2 inline-flex items-center gap-2 py-2 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden />
          All projects
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <h1 className="font-display text-display font-semibold text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-body text-muted-foreground">{project.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-small text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden />
              Source code
            </a>
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="font-mono text-micro text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <section className="mt-14">
          <h2 className="label rule-label mb-4">The problem</h2>
          <p className="text-body-lg text-foreground">{project.problem}</p>
        </section>

        <section className="mt-14">
          <h2 className="label rule-label mb-4">Constraints</h2>
          <ul className="space-y-2.5">
            {project.constraints.map((constraint) => (
              <li key={constraint} className="flex gap-3 text-body text-muted-foreground">
                <span className="mt-[0.6em] h-px w-3 shrink-0 bg-border" aria-hidden />
                {constraint}
              </li>
            ))}
          </ul>
        </section>

        {Architecture && (
          <section className="mt-14">
            <h2 className="label rule-label mb-4">Architecture</h2>
            <Architecture />
            <div className="mt-6">
              <ProjectPlayground slug={project.slug} />
            </div>
          </section>
        )}

        {/*
          The reason these pages exist. A stack list is table stakes; what a
          thing was chosen *over* is the part that survives an interview.
        */}
        <section className="mt-14">
          <h2 className="label rule-label mb-2">Key decisions</h2>
          <p className="mb-6 max-w-xl text-small text-muted-foreground">
            What was chosen, what it was chosen over, and why.
          </p>
          <DecisionList decisions={project.decisions} />
        </section>

        {project.failureMode && (
          <section className="mt-14">
            <h2 className="label rule-label mb-4">Production resilience & failure modes</h2>
            <div className="glass rounded-xl p-6 sm:p-7">
              <p className="label mb-1 text-primary">Observed Failure Scenario</p>
              <p className="text-body font-medium text-foreground">
                {project.failureMode.scenario}
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="label mb-1">Mitigation & Architectural Safeguard</p>
                <p className="text-small leading-relaxed text-muted-foreground">
                  {project.failureMode.resolution}
                </p>
              </div>
            </div>
          </section>
        )}

        {project.outcome && (
          <section className="mt-14">
            <h2 className="label rule-label mb-4">Outcome</h2>
            <p className="text-body text-muted-foreground">{project.outcome}</p>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h2 className="label rule-label mb-4">Deep dive writing</h2>
            <div className="grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/writing/${post.slug}`}
                  className="glass glass-hover group block rounded-xl p-6"
                >
                  <p className="label mb-1.5 tabular">{post.readingMinutes} min read</p>
                  <h3 className="flex items-start gap-2 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                      aria-hidden
                    />
                  </h3>
                  <p className="mt-2 text-small text-muted-foreground">{post.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-16 border-t border-border pt-8">
          <Link
            href="/#projects"
            className="-my-2 inline-block py-2 text-small text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to all projects
          </Link>
        </footer>
      </main>
    </>
  )
}

