import { render, screen, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { AuroraSkin } from '@/components/skins/aurora'
import { SpatialSkin } from '@/components/skins/spatial'
import { BlueprintSkin } from '@/components/skins/blueprint'
import { CurrentSkin } from '@/components/skins/current'
import { skins, isSkinId, defaultSkin } from '@/content/skins'

import { profile } from '@/content/profile'
import { projects } from '@/content/projects'
import { experiences } from '@/content/experience'

// Same reason as components.test.tsx: Framer drives IntersectionObserver and
// forwards animation props that React would warn about on a plain element.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...(actual as object),
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target, tag: string) => {
        const Component = ({ children, ...props }: Record<string, unknown>) => {
          const { initial, whileInView, viewport, transition, variants, ...rest } = props
          void initial, whileInView, viewport, transition, variants
          const Tag = (tag === 'li' ? 'li' : tag === 'article' ? 'article' : 'div') as 'div'
          return <Tag {...rest}>{children as React.ReactNode}</Tag>
        }
        Component.displayName = `motion.${tag}`
        return Component
      },
    }),
  }
})

/**
 * These three designs exist side by side so Karthik can choose one. What the
 * tests guard is the property that makes that comparison honest: whichever
 * skin renders, the reader gets the *same evidence* — every project, every
 * role, one h1, and the anchors the navbar links to. A design that quietly
 * dropped a project would win on looks for the wrong reason.
 *
 * Delete this file with the losing skins.
 */
const compositions = [
  ['AuroraSkin', <AuroraSkin key="aurora" />],
  ['SpatialSkin', <SpatialSkin key="spatial" />],
  ['BlueprintSkin', <BlueprintSkin key="blueprint" />],
  ['CurrentSkin', <CurrentSkin key="current" />],
] as const

describe('every skin renders the same evidence', () => {
  it.each(compositions)('%s states the canonical name and title exactly once', (_n, el) => {
    const { container } = render(el)
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(profile.name)
    expect(within(container).getAllByText(profile.title).length).toBeGreaterThan(0)
  })

  it.each(compositions)('%s links every project to its detail page', (_n, el) => {
    render(el)
    for (const project of projects) {
      const link = screen.getByRole('link', { name: new RegExp(project.title, 'i') })
      expect(link).toHaveAttribute('href', `/work/${project.slug}`)
    }
  })

  it.each(compositions)('%s surfaces a decision count for every project', (_n, el) => {
    render(el)
    expect(screen.getAllByText(/\d+ documented decisions/)).toHaveLength(projects.length)
  })

  it.each(compositions)('%s lists every role with its period', (_n, el) => {
    const { container } = render(el)
    // Scoped to the section: the current role's title is also the hero's, by
    // design — `profile.title` and `experiences[0].title` are the same string
    // on purpose, so an unscoped query matches twice.
    const section = container.querySelector('#experience')
    expect(section).not.toBeNull()
    for (const exp of experiences) {
      expect(within(section as HTMLElement).getByText(exp.title)).toBeInTheDocument()
      expect(within(section as HTMLElement).getByText(exp.period)).toBeInTheDocument()
    }
  })

  it.each(compositions)('%s keeps the anchors the navbar links to', (_n, el) => {
    const { container } = render(el)
    // `/#contact` and `/#tech-skills` come from the shared sections; `#projects`
    // and `#experience` are re-implemented per skin, which is exactly where an
    // anchor gets dropped.
    for (const id of ['tech-skills', 'projects', 'experience', 'contact']) {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    }
  })

  it.each(compositions)('%s images all carry src, alt and intrinsic size', (_n, el) => {
    const { container } = render(el)
    for (const img of Array.from(container.querySelectorAll('img'))) {
      expect(img.getAttribute('src')?.length ?? 0).toBeGreaterThan(0)
      expect(img.hasAttribute('alt')).toBe(true)
      expect(img).toHaveAttribute('width')
      expect(img).toHaveAttribute('height')
    }
  })
})

describe('skin registry', () => {
  it('the default skin is one the switcher offers', () => {
    expect(isSkinId(defaultSkin)).toBe(true)
    expect(skins.some((s) => s.id === defaultSkin)).toBe(true)
  })

  it('rejects ids that are not skins, so a stale localStorage value cannot blank the page', () => {
    // 'a2' and 'original' were Aurora's colourways before that mechanism was
    // cut. A browser that stored one must not be able to resurrect it.
    for (const bad of ['', 'Aurora', 'nope', 'a2', 'original', null, undefined, 42]) {
      expect(isSkinId(bad)).toBe(false)
    }
  })

  it('every skin carries a note and a swatch, since the switcher renders both', () => {
    for (const skin of skins) {
      expect(skin.label.length).toBeGreaterThan(0)
      expect(skin.note.length).toBeGreaterThan(0)
      expect(skin.swatch).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})
