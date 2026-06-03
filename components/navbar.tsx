"use client"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div
        className={`flex items-center gap-8 px-6 py-3 rounded-full transition-all duration-300
          bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-lg`}
      >
        <a 
          href="#" 
          className="font-semibold text-slate-200 hover:text-primary transition-colors"
        >
          Karthik Orugonda
        </a>
        
        <div className="hidden sm:flex items-center gap-6">
          <a
            href="#expertise"
            className="font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Expertise
          </a>
          <a
            href="#experience"
            className="font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="font-mono text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Projects
          </a>
        </div>
      </div>
    </nav>
  )
}
