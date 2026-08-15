"use client"

import { useState } from "react"
import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"
import { CountUp } from "@/components/count-up"

/**
 * Spatial leads with the object.
 *
 * Aurora shows the deck once, halfway down, as a supporting section. Here it
 * *is* the hero image — the first thing on the page is a three-tier platform
 * seen in perspective, with the focus areas below it acting as its legend.
 * That is the whole difference in argument between the two designs: one opens
 * with a claim on glass, the other opens with the thing being claimed.
 *
 * Type is Manrope, wider and rounder than Aurora's Geist, and the panels are
 * opaque — depth here is shadow and elevation, never transparency.
 */
const PLANES = [
  { id: "workloads", name: "Workloads", detail: "OTel · LGTM · SLOs" },
  { id: "control-plane", name: "Control plane", detail: "Kubernetes · Argo CD · Helm" },
  { id: "foundation", name: "Foundation", detail: "Terraform · AWS · Azure · GCP" },
]

export function SpatialHero() {
  const [lit, setLit] = useState<string | null>(null)

  return (
    <section id="top" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-28 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_440px] lg:gap-16">
          <div className="min-w-0">
            {/* Portrait sits on the eyebrow line rather than in a card. The
                deck is this design's one large object; a second framed image
                beside it would split the reader's attention in two. */}
            <div className="rise flex items-center gap-4" style={{ animationDelay: "60ms" }}>
              <img
                src="/ok-karthik.png"
                alt={profile.name}
                width={144}
                height={144}
                loading="eager"
                decoding="async"
                className="h-14 w-14 shrink-0 rounded-full border border-border object-cover text-small text-muted-foreground"
              />
              <p className="inline-flex items-center gap-2 text-small font-medium text-primary">
                <span className="breathe h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                Open to opportunities · {profile.location.availability}
              </p>
            </div>

            <h1
              className="rise mt-5 font-display text-display font-extrabold leading-[1.02] tracking-[-0.03em] text-foreground text-balance md:text-display-lg"
              style={{ animationDelay: "140ms" }}
            >
              {profile.name}
            </h1>
            <p
              className="rise mt-4 text-h3 font-semibold text-foreground/85"
              style={{ animationDelay: "200ms" }}
            >
              {profile.title}
            </p>
            <p
              className="rise mt-1.5 font-mono text-small text-muted-foreground"
              style={{ animationDelay: "250ms" }}
            >
              {profile.subtitle}
            </p>

            <p
              className="rise mt-6 max-w-xl text-body-lg text-muted-foreground text-pretty"
              style={{ animationDelay: "320ms" }}
            >
              {profile.bio}
            </p>

            <div
              className="rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "400ms" }}
            >
              <a
                href="#projects"
                className="rounded-lg bg-primary px-5 py-3 text-body font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
              >
                View projects
              </a>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-body font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
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
                      className="text-muted-foreground transition-colors hover:text-primary"
                      aria-label={label}
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats as a measured row, not three cards. Spatial spends its
                elevation on the deck and the project cards; a stat that needs
                a box around it to be noticed isn't a strong enough stat. */}
            <dl
              className="rise mt-10 flex flex-wrap items-stretch gap-x-10 gap-y-6 border-t border-border pt-7"
              style={{ animationDelay: "480ms" }}
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col-reverse gap-1">
                  <dt className="label">{stat.label}</dt>
                  <dd>
                    <CountUp
                      value={stat.value}
                      className={`tabular text-h2 font-extrabold tracking-tight ${
                        i === 0 ? "text-primary" : "text-foreground"
                      }`}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The object, and its legend. */}
          <div className="min-w-0">
            <div
              aria-hidden
              className="deck-scene relative mx-auto h-[300px] w-full max-w-[400px] sm:h-[380px]"
            >
              <div className="deck">
                {PLANES.map((plane, i) => (
                  <div
                    key={plane.id}
                    className="deck-layer"
                    data-lit={lit === plane.id ? "true" : "false"}
                    style={{ transform: `translateZ(${(PLANES.length - 1 - i) * 66}px)` }}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-6 divide-y divide-border border-y border-border">
              {PLANES.map((plane) => (
                <li key={plane.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setLit(plane.id)}
                    onMouseLeave={() => setLit(null)}
                    onFocus={() => setLit(plane.id)}
                    onBlur={() => setLit(null)}
                    aria-pressed={lit === plane.id}
                    className="flex w-full items-baseline justify-between gap-4 py-3 text-left"
                  >
                    <span
                      className={`text-body font-semibold transition-colors ${
                        lit === plane.id ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {plane.name}
                    </span>
                    <span className="font-mono text-micro text-muted-foreground">
                      {plane.detail}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="label mt-5">
              Focus · {focusAreas.map((a) => a.name).join(" / ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
