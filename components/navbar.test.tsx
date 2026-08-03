import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Navbar } from './navbar'
import { profile } from '@/content/profile'

vi.mock('next-themes', () => ({
  useTheme: () => ({ resolvedTheme: 'dark', setTheme: vi.fn() }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('Navbar', () => {
  it('renders the branding name from content', () => {
    render(<Navbar />)
    expect(screen.getAllByText(profile.name).length).toBeGreaterThan(0)
  })

  it('renders every primary navigation link', () => {
    render(<Navbar />)
    for (const label of ['Tech Skills', 'Projects', 'Experience', 'Contact']) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    }
  })

  it('exposes a mobile menu toggle so navigation exists below the sm breakpoint', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-nav')
  })

  it('labels the theme toggle with its destination state', () => {
    render(<Navbar />)
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument()
  })
})
