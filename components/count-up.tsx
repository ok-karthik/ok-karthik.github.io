"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts a stat up on first view.
 *
 * Animates only the numeric run, so prefixes and suffixes survive: "~30%"
 * keeps both. Under prefers-reduced-motion the final value renders
 * immediately — the number is the content, the motion is not.
 *
 * The parse lives inside the effect on purpose. Computing it in the render
 * body produced a new array identity on every render, and depending on it
 * re-ran the effect after each frame's setState — which reset the display to
 * zero forever. Depend on `value` alone.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr)
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0
    const DURATION = 1100

    setDisplay(`${prefix}0${suffix}`)

    let raf = 0
    let start = 0

    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / DURATION, 1)
      // easeOutExpo — fast, then settles, which reads as a gauge landing.
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
      setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`)
      if (p < 1) raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.3 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
