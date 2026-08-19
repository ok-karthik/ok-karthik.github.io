import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { CredentialsSection } from "@/components/credentials-section"
import { NotesSpeakingSection } from "@/components/notes-speaking-section"
import { RecommendationsSection } from "@/components/recommendations-section"
import { ConnectSection } from "@/components/connect-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      <TechSkillsSection />

      <WorkSection />
      <ExperienceSection />
      <CredentialsSection />
      <NotesSpeakingSection />
      <RecommendationsSection />
      <ConnectSection />
    </main>
  )
}
