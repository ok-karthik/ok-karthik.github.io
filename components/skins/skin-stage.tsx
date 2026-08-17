"use client"

import { useSkin } from "./use-skin"
import { CurrentSkin } from "./current"
import { AuroraSkin } from "./aurora"
import { SkinSwitcher } from "./skin-switcher"

export function SkinStage() {
  const { skin, ready } = useSkin()

  // During SSR and initial mount before hydration, render CurrentSkin.
  // Once ready on client, if skin === 'aurora', switch to AuroraSkin.
  const isAurora = ready && skin === "aurora"

  return (
    <>
      {isAurora ? <AuroraSkin /> : <CurrentSkin />}
      <SkinSwitcher />
    </>
  )
}
