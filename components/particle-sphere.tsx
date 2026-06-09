"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")
    
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0
    let currentRotationX = 0
    let currentRotationY = 0
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
      targetRotationY = mouseX * 0.2 
      targetRotationX = mouseY * 0.1
    }

    const handleMouseLeave = () => {
      targetRotationX = 0
      targetRotationY = 0
    }

    let coreRadius = 0
    let maxRadius = 0

    class Particle {
      radius: number = 0
      theta: number = 0
      phi: number = 0
      speedTheta: number = 0
      speedPhi: number = 0
      speedRadius: number = 0
      
      latticePos: { x: number, y: number, z: number }
      
      globeTheta: number = 0
      globePhi: number = 0
      globeSpeed: number = 0
      globeType: 'lat' | 'lon' = 'lat'
      
      x: number = 0
      y: number = 0
      z: number = 0

      size: number
      color: string
      dashLength: number
      
      constructor(lx: number, ly: number, lz: number) {
        this.latticePos = { x: lx, y: ly, z: lz }
        
        this.dashLength = Math.random() * 0.8 + 0.4 
        
        this.init(true)
        this.x = this.radius * Math.sin(this.phi) * Math.cos(this.theta)
        this.y = this.radius * Math.sin(this.phi) * Math.sin(this.theta)
        this.z = this.radius * Math.cos(this.phi)
        
        // Reverting particle size back to the smaller, highly majestic misty size
        this.size = Math.random() * 1.0 + 0.2 
        
        const hue = 190 + Math.random() * 30
        const lightness = isDark ? (60 + Math.random() * 40) : (20 + Math.random() * 30)
        const opacity = Math.random() * 0.25 + 0.15 
        
        this.color = `hsla(${hue}, 100%, ${lightness}%, ${opacity})`
      }

      init(isStart = false) {
        this.radius = isStart 
          ? coreRadius + Math.pow(Math.random(), 4) * (maxRadius - coreRadius)
          : coreRadius + Math.random() * 2
          
        this.theta = Math.random() * Math.PI * 2
        this.phi = Math.acos(2.0 * Math.random() - 1.0)
        
        this.speedTheta = 0.002 + Math.random() * 0.004
        this.speedPhi = (Math.random() - 0.5) * 0.001
        
        this.speedRadius = 0.01 + Math.random() * 0.05

        const isLat = Math.random() > 0.5
        if (isLat) {
            const numLatRings = 10
            this.globePhi = (Math.floor(Math.random() * numLatRings) + 1) * (Math.PI / (numLatRings + 1))
            this.globeTheta = Math.random() * Math.PI * 2
            this.globeSpeed = (Math.random() > 0.5 ? 1 : -1) * 0.002
            this.globeType = 'lat'
        } else {
            const numLonRings = 16
            this.globeTheta = Math.floor(Math.random() * numLonRings) * (Math.PI / numLonRings)
            this.globePhi = Math.random() * Math.PI
            this.globeSpeed = 0.002
            this.globeType = 'lon'
        }
      }

      update(state: string) {
        const prev = { x: this.x, y: this.y, z: this.z }
        let didReset = false

        if (state === 'swirl') {
          if (this.radius > maxRadius) {
            this.init(false)
            this.x = this.radius * Math.sin(this.phi) * Math.cos(this.theta)
            this.y = this.radius * Math.sin(this.phi) * Math.sin(this.theta)
            this.z = this.radius * Math.cos(this.phi)
            prev.x = this.x
            prev.y = this.y
            prev.z = this.z
            didReset = true
          }

          this.theta += this.speedTheta
          this.phi += this.speedPhi
          this.radius += this.speedRadius
          this.speedRadius *= 1.002 
        }

        const swirlX = this.radius * Math.sin(this.phi) * Math.cos(this.theta)
        const swirlY = this.radius * Math.sin(this.phi) * Math.sin(this.theta)
        const swirlZ = this.radius * Math.cos(this.phi)

        const wave = Math.sin(Date.now() * 0.002 + this.latticePos.y * 0.01 + this.latticePos.x * 0.01) * 15
        const latticeX = this.latticePos.x
        const latticeY = this.latticePos.y + wave
        const latticeZ = this.latticePos.z

        if (this.globeType === 'lat') {
            this.globeTheta += this.globeSpeed
        } else {
            this.globePhi += this.globeSpeed
            if (this.globePhi > Math.PI) {
                this.globePhi -= Math.PI
                this.globeTheta += Math.PI
            } else if (this.globePhi < 0) {
                this.globePhi += Math.PI
                this.globeTheta += Math.PI
            }
        }
        
        const gRadius = coreRadius * 1.15
        const globeX = gRadius * Math.sin(this.globePhi) * Math.cos(this.globeTheta)
        const globeY = gRadius * Math.sin(this.globePhi) * Math.sin(this.globeTheta)
        const globeZ = gRadius * Math.cos(this.globePhi)

        let targetX = swirlX, targetY = swirlY, targetZ = swirlZ
        if (state === 'lattice') {
            targetX = latticeX; targetY = latticeY; targetZ = latticeZ;
        } else if (state === 'globe') {
            targetX = globeX; targetY = globeY; targetZ = globeZ;
        }

        let snap = 0.05
        if (state === 'swirl') snap = 0.015 
        
        this.x += (targetX - this.x) * snap;
        this.y += (targetY - this.y) * snap;
        this.z += (targetZ - this.z) * snap;
        
        return { 
          prev, 
          curr: { x: this.x, y: this.y, z: this.z }, 
          didReset 
        }
      }
    }

    let particles: Particle[] = []

    const initParticles = () => {
      particles = []
      const w = window.innerWidth
      const h = window.innerHeight
      const minDim = Math.min(w, h)
      
      coreRadius = minDim * 0.30 
      maxRadius = coreRadius * 1.8 
      
      const numParticles = Math.min(Math.floor((w * h) / 250), 3200)
      const perSide = Math.ceil(Math.cbrt(numParticles))
      
      // Keeping the tight grid spacing so the massive cube structure itself stays thick and dense
      const spacing = (coreRadius * 2.8) / perSide

      for (let i = 0; i < numParticles; i++) {
        const ix = i % perSide
        const iy = Math.floor(i / perSide) % perSide
        const iz = Math.floor(i / (perSide * perSide))
        
        const latticeX = (ix - perSide / 2 + 0.5) * spacing
        const latticeY = (iy - perSide / 2 + 0.5) * spacing
        const latticeZ = (iz - perSide / 2 + 0.5) * spacing

        particles.push(new Particle(latticeX, latticeY, latticeZ))
      }
    }

    let globalRotationY = 0
    const STATES = ['lattice', 'swirl', 'globe', 'swirl']
    let stateIndex = 0
    let stateTime = 0

    const applyRotation = (x: number, y: number, z: number, rotX: number, rotY: number) => {
      let cosY = Math.cos(rotY)
      let sinY = Math.sin(rotY)
      let nx = x * cosY - z * sinY
      let nz = z * cosY + x * sinY
      
      let cosX = Math.cos(rotX)
      let sinX = Math.sin(rotX)
      let ny = y * cosX - nz * sinX
      nz = nz * cosX + y * sinX
      
      return { nx, ny, nz }
    }

    const animate = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      
      stateTime++
      const currentState = STATES[stateIndex]
      const duration = currentState === 'swirl' ? 350 : 500

      if (stateTime > duration) { 
        stateTime = 0
        stateIndex = (stateIndex + 1) % STATES.length
      }

      globalRotationY += 0.0015 
      
      currentRotationX += (targetRotationX - currentRotationX) * 0.05
      currentRotationY += (targetRotationY - currentRotationY) * 0.05
      
      const totalRotY = globalRotationY + currentRotationY
      const totalRotX = currentRotationX

      const centerX = w / 2
      const centerY = h * 0.6
      
      const perspective = Math.min(w, h) * 2.5

      const projected: any[] = []

      particles.forEach(p => {
        const { prev, curr, didReset } = p.update(currentState)
        const prevRot = applyRotation(prev.x, prev.y, prev.z, totalRotX, totalRotY)
        const currRot = applyRotation(curr.x, curr.y, curr.z, totalRotX, totalRotY)
        
        projected.push({ p, prevRot, currRot, didReset })
      })

      projected.sort((a, b) => b.currRot.nz - a.currRot.nz)

      projected.forEach(({ p, prevRot, currRot, didReset }) => {
        const scale = perspective / (perspective + currRot.nz)
        if (scale < 0) return
        
        const depthAlpha = Math.min(1, Math.max(0.05, scale * 1.5 - 0.5))
        
        let distFade = 1.0
        if (currentState === 'swirl') {
          distFade = Math.max(0, 1 - Math.pow((p.radius - coreRadius) / (maxRadius - coreRadius), 1.5))
        }
          
        ctx.globalAlpha = depthAlpha * distFade
        
        const sx = centerX + currRot.nx * scale
        const sy = centerY + currRot.ny * scale
        
        const prevScale = perspective / (perspective + prevRot.nz)
        const px = centerX + prevRot.nx * prevScale
        const py = centerY + prevRot.ny * prevScale

        const dx = sx - px
        const dy = sy - py
        
        const speedSq = dx*dx + dy*dy
        const MAX_SPEED = 4.0
        
        let renderDx = dx
        let renderDy = dy
        
        if (speedSq > MAX_SPEED * MAX_SPEED) {
            const speed = Math.sqrt(speedSq)
            renderDx = (dx / speed) * MAX_SPEED
            renderDy = (dy / speed) * MAX_SPEED
        }

        if (didReset || speedSq < 0.5) {
          ctx.beginPath()
          // Reverted to pure circular dots so the particles themselves are perfectly spherical
          ctx.arc(sx, sy, (p.size * scale) / 2, 0, Math.PI * 2)
          ctx.fillStyle = p.color
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.moveTo(sx - renderDx * p.dashLength, sy - renderDy * p.dashLength)
          ctx.lineTo(sx, sy)
          
          ctx.strokeStyle = p.color
          ctx.lineWidth = Math.max(0.5, p.size * scale)
          // Reverted to round linecaps for beautiful soft streaks
          ctx.lineCap = "round"
          ctx.stroke()
        }
      })
      
      ctx.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
      initParticles()
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
  }, [theme, systemTheme])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full dark:mix-blend-screen opacity-100"
      />
    </div>
  )
}
