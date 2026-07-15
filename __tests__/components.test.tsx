import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TechnicalExpertisePillGrid } from '@/components/technical-expertise-pill-grid'
import { ProjectsCertifications } from '@/components/projects-certifications'
import { DevOpsTerminal } from '@/components/devops-terminal'

// Mock scrollTo since JSDOM doesn't support it
HTMLElement.prototype.scrollTo = vi.fn()

// Mock Framer Motion to prevent intersection observer and layout errors in JSDOM
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...actual as any,
    motion: {
      div: ({ children, className, ...props }: any) => <div className={className} data-testid="motion-div" {...props}>{children}</div>,
      h2: ({ children, className, ...props }: any) => <h2 className={className} data-testid="motion-h2" {...props}>{children}</h2>,
      h3: ({ children, className, ...props }: any) => <h3 className={className} data-testid="motion-h3" {...props}>{children}</h3>,
      p: ({ children, className, ...props }: any) => <p className={className} data-testid="motion-p" {...props}>{children}</p>,
    }
  }
})

// Mock Lucide React icons so they render as simple SVG elements
vi.mock('lucide-react', async () => {
  return {
    Layers: () => <svg data-testid="icon-layers" />,
    ShieldAlert: () => <svg data-testid="icon-shield-alert" />,
    Sparkles: () => <svg data-testid="icon-sparkles" />,
    Bot: () => <svg data-testid="icon-bot" />,
    Network: () => <svg data-testid="icon-network" />,
    LayoutTemplate: () => <svg data-testid="icon-layout" />,
    FileText: () => <svg data-testid="icon-file" />,
    Blocks: () => <svg data-testid="icon-blocks" />,
    ShieldBan: () => <svg data-testid="icon-shield-ban" />,
    Key: () => <svg data-testid="icon-key" />,
    PlugZap: () => <svg data-testid="icon-plug-zap" />,
    Cpu: () => <svg data-testid="icon-cpu" />,
    X: () => <svg data-testid="icon-x" />,
    XIcon: () => <svg data-testid="icon-x-icon" />,
  }
})

describe('Website Component Integrity Tests', () => {
  it('should render DevOpsTerminal without crashing', () => {
    const { container } = render(<DevOpsTerminal />)
    expect(container).toBeInTheDocument()
    
    // Ensure the terminal output structural container is present
    const terminal = container.querySelector('.overflow-y-auto')
    expect(terminal).not.toBeNull()
  })

  it('should render TechnicalExpertisePillGrid without crashing', () => {
    const { container } = render(<TechnicalExpertisePillGrid />)
    expect(container).toBeInTheDocument()
    
    // Ensure categories are loaded
    expect(screen.getByText('Tech Skills')).toBeInTheDocument()
  })

  it('should render ProjectsCertifications without crashing', () => {
    const { container } = render(<ProjectsCertifications />)
    expect(container).toBeInTheDocument()
    
    // Ensure projects are loaded
    expect(screen.getByText('Projects & Certifications')).toBeInTheDocument()
  })

  it('should have valid image tags for all tech icons with proper src and alt attributes', () => {
    const { container } = render(<TechnicalExpertisePillGrid />)
    
    const images = container.querySelectorAll('img')
    expect(images.length).toBeGreaterThan(0)

    images.forEach(img => {
      // 1) Verify 'src' exists and isn't empty
      expect(img).toHaveAttribute('src')
      expect(img.getAttribute('src')?.length).toBeGreaterThan(0)
      
      // 2) Verify 'alt' exists for accessibility
      expect(img).toHaveAttribute('alt')
      expect(img.getAttribute('alt')?.length).toBeGreaterThan(0)
    })
  })
})
