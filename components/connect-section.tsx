import { Github, Linkedin, Mail, ArrowUpRight, Download } from "lucide-react"
import { profile } from "@/content/profile"

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Mail,
    hint: "Direct inbox",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/karthikorugonda",
    href: profile.social.linkedin,
    Icon: Linkedin,
    hint: "Professional network",
  },
  {
    label: "GitHub",
    value: "github.com/ok-karthik",
    href: profile.social.github,
    Icon: Github,
    hint: "Code & architectures",
  },
]

/**
 * Executive Contact Console.
 *
 * High-density glass panel consolidating direct channels, target scope,
 * location authorization, and immediate action buttons without dead space.
 */
export function ConnectSection() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border bg-card-solid/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="mb-8">
          <p className="label rule-label mb-3">Contact</p>
          <h2 className="font-display text-display font-semibold tracking-tight text-foreground text-balance">
            Let&apos;s build reliable platforms together
          </h2>
          <p className="mt-2 max-w-2xl text-body text-muted-foreground text-pretty">
            {profile.location.availability}. Happy to discuss platform engineering, SRE, architecture decisions, or opportunities in Germany.
          </p>
        </header>

        <div className="glass overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Direct Communication Channels */}
            <div>
              <p className="label mb-4">Direct Channels</p>
              <ul className="space-y-3">
                {channels.map(({ label, value, href, Icon, hint }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:border-primary/50 hover:bg-secondary/60"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-small font-semibold text-foreground">{label}</span>
                            <span className="hidden font-mono text-micro text-muted-foreground sm:inline">
                              · {hint}
                            </span>
                          </div>
                          <span className="block truncate font-mono text-small text-foreground/80 transition-colors group-hover:text-primary">
                            {value}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Roles & Status */}
            <div>
              <p className="label mb-4">Open to Opportunities</p>
              <div className="space-y-2.5">
                {profile.openToRoles.map((role) => (
                  <div
                    key={role.domain}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-secondary/20 px-4 py-3"
                  >
                    <span className="text-body font-medium text-foreground">{role.domain}</span>
                    <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-micro font-medium text-primary">
                      {role.level}
                    </span>
                  </div>
                ))}
              </div>

              {/* Status and Work Authorization Banner */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5 rounded-xl border border-border bg-muted/40 p-4 font-mono text-micro text-muted-foreground">
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <span className="breathe h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  {profile.location.city}, {profile.location.country}
                </span>
                <span className="text-border-strong" aria-hidden>·</span>
                <span className="font-medium text-primary">{profile.location.visa}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Footer Strip */}
          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-body font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Get in touch
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-body font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
                Download CV
              </a>
            </div>

            <div className="flex items-center gap-4 font-mono text-micro text-muted-foreground">
              <span>© {new Date().getFullYear()} {profile.name}</span>
              <span>·</span>
              <a href="#top" className="text-muted-foreground transition-colors hover:text-primary">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

