import { render, screen, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { HeroSection } from '@/components/hero-section'
import { WorkSection } from '@/components/work-section'
import { ExperienceSection } from '@/components/experience-section'
import { TechSkillsSection } from '@/components/tech-skills-section'
import { CredentialsSection } from '@/components/credentials-section'
import { ConnectSection } from '@/components/connect-section'

import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { experiences } from '@/content/experience'
import { skillGroups } from '@/content/skills'

// Framer Motion drives IntersectionObserver, which JSDOM doesn't implement.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...(actual as object),
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target, tag: string) => {
        const Component = ({ children, ...props }: Record<string, unknown>) => {
          const { initial, whileInView, viewport, transition, variants, ...rest } = props
          void initial, whileInView, viewport, transition, variants
          return <div {...rest}>{children as React.ReactNode}</div>
        }
        Component.displayName = `motion.${tag}`
        return Component
      },
    }),
  }
})

const sections = [
  ['HeroSection', <HeroSection key="hero" />],
  ['WorkSection', <WorkSection key="work" />],
  ['ExperienceSection', <ExperienceSection key="exp" />],
  ['TechSkillsSection', <TechSkillsSection key="skills" />],
  ['CredentialsSection', <CredentialsSection key="cred" />],
  ['ConnectSection', <ConnectSection key="connect" />],
] as const

describe('section rendering', () => {
  it.each(sections)('%s renders without crashing', (_name, element) => {
    const { container } = render(element)
    expect(container).toBeInTheDocument()
    expect(container.firstChild).not.toBeNull()
  })
})

describe('image integrity', () => {
  it.each(sections)('%s images all carry src, alt and intrinsic size', (_name, element) => {
    const { container } = render(element)
    for (const img of Array.from(container.querySelectorAll('img'))) {
      expect(img.getAttribute('src')?.length ?? 0).toBeGreaterThan(0)
      // alt may be "" for decorative images, but the attribute must be present
      // so screen readers skip them rather than announcing the filename.
      expect(img.hasAttribute('alt')).toBe(true)
      // width/height prevent layout shift — the old markup had neither.
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
    }
  })
})

describe('content is sourced from content/, not hardcoded', () => {
  it('hero states the canonical name and title', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name)
    expect(screen.getByText(profile.title)).toBeInTheDocument()
  })

  it('experience lists every role with its period', () => {
    render(<ExperienceSection />)
    for (const exp of experiences) {
      expect(screen.getByText(exp.title)).toBeInTheDocument()
      expect(screen.getByText(exp.period)).toBeInTheDocument()
    }
  })

  it('no section claims a Staff title, which would contradict LinkedIn and the CV', () => {
    for (const [, element] of sections) {
      const { container, unmount } = render(element)
      expect(container.textContent).not.toMatch(/\bstaff\b/i)
      unmount()
    }
  })
})

describe('work section', () => {
  it('links every project to its detail page', () => {
    render(<WorkSection />)
    for (const project of projects) {
      const link = screen.getByRole('link', { name: new RegExp(project.title, 'i') })
      expect(link).toHaveAttribute('href', `/work/${project.slug}`)
    }
  })

  it('surfaces a documented-decision count for every project', () => {
    render(<WorkSection />)
    for (const project of projects) {
      expect(project.decisions.length).toBeGreaterThan(0)
    }
    expect(screen.getAllByText(/\d+ key decisions/)).toHaveLength(projects.length)
  })
})

describe('tech skills', () => {
  it('renders every skill in every group', () => {
    render(<TechSkillsSection />)
    for (const group of skillGroups) {
      expect(screen.getByText(group.title)).toBeInTheDocument()
      for (const skill of group.skills) {
        expect(screen.getByText(skill.name)).toBeInTheDocument()
      }
    }
  })

  it('gives every skill a visual marker, so no row renders an empty box', () => {
    const { container } = render(<TechSkillsSection />)
    const total = skillGroups.reduce((n, g) => n + g.skills.length, 0)
    const markers = container.querySelectorAll('li > :first-child')
    expect(markers).toHaveLength(total)
    for (const marker of Array.from(markers)) {
      const hasImg = marker.querySelector('img')
      const hasSvg = marker.querySelector('svg')
      const hasText = (marker.textContent ?? '').trim().length > 0
      expect(Boolean(hasImg || hasSvg || hasText)).toBe(true)
    }
  })

  it('does not render proficiency tiers, which read as a downgrade at CV screen', () => {
    const { container } = render(<TechSkillsSection />)
    expect(container.textContent).not.toMatch(/working knowledge/i)
    expect(container.textContent).not.toMatch(/\d of 3/i)
  })
})

describe('contact', () => {
  it('exposes the canonical email as a mailto link', () => {
    render(<ConnectSection />)
    const link = screen.getByRole('link', { name: new RegExp(profile.email, 'i') })
    expect(link).toHaveAttribute('href', `mailto:${profile.email}`)
  })

  it('states availability using the single shared phrasing', () => {
    const { container } = render(<ConnectSection />)
    expect(
      within(container).getByText(new RegExp(profile.location.availability, 'i')),
    ).toBeInTheDocument()
  })
})
