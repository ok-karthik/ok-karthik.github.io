import { TechSkillsSection } from "@/components/tech-skills-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"
import { BlueprintPaper } from "./paper"
import { BlueprintHero } from "./hero"
import { BlueprintWork } from "./work"
import { BlueprintExperience } from "./experience"
import { DimRule } from "./parts"

/**
 * Blueprint — a technical sheet, in daylight.
 *
 * Two rounds of Karthik's notes are baked in here. The gridlines came back,
 * but at 2% and masked to one corner (see `paper.tsx`); the drafting-office
 * vocabulary went, because a portfolio that makes a recruiter translate
 * "issued for construction" has spent its first ten seconds badly; and the
 * rust pencil went to drafting blue, because the rust read as Claude's brand
 * colour rather than his.
 *
 * The section numbers run in reading order and the shared sections keep their
 * place in it — 01 overview, 02 capabilities, 03 projects, 04 experience, 05
 * credentials, 06 contact — which is what the index in the hero indexes. The
 * shared sections carry their own headers, so they get an index rule rather
 * than a second heading on top of the one they already have.
 */
export function BlueprintSkin() {
  return (
    <>
      <BlueprintPaper />
      <BlueprintHero />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <DimRule index="02" label="Capabilities" />
      </div>
      <TechSkillsSection />
      <BlueprintWork />
      <BlueprintExperience />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <DimRule index="05" label="Credentials" />
      </div>
      <CredentialsSection />
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <DimRule index="06" label="Contact" />
      </div>
      <ConnectSection />
    </>
  )
}
