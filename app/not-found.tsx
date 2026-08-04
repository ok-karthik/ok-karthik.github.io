import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { projects } from "@/content/projects"
import { profile } from "@/content/profile"

export const metadata = {
  title: `Page not found | ${profile.name}`,
  robots: { index: false },
}

/**
 * Custom 404.
 *
 * Next's default not-found renders inside the root layout but without a
 * <main id="main">, so the skip link in the layout pointed at nothing — an
 * audit of the exported HTML caught it on both /404.html and /_not-found.html.
 *
 * It also does the obvious job the default doesn't: a 404 on a portfolio
 * should route the visitor into the work rather than dead-end them.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <p className="label rule-label mb-4">404</p>
        <h1 className="font-display text-display font-semibold tracking-tight text-foreground">
          That page doesn&apos;t exist
        </h1>
        <p className="mt-4 max-w-xl text-body text-muted-foreground">
          The link may be out of date. The projects below are the best place to start.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="glass glass-hover group block rounded-xl p-5"
                >
                  <span className="flex items-start gap-2 font-display text-h3 font-semibold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                    <ArrowUpRight
                      className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-2 block text-small text-muted-foreground">
                    {project.decisions.length} documented decisions
                  </span>
                </Link>
              </li>
            ))}
        </ul>

        <div className="mt-10">
          <Link
            href="/"
            className="rounded-lg bg-primary px-5 py-3 text-body font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Back home
          </Link>
        </div>
      </main>
    </>
  )
}
