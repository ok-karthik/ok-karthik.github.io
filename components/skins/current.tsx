import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"

/**
 * The live site, kept in the switcher as the control.
 *
 * Comparing two candidates against each other tells you which is better;
 * comparing them against what is already deployed tells you whether either is
 * worth the change. Same sections, same order as `app/page.tsx` had before the
 * skins landed.
 */
export function CurrentSkin() {
  return (
    <>
      <HeroSection />
      <TechSkillsSection />
      <WorkSection />
      <ExperienceSection />
      <CredentialsSection />
      <ConnectSection />
    </>
  )
}
