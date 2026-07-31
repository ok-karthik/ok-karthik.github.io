# 🤖 Agent Guidelines

Welcome to this repository. You are operating in a fully Agentic-Engineered environment.
Before making any changes to this codebase, you **MUST** read and adhere to the following:

## 1. Context References
- Read `ARCHITECTURE.md` for the overarching technical design, business logic, and component structure.
- Read the modular rule files in `.agents/rules/` for strict coding and testing constraints.
- Utilize the `.agents/skills/` directory whenever building new features or UI components to maintain consistency.

## 2. Project Overview & Website Details
This is the professional portfolio for Karthik Orugonda, a Senior Platform Engineer & SRE transitioning into AI Infrastructure and AI Platform Architect roles. 
- **Objective:** Showcase deep technical expertise through a highly polished, premium UI/UX blending modern Platform Engineering with AI compute themes.
- **Production URLs:** 
  1. `https://karthik-orugonda.pages.dev`
  2. `https://ok-karthik.github.io`

## 3. Technology Stack
- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS v4 with a highly customized theme in `app/globals.css` (Dark/Light mode via `next-themes`).
- **Animations**: Framer Motion (scroll-driven reveals), React/Canvas (interactive backgrounds).
- **UI Components**: Radix UI / shadcn. 

## 4. Repository Layout
- `app/` - Next.js App Router core (layout, global styles, theme provider).
- `components/` - React components (DevOps Terminal, Neural Mesh, animated sections).
- `public/` - Static assets and custom SVG icons.
- `__tests__/` - Vitest test suite for UI components.
- `.agents/` - Customization root containing agent skills (`skills/`) and rules (`rules/`).
- `ARCHITECTURE.md` - Key technical and design decisions.

## 5. Core Behaviors
- **Always `git pull`**: Always perform a `git pull` before making any changes to ensure you are working with the latest codebase.
- **Never Push Without Approval**: Making local commits is perfectly acceptable, but you MUST NEVER push commits to the remote repository (e.g., `git push origin main`) without explicitly asking the user for permission first.
- **Explain Technical Details**: When making changes, fixes, or implementing new features, always break down the technical details and explain them clearly to the user. Do not blindly write code—educate the user on the "why" and "how".

## 6. Post-Commit Verification
- **Monitor CI Pipelines**: After committing code, you must actively monitor the GitHub Actions pipeline. If the pipeline fails, investigate the logs and immediately push a fix.
- **Live Production Validation**: Once the CI pipeline succeeds, verify that the deployment worked properly on both production URLs. Ensure the changes are visible and perform content validation. This prevents silent failures where GitHub Pages returns a 200 status but renders a blank or default error page.

## 7. UI Stability & Integrity Testing
- **Website Working Properly**: Whenever changing layout, components, or UI code, ensure the application compiles and renders without crashing by writing unit tests.
- **Icon and Layout Validation**: Always verify that all `img` elements have valid `src` and `alt` attributes. Layouts should not break or warp on different device sizes.
- **Write Test Cases**: Add or update `vitest` tests in `__tests__/` whenever major UI components are added or modified.
