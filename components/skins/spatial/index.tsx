import { TechSkillsSection } from "@/components/tech-skills-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"
import { SpatialLumes } from "./lumes"
import { SpatialHero } from "./hero"
import { SpatialWork } from "./work"
import { SpatialExperience } from "./experience"

/**
 * Spatial — direction 07, built as its own design rather than as Aurora's deck
 * section promoted to the top.
 *
 * What actually differs from Aurora, since that was the condition for building
 * it at all:
 *   layout   the deck is the hero, projects are a two-column plate grid, and
 *            experience steps sideways instead of hanging off a rail
 *   type     Manrope throughout — wider, rounder, heavier at display size
 *   colour   violet primary with a teal second lume, against #0d1117
 *   surface  opaque plates and shadow. No glass anywhere in this skin.
 */
export function SpatialSkin() {
  return (
    <>
      <SpatialLumes />
      <SpatialHero />
      <SpatialWork />
      <TechSkillsSection />
      <SpatialExperience />
      <CredentialsSection />
      <ConnectSection />
    </>
  )
}
