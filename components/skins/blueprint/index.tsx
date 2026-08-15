import { TechSkillsSection } from "@/components/tech-skills-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"
import { BlueprintHero } from "./hero"
import { BlueprintWork } from "./work"
import { BlueprintExperience } from "./experience"
import { DimRule } from "./parts"

/**
 * Blueprint — direction 01, with the gridlines removed.
 *
 * The sheet numbers run in reading order and the shared sections keep their
 * place in it, so the set is continuous: 01 general arrangement, 02
 * capabilities, 03 drawings, 04 revision history. The dimension rule above
 * each one is the sheet title line; the section's own header follows it, the
 * way a drawing repeats its title inside the frame.
 */
export function BlueprintSkin() {
  return (
    <>
      <BlueprintHero />
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <DimRule label="Capabilities" sheet="Sheet 02" />
      </div>
      <TechSkillsSection />
      <BlueprintWork />
      <BlueprintExperience />
      <div className="mx-auto max-w-6xl px-6 pt-8">
        <DimRule label="Credentials and contact" sheet="Sheet 05" />
      </div>
      <CredentialsSection />
      <ConnectSection />
    </>
  )
}
