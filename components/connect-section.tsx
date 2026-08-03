import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react"
import { profile } from "@/content/profile"

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/karthikorugonda",
    href: profile.social.linkedin,
    Icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/ok-karthik",
    href: profile.social.github,
    Icon: Github,
  },
]

/**
 * Full-bleed closing band.
 *
 * Every other section is contained to max-w-6xl on the page wash. This one
 * runs edge to edge on a distinct surface, which is what physically signals
 * "end of document" — the previous version just stopped.
 */
export function ConnectSection() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border bg-card-solid/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="label rule-label mb-4">Contact</p>
            <h2 className="max-w-2xl font-display text-h2 font-semibold text-foreground">
              Open to {profile.openToRoles}
            </h2>
            <p className="mt-4 max-w-xl text-body-lg text-muted-foreground">
              {profile.location.availability}. Happy to talk through any of the work above.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-body font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
            >
              Get in touch
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden
              />
            </a>
          </div>

          <ul className="w-full lg:w-80">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={label} className="border-t border-border last:border-b">
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-3 py-3.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <span className="label w-20 shrink-0">{label}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-small text-foreground transition-colors group-hover:text-primary">
                    {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 font-mono text-micro text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            {profile.location.city}, {profile.location.country} · {profile.location.visa}
          </p>
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
