"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParticleVortex() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    // Mouse tracking
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const center = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    
    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      radius: number
      angle: number
      speed: number
      size: number
      colorPhase: number

      constructor(w: number, h: number) {
        // More particles closer to the center, spreading out
        const maxRadius = Math.max(w, h)
        // Power distribution pushes more towards center
        this.radius = Math.pow(Math.random(), 2) * maxRadius
        this.angle = Math.random() * Math.PI * 2
        
        // Speed depends on radius (faster near center, slower further out)
        // Base swirl speed
        this.speed = (0.001 + Math.random() * 0.002) * (Math.random() > 0.5 ? 1 : -1)
        
        // Smaller dots
        this.size = Math.random() * 1.5 + 0.5
        
        // Color phase for gradient
        this.colorPhase = Math.random() * Math.PI * 2
      }

      update() {
        this.angle += this.speed
        // Very slow outward drift
        this.radius += 0.2
        
        const maxRadius = Math.max(canvas.width, canvas.height)
        if (this.radius > maxRadius) {
          this.radius = 0
          this.angle = Math.random() * Math.PI * 2
        }
      }

      draw(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, isDark: boolean) {
        const x = centerX + Math.cos(this.angle) * this.radius
        const y = centerY + Math.sin(this.angle) * this.radius
        
        // Gradient mapping inspired by the image: blue -> purple -> pink -> orange
        // Hue mapping: 220 (blue) to 30 (orange)
        const huePhase = (this.angle + this.colorPhase + this.radius * 0.005) % (Math.PI * 2)
        // Map sine wave (-1 to 1) to hue range 30 to 280
        const hue = 155 + Math.sin(huePhase) * 125 
        
        ctx.beginPath()
        ctx.arc(x, y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${hue}, 90%, ${isDark ? '65%' : '50%'}, ${isDark ? 0.7 : 0.5})`
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles = []
      // High density of particles
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 3000)
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      // Clear with slight trailing effect
      const isDark = document.documentElement.classList.contains("dark")
      
      // Full clear is cleaner for dots, trail is good for dashes
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Smoothly interpolate center towards mouse
      center.x += (mouse.x - center.x) * 0.05
      center.y += (mouse.y - center.y) * 0.05

      particles.forEach(p => {
        p.update()
        p.draw(ctx, center.x, center.y, isDark)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    
    handleResize()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none opacity-100"
    />
  )
}
