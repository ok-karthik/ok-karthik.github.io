"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Menu, X } from "lucide-react"
import { profile } from "@/content/profile"
import { CommandPalette } from "@/components/command-palette"

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#tech-skills", label: "Tech Skills" },
  { href: "/#contact", label: "Contact" },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  // Close the mobile menu on Escape — it's a disclosure, not a dialog, but
  // Escape is what people press.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [menuOpen])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3"
      >
        <Link
          href="/#top"
          className="font-display text-body font-semibold text-foreground transition-colors hover:text-primary"
        >
          {profile.name}
        </Link>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-6 sm:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-micro uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-2 flex items-center gap-2 sm:border-l sm:border-border sm:pl-4">
            <CommandPalette />

            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* The previous navbar hid every link below the sm breakpoint,
                which left mobile with no navigation at all. */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <ul id="mobile-nav" className="border-t border-border px-6 py-2 sm:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border py-3 text-body text-muted-foreground transition-colors last:border-0 hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
