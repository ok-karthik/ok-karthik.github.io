"use client"

import { useCallback, useEffect, useState } from "react"
import { SKIN_KEY, type SkinId, defaultSkin, isSkinId } from "@/content/skins"

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
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const s = document.documentElement.getAttribute("data-skin")
    if (isSkinId(s)) setSkinState(s)
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

  return { skin, setSkin, ready }
}
