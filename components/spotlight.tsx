"use client"

import { useEffect } from "react"

/**
 * Cursor spotlight for every `.glass` panel.
 *
 * Mounted once. Rather than wrapping each card in a stateful component, this
 * delegates a single passive pointermove listener on the document and writes
 * --mx/--my onto whichever glass panel is under the cursor. The gradient
 * itself lives in the `glass` utility, so any panel gets the effect for free.
 *
 * Writes are throttled to one per animation frame — pointermove fires far
 * faster than the screen refreshes, and setting a custom property on every
 * event is the easy way to make this expensive.
 */
export function Spotlight() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // Touch devices have no hover, so the effect is pure overhead there.
    if (!window.matchMedia("(hover: hover)").matches) return

    let frame = 0
    let pending: { el: HTMLElement; x: number; y: number } | null = null
    let last: HTMLElement | null = null

    const flush = () => {
      frame = 0
      if (!pending) return
      pending.el.style.setProperty("--mx", `${pending.x}px`)
      pending.el.style.setProperty("--my", `${pending.y}px`)
      pending = null
    }

    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null
      const panel = target?.closest<HTMLElement>(".glass") ?? null

      if (panel !== last) {
        last?.style.removeProperty("--mx")
        last?.style.removeProperty("--my")
        last = panel
      }
      if (!panel) return

      const rect = panel.getBoundingClientRect()
      pending = { el: panel, x: e.clientX - rect.left, y: e.clientY - rect.top }
      if (!frame) frame = requestAnimationFrame(flush)
    }

    document.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      document.removeEventListener("pointermove", onMove)
      if (frame) cancelAnimationFrame(frame)
      last?.style.removeProperty("--mx")
      last?.style.removeProperty("--my")
    }
  }, [])

  return null
}
