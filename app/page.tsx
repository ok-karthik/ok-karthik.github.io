import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
// Option 1: The original, spacious big square cards layout
// import { TechnicalExpertiseSquareCards as TechnicalExpertise } from "@/components/technical-expertise-square-cards"

// Option 2: The dense, scannable pill badge layout (Recommended)
import { TechnicalExpertisePillGrid as TechnicalExpertise } from "@/components/technical-expertise-pill-grid"

import { ExperienceSection } from "@/components/experience-section"
import { ProjectsCertifications } from "@/components/projects-certifications"
import { ConnectSection } from "@/components/connect-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TechnicalExpertise />
      <ExperienceSection />
      <ProjectsCertifications />
      <ConnectSection />
    </main>
  )
}
