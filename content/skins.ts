/**
 * Design skins.
 *
 * Lets Karthik switch between the authentic live design and the Aurora Glass
 * candidate in the browser (via ?skin=aurora / ?skin=current or the UI switcher).
 */

export type SkinId = "current" | "aurora"

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
    id: "current",
    label: "Original Live",
    note: "Authentic live design — purple-graphite base, IBM Plex typography, and neural constellation mesh.",
    swatch: "#2bc8dd",
  },
  {
    id: "aurora",
    label: "Aurora Glass",
    note: "Dual-lume atmospheric canvas blooms, thick glass cards, and Geist typography.",
    swatch: "#6cc0f0",
  },
]

export const defaultSkin: SkinId = "current"

export const isSkinId = (v: unknown): v is SkinId =>
  typeof v === "string" && skins.some((s) => s.id === v)

/** Storage key. Shared by the no-flash script and the provider. */
export const SKIN_KEY = "site-skin"
