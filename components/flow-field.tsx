"use client"

import { useEffect, useRef } from "react"

/**
 * Flow field — alternative background to <NeuralMesh />.
 *
 * Particles ride a slowly-rotating noise field and leave fading trails, so the
 * page reads as something *moving through* a system rather than a static
 * lattice. That is closer to what the site is about (requests, packets and
 * jobs traversing infrastructure) than a constellation, and it is far less
 * common than the particles-and-lines look every DevOps portfolio uses.
 *
 * Cost is O(n) per frame with no pair loop. Trails come from compositing —
 * `destination-out` erases a little alpha each frame — rather than from
 * storing history per particle, so memory is flat.
 */

const PARTICLE_COUNT = 260
const NOISE_SCALE = 0.0016
const SPEED = 0.55
const TRAIL_FADE = 0.055
const POINTER_RADIUS = 200

/** Cheap 2D value noise. A gradient-noise library would be overkill here. */
function hash(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}

function smooth(t: number) {
  return t * t * (3 - 2 * t)
}

function noise2d(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = smooth(xf)
  const v = smooth(yf)
  const a = hash(xi, yi)
  const b = hash(xi + 1, yi)
  const c = hash(xi, yi + 1)
  const d = hash(xi + 1, yi + 1)
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v
}

type P = { x: number; y: number; life: number }

export function FlowField() {
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
    let running = false
    let t = 0
    let particles: P[] = []
    const pointer = { x: -9999, y: -9999 }

    const readAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--field-dot").trim() ||
      "43, 200, 221"
    let accent = readAccent()

    const spawn = (): P => ({
      x: Math.random() * width,
      y: Math.random() * height,
      life: Math.random() * 220 + 60,
    })

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: PARTICLE_COUNT }, spawn)
      ctx.clearRect(0, 0, width, height)
    }

    const draw = (animate: boolean) => {
      if (animate) {
        // Erase a little alpha instead of clearing, which leaves trails while
        // keeping the canvas transparent over the page background.
        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = "source-over"
      } else {
        ctx.clearRect(0, 0, width, height)
      }

      ctx.lineCap = "round"

      for (const p of particles) {
        const angle = noise2d(p.x * NOISE_SCALE, p.y * NOISE_SCALE + t) * Math.PI * 4

        let vx = Math.cos(angle) * SPEED
        let vy = Math.sin(angle) * SPEED

        // Pointer pushes the flow outward — the field parts around the cursor.
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const dist = Math.hypot(dx, dy)
        let near = 0
        if (dist < POINTER_RADIUS) {
          near = 1 - dist / POINTER_RADIUS
          vx += (dx / (dist || 1)) * near * 1.9
          vy += (dy / (dist || 1)) * near * 1.9
        }

        const px = p.x
        const py = p.y
        p.x += vx
        p.y += vy
        p.life -= 1

        if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          Object.assign(p, spawn())
          continue
        }

        ctx.beginPath()
        ctx.moveTo(px, py)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = `rgba(${accent}, ${0.18 + near * 0.5})`
        ctx.lineWidth = 0.9 + near * 1.2
        ctx.stroke()
      }

      t += 0.0016
    }

    const loop = () => {
      if (!running) return
      draw(true)
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
      if (motionQuery.matches) draw(false)
      else start()
    }

    const themeObserver = new MutationObserver(() => {
      accent = readAccent()
      ctx.clearRect(0, 0, width, height)
      if (motionQuery.matches) draw(false)
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

    if (motionQuery.matches) draw(false)
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
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        opacity: "var(--mesh-opacity, 0.5)",
        maskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 72%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 72%)",
      }}
    />
  )
}
