"use client"

import { useEffect, useRef } from "react"

/**
 * Aurora's luminous drifting light canvas.
 */
const BLOOMS = [
  { v: "--aur-1", x: 0.24, y: 0.26, r: 0.62, s: 0.000105 },
  { v: "--aur-2", x: 0.78, y: 0.3, r: 0.54, s: 0.000155 },
  { v: "--aur-3", x: 0.52, y: 0.84, r: 0.58, s: 0.000125 },
]

export function AuroraBackdrop() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let raf = 0
    let running = false

    const colours = () => {
      const css = getComputedStyle(document.documentElement)
      return BLOOMS.map((b) => css.getPropertyValue(b.v).trim() || "108,192,240")
    }
    let rgb = colours()

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = "source-over"
      BLOOMS.forEach((b, i) => {
        const px = (b.x + Math.sin(t * b.s + i * 2.2) * 0.1) * w
        const py = (b.y + Math.cos(t * b.s * 1.25 + i) * 0.08) * h
        const rad = b.r * Math.max(w, h) * 0.9
        const g = ctx.createRadialGradient(px, py, 0, px, py, rad)
        g.addColorStop(0, `rgba(${rgb[i]}, 0.08)`)
        g.addColorStop(0.5, `rgba(${rgb[i]}, 0.03)`)
        g.addColorStop(1, `rgba(${rgb[i]}, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, rad, 0, Math.PI * 2)
        ctx.fill()
      })
      if (running) raf = requestAnimationFrame(draw)
    }

    const start = () => {
      if (running || reduced.matches) return
      running = true
      raf = requestAnimationFrame(draw)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onResize = () => {
      size()
      if (!running) draw(0)
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const observer = new MutationObserver(() => {
      rgb = colours()
      if (!running) draw(0)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-skin"],
    })

    size()
    draw(0)
    start()

    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVisibility)
    reduced.addEventListener("change", () => (reduced.matches ? stop() : start()))

    return () => {
      stop()
      observer.disconnect()
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        maskImage: "linear-gradient(to bottom, black 0%, black 36%, transparent 68%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 36%, transparent 68%)",
      }}
    >
      <canvas ref={ref} className="h-full w-full mix-blend-screen opacity-70" />
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
