# Karthik Orugonda | Portfolio Context

This document serves as persistent context for AI agents working on this project. It outlines the architectural choices, design system, and key technical decisions made for the `ok-karthik.github.io` portfolio.

## Project Goal
The portfolio is designed for **Karthik Orugonda**, a Senior Platform Engineer with 10+ years of experience transitioning into AI Infrastructure / AI Platform roles. 
The primary objective is to showcase deep technical expertise through a highly polished, premium UI/UX that blends modern Platform Engineering (Kubernetes, Terraform) with AI compute architecture themes.

## Technology Stack
- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS v4, utilizing a highly customized theme in `app/globals.css`.
- **Animations**: Framer Motion (scroll-driven reveals), pure React/Canvas (interactive backgrounds).
- **Theming**: Dark mode support via `next-themes` (`class` strategy).

## Design System & Theme
- **Color Palette**: Dark mode utilizes deep space blues/purples (`#090714` to `#1a0f3d`). The primary accent color is a neon cyan (`#00ffe7`), which defines the AI/Cyberpunk aesthetic. Light mode utilizes soft blues (`#0284c7`).
- **Shapes & Glassmorphism**: Cards heavily feature rounded corners (`var(--radius)` is defined in `globals.css` for both modes), translucent backgrounds (`bg-card`), and blur filters (`backdrop-blur-sm`).
- **Hover Micro-interactions**: Defined centrally via the `@utility glow-card-hover` in `app/globals.css`. It dynamically injects a 1px border and a neon box-shadow upon hover.

## Key Components
- **`app/layout.tsx`**: Implements the `ThemeProvider` and injects the global interactive background (`<NeuralMesh />`).
- **`<NeuralMesh />`**: An interactive, custom HTML5 Canvas particle system running in the background. Nodes connect to each other and the user's mouse pointer via calculated distance thresholds.
- **`<DevOpsTerminal />`**: A functional, simulated Linux terminal block in the hero section that allows recruiters/managers to input shell commands to fetch details.
- **`<ExperienceSection />` & `<TechnicalExpertise />`**: Showcase career history and tech stack using `<motion.div>` for scroll-driven entry animations.

## Development Rules
1. Maintain support for both Light and Dark modes. Ensure contrast ratios remain readable.
2. Avoid generic rectangles in Dark mode; always ensure `--radius` applies correctly.
3. Keep animations fluid and 60fps; rely heavily on GPU-accelerated CSS properties (`transform`, `opacity`) or lightweight canvas.
4. When iterating, prioritize aesthetics that say "Enterprise Scale" and "AI Native".
