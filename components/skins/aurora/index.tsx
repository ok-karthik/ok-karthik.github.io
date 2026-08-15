import { TechSkillsSection } from "@/components/tech-skills-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"
import { AuroraBackdrop } from "@/components/skins/aurora-backdrop"
import { AuroraHero } from "./hero"
import { AuroraLayers } from "./layers"
import { AuroraWork } from "./work"
import { AuroraExperience } from "./experience"

/**
 * Aurora Glass — the converged direction (05 + 06 + 07).
 *
 * 05 is the glass and the live light behind it. 06 is the self-drawing
 * architecture diagram in the lead project card. 07 is the layer deck, which
 * appears once, as a section, rather than as the whole page.
 *
 * Tech Skills, Credentials and Contact are the shared sections, unchanged.
 * They were written against tokens, so they take this skin's typeface, glass
 * and accent without a fork — and keeping them shared is what stops three
 * candidate designs turning into three copies of the whole site.
 */
export function AuroraSkin() {
  return (
    <>
      <AuroraBackdrop />
      <AuroraHero />
      <TechSkillsSection />
      <AuroraWork />
      <AuroraLayers />
      <AuroraExperience />
      <CredentialsSection />
      <ConnectSection />
    </>
  )
}
