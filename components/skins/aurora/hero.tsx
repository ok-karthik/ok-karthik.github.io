import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"
import { CountUp } from "@/components/count-up"

/** Accent per focus area — index-aligned with `focusAreas`. */
const focusDots = ["bg-primary", "bg-primary/70", "bg-primary/45", "bg-primary/25"]

const contents = [
  { index: "01", label: "Overview", href: "#top" },
  { index: "02", label: "Architecture", href: "#architecture" },
  { index: "03", label: "Capabilities", href: "#tech-skills" },
  { index: "04", label: "Projects", href: "#projects" },
  { index: "05", label: "Experience", href: "#experience" },
  { index: "06", label: "Credentials", href: "#credentials" },
  { index: "07", label: "Contact", href: "#contact" },
]

/**
 * Aurora's hero: high-density executive console.
 *
 * Left: Claim, title, bio, actions and social links.
 * Right: Profile badge and spacious focus areas matrix.
 * Bottom: Unified 4-cell KPI & right-to-work HUD.
 */
export function AuroraHero() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-28 md:pt-32">
        <div className="glass sheen rise overflow-hidden rounded-2xl">
          <div className="relative grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:p-10">
            {/* The claim and bio */}
            <div className="min-w-0">
              <p
                className="rise inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5"
                style={{ animationDelay: "80ms" }}
              >
                <span className="breathe h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                <span className="text-small font-medium text-primary">
                  Open to opportunities · {profile.location.availability}
                </span>
              </p>

              <h1
                className="rise mt-5 font-display text-display font-bold tracking-tight text-foreground text-balance md:text-display-lg"
                style={{ animationDelay: "160ms" }}
              >
                {profile.name}
              </h1>
              <p
                className="rise mt-2.5 font-display text-h3 font-semibold text-primary"
                style={{ animationDelay: "220ms" }}
              >
                {profile.title}
              </p>
              <p
                className="rise mt-1.5 font-mono text-small text-foreground/65"
                style={{ animationDelay: "280ms" }}
              >
                {profile.subtitle}
              </p>

              <p
                className="rise mt-5 max-w-xl text-body-lg leading-relaxed text-muted-foreground text-pretty"
                style={{ animationDelay: "340ms" }}
              >
                {profile.bio}
              </p>

              {/* Action buttons and social links in one cohesive row */}
              <div
                className="rise mt-7 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "420ms" }}
              >
                <a
                  href="#projects"
                  className="rounded-lg bg-primary px-5 py-2.5 text-body font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
                >
                  View projects
                </a>
                <a
                  href={profile.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-body font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Download
                    className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                    aria-hidden
                  />
                  Download CV
                </a>

                {/* Social icons inline */}
                <div className="flex items-center gap-1.5 pl-1 sm:pl-2">
                  {[
                    { href: profile.social.github, Icon: Github, label: "GitHub" },
                    { href: profile.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
                    { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/30 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-secondary/60 hover:text-primary"
                    >
                      <Icon className="h-4 w-4" aria-hidden />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile identity and Focus Areas matrix */}
            <div className="min-w-0 lg:border-l lg:border-border lg:pl-10">
              <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-secondary/20 p-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary/40 shadow-glow">
                  <img
                    src="/ok-karthik.png"
                    alt={profile.name}
                    width={96}
                    height={96}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover text-small text-muted-foreground"
                  />
                </span>
                <div className="min-w-0">
                  <span className="block font-display text-body font-semibold text-foreground">
                    {profile.name}
                  </span>
                  <span className="block font-mono text-micro text-primary">
                    {profile.location.city}, {profile.location.country}
                  </span>
                  <span className="mt-0.5 block font-mono text-micro text-muted-foreground">
                    {profile.location.visa}
                  </span>
                </div>
              </div>

              <div className="mt-5">
                <p className="label mb-3">Core Focus Areas</p>
                <ul className="space-y-2.5">
                  {focusAreas.map((area, i) => (
                    <li
                      key={area.name}
                      className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 px-3.5 py-2.5 transition-colors hover:border-border-strong"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${focusDots[i % focusDots.length]}`}
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-small font-semibold text-foreground">{area.name}</div>
                        <div className="font-mono text-micro text-muted-foreground">{area.detail}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Unified 4-Cell KPI & Authorization HUD */}
          <dl
            className="rise grid grid-cols-2 divide-x divide-y divide-border border-t border-border sm:grid-cols-4 sm:divide-y-0"
            style={{ animationDelay: "520ms" }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col-reverse gap-0.5 px-6 py-4 sm:px-8 sm:py-5"
              >
                <dt className="label">{stat.label}</dt>
                <dd>
                  <CountUp
                    value={stat.value}
                    className={`tabular font-mono text-h2 font-bold ${
                      i === 0 ? "text-primary" : "text-foreground"
                    }`}
                  />
                </dd>
              </div>
            ))}

            {/* Cell 4: Legal Work Authorization & Location */}
            <div className="flex flex-col-reverse gap-0.5 px-6 py-4 sm:px-8 sm:py-5">
              <dt className="label">Right to work</dt>
              <dd className="font-display text-body font-semibold text-primary">
                {profile.location.visa}
              </dd>
            </div>
          </dl>
        </div>

        {/* Section Jump Index */}
        <nav aria-label="Sections" className="mt-3.5 overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-md">
          <ol className="grid grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 lg:grid-cols-7 lg:divide-y-0">
            {contents.map((item) => (
              <li key={item.index}>
                <a
                  href={item.href}
                  className="group flex items-baseline gap-2.5 px-4 py-3 transition-colors hover:bg-secondary/60"
                >
                  <span className="font-mono text-micro tabular text-primary/80 transition-colors group-hover:text-primary">
                    {item.index}
                  </span>
                  <span className="font-display text-small font-medium tracking-wide text-foreground/90 transition-colors group-hover:text-foreground">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  )
}

