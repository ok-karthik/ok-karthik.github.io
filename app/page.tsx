import { Navbar } from "@/components/navbar"
import { SkinStage } from "@/components/skins/skin-stage"

/**
 * Three candidate designs, switchable in the browser.
 *
 * This page used to compose the sections directly. It now delegates to
 * `SkinStage`, which picks one of four compositions — Aurora Glass, Spatial,
 * Blueprint, or the current live site as a control — from `data-skin` on
 * `<html>`. The section order is per-skin and lives with each composition;
 * Aurora and the control keep the order this file used to document, which is
 * recorded in `components/skins/current.tsx`.
 *
 * TEMPORARY. `content/skins.ts` says when to collapse this back to a single
 * composition: as soon as Karthik picks one.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <SkinStage />
    </>
  )
}
