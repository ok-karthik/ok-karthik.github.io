import { Download, Github, Linkedin, Mail } from "lucide-react"
import { profile, stats, focusAreas } from "@/content/profile"

/** Accent per focus area — aligned with live site */
const focusDots = [
  { dot: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]", hover: "group-hover/item:text-cyan-400" },
  { dot: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]", hover: "group-hover/item:text-sky-400" },
  { dot: "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]", hover: "group-hover/item:text-green-400" },
  { dot: "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]", hover: "group-hover/item:text-purple-400" },
]

const statAccents = ["text-primary", "text-foreground", "text-foreground"]

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text */}
        <div className="space-y-6 text-left max-w-2xl">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Open to Senior &amp; Staff roles · Berlin / Remote
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-800 to-primary dark:from-white dark:via-cyan-100 dark:to-primary leading-tight py-2 font-display">
              {profile.name}
            </h1>
            <div className="mb-4">
              <h2 className="text-2xl md:text-3xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 tracking-tight">
                {profile.title}
              </h2>
            </div>
            <p className="font-mono text-sm text-foreground/70 mb-2">
              {profile.subtitle}
            </p>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-sans">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="#projects" 
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all flex items-center justify-center shadow-[0_0_20px_rgba(0,255,231,0.2)]"
            >
              View projects
            </a>
            <a 
              href={profile.cvUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-card/40 backdrop-blur-md border border-border/60 font-medium hover:bg-card/70 hover:border-primary/40 transition-all flex items-center justify-center gap-2 group"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Download CV
            </a>
          </div>
        </div>

        {/* Right Column: Profile Card & Instrument Stats Strip */}
        <div className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:ml-auto">
          
          {/* Unified Profile Card */}
          <div className="flex flex-col w-full bg-card/30 backdrop-blur-xl border border-border/60 rounded-[2rem] pt-6 px-6 pb-5 md:pt-8 md:px-8 md:pb-6 shadow-2xl relative overflow-hidden group/card">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover/card:opacity-70" />

            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 relative z-10 w-full mb-5 md:mb-6">
              {/* Left Side: Avatar */}
              <div className="flex justify-center sm:justify-start shrink-0 pt-1">
                <div className="relative group cursor-pointer">
                  <img 
                    src="/ok-karthik.png" 
                    alt={profile.name} 
                    className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-primary/40 object-cover shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:border-primary/60 group-hover:shadow-[0_0_30px_rgba(0,255,231,0.4)] z-10"
                  />
                </div>
              </div>

              {/* Right Side: Focus Areas */}
              <div className="flex-1 pt-1">
                <h3 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-5 font-mono">Focus Areas</h3>
                <div className="space-y-4 md:space-y-5">
                  {focusAreas.map((area, i) => {
                    const accent = focusDots[i % focusDots.length]
                    return (
                      <div key={area.name} className="flex gap-3 group/item">
                        <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${accent.dot} shrink-0 transition-transform group-hover/item:scale-150`} />
                        <div>
                          <div className={`font-semibold text-foreground text-[15px] leading-none mb-1.5 transition-colors ${accent.hover}`}>
                            {area.name}
                          </div>
                          <div className="text-[13px] text-muted-foreground/80 font-medium leading-snug">
                            {area.detail}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border/40 relative z-10 mb-4 md:mb-5" />

            {/* Bottom Row: Text Socials */}
            <div className="flex items-center justify-around gap-4 w-full relative z-10">
              <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] font-medium transition-colors">GitHub</span>
              </a>
              <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-[#0077b5] transition-colors group">
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] font-medium transition-colors">LinkedIn</span>
              </a>
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors group">
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] font-medium transition-colors">Email</span>
              </a>
            </div>
          </div>

          {/* Instrument Stats Strip - Hairline divided like main branch */}
          <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/50 pt-3">
            {stats.map((stat, i) => (
              <div key={stat.label} className="px-4 text-center sm:text-left first:pl-2 last:pr-2">
                <div className={`tabular-nums block font-mono text-2xl md:text-3xl font-bold ${statAccents[i % statAccents.length]}`}>
                  {stat.value}
                </div>
                <div className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mt-1.5 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
