"use client"

import { useCallback, useEffect, useState } from "react"
import {
  COLOURWAY_KEY,
  SKIN_KEY,
  type ColourwayId,
  type SkinId,
  defaultColourway,
  defaultSkin,
  isColourwayId,
  isSkinId,
} from "@/content/skins"

/**
 * Reads and writes the active skin.
 *
 * Deliberately starts at the default on both server and first client render —
 * reading localStorage during render would produce a hydration mismatch, and
 * the exported HTML has to contain exactly one composition for the heading
 * hierarchy and ids to stay valid. The stored value lands one effect later;
 * the inline boot script has already applied the *tokens*, so what you see
 * during that tick is the right palette, not the right layout.
 *
 * Temporary — see `content/skins.ts`.
 */
export function useSkin() {
  const [skin, setSkinState] = useState<SkinId>(defaultSkin)
  const [colourway, setColourwayState] = useState<ColourwayId>(defaultColourway)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = document.documentElement
    const s = el.getAttribute("data-skin")
    const c = el.getAttribute("data-cw")
    if (isSkinId(s)) setSkinState(s)
    if (isColourwayId(c)) setColourwayState(c)
    setReady(true)
  }, [])

  const setSkin = useCallback((next: SkinId) => {
    setSkinState(next)
    document.documentElement.setAttribute("data-skin", next)
    try {
      localStorage.setItem(SKIN_KEY, next)
    } catch {
      // Private mode. The choice just won't survive a reload.
    }
  }, [])

  const setColourway = useCallback((next: ColourwayId) => {
    setColourwayState(next)
    document.documentElement.setAttribute("data-cw", next)
    try {
      localStorage.setItem(COLOURWAY_KEY, next)
    } catch {
      // As above.
    }
  }, [])

  return { skin, colourway, setSkin, setColourway, ready }
}
