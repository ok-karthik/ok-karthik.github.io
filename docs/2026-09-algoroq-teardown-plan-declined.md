> **Status: declined, 2026-10-05.** Kept as the record of what was proposed.
> Two diagnoses here were right and are already fixed another way: the
> 0.42-scale card thumbnails were unreadable (now a one-line `FlowStrip`), and
> the full-width card diagrams clipped (now rendered at natural size). The
> isometric 3D treatment itself was declined because:
>
> - **The reference is a different medium.** The Algoroq page is a fixed-canvas
>   slide deck narrated over a YouTube video (zoom + pen tools, overflows a
>   1440px window). A portfolio page is read and scrolled.
> - **It breaks the design rules.** Multi-hue glow everywhere is the
>   "AI-generated look" in `.agents/skills/premium-portfolio-ui/SKILL.md`; the
>   colour rule is one accent, status colours only for real state.
> - **Isometric labels read worse,** smaller or angled — worst on phones, the
>   problem the plan set out to fix.
> - **Endless conduit animation** contradicts the play-once reveal rule
>   (`components/assembling-diagram.tsx`).
> - **A second copy of every diagram.** Hand-placed SVG scenes drift from
>   `architecture.tsx`, the failure that file's header already records.
> - **New unsourced claims** (takeaway punchlines, packet chips) would each need
>   checking against the repos under the never-invent rule.
>
> What survives: one flat, readable diagram per writing post — see `PLAN.md`.

---

# Portfolio Roadmap & Architecture Plan: Algoroq-Style Teardown Overhaul

