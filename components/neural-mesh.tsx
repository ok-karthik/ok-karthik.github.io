"use client"

import { useEffect, useRef } from "react"

/**
 * Interactive neural mesh — the original effect, with the algorithm fixed.
 *
 * Visually this is the version from `main`: drifting particles, faint links
 * between near neighbours, and brighter links to the pointer. That look was
 * right; what was wrong was how it got there. The old version compared every
 * particle against every other one, so a 1440p screen ran ~307 particles ->
 * ~47,000 distance checks *per frame*, forever, with no pause when hidden and
 * no reduced-motion path.
 *
 * Here the particles are binned into a uniform grid whose cell size equals the
 * link distance, so each particle only tests the 8 neighbouring cells plus its
 * own. Same output, roughly an order of magnitude less work, and it now stops
 * when the tab is hidden.
 */

const DENSITY = 13000 // px² per particle
const LINK_DIST = 130
const POINTER_DIST = 190
const MAX_PARTICLES = 320

type Particle = { x: number; y: number; vx: number; vy: number; r: number }

export function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    let raf = 0
    let width = 0
    let height = 0
    let particles: Particle[] = []
    let running = false
    const pointer = { x: -9999, y: -9999 }

    const readAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--field-dot").trim() ||
      "43, 200, 221"
    let accent = readAccent()

    const init = () => {
      const count = Math.min(Math.floor((width * height) / DENSITY), MAX_PARTICLES)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    // Uniform spatial hash. Cell size == link distance, so any pair close
    // enough to link must share a cell or be in one of the 8 around it.
    const buildGrid = () => {
      const cols = Math.max(1, Math.ceil(width / LINK_DIST))
      const rows = Math.max(1, Math.ceil(height / LINK_DIST))
      const cells: number[][] = Array.from({ length: cols * rows }, () => [])
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / LINK_DIST)))
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / LINK_DIST)))
        cells[cy * cols + cx].push(i)
      }
      return { cells, cols, rows }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accent}, 0.55)`
        ctx.fill()
      }

      const { cells, cols, rows } = buildGrid()

      ctx.lineWidth = 1
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const bucket = cells[cy * cols + cx]
          if (bucket.length === 0) continue

          // Own cell + the 4 forward neighbours, so each pair is visited once.
          for (const [ox, oy] of [
            [0, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1],
          ]) {
            const nx = cx + ox
            const ny = cy + oy
            if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue
            const other = cells[ny * cols + nx]

            for (let a = 0; a < bucket.length; a++) {
              const pa = particles[bucket[a]]
              const startIdx = ox === 0 && oy === 0 ? a + 1 : 0
              for (let b = startIdx; b < other.length; b++) {
                const pb = particles[other[b]]
                const dx = pa.x - pb.x
                const dy = pa.y - pb.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist >= LINK_DIST) continue

                ctx.beginPath()
                ctx.moveTo(pa.x, pa.y)
                ctx.lineTo(pb.x, pb.y)
                ctx.strokeStyle = `rgba(${accent}, ${0.18 * (1 - dist / LINK_DIST)})`
                ctx.stroke()
              }
            }
          }
        }
      }

      // Pointer links — one pass over particles, drawn brighter.
      if (pointer.x > -9999) {
        ctx.lineWidth = 1.4
        for (const p of particles) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist >= POINTER_DIST) continue

          const strength = 1 - dist / POINTER_DIST
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(pointer.x, pointer.y)
          ctx.strokeStyle = `rgba(${accent}, ${strength * 0.42})`
          ctx.stroke()

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.r + strength * 1.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${accent}, ${0.4 + strength * 0.5})`
          ctx.fill()
        }
      }
    }

    const loop = () => {
      if (!running) return
      draw()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || motionQuery.matches || document.hidden) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    const onMotionChange = () => {
      stop()
      if (motionQuery.matches) draw()
      else start()
    }

    const themeObserver = new MutationObserver(() => {
      accent = readAccent()
      if (motionQuery.matches) draw()
    })
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibility)
    motionQuery.addEventListener("change", onMotionChange)

    if (motionQuery.matches) draw()
    else start()

    return () => {
      stop()
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibility)
      motionQuery.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 dark:opacity-50"
    />
  )
}
