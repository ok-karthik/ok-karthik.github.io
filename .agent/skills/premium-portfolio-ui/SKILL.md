---
name: premium-portfolio-ui
description: Generates high-end, premium portfolio UI components with glassmorphism and micro-interactions.
---

# Premium Portfolio UI Generation

This skill provides highly deterministic structural and aesthetic constraints for building and refining UI components in this portfolio. It adheres to rigorous Evaluation and Graduation Tiers.

## 1. Trigger Conditions
**[POSITIVE TRIGGERS]**
- User requests to "build a new section", "redesign this component", or "make it look premium/glassmorphic".
- User requests to modify spacing, layout, padding, grids, or visual structure of the frontend React/Next.js components.
- Any request involving `tailwindcss` aesthetic changes or Framer Motion entrance animations.

**[NEGATIVE TRIGGERS / DO NOT USE]**
- DO NOT trigger for backend logic, API routes, or database configurations.
- DO NOT trigger for generic text updates or typo fixes.
- DO NOT trigger if the user asks to "fix a React state bug" without mentioning UI/styling.

## 2. Anti-Patterns & Execution Constraints (Execution Failure Prevention)
- **Framer Motion Conflict**: NEVER apply `transition-all` via Tailwind to elements that are concurrently animated by Framer Motion (e.g., `<motion.div>`). This causes the CSS transition engine and JS animation engine to fight, resulting in severe layout thrashing and visual stuttering.
  - *Golden Fix*: Use `[transition-property:color,background-color,border-color,box-shadow]` instead to safely isolate hover effects.
- **Section Wrappers**: DO NOT wrap entire page sections (e.g., `#tech-skills`, `#experience`) in massive glassmorphic border containers. This introduces internal padding that creates an optical illusion of condensed content. Sections should use an open layout (`max-w-6xl mx-auto`).
- **Responsive Degradation**: Never use absolute pixel values for structural layouts.

## 3. Aesthetic Constraints: Editorial Brutalism & Organic Fluidity
- **Glassmorphism**: Always apply subtle transparency instead of solid colors in dark mode (e.g., `bg-black/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10`).
- **Radii**: Use consistent, large border radii for premium feel (`rounded-2xl` or `rounded-3xl` for main cards, `rounded-full` for pills/buttons).
- **Shadows**: Use custom glowing shadows rather than default tailwind drop shadows (e.g., `shadow-[0_0_15px_rgba(34,211,238,0.15)]`).

## 4. Meta-Skills & Self-Improvement
*Notice to Agents*: You are authorized and encouraged to improve this skill if you observe a persistent pattern of failure or discover a superior UI pattern that is successfully verified by the user.
- **Assisted Authoring**: If a new CSS technique dramatically improves visual fidelity and the user approves it, you MUST update this `SKILL.md` document to incorporate the pattern under Section 3.
- **Optimization Loops**: If a UI bug is encountered and resolved (e.g., a z-index stacking context issue), crystallize it into a new rule under Section 2 (Anti-Patterns).
- **Evaluation Sync**: Always ensure changes to this file do not regress the `golden_dataset.json` eval harness.
