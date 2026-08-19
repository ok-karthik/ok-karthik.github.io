"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { CommandPalette } from "@/components/command-palette"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className="flex items-center gap-4 sm:gap-6 md:gap-8 px-5 sm:px-6 py-2.5 rounded-full transition-all duration-300
          bg-card/70 backdrop-blur-xl border border-border shadow-xl"
      >
        <a 
          href="#" 
          className="font-semibold text-foreground hover:text-primary transition-colors text-sm md:text-base font-display"
        >
          Karthik Orugonda
        </a>
        
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#tech-skills"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Tech Skills
          </a>
          <a
            href="#projects"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Projects
          </a>
          <a
            href="#experience"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Experience
          </a>
          <a
            href="#credentials"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Qualifications
          </a>
          <a
            href="#notes"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Writing
          </a>
          <a
            href="#recommendations"
            className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            Endorsements
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-border/50">
          <CommandPalette />

          <a 
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-mono font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105 transition-all duration-300 border border-primary/20"
          >
            Connect
          </a>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-1.5 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme"
          >
            {mounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-500 hover:rotate-90" />
            ) : (
              <Moon className="w-4 h-4 text-sky-400 transition-transform duration-500 hover:rotate-12" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}
