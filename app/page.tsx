import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TechnicalExpertise } from "@/components/technical-expertise"
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
