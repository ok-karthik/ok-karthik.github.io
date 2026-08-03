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

  const [active, setActive] = useState<string>("")

  useEffect(() => setMounted(true), [])

  // Scroll spy. Observes each section and marks the one nearest the top of the
  // viewport, so the navbar always says where you are.
  useEffect(() => {
    const ids = links.map((l) => l.href.split("#")[1])
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      // Band just below the navbar, so "active" means "at the top of the page".
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

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
          <ul className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active === link.href.split("#")[1] ? "true" : undefined}
                  className={`relative font-mono text-micro uppercase tracking-[0.08em] transition-colors hover:text-foreground ${
                    active === link.href.split("#")[1]
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-1.5 left-0 h-px bg-primary transition-all duration-300 ${
                      active === link.href.split("#")[1] ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-2 flex items-center gap-2 lg:border-l lg:border-border lg:pl-4">
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
              className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <ul id="mobile-nav" className="border-t border-border px-6 py-2 lg:hidden">
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
