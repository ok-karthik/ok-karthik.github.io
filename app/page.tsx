import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"

/**
 * Work first.
 *
 * The old order put a 49-logo skills grid and a simulated terminal ahead of any
 * evidence, so the strongest asset — six systems with documented trade-offs —
 * was the fourth thing a reader reached. Capabilities now come after the work
 * that demonstrates them.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <CapabilitiesSection />
        <CredentialsSection />
        <ConnectSection />
      </main>
    </>
  )
}
