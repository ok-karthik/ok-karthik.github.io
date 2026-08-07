import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"
import { CountUp } from "@/components/count-up"

/** Accent per focus area — index-aligned with `focusAreas`. */
const focusDots = [
  { dot: "bg-primary", hover: "group-hover/item:text-primary" },
  { dot: "bg-violet-400", hover: "group-hover/item:text-violet-400" },
  { dot: "bg-sky-400", hover: "group-hover/item:text-sky-400" },
  { dot: "bg-ok", hover: "group-hover/item:text-ok" },
]

/* Accent diet: one stat carries the accent, the rest sit in foreground.
   Three coloured numbers competed; one reads as emphasis. */
const statAccents = ["text-primary", "text-foreground", "text-foreground"]

export function HeroSection() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          {/* Left: the claim */}
          <div className="min-w-0">
            <div className="rise inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5" style={{ animationDelay: "80ms" }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-small font-medium text-primary">
                {/* The pill wraps to two lines under ~420px. Held together so it
                    breaks at a "·" and not mid-date — rendered at 375px it split
                    as "…Available from 15 Dec / 2026 · Berlin or remote", which
                    fragments the one token a recruiter is scanning for. */}
                Open to opportunities · <span className="whitespace-nowrap">{profile.availableFrom}</span> ·{" "}
                <span className="whitespace-nowrap">{profile.location.availability}</span>
              </span>
            </div>

            <h1 className="rise mt-6 font-display text-display font-bold tracking-tight text-foreground md:text-display-lg" style={{ animationDelay: "160ms" }}>
              {profile.name}
            </h1>
            <p className="rise mt-3 font-display text-h3 font-semibold text-primary" style={{ animationDelay: "240ms" }}>
              {profile.title}
            </p>
            <p className="rise mt-2 font-mono text-small text-foreground/70" style={{ animationDelay: "300ms" }}>
              {profile.subtitle}
            </p>

            <p className="rise mt-6 max-w-xl text-body-lg text-muted-foreground" style={{ animationDelay: "360ms" }}>{profile.bio}</p>

            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "440ms" }}>
              <a
                href="#projects"
                className="rounded-lg bg-primary px-5 py-3 text-body font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                View projects
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass glass-hover group inline-flex items-center gap-2 rounded-lg px-5 py-3 text-body font-medium text-foreground"
              >
                <Download
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
                Download CV
              </a>
            </div>
          </div>

          {/* Right: profile card, then stats */}
          <div className="flex w-full flex-col gap-5">
            <aside className="glass rise relative overflow-hidden rounded-2xl p-6 md:p-8" style={{ animationDelay: "520ms" }}>
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/12 blur-3xl"
                aria-hidden
              />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:gap-8">
                <div className="flex shrink-0 justify-center sm:justify-start">
                  <img
                    src="https://github.com/ok-karthik.png"
                    alt={`${profile.name}, ${profile.title}`}
                    width={144}
                    height={144}
                    loading="eager"
                    decoding="async"
                    className="h-32 w-32 rounded-full border-2 border-primary/40 object-cover shadow-glow transition-transform duration-500 hover:scale-105 md:h-36 md:w-36"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="label mb-4">Focus areas</p>
                  <ul className="space-y-4">
                    {focusAreas.map((area, i) => {
                      const accent = focusDots[i % focusDots.length]
                      return (
                        <li key={area.name} className="group/item flex gap-3">
                          <span
                            className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot} transition-transform group-hover/item:scale-150`}
                          />
                          <div>
                            <div
                              className={`text-body font-semibold text-foreground transition-colors ${accent.hover}`}
                            >
                              {area.name}
                            </div>
                            <div className="text-small text-muted-foreground">{area.detail}</div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="relative mt-7 flex items-center justify-around gap-4 border-t border-border pt-5">
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
                    className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Icon
                      className="h-4 w-4 transition-transform group-hover:scale-110"
                      aria-hidden
                    />
                    <span className="text-small font-medium">{label}</span>
                  </a>
                ))}
              </div>
            </aside>

            <div className="rise grid grid-cols-3 gap-4" style={{ animationDelay: "620ms" }}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="glass glass-hover rounded-xl px-2 py-4 text-center sm:px-3"
                >
                  <CountUp
                    value={stat.value}
                    className={`tabular block font-mono text-h2 font-bold ${statAccents[i % statAccents.length]}`}
                  />
                  <div className="label mt-1.5 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
