import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { TechSkillsClaudeHybrid } from "@/components/tech-skills-claude-hybrid"
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
      
      {/* Option 1: Current 3x3 Grid with Dot-Separated Subtitles */}
      <TechSkillsSection />
      
      {/* Option 2: Claude's 3x3 Balanced Hybrid (Integrated Cloud Cards + 100% Sublabels + Quiet Logo Chips) */}
      <TechSkillsClaudeHybrid />

      <WorkSection />
      <ExperienceSection />
      <CredentialsSection />
      <NotesSpeakingSection />
      <RecommendationsSection />
      <ConnectSection />
    </main>
  )
}
