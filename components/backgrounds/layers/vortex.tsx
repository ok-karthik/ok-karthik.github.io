import { Layer } from '../types'

export function createParticleVortexLayer(id: string, label: string): Layer {
  let width = 0
  let height = 0
  let isLightMode = false
  
  const center = { x: 0, y: 0 }

  class Particle {
    radius: number
    angle: number
    speed: number
    size: number
    colorPhase: number

    constructor(w: number, h: number) {
      const maxRadius = Math.max(w, h)
      this.radius = Math.pow(Math.random(), 2) * maxRadius
      this.angle = Math.random() * Math.PI * 2
      this.speed = (0.001 + Math.random() * 0.002) * (Math.random() > 0.5 ? 1 : -1)
      this.size = Math.random() * 1.5 + 0.5
      this.colorPhase = Math.random() * Math.PI * 2
    }

    update(w: number, h: number) {
      this.angle += this.speed
      this.radius += 0.2
      
      const maxRadius = Math.max(w, h)
      if (this.radius > maxRadius) {
        this.radius = 0
        this.angle = Math.random() * Math.PI * 2
      }
    }

    draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, isLight: boolean) {
      const x = centerX + Math.cos(this.angle) * this.radius
      const y = centerY + Math.sin(this.angle) * this.radius
      
      const huePhase = (this.angle + this.colorPhase + this.radius * 0.005) % (Math.PI * 2)
      const hue = 155 + Math.sin(huePhase) * 125 
      
      ctx.beginPath()
      ctx.arc(x, y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${hue}, 90%, ${!isLight ? '65%' : '50%'}, ${!isLight ? 0.7 : 0.5})`
      ctx.fill()
    }
  }

  let particles: Particle[] = []

  return {
    id,
    label,
    scope: 'page', // Swirls the whole page
    init(ctx, w, h, budget, lightMode) {
      width = w
      height = h
      isLightMode = lightMode
      
      center.x = w / 2
      center.y = h / 2

      particles = []
      // Budget handles the count
      for (let i = 0; i < budget; i++) {
        particles.push(new Particle(w, h))
      }
    },
    draw(ctx, t, pointer) {
      if (pointer.active) {
        center.x += (pointer.x - center.x) * 0.05
        center.y += (pointer.y - center.y) * 0.05
      } else {
        center.x += ((width / 2) - center.x) * 0.05
        center.y += ((height / 2) - center.y) * 0.05
      }

      particles.forEach(p => {
        p.update(width, height)
        p.draw(ctx, center.x, center.y, isLightMode)
      })
    },
    dispose() {
      particles = []
    }
  }
}
