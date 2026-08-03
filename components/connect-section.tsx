import { Github, Linkedin, Mail } from "lucide-react"
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

export function ConnectSection() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="label mb-3">Contact</p>
        <h2 className="max-w-2xl font-display text-h2 font-semibold text-foreground">
          Open to {profile.openToRoles}
        </h2>
        <p className="mt-3 text-body text-muted-foreground">
          {profile.location.availability}. Happy to talk through any of the work above.
        </p>

        <ul className="mt-10 border-t border-border">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label} className="border-b border-border">
              <a
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="group flex items-baseline gap-4 py-4 sm:gap-8"
              >
                <span className="label flex shrink-0 items-center gap-2 sm:w-32">
                  <Icon className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </span>
                <span className="min-w-0 truncate font-mono text-body text-foreground transition-colors group-hover:text-primary">
                  {value}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-2 font-mono text-micro text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
