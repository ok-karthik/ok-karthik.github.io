---
name: premium-portfolio-ui
description: Generates high-end, premium portfolio UI components with glassmorphism and micro-interactions.
---

# Premium Portfolio UI Generation

Use this skill when asked to create or refine a UI component for this portfolio. The goal is to avoid "cookie-cutter" looks and generate visually stunning, highly-polished components.

## 1. Aesthetic: Editorial Brutalism & Organic Fluidity
- **Glassmorphism**: Use `backdrop-blur-md bg-card/20 border border-white/10`. Always apply subtle transparency instead of solid colors in dark mode.
- **Radii**: Use consistent, large border radii for premium feel (`rounded-2xl` or `rounded-3xl` for main cards, `rounded-full` for pills/buttons).
- **Shadows**: Use custom glowing shadows rather than default tailwind drop shadows. E.g., `shadow-[0_0_15px_rgba(34,211,238,0.15)]`.

## 2. Micro-Interactions (Hover States)
- All interactive elements must have smooth transitions: `transition-all duration-300`.
- **Card Hovers**: Scale slightly (`hover:-translate-y-1`), increase border opacity (`hover:border-primary/40`), and increase glow intensity.
- **Icon Hovers**: Scale icons inside buttons or cards (`group-hover:scale-110`).

## 3. Structural Constraints
- Do NOT use absolute pixel widths for layout. Use responsive grids (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) or Flexbox.
- Prefer semantic HTML (`<section>`, `<article>`, `<nav>`).
- If an element requires interactivity or state, include `"use client"` at the top.

## Execution Example
When generating a card:
```tsx
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="relative group p-6 rounded-3xl bg-card/10 backdrop-blur-md border border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,231,0.15)]"
>
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
  <div className="relative z-10">
    {/* Content goes here */}
  </div>
</motion.div>
```
