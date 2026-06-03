"use client"

import { useEffect, useState } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1128]/80 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-semibold text-foreground hover:text-primary transition-colors">
          Karthik Orugonda
        </a>
        
        <div className="flex items-center gap-6">
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
      </div>
    </nav>
  )
}
