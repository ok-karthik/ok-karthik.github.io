"use client"

import { useEffect, useRef } from "react"

/**
 * Ambient background field.
 *
 * Replaces the old NeuralMesh, which compared every particle against every
 * other one — ~307 particles on a 1440p screen meant ~47,000 distance checks
 * per frame, forever, with no visibility or reduced-motion gate.
 *
 * This is a fixed lattice instead of free particles, so the work is O(n) in
 * dots with no pair loop: each dot only ever measures itself against the
 * pointer. It also stops entirely when the tab is hidden, and renders a single
 * static frame when the visitor prefers reduced motion.
 */

const SPACING = 54
const DOT_RADIUS = 1.1
const DRIFT = 3.2
const POINTER_RADIUS = 170

export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let raf = 0
    let width = 0
    let height = 0
    let cols = 0
    let rows = 0
    let running = true
    const pointer = { x: -9999, y: -9999 }

    const readAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--field-dot").trim() ||
      "43, 200, 221"

    let accent = readAccent()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / SPACING) + 1
      rows = Math.ceil(height / SPACING) + 1
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      const t = time * 0.00035

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const baseX = col * SPACING
          const baseY = row * SPACING

          // Cheap organic drift: phase varies by lattice position, so the
          // field breathes without any per-dot state to store.
          const phase = (col + row) * 0.6
          const x = reduceMotion ? baseX : baseX + Math.sin(t + phase) * DRIFT
          const y = reduceMotion ? baseY : baseY + Math.cos(t * 0.85 + phase) * DRIFT

          const dx = x - pointer.x
          const dy = y - pointer.y
          const dist = Math.hypot(dx, dy)
          const near = dist < POINTER_RADIUS ? 1 - dist / POINTER_RADIUS : 0

          const alpha = 0.16 + near * 0.6
          const radius = DOT_RADIUS + near * 1.5

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accent}, ${alpha})`
          ctx.fill()

          // Connector only inside the pointer radius — a bounded subset, so
          // this never becomes the pair loop the old version ran.
          if (near > 0.15) {
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.strokeStyle = `rgba(${accent}, ${near * 0.22})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const loop = (time: number) => {
      if (!running) return
      draw(time)
      raf = requestAnimationFrame(loop)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const onVisibility = () => {
      if (document.hidden) {
        running = false
        cancelAnimationFrame(raf)
      } else if (!reduceMotion) {
        running = true
        raf = requestAnimationFrame(loop)
      }
    }

    // Re-read the accent when the theme class flips.
    const themeObserver = new MutationObserver(() => {
      accent = readAccent()
      if (reduceMotion) draw(0)
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    resize()
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)

    if (reduceMotion) {
      // One static frame, no loop, no pointer tracking.
      draw(0)
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true })
      document.addEventListener("pointerleave", onPointerLeave)
      raf = requestAnimationFrame(loop)
    }

    return () => {
      running = false
      cancelAnimationFrame(raf)
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 dark:opacity-60"
    />
  )
}
