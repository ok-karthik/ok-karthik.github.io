/**
 * Design skins.
 *
 * Three candidate designs live in the codebase at once so Karthik can switch
 * between them in the browser and decide, rather than deciding from a
 * screenshot. This is a **decision aid, not a shipping feature** — once a skin
 * is chosen, delete the other two and this file with them. Keeping four
 * designs alive permanently would mean every future change costs 4x.
 *
 * How it works: the chosen skin id is written to `localStorage` and set as
 * `data-skin` on `<html>` before first paint (see the inline script in
 * `app/layout.tsx`). Tokens in `globals.css` key off that attribute, and
 * `SkinStage` swaps the section compositions. `?skin=blueprint` in the URL
 * also works, which is how you share a specific one for review.
 *
 * `aurora` is the default because it is the one that renders server-side: the
 * exported HTML contains exactly one composition, so the heading hierarchy
 * stays valid and the ids stay unique for `pnpm audit:html`.
 *
 * Aurora briefly shipped a second colourway (cyan / coral / violet, the
 * original 05 palette). Cut 2026-08-15: three hues at full saturation read as
 * a rainbow, and an infrastructure portfolio is arguing for judgement. The
 * whole `data-cw` mechanism went with it rather than leaving a switch with
 * one option in it.
 */

export type SkinId = "aurora" | "spatial" | "blueprint" | "current"

export type Skin = {
  id: SkinId
  label: string
  /** One line, shown in the switcher — what this design is arguing. */
  note: string
  /** Colour ground the design commits to, for the switcher's dot. */
  swatch: string
}

export const skins: Skin[] = [
  {
    id: "aurora",
    label: "Aurora Glass",
    note: "Thick glass over a live aurora; architecture diagrams assemble inside the panels.",
    swatch: "#6cc0f0",
  },
  {
    id: "spatial",
    label: "Spatial",
    note: "A floating 3D deck of the real platform layers, violet-to-teal lume, solid elevation.",
    swatch: "#7c5cff",
  },
  {
    id: "blueprint",
    label: "Blueprint",
    note: "Daylight technical sheet — title block, condensed caps, drafting blue, ruled paper.",
    swatch: "#1552b8",
  },
  {
    id: "current",
    label: "Current site",
    note: "What is live today, for comparison.",
    swatch: "#2bc8dd",
  },
]

export const defaultSkin: SkinId = "aurora"

export const isSkinId = (v: unknown): v is SkinId =>
  typeof v === "string" && skins.some((s) => s.id === v)

/** Storage key. Shared by the no-flash script and the provider. */
export const SKIN_KEY = "site-skin"
