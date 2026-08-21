"use client"

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { resolveBackgrounds } from './registry'

export function BackgroundHost() {
  const searchParams = useSearchParams()
  const { theme, systemTheme } = useTheme()
  const bgQuery = searchParams.get('bg')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const heroCanvasRef = useRef<HTMLCanvasElement>(null)
  const pageCanvasRef = useRef<HTMLCanvasElement>(null)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return

    const layers = resolveBackgrounds(bgQuery)
    if (layers.length === 0) return

    const heroCanvas = heroCanvasRef.current
    const pageCanvas = pageCanvasRef.current
    if (!heroCanvas || !pageCanvas) return

    const heroCtx = heroCanvas.getContext('2d')
    const pageCtx = pageCanvas.getContext('2d')
    if (!heroCtx || !pageCtx) return

    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")
    const isLightMode = !isDark

    const heroLayers = layers.filter(l => l.scope === 'hero')
    const pageLayers = layers.filter(l => l.scope === 'page')

    const initSize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      
      const isMobile = w < 768
      const budget = isMobile ? 400 : 1200
      
      // Init hero layers
      if (heroLayers.length > 0) {
        heroCanvas.width = w * dpr
        heroCanvas.height = h * dpr
        heroCtx.scale(dpr, dpr)
        const budgetPerHeroLayer = Math.floor(budget / heroLayers.length)
        heroLayers.forEach(l => l.init(heroCtx, w, h, budgetPerHeroLayer, isLightMode))
      }

      // Init page layers
      if (pageLayers.length > 0) {
        pageCanvas.width = w * dpr
        pageCanvas.height = h * dpr
        pageCtx.scale(dpr, dpr)
        const budgetPerPageLayer = Math.floor(budget / pageLayers.length)
        pageLayers.forEach(l => l.init(pageCtx, w, h, budgetPerPageLayer, isLightMode))
      }
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animationFrameId: number
    let isHidden = false
    let globalT = 0
    let pointer = { x: 0, y: 0, active: false }

    const renderFrame = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      
      if (heroLayers.length > 0) {
        heroCtx.clearRect(0, 0, w, h)
        heroLayers.forEach(l => l.draw(heroCtx, globalT, pointer))
      }
      
      if (pageLayers.length > 0) {
        pageCtx.clearRect(0, 0, w, h)
        pageLayers.forEach(l => l.draw(pageCtx, globalT, pointer))
      }
    }

    const animate = () => {
      if (isHidden) return
      
      renderFrame()
      
      globalT++
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    const handleResize = () => {
      initSize()
      if (prefersReducedMotion) {
        renderFrame()
      }
    }

    const handleVisibilityChange = () => {
      isHidden = document.hidden
      if (!isHidden && !prefersReducedMotion) {
        animate()
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }

    const handlePointerLeave = () => {
      pointer.active = false
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerleave', handlePointerLeave)

    // Initial setup
    initSize()
    
    // Start animation loop or render one frame
    if (prefersReducedMotion) {
      renderFrame()
    } else {
      animate()
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', handlePointerLeave)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      layers.forEach(l => l.dispose())
    }
  }, [bgQuery, theme, systemTheme, mounted])

  if (!mounted) return null

  // Setup blend modes
  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark")
  
  // "the canvas is dark:mix-blend-screen, so light mode gets no blend and particles composite as opaque dark specks. 
  // Add a light-mode blend mode and lift particle lightness so it reads as a soft tint."
  // Wait, I will use `mix-blend-multiply` for light mode and `mix-blend-screen` for dark mode.
  const blendClass = isDark ? 'mix-blend-screen opacity-100' : 'mix-blend-multiply opacity-80'

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none -z-10">
      {/* Page scoped canvas */}
      <canvas 
        ref={pageCanvasRef}
        className={`absolute inset-0 w-full h-full ${blendClass}`}
      />
      {/* Hero scoped canvas */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 60%, transparent 95%)",
        }}
      >
        <canvas 
          ref={heroCanvasRef}
          className={`w-full h-full ${blendClass}`}
        />
      </div>
    </div>
  )
}
