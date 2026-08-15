import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"
import { CountUp } from "@/components/count-up"
import { Field } from "./parts"

/**
 * The title block.
 *
 * On a real drawing the title block is the first thing you read and the only
 * part guaranteed to be filled in: what this is, who drew it, at what scale,
 * which revision. That maps exactly onto the four facts a recruiter screens
 * for — role, location, availability, and how current the document is — so
 * the convention is carrying information here, not costume.
 *
 * The name is set in Barlow Condensed caps at sheet scale. Condensed caps are
 * the single strongest signal in this direction and they cost nothing in
 * legibility at display size, which is the only size they appear at.
 */
export function BlueprintHero() {
  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-28 md:pt-32">
        <div className="rise border border-border-strong bg-card">
          {/* Title block, drawn as cells rather than as a padded box: the
              portrait gets its own framed corner with a rule between, the way
              a drawing's stamp does. Left as a flex gap it read as a small
              photo marooned in a metre of white paper. */}
          <div className="grid lg:grid-cols-[1fr_auto]">
            <div className="min-w-0 p-7 sm:p-10">
              <p className="label">Portfolio · Sheet 01 · General arrangement</p>
              <h1 className="mt-3 font-display text-[clamp(2.75rem,10vw,5.75rem)] font-semibold uppercase leading-[0.9] tracking-[-0.01em] text-foreground">
                {profile.name}
              </h1>
              <p className="mt-4 max-w-xl font-display text-h3 font-semibold uppercase tracking-wide text-primary">
                {profile.title}
              </p>
              <p className="mt-1.5 font-mono text-small text-muted-foreground">
                {profile.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-center border-t border-border-strong p-6 lg:border-l lg:border-t-0 lg:p-8">
              <img
                src="/ok-karthik.png"
                alt={profile.name}
                width={144}
                height={144}
                loading="eager"
                decoding="async"
                className="h-32 w-32 border border-border-strong object-cover text-small text-muted-foreground grayscale lg:h-44 lg:w-44"
              />
            </div>
          </div>

          <dl className="grid grid-cols-1 divide-y divide-border-strong border-t border-border-strong sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            <Field label="Discipline">Platform engineering / SRE</Field>
            <Field label="Location">
              {profile.location.city}, {profile.location.country}
            </Field>
            <Field label="Status">Open · {profile.location.availability}</Field>
            <Field label="Right to work">{profile.location.visa}</Field>
          </dl>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_1fr]">
          <div className="min-w-0">
            <p className="max-w-2xl text-body-lg leading-relaxed text-foreground/85 text-pretty">
              {profile.bio}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="bg-primary px-5 py-3 text-body font-semibold uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-90"
              >
                View drawings
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 border border-border-strong px-5 py-3 text-body font-medium uppercase tracking-wide text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Download
                  className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                  aria-hidden
                />
                Download CV
              </a>
              <ul className="flex items-center gap-4 sm:ml-2">
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
                      aria-label={label}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Figures, annotated the way a drawing annotates a measurement:
                the value large, the thing measured underneath it in caps. */}
            <dl className="mt-9 grid grid-cols-1 gap-px border border-border-strong bg-border-strong sm:grid-cols-3">
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1 bg-card p-5">
                  <dt className="label">{stat.label}</dt>
                  <dd>
                    <CountUp
                      value={stat.value}
                      className={`tabular font-display text-h2 font-semibold tracking-tight ${
                        i === 0 ? "text-primary" : "text-foreground"
                      }`}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="min-w-0">
            <p className="label mb-4">Scope of work</p>
            <ol className="border-t border-border">
              {focusAreas.map((area, i) => (
                <li
                  key={area.name}
                  className="flex items-baseline gap-4 border-b border-border py-3.5"
                >
                  <span className="shrink-0 font-mono text-micro tabular text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-body font-semibold uppercase tracking-wide text-foreground">
                      {area.name}
                    </span>
                    <span className="block text-small text-muted-foreground">{area.detail}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
