"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Check, Palette, X } from "lucide-react"
import { skins, type SkinId } from "@/content/skins"
import { useSkin } from "./use-skin"

/**
 * The chooser.
 *
 * Exists so Karthik can compare designs on the real content at a real
 * viewport, rather than from a screenshot — which is the whole reason three
 * skins are in the tree at once. It goes when the other two do.
 *
 * Picking a skin also sets the theme that skin was designed in. Blueprint is a
 * daylight drawing and Aurora is a lit dark room; landing on Blueprint in dark
 * mode would show a version of it neither of us is arguing for. The theme
 * toggle underneath still overrides, and the navbar's own toggle keeps
 * working, so nothing is locked.
 */
const preferredTheme: Record<SkinId, "dark" | "light"> = {
  aurora: "dark",
  blueprint: "light",
  current: "dark",
}

export function SkinSwitcher() {
  const { skin, setSkin, ready } = useSkin()
  const { resolvedTheme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  // Nothing until the stored choice is known — a switcher that says "Aurora"
  // for one frame while Blueprint paints is worse than no switcher.
  if (!ready) return null

  const active = skins.find((s) => s.id === skin)

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden">
      {open ? (
        <div className="glass w-[19rem] max-w-[calc(100vw-2rem)] rounded-xl p-4 shadow-elevation">
          <div className="mb-3 flex items-baseline justify-between gap-4">
            <p className="label">Design preview</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-1 p-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close design preview"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <ul className="space-y-1.5">
            {skins.map((option) => {
              const selected = option.id === skin
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setSkin(option.id)
                      setTheme(preferredTheme[option.id])
                    }}
                    className={`flex w-full items-start gap-3 rounded-lg border p-2.5 text-left transition-colors ${
                      selected
                        ? "border-primary/50 bg-primary/10"
                        : "border-border hover:border-border-strong"
                    }`}
                  >
                    <span
                      className="mt-1 h-3 w-3 shrink-0 rounded-full border border-border"
                      style={{ background: option.swatch }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 text-body font-semibold text-foreground">
                        {option.label}
                        {selected ? (
                          <Check className="h-3.5 w-3.5 text-primary" aria-hidden />
                        ) : null}
                      </span>
                      <span className="mt-0.5 block text-small leading-snug text-muted-foreground">
                        {option.note}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 border-t border-border pt-3">
            <p className="label mb-2">Theme</p>
            <div className="flex gap-2">
              {(["dark", "light"] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={resolvedTheme === mode}
                  onClick={() => setTheme(mode)}
                  className={`flex-1 rounded-lg border px-3 py-1.5 text-small capitalize transition-colors ${
                    resolvedTheme === mode
                      ? "border-primary/50 bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-micro leading-snug text-muted-foreground">
            Shareable: add <code className="font-mono">?skin={skin}</code> to the URL.
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="glass glass-hover inline-flex items-center gap-2 rounded-full py-2 pl-3 pr-4 text-small font-medium text-foreground"
        >
          <Palette className="h-4 w-4 text-primary" aria-hidden />
          {active?.label ?? "Design"}
        </button>
      )}
    </div>
  )
}
