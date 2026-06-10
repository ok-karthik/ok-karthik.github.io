"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []

    const mouse = { x: -1000, y: -1000 }
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }
    
    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number

      constructor(w: number, h: number) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.7
        this.vy = (Math.random() - 0.5) * 0.7
        this.radius = Math.random() * 1.5 + 0.5
      }

      update(w: number, h: number) {
        this.x += this.vx
        this.y += this.vy
        
        if (this.x < 0 || this.x > w) this.vx *= -1
        if (this.y < 0 || this.y > h) this.vy *= -1
      }

      draw(ctx: CanvasRenderingContext2D, color: string) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 12000)
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const isDark = document.documentElement.classList.contains("dark")
      const baseColor = isDark ? "0, 255, 231" : "2, 132, 199" // --primary RGB

      particles.forEach(p => {
        p.update(canvas.width, canvas.height)
        p.draw(ctx, `rgba(${baseColor}, 0.5)`)
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        // Connect to mouse
        const dxMouse = particles[i].x - mouse.x
        const dyMouse = particles[i].y - mouse.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
        if (distMouse < 180) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(${baseColor}, ${0.3 - distMouse / 180 * 0.3})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${baseColor}, ${0.15 - dist / 120 * 0.15})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    
    handleResize()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-80 dark:opacity-40"
    />
  )
}
