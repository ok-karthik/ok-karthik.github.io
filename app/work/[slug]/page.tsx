import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Github } from "lucide-react"
import { projects, getProject } from "@/content/projects"
import { profile } from "@/content/profile"
import { architectureBySlug } from "@/components/architecture"
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

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        <Link
          href="/#work"
          className="label inline-flex items-center gap-2 transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden />
          All work
        </Link>

        <header className="mt-6 border-b border-border pb-8">
          <h1 className="font-display text-display font-semibold text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 text-body-lg text-muted-foreground">{project.summary}</p>

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

        <section className="mt-12">
          <h2 className="label mb-3">The problem</h2>
          <p className="text-body-lg text-foreground">{project.problem}</p>
        </section>

        <section className="mt-12">
          <h2 className="label mb-4">Constraints</h2>
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
          <section className="mt-12">
            <h2 className="label mb-4">Architecture</h2>
            <Architecture />
          </section>
        )}

        {/*
          The reason these pages exist. A stack list is table stakes; what a
          thing was chosen *over* is the part that survives an interview.
        */}
        <section className="mt-12">
          <h2 className="label mb-1">Key decisions</h2>
          <p className="mb-6 text-small text-muted-foreground">
            What was chosen, and what it was chosen over.
          </p>
          <ol className="border-t border-border">
            {project.decisions.map((decision) => (
              <li key={decision.decision} className="border-b border-border py-6">
                <h3 className="text-body-lg font-semibold text-foreground">
                  {decision.decision}
                </h3>
                <p className="mt-2 text-body text-muted-foreground">{decision.rationale}</p>
              </li>
            ))}
          </ol>
        </section>

        {project.outcome && (
          <section className="mt-12">
            <h2 className="label mb-3">Outcome</h2>
            <p className="text-body text-muted-foreground">{project.outcome}</p>
          </section>
        )}

        <footer className="mt-16 border-t border-border pt-8">
          <Link
            href="/#work"
            className="text-small text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to all work
          </Link>
        </footer>
      </main>
    </>
  )
}
