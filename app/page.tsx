import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
// Option 1: The original, spacious big square cards layout
// import { TechnicalExpertiseSquareCards as TechnicalExpertise } from "@/components/technical-expertise-square-cards"

// Option 2: The dense, scannable pill badge layout (Recommended)
import { TechnicalExpertisePillGrid as TechnicalExpertise } from "@/components/technical-expertise-pill-grid"

import { ExperienceSection } from "@/components/experience-section"
import { ProjectsCertifications } from "@/components/projects-certifications"
import { ConnectSection } from "@/components/connect-section"
import { DevOpsTerminal } from "@/components/devops-terminal"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <section className="px-6 pb-10 relative z-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8 opacity-50">
            <div className="flex-1 h-px bg-border"></div>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">Interactive</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>
          <p className="text-muted-foreground mb-4">Curious? Try the terminal.</p>
          <DevOpsTerminal />
        </div>
      </section>
      <TechnicalExpertise />
      <ExperienceSection />
      <ProjectsCertifications />
      <ConnectSection />
    </main>
  )
}
