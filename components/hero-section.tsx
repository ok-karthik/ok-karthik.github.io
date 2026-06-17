import { Download, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text */}
        <div className="space-y-6 text-left max-w-2xl">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Open to opportunities · Germany / Remote
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-display font-bold tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-800 to-primary dark:from-white dark:via-cyan-100 dark:to-primary leading-tight py-2">
              Karthik Orugonda
            </h1>
            {/* Expert Polish: Gradient Title */}
            <div className="mb-6">
              <h2 className="text-lg md:text-xl lg:text-2xl font-mono font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-400 tracking-normal whitespace-nowrap">
                Senior Platform Engineer & SRE
              </h2>
            </div>
          </div>

          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            15+ years in tech, 10+ years specialising in cloud-native platforms across AWS, Azure and GCP. Expert in Kubernetes-based IDPs, Terraform-driven self-service infrastructure, and GitOps-driven CI/CD. Currently exploring AI Platform Engineering and MLOps infrastructure.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 font-semibold hover:bg-primary hover:text-primary-foreground transition-all flex items-center justify-center">
              View projects
            </a>
            <a href="https://docs.google.com/document/d/1ELiwLJcYCaPdQIdW1SQ24PowzJ1ZVwQ_bdLh6aXjO7E/export?format=pdf" target="_blank" className="px-6 py-3 rounded-xl bg-card/20 backdrop-blur-sm border border-border/50 font-medium hover:bg-card/40 hover:border-primary/30 transition-all flex items-center justify-center gap-2 group">
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Download CV
            </a>
          </div>
        </div>

        {/* Right Column: Profile Card & Stats */}
        <div className="flex flex-col gap-4 md:gap-5 w-full max-w-lg mx-auto lg:ml-auto">
          
          {/* Unified Profile Card */}
          <div className="flex flex-col w-full bg-card/20 backdrop-blur-xl border border-border/40 rounded-[2rem] pt-6 px-6 pb-5 md:pt-8 md:px-8 md:pb-6 shadow-2xl relative overflow-hidden group/card">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 group-hover/card:opacity-70" />

            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 relative z-10 w-full mb-5 md:mb-6">
              {/* Left Side: Avatar */}
              <div className="flex justify-center sm:justify-start shrink-0 pt-1">
                <div className="relative group cursor-pointer">
                  <img 
                    src="https://github.com/ok-karthik.png" 
                    alt="Karthik Orugonda" 
                    className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-primary/40 object-cover shadow-lg transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-2 group-hover:border-primary/60 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] z-10"
                  />
                </div>
              </div>

              {/* Right Side: Focus Areas */}
              <div className="flex-1 pt-1">
                <h3 className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase mb-5 font-mono">Focus Areas</h3>
                <div className="space-y-4 md:space-y-5">
                  <div className="flex gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-transform group-hover/item:scale-150" />
                    <div>
                      <div className="font-semibold text-foreground text-[15px] leading-none mb-1.5 transition-colors group-hover/item:text-cyan-400">Platform Engineering</div>
                      <div className="text-[13px] text-muted-foreground/80 font-medium leading-snug">IDP · GitOps · Self-service infra</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 shadow-[0_0_8px_rgba(192,132,252,0.8)] transition-transform group-hover/item:scale-150" />
                    <div>
                      <div className="font-semibold text-foreground text-[15px] leading-none mb-1.5 transition-colors group-hover/item:text-purple-400">AI Infrastructure</div>
                      <div className="text-[13px] text-muted-foreground/80 font-medium leading-snug">AI Platform · MLOps · Upskilling</div>
                    </div>
                  </div>

                  <div className="flex gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0 shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-transform group-hover/item:scale-150" />
                    <div>
                      <div className="font-semibold text-foreground text-[15px] leading-none mb-1.5 transition-colors group-hover/item:text-sky-400">Cloud Infrastructure</div>
                      <div className="text-[13px] text-muted-foreground/80 font-medium leading-snug">AWS · Azure · GCP</div>
                    </div>
                  </div>

                  <div className="flex gap-3 group/item">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 shadow-[0_0_8px_rgba(74,222,128,0.8)] transition-transform group-hover/item:scale-150" />
                    <div>
                      <div className="font-semibold text-foreground text-[15px] leading-none mb-1.5 transition-colors group-hover/item:text-green-400">SRE & Reliability</div>
                      <div className="text-[13px] text-muted-foreground/80 font-medium leading-snug">SLOs · Observability · Incident mgmt</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-border/40 relative z-10 mb-4 md:mb-5" />

            {/* Bottom Row: Text Socials */}
            <div className="flex items-center justify-around gap-4 w-full relative z-10">
              <a href="https://github.com/ok-karthik" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group">
                <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] font-medium transition-colors">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/karthikorugonda" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-[#0077b5] transition-colors group">
                <Linkedin className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] font-medium transition-colors">LinkedIn</span>
              </a>
              <a href="mailto:ok.karthik99@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-red-400 transition-colors group">
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-[14px] font-medium transition-colors">Email</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {/* Expert Polish: Color matched to Focus areas */}
              <div className="bg-card/20 backdrop-blur-xl border border-border/40 rounded-[1.25rem] p-4 text-center flex flex-col justify-center transition-all hover:bg-card/40 hover:border-cyan-400/30 hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 font-mono">10+</div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-tight">Years<br/>Cloud native</div>
              </div>
              <div className="bg-card/20 backdrop-blur-xl border border-border/40 rounded-[1.25rem] p-4 text-center flex flex-col justify-center transition-all hover:bg-card/40 hover:border-purple-400/30 hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-1 font-mono">3</div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-tight">Cloud<br/>providers</div>
              </div>
              <div className="bg-card/20 backdrop-blur-xl border border-border/40 rounded-[1.25rem] p-4 text-center flex flex-col justify-center transition-all hover:bg-card/40 hover:border-green-400/30 hover:-translate-y-1">
                <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1 font-mono">400+</div>
                <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide leading-tight">Engineers<br/>served</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
