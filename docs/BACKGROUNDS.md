# Background Animations Registry & Performance

This document catalogs the available background effects and their performance profiles. The effects are mounted via a central `BackgroundHost` which enforces a shared particle budget, framerate control, and `prefers-reduced-motion` compliance.

The effects are selectable via the `?bg=` query parameter. The default is `mobius`.

## Performance Metrics

All metrics were sampled using Chrome DevTools Protocol (`Performance.getMetrics`) over exactly 400 frames of `requestAnimationFrame` at 1440x900 resolution.
Measurements were taken both at native speed (1x) and simulated low-end hardware (4x CPU throttling).

Target metric for default: 60 fps, <20% main thread busy.

| ID | Label | FPS (1x / 4x) | Main Thread Busy (1x / 4x) | Script Seconds (1x / 4x) |
|---|---|---|---|---|
| `mobius` | Möbius Ribbon (ai-core) | 60.0 / 60.0 | 17.3% / 34.8% | 0.76s / 1.43s |
| `globe` | Sphere Globe | 60.0 / 60.0 | 19.3% / 26.1% | 0.85s / 1.13s |
| `lattice` | Data Lattice | 60.0 / 60.0 | 18.0% / 20.0% | 0.85s / 0.87s |
| `swirl` | Particle Swirl | 60.0 / 60.0 | 17.3% / 22.4% | 0.86s / 1.04s |
| `mesh` | Neural Mesh | 60.0 / 59.6 | 20.8% / 31.5% | 1.02s / 1.54s |
| `vortex` | Particle Vortex | 60.0 / 59.7 | 18.2% / 24.6% | 0.84s / 1.13s |
| `mesh,mobius` | Mesh + Möbius (Stacked) | 60.0 / 60.0 | 23.0% / 49.6% | 1.21s / 2.65s |
| `globe>lattice>swirl` | Morph Sequence | 60.0 / 60.0 | 16.5% / 22.1% | 0.81s / 0.99s |
| `none` | Baseline (No Background) | 60.0 / 60.0 | 7.7% / 3.0% | 0.01s / 0.00s |

### Interpretation
- **Target Achieved**: The `mobius` default successfully hits the performance target at 1x throttling (<20% main thread).
- **Graceful Degradation**: Even at 4x throttling, none of the backgrounds drop frames significantly, though main thread utilization goes up.
- **Budget Splitting**: When rendering stacked backgrounds (`mesh,mobius`), the `BackgroundHost` successfully divides the 1200-particle budget to prevent exponential cost growth. It remains within reasonable bounds.
- **Sequencing**: Internal morph sequences (`globe>lattice>swirl`) cost effectively the same as a single static state, confirming that reusing particles via interpolation avoids the overhead of double-rendering during a crossfade.
