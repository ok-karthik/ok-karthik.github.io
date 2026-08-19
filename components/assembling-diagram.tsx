"use client"

import { useEffect, useRef, useState } from "react"
import { ArchitecturePreview } from "@/components/architecture"

/**
 * An architecture preview that draws itself when it scrolls into view.
 *
 * The reveal is a left-to-right clip wipe with a bright edge travelling ahead
 * of it (`.assemble` in globals.css), which reads as the diagram being drawn
 * rather than faded in. It fires **once** — a diagram that re-animates every
 * time it re-enters the viewport stops being a flourish and becomes a tic.
 *
 * Chosen over authoring five animated SVGs: these diagrams are real DOM built
 * in `architecture.tsx` and they are the source of truth for the project
 * pages. Forking them into SVG copies would mean two versions of the same
 * architecture drifting apart, which is the failure this repo already records
 * for the project content.
 */
export function AssemblingDiagram({
  slug,
  className,
  fadeFrom,
}: {
  slug: string
  className?: string
  fadeFrom?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={drawn ? "assemble relative overflow-hidden rounded-lg" : "relative"}>
      <ArchitecturePreview slug={slug} className={className} fadeFrom={fadeFrom} />
    </div>
  )
}