**Status:** Active Plan (September 2026)  
**Target:** Projects Section (`/work`, `components/work-section.tsx`) & Writings Section (`/writing`, `components/notes-speaking-section.tsx`)  
**Design Reference:** [Algoroq Prime Video Microservices Teardown](https://algoroq.io/resources/youtube-diagrams/prime-video-microservices.html)

---

## 1. Executive Summary & Objective

Karthik Orugonda's portfolio distinguishes itself through **five real projects backed by 30 documented architecture decisions** and **first-principles engineering writing**. However, the current architecture diagrams are rendered as basic flat HTML boxes (`<Node>`, `<Frame>`) scaled down with CSS `transform`, which makes them look like basic wireframes and renders text unreadable on smaller viewports.

This plan upgrades the **Projects** and **Writings** sections into **cinematic, high-fidelity isometric architecture teardowns** inspired by the Algoroq.io Prime Video microservices breakdown.

### Key Visual & Structural Enhancements
1. **Vector Isometric 3D Primitives**: Reusable native SVG primitives (beveled hexagonal prisms, translucent storage cylinders, 3D glass spheres with specular highlights, and ground ambient glow pools).
2. **Dynamic Flow Conduits**: Glowing bezier conduits with flowing dash animations carrying contextual packet/token chips (OTel trace spans, metric counters, Git commit hashes, Karpenter scaling triggers).
3. **Algoroq Teardown Metadata & Kickers**: Kicker rows (`PRJ·01 · OBSERVABILITY`, `NOTE·01 · GPU INFRASTRUCTURE`), reading time badges, decision counters, and frosted glass chips.
4. **Editorial Architecture Takeaways**: High-impact takeaway callout chips anchoring each scene (e.g. *"The 1-hop gateway decouples cluster workloads from backend auth & concurrency spikes"*).
5. **Interactive Writing Teardowns**: Elevating each article in `/writing` with a signature comparative teardown diagram (e.g. *Time-Slicing vs MIG*, *Gateway Hop vs Direct Mesh*, *Parallel vs Sequential Gates*).

---

## 2. Hard Constraints & Portfolio Guardrails

From `.agents/AGENTS.md` and `.agents/skills/premium-portfolio-ui/SKILL.md`:

| Rule | Requirement |
|---|---|
| **No Staff Title Claim** | Experience and bio maintain "Senior Platform Engineer & SRE". |
| **No Invented Numbers** | Every number and technical claim is grounded in repo READMEs and documentation. |
| **Zero Runtime CDN** | No external CDN libraries, fonts, or images. All SVGs are inline React components. |
| **Static Export Only** | `output: 'export'` compatible. Pure CSS/SVG animations, zero runtime server requirements. |
| **Accessibility (WCAG AA)** | 4.5:1 minimum contrast across all text and badge elements in both Dark and Light modes. |
| **Motion Respect** | `prefers-reduced-motion` halts all conduit flowing dashes and transitions immediately. |
| **Control Room Identity** | Built upon the portfolio's deep purple-graphite base (`#0d0a16` / `#191036`) and dual-lume ambient gradients. |

---

## 3. Component Architecture & Directory Structure

```
ok-karthik.github.io/
├── components/
│   ├── diagrams/
│   │   ├── isometric-primitives.tsx       # Reusable SVG 3D primitives (Cylinder, Prism, Sphere, Conduit, Chip)
│   │   ├── project-diagrams/
│   │   │   ├── otel-platform-diagram.tsx  # Project 01: OTel & LGTM Ingest / Buffer / Storage Pipeline
│   │   │   ├── idp-gitops-diagram.tsx     # Project 02: Golden Paths -> Argo CD -> Kyverno -> Namespaces
│   │   │   ├── aws-terragrunt-diagram.tsx # Project 03: Parallel Governance Gates (TFLint, OPA, Plan, Cost)
│   │   │   ├── gpu-platform-diagram.tsx   # Project 04: Karpenter -> Time-Slicing vs MIG Hardware Slices
│   │   │   └── finops-diagram.tsx         # Project 05: Kopf Timer -> Active Window -> Replica Hibernation
│   │   └── writing-diagrams/
│   │       ├── time-slicing-vs-mig-diagram.tsx       # Post 01: Hardware slice isolation vs Interleaved queue
│   │       ├── otel-collector-hop-diagram.tsx        # Post 02: 1-Hop Gateway buffer vs N×M mesh sprawl
│   │       └── governance-gates-diagram.tsx          # Post 03: Concurrent evaluation diamond vs sequential stall
│   ├── work-section.tsx                   # Updated with Algoroq-style isometric cards & kickers
│   ├── notes-speaking-section.tsx         # Updated with mini teardown visual previews & kicker badges
│   └── architecture.tsx                   # Central router dispatching to vector isometric scenes
├── app/
│   ├── work/[slug]/page.tsx               # Full-width hero architecture teardown diagram
│   ├── writing/page.tsx                   # Writing index with visual teardown thumbnails
│   └── writing/[slug]/page.tsx            # Article header with featured architecture teardown diagram
```

---

## 4. Phase-by-Phase Implementation Plan

### Phase 1: Core Isometric SVG Primitive Library
- Implement `components/diagrams/isometric-primitives.tsx`:
  - `<IsometricCylinder>`: Translucent cylinder with top ellipse highlight, grooved tiers, base glow pool, and glow filters.
  - `<IsometricHexPrism>`: Beveled 3D hexagonal prism with directional facets, top highlight, and accent glow.
  - `<IsometricSphere>`: 3D glass/metallic sphere with offset specular reflection and ground shadow.
  - `<IsometricFlowConduit>`: Curved bezier flow path with animated dash flow (`stroke-dashoffset`) and mid-conduit token badges.
  - `<FrostedChip>`: Glassmorphic badge pill with backdrop blur and accent border.
  - `<TeardownHeader>` & `<TeardownTakeaway>`: Editorial kicker and punchline callout.

### Phase 2: Project Architecture Scenes
- Implement the 5 project teardown diagrams in `components/diagrams/project-diagrams/`:
  1. **OpenTelemetry Platform**: Ingress -> Collector Gateway Prism -> Prometheus/Loki/Tempo Cylinders -> Grafana Console.
  2. **Internal Developer Platform**: Scaffolder CLI -> GitHub Actions -> Argo CD Sync Drum -> Kyverno Admission Shield -> Multi-tenant Namespaces.
  3. **Enterprise AWS Terragrunt**: Parallel Governance Gates (TFLint, OPA, Plan, Infracost) -> Verified VPC/EKS Deploy.
  4. **AI Infrastructure (GPU Platform)**: Karpenter Provisioner -> GPU Card with Time-Slicing vs MIG Visualization -> DCGM Exporter.
  5. **FinOps Operator**: Kopf Timer -> Schedule Engine -> Sleep Window Reconciler -> Replica Patch vs Bypass.

### Phase 3: Work Section & Project Detail Pages
- Update `components/work-section.tsx`:
  - Embed vector teardown diagrams into full-width cards.
  - Add Algoroq-style kicker rows (`PRJ·01`, category, decision count) and takeaway punchlines.
- Update `app/work/[slug]/page.tsx`:
  - Render full-width interactive architecture teardowns above the key decisions list.

### Phase 4: Writing Teardown Diagrams & Integration
- Implement the 3 writing teardown diagrams in `components/diagrams/writing-diagrams/`:
  1. `time-slicing-vs-mig-diagram.tsx`: Hardware isolation vs Interleaved virtual queues.
  2. `otel-collector-hop-diagram.tsx`: Direct N×M backend mesh vs 1-Hop Collector buffer.
  3. `governance-gates-diagram.tsx`: Sequential pipeline delay vs Concurrent verification diamond.
- Update `components/notes-speaking-section.tsx` with teaser diagrams and kickers.
- Update `app/writing/page.tsx` and `app/writing/[slug]/page.tsx` with featured visual teardown headers.

### Phase 5: Verification & Polish
- Run `pnpm test` (vitest assertions).
- Run `pnpm eval` (design evaluation harness).
- Run `pnpm audit:html` (static HTML audit).
- Verify responsive layout at 375px, 768px, and 1440px.
- Confirm `prefers-reduced-motion` compatibility and Dark/Light mode WCAG AA contrast.

---

## 5. Historical Record: August 2026 Redesign Decision (Archived)

*Summary of historical decisions from 2026-08-16 / 2026-08-17:*
- **Skin Selection:** Aurora Glass was chosen over Blueprint and Spatial. Blueprint (paper/drafting sheet) was rejected in favor of the dark, lit "control room" aesthetic.
- **Palette:** Standardized on deep purple-graphite base (`#0d0a16` / `#191036` / `#0a0812`) with cyan/teal accent (`#2bc8dd`) and two-lume ambient wash.
- **Section Shapes:** Maintained distinct section shapes (Projects = cards, Experience = timeline rail, Skills = masonry panel, Contact = full-bleed band).
- **Temporary Switcher Cleanup:** The temporary multi-skin switcher and Blueprint directory were deprecated and removed.
