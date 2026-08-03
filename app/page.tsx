import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WorkSection } from "@/components/work-section"
import { ExperienceSection } from "@/components/experience-section"
import { TechSkillsSection } from "@/components/tech-skills-section"
import { CredentialsSection } from "@/components/credentials-section"
import { ConnectSection } from "@/components/connect-section"

/**
 * Hero -> Tech Skills -> Projects -> Experience.
 *
 * Two audiences read this page and they gate in sequence. A recruiter screens
 * against a job description first, and if they bounce there is no hiring-manager
 * read at all — so the stack goes early, where it answers that scan directly.
 * Projects follow immediately, because they are what convinces the person who
 * actually decides.
 *
 * This is not the old order. The original put a 49-logo CDN grid and a
 * simulated terminal ahead of any evidence; Tech Skills is now a calibrated,
 * self-hosted section that earns the position, and Projects sit second rather
 * than fourth.
 */
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
