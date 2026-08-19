import { Layer } from '../types'

const LINK_DIST = 130
const POINTER_DIST = 190

type Particle = { x: number; y: number; vx: number; vy: number; r: number }

export function createNeuralMeshLayer(id: string, label: string): Layer {
  let width = 0
  let height = 0
  let particles: Particle[] = []
  let accent = "43, 200, 221"
  let isLightMode = false
  
  return {
    id,
    label,
    scope: 'page', // Neural mesh runs over the whole page behind everything
    init(ctx, w, h, budget, lightMode) {
      width = w
      height = h
      isLightMode = lightMode
      
      const count = Math.min(budget, 320)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.4 + 0.6,
      }))
      
      const computedAccent = getComputedStyle(document.documentElement).getPropertyValue("--field-dot").trim()
      if (computedAccent) {
        accent = computedAccent
      }
    },
    draw(ctx, t, pointer) {
      // Particles movement
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

      // Spatial hash for efficient distance checks
      const cols = Math.max(1, Math.ceil(width / LINK_DIST))
      const rows = Math.max(1, Math.ceil(height / LINK_DIST))
      const cells: number[][] = Array.from({ length: cols * rows }, () => [])
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / LINK_DIST)))
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / LINK_DIST)))
        cells[cy * cols + cx].push(i)
      }

      ctx.lineWidth = 1
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const bucket = cells[cy * cols + cx]
          if (bucket.length === 0) continue

          for (const [ox, oy] of [[0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]) {
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

      // Pointer interactions
      if (pointer.active) {
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
    },
    dispose() {
      particles = []
    }
  }
}
