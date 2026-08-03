"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Counts a stat up on first view.
 *
 * Takes the display string ("10+", "400+", "~30%") and animates only the
 * numeric part, so prefixes and suffixes survive untouched. Under
 * prefers-reduced-motion it renders the final value immediately — the number
 * is the content, the motion is not.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)

  useEffect(() => {
    if (!match) return
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value)
      return
    }

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr)
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0
    setDisplay(`${prefix}0${suffix}`)

    let raf = 0
    let start = 0
    const DURATION = 1100

    const step = (t: number) => {
      if (!start) start = t
      const p = Math.min((t - start) / DURATION, 1)
      // easeOutExpo — fast then settles, which reads as a gauge landing.
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
      { threshold: 0.4 },
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, match])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
