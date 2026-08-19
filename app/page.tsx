import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { TechSkillsBoxesSection } from "@/components/tech-skills-boxes"
import { TechnicalExpertisePillGrid } from "@/components/technical-expertise-pill-grid"
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
      
      {/* Variation 1: 3x3 Master Deck with Dot-Separated Subtitles (main style) */}
      <TechSkillsSection />
      
      {/* Variation 2: 3x3 Grid with Rectangle Micro-Badges (from 7f695bc) */}
      <TechSkillsBoxesSection />
      
      {/* Variation 3: Original Pill Grid with Floating Rounded Capsules */}
      <TechnicalExpertisePillGrid />

      <WorkSection />
      <ExperienceSection />
      <CredentialsSection />
      <NotesSpeakingSection />
      <RecommendationsSection />
      <ConnectSection />
    </main>
  )
}
