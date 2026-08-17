import { AuroraBackdrop } from "@/components/aurora-backdrop"
import { AuroraHero } from "./hero"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"

export function AuroraSkin() {
  return (
    <>
      <AuroraBackdrop />
      <AuroraHero />
      <TechSkillsSection />
      <WorkSection />
      <ExperienceSection />
      <CredentialsSection />
      <ConnectSection />
    </>
  )
}
