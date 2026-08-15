"use client"

import { useState } from "react"
import { PlatformDeck, platformLayers } from "@/components/skins/platform-deck"

/**
 * "Three layers, one owner" — the deck moment inside Aurora.
 *
 * The single hardest thing to say on a platform CV is *how far down the stack
 * you go*, because every layer sounds like the others written as a bullet
 * list. Three planes in one perspective, each carrying the tools that run at
 * that tier, say it in a glance.
 *
 * Hovering or focusing a row lights its plane, so the list and the object are
 * the same thing seen twice rather than a diagram with a caption. The layer
 * data lives in `platform-deck.tsx`, shared with Spatial.
 */
export function AuroraLayers() {
  const [lit, setLit] = useState<string | null>(null)

  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="glass sheen overflow-hidden rounded-2xl">
          <div className="grid items-center gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:p-12">
            <div className="min-w-0">
              <p className="label rule-label mb-4">The stack</p>
              <h2 className="font-display text-display font-semibold tracking-tight text-foreground text-balance">
                Three layers, one owner
              </h2>
              <p className="mt-4 max-w-lg text-body-lg text-muted-foreground text-pretty">
                Most platform work stops at one tier. These are the three Karthik builds, runs and
                is on call for — the reason a single person can take a service from a Terraform
                module to a burn-rate alert without a handover.
              </p>

              <ul className="mt-8 divide-y divide-border border-y border-border">
                {platformLayers.map((layer) => (
                  <li key={layer.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setLit(layer.id)}
                      onMouseLeave={() => setLit(null)}
                      onFocus={() => setLit(layer.id)}
                      onBlur={() => setLit(null)}
                      className="group flex w-full items-baseline gap-4 py-4 text-left"
                      aria-pressed={lit === layer.id}
                    >
                      <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          lit === layer.id ? "bg-primary" : "bg-border-strong"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span
                          className={`block text-body font-semibold transition-colors ${
                            lit === layer.id ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {layer.name}
                        </span>
                        <span className="mt-0.5 block text-small text-muted-foreground">
                          {layer.detail}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <PlatformDeck
              lit={lit}
              className="mx-auto h-[320px] w-full max-w-[440px] sm:h-[380px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
