import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <TechSkillsSection />
        <WorkSection />
        <ExperienceSection />
        <CredentialsSection />
        <ConnectSection />
      </main>
    </>
  )
}
