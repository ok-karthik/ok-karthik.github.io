"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className={`flex items-center gap-8 px-6 py-2.5 rounded-full transition-all duration-300
          bg-card backdrop-blur-md border border-border shadow-lg`}
      >
        <a 
          href="#" 
          className="font-semibold text-foreground hover:text-primary transition-colors"
        >
          Karthik Orugonda
        </a>
        
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="#expertise"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Expertise
          </a>
          <a
            href="#experience"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Projects
          </a>
        </div>


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
    </nav>
  )
}
