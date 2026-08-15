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
 */

export type SkinId = "aurora" | "spatial" | "blueprint" | "current"

/** Aurora ships two palettes; the rest have one. */
export type ColourwayId = "a2" | "original"

export type Skin = {
  id: SkinId
  label: string
  /** One line, shown in the switcher — what this design is arguing. */
  note: string
  /** Colour ground the design commits to, for the switcher's dot. */
  swatch: string
  colourways?: { id: ColourwayId; label: string; swatch: string }[]
}

export const skins: Skin[] = [
  {
    id: "aurora",
    label: "Aurora Glass",
    note: "Thick glass over a live aurora; architecture diagrams assemble inside the panels.",
    swatch: "#6cc0f0",
    colourways: [
      { id: "a2", label: "Anodized blue", swatch: "#6cc0f0" },
      { id: "original", label: "Cyan / coral", swatch: "#6ee7ff" },
    ],
  },
  {
    id: "spatial",
    label: "Spatial",
    note: "A floating 3D deck of platform layers, violet-to-teal lume, solid elevation.",
    swatch: "#7c5cff",
  },
  {
    id: "blueprint",
    label: "Blueprint",
    note: "Daylight drafting sheet — title block, condensed caps, red-pencil annotations. No gridlines.",
    swatch: "#b4402c",
  },
  {
    id: "current",
    label: "Current site",
    note: "What is live today, for comparison.",
    swatch: "#2bc8dd",
  },
]

export const defaultSkin: SkinId = "aurora"
export const defaultColourway: ColourwayId = "a2"

export const isSkinId = (v: unknown): v is SkinId =>
  typeof v === "string" && skins.some((s) => s.id === v)

export const isColourwayId = (v: unknown): v is ColourwayId =>
  v === "a2" || v === "original"

/** Storage keys. Shared by the no-flash script and the provider. */
export const SKIN_KEY = "site-skin"
export const COLOURWAY_KEY = "site-colourway"
