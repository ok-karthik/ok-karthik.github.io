import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"
import { CountUp } from "@/components/count-up"

/** Accent per focus area — index-aligned with `focusAreas`. */
const focusDots = ["bg-primary", "bg-primary/70", "bg-primary/45", "bg-primary/25"]

/**
 * Aurora's hero: one slab of glass, not five.
 *
 * The current site's hero is a claim column beside a card beside three stat
 * tiles — three separate panels whose edges compete with each other. Here the
 * whole thing is a single pane with the stat strip fused to its bottom edge
 * behind a hairline, so the aurora underneath refracts through one continuous
 * surface. That is the only way thick glass reads as thick: a small panel is
 * mostly border.
 *
 * The focus-area dots step down one accent rather than running through violet,
 * sky and green. On a live coloured backdrop, four decorative hues is the
 * thing that makes a portfolio look like a template.
 */
export function AuroraHero() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-32">
        <div className="glass sheen rise overflow-hidden rounded-2xl">
          <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:p-12">
            {/* The claim */}
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
                className="rise mt-6 font-display text-display font-bold tracking-tight text-foreground text-balance md:text-display-lg"
                style={{ animationDelay: "160ms" }}
              >
                {profile.name}
              </h1>
              <p
                className="rise mt-3 font-display text-h3 font-semibold text-primary"
                style={{ animationDelay: "220ms" }}
              >
                {profile.title}
              </p>
              <p
                className="rise mt-2 font-mono text-small text-foreground/65"
                style={{ animationDelay: "280ms" }}
              >
                {profile.subtitle}
              </p>

              <p
                className="rise mt-6 max-w-xl text-body-lg text-muted-foreground text-pretty"
                style={{ animationDelay: "340ms" }}
              >
                {profile.bio}
              </p>

              <div
                className="rise mt-8 flex flex-wrap items-center gap-3"
                style={{ animationDelay: "420ms" }}
              >
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
                  className="group inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-3 text-body font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Download
                    className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                    aria-hidden
                  />
                  Download CV
                </a>
              </div>
            </div>

            {/* Identity and focus. Sits inside the same pane, divided by a
                hairline rather than a second border. */}
            <div className="min-w-0 lg:border-l lg:border-border lg:pl-12">
              <div className="flex flex-col gap-6 sm:flex-row lg:flex-col xl:flex-row">
                <div className="shrink-0">
                  <span className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border border-primary/40 shadow-glow">
                    <img
                      src="/ok-karthik.png"
                      alt={profile.name}
                      width={144}
                      height={144}
                      loading="eager"
                      decoding="async"
                      className="h-full w-full object-cover text-small text-muted-foreground"
                    />
                  </span>
                  <ul className="mt-5 flex gap-4 sm:flex-col sm:gap-2.5 lg:flex-row lg:gap-4 xl:flex-col xl:gap-2.5">
                    {[
                      { href: profile.social.github, Icon: Github, label: "GitHub" },
                      { href: profile.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
                      { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
                    ].map(({ href, Icon, label }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={href.startsWith("mailto:") ? undefined : "_blank"}
                          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                        >
                          <Icon className="h-4 w-4" aria-hidden />
                          <span className="text-small font-medium">{label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="label mb-4">Focus areas</p>
                  <ul className="space-y-3.5">
                    {focusAreas.map((area, i) => (
                      <li key={area.name} className="flex gap-3">
                        <span
                          className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${focusDots[i % focusDots.length]}`}
                          aria-hidden
                        />
                        <div className="min-w-0">
                          <div className="text-body font-semibold text-foreground">{area.name}</div>
                          <div className="text-small text-muted-foreground">{area.detail}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Fused stat strip. Same pane, hairline divisions. */}
          <dl
            className="rise grid grid-cols-1 border-t border-border sm:grid-cols-3"
            style={{ animationDelay: "560ms" }}
          >
            {stats.map((stat, i) => (
              // Column-reverse so the number reads first while `dt` still
              // precedes its `dd` in the DOM, which the markup audit requires.
              <div
                key={stat.label}
                className={`flex flex-col-reverse gap-1 px-7 py-5 sm:px-8 sm:py-6 ${
                  i > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""
                }`}
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
          </dl>
        </div>
      </div>
    </section>
  )
}
