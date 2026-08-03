import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, focusAreas } from "@/content/profile"

/**
 * The hero is a nameplate, not a dashboard.
 *
 * The previous version led with three glowing stat tiles — which is the
 * template answer, and spent the page's most valuable space on numbers with no
 * context. This opens with the claim (proportional type) and immediately backs
 * it with a spec block (mono labels, measured values), which is the same
 * declared-state / observed-state split the rest of the page runs on.
 */

const spec = [
  {
    label: "Experience",
    value: `${profile.yearsInTech} years in tech · ${profile.yearsCloudNative} cloud-native`,
  },
  { label: "Scale", value: "400+ engineers served · 150+ teams on shared CI" },
  { label: "Reliability", value: "~30% MTTR and false-positive reduction" },
  {
    label: "Based",
    value: `${profile.location.city}, ${profile.location.country} · ${profile.location.availability}`,
  },
]

export function HeroSection() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-32">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" aria-hidden />
          <p className="label">Open to {profile.openToRoles}</p>
        </div>

        <div className="mt-8 flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="font-display text-display font-semibold tracking-tight text-foreground md:text-display-lg">
              {profile.name}
            </h1>
            <p className="mt-3 text-h3 text-foreground">{profile.title}</p>
            <p className="mt-1 font-mono text-small text-muted-foreground">
              {profile.subtitle}
            </p>
          </div>

          <img
            src="https://github.com/ok-karthik.png"
            alt={`${profile.name}, ${profile.title}`}
            width={96}
            height={96}
            loading="eager"
            decoding="async"
            className="h-20 w-20 shrink-0 rounded-full border border-border object-cover sm:h-24 sm:w-24"
          />
        </div>

        <p className="mt-8 max-w-2xl text-body-lg text-muted-foreground">{profile.bio}</p>

        {/* Spec plate — the evidence, read as measurements rather than tiles. */}
        <dl className="mt-10 border-t border-border">
          {spec.map((row) => (
            <div
              key={row.label}
              className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:gap-8"
            >
              <dt className="label shrink-0 sm:w-32 sm:pt-0.5">{row.label}</dt>
              <dd className="text-body text-foreground">{row.value}</dd>
            </div>
          ))}
          <div className="flex flex-col gap-1 border-b border-border py-3 sm:flex-row sm:gap-8">
            <dt className="label shrink-0 sm:w-32 sm:pt-0.5">Focus</dt>
            <dd className="flex flex-wrap gap-x-2 gap-y-1 text-body text-foreground">
              {focusAreas.map((area, i) => (
                <span key={area.name}>
                  {area.name}
                  {i < focusAreas.length - 1 && (
                    <span className="ml-2 text-muted-foreground" aria-hidden>
                      ·
                    </span>
                  )}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="rounded-md bg-primary px-4 py-2.5 text-body font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View work
          </a>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-body text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
            Download CV
          </a>

          <div className="ml-auto flex items-center gap-1">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
