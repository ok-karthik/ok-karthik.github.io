"use client"

import { useCallback, useEffect, useState } from "react"
import { SKIN_KEY, type SkinId, defaultSkin, isSkinId } from "@/content/skins"

/**
 * Reads and writes the active skin.
 */
export function useSkin() {
  const [skin, setSkinState] = useState<SkinId>(defaultSkin)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Check URL parameter first
    const params = new URLSearchParams(window.location.search)
    const urlSkin = params.get("skin")
    if (isSkinId(urlSkin)) {
      setSkinState(urlSkin)
      document.documentElement.setAttribute("data-skin", urlSkin)
      try {
        localStorage.setItem(SKIN_KEY, urlSkin)
      } catch {}
      setReady(true)
      return
    }

    // Check data-skin attribute on <html>
    const s = document.documentElement.getAttribute("data-skin")
    if (isSkinId(s)) {
      setSkinState(s)
    }
    setReady(true)
  }, [])

  const setSkin = useCallback((next: SkinId) => {
    setSkinState(next)
    document.documentElement.setAttribute("data-skin", next)
    try {
      localStorage.setItem(SKIN_KEY, next)
      // Update URL search param cleanly without reloading
      const url = new URL(window.location.href)
      url.searchParams.set("skin", next)
      window.history.replaceState({}, "", url.toString())
    } catch {}
  }, [])

  return { skin, setSkin, ready }
}
