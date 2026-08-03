import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"

/** Accent per focus area — index-aligned with `focusAreas`. */
const focusDots = ["bg-primary", "bg-violet-400", "bg-sky-400", "bg-ok"]

export function HeroSection() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32">
        <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
          {/* Left: the claim */}
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-ok/30 bg-ok/10 px-3 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
              </span>
              <span className="font-mono text-micro uppercase tracking-[0.09em] text-ok">
                Open to opportunities
              </span>
            </div>

            <h1 className="mt-6 font-display text-display font-bold tracking-tight text-foreground md:text-display-lg">
              {profile.name}
            </h1>
            <p className="mt-3 font-display text-h3 font-semibold text-primary">
              {profile.title}
            </p>
            <p className="mt-1.5 font-mono text-small text-muted-foreground">
              {profile.subtitle}
            </p>

            <p className="mt-6 max-w-xl text-body-lg text-muted-foreground">{profile.bio}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-lg bg-primary px-5 py-3 text-body font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90"
              >
                View work
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

            {/* Stat tiles */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass glass-hover rounded-xl px-4 py-4 text-center"
                >
                  <div className="tabular font-mono text-h2 font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="label mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: profile card */}
          <aside className="glass relative overflow-hidden rounded-2xl p-6 md:p-7">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl"
              aria-hidden
            />

            <div className="relative flex items-center gap-5">
              <img
                src="https://github.com/ok-karthik.png"
                alt={`${profile.name}, ${profile.title}`}
                width={112}
                height={112}
                loading="eager"
                decoding="async"
                className="h-24 w-24 shrink-0 rounded-full border-2 border-primary/40 object-cover shadow-glow md:h-28 md:w-28"
              />
              <div className="min-w-0">
                <p className="label">Based</p>
                <p className="mt-1 text-body text-foreground">
                  {profile.location.city}, {profile.location.country}
                </p>
                <p className="mt-0.5 text-small text-muted-foreground">
                  {profile.location.availability}
                </p>
                <p className="mt-2 font-mono text-micro text-muted-foreground">
                  {profile.location.visa}
                </p>
              </div>
            </div>

            <div className="relative mt-7">
              <p className="label mb-4">Focus areas</p>
              <ul className="space-y-4">
                {focusAreas.map((area, i) => (
                  <li key={area.name} className="group flex gap-3">
                    <span
                      className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${focusDots[i % focusDots.length]} transition-transform group-hover:scale-150`}
                    />
                    <div>
                      <div className="text-body font-semibold text-foreground">{area.name}</div>
                      <div className="text-small text-muted-foreground">{area.detail}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mt-7 flex items-center justify-around border-t border-border pt-5">
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
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden />
                  <span className="text-small font-medium">{label}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
