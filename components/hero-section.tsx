
export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center px-6 pt-32 pb-16 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left Column: Text */}
        <div className="space-y-6 text-left max-w-2xl">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Open to opportunities · Berlin / Remote
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-800 to-primary dark:from-white dark:via-cyan-100 dark:to-primary leading-tight py-2">
              Karthik Orugonda
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-primary font-mono tracking-wider mt-2">
              Senior Platform Engineer & SRE
            </h2>
          </div>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
            15+ years overall IT experience, with 10+ years specialising in cloud-native platforms across AWS, Azure and GCP. Expert in Kubernetes-based IDPs, Terraform-driven self-service infrastructure, and GitOps-driven CI/CD. Currently exploring AI Platform Engineering and MLOps infrastructure.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/10 bg-primary/5 text-muted-foreground text-sm font-mono w-full sm:w-auto">
            <span>⚡</span>
            <span className="truncate">Daily workflow includes Claude Code, Cursor & GitHub Copilot</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a href="#projects" className="px-6 py-2.5 bg-card border border-border hover:border-primary/50 text-foreground rounded-lg font-semibold transition-all hover:bg-primary/5 flex items-center justify-center min-w-[140px]">
              View projects
            </a>
            <a href="https://docs.google.com/document/d/1ELiwLJcYCaPdQIdW1SQ24PowzJ1ZVwQ_bdLh6aXjO7E/export?format=pdf" target="_blank" className="px-6 py-2.5 bg-card border border-border hover:border-primary/50 text-foreground rounded-lg font-semibold transition-all hover:bg-primary/5 flex items-center justify-center min-w-[140px]">
              Download CV
            </a>
          </div>
        </div>

        {/* Right Column: Image and Socials */}
        <div className="flex flex-col gap-6 w-full max-w-lg mx-auto lg:ml-auto items-center lg:items-end">
          {/* Avatar Area */}
          <div className="flex justify-center mt-4">
            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl group-hover:bg-primary/50 transition-colors duration-500"></div>
              <img 
                src="https://github.com/ok-karthik.png" 
                alt="Karthik Orugonda" 
                className="relative w-48 h-48 lg:w-60 lg:h-60 rounded-full border-2 border-primary/50 object-cover shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Stats & Social Cards Grid */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 text-center hover:border-primary/30 hover:bg-primary/5 transition-all">
              <div className="text-3xl font-bold text-primary mb-1 font-mono">10+</div>
              <div className="text-sm text-muted-foreground">Years DevOps/SRE</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-5 text-center hover:border-primary/30 hover:bg-primary/5 transition-all">
              <div className="text-3xl font-bold text-primary mb-1 font-mono">3</div>
              <div className="text-sm text-muted-foreground">Cloud Providers</div>
            </div>
            <a href="https://github.com/ok-karthik" target="_blank" rel="noopener noreferrer" className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary mb-2 transition-colors group-hover:scale-110"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <div className="text-sm text-muted-foreground font-mono">GitHub</div>
            </a>
            <a href="https://linkedin.com/in/karthikorugonda" target="_blank" rel="noopener noreferrer" className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-4 flex flex-col items-center justify-center hover:border-primary/30 hover:bg-primary/5 transition-all group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-primary mb-2 transition-colors group-hover:scale-110"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              <div className="text-sm text-muted-foreground font-mono">LinkedIn</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
