"use client"

import { AuroraSkin } from "./aurora"
import { SpatialSkin } from "./spatial"
import { BlueprintSkin } from "./blueprint"
import { CurrentSkin } from "./current"
import { SkinSwitcher } from "./skin-switcher"
import { useSkin } from "./use-skin"

/**
 * Picks the composition.
 *
 * `useSkin` reports the default on the server and on the first client render,
 * so the exported HTML contains exactly one composition — one `<h1>`, one set
 * of section ids — and `pnpm audit:html` stays meaningful. The stored choice
 * arrives one effect later and swaps the tree; the *tokens* were already right
 * before first paint, because the boot script set `data-skin` synchronously.
 *
 * Temporary — see `content/skins.ts`.
 */
const compositions = {
  aurora: AuroraSkin,
  spatial: SpatialSkin,
  blueprint: BlueprintSkin,
  current: CurrentSkin,
} as const

export function SkinStage() {
  const { skin } = useSkin()
  const Composition = compositions[skin]

  return (
    <>
      <main id="main">
        <Composition />
      </main>
      <SkinSwitcher />
    </>
  )
}
