/**
 * Selected work.
 *
 * Each project carries a `decisions` list — what was chosen, and what it was
 * chosen *over*. That section is the point of the whole page: describing a
 * stack is table stakes, defending a trade-off is not, and "technical strategy
 * and direction" is the single largest gap between how Senior and Staff roles
 * are written (+32pp in Karthik's scraped market data).
 *
 * Sourced from the project READMEs (fetched 2026-08-03), so the decisions and
 * their alternatives are drawn from Karthik's own documentation rather than
 * inferred. Two earlier inferences were wrong and are corrected here: the
 * FinOps schedule annotation sits on the *namespace*, not the workload, and
 * the server-side `field_selector` performance decision had been missed
 * entirely.
 *
 * ORDER IS MEANINGFUL. The first three decisions render as full cards under
 * "Key decisions"; the rest render as compact rows under "Also decided". So
 * the first three must be the ones worth defending at length — the load-
 * bearing architectural choice, and the two that best answer the constraints
 * listed above them. Tooling preferences go in the tail.
 *
 * Nothing is hidden: the tail keeps its rationale, at half the height. This
 * replaced a flat list where all 32 decisions rendered identically, which made
 * "Kopf and Python" look as important as the namespace ownership boundary and
 * pushed the FinOps page to 5.2 screens on mobile.
 *
 * PROJECT ORDER IS ALSO MEANINGFUL, and is set by demand rather than by
 * preference. Measured over 3,212 unique scraped German postings (13 Jul –
 * 3 Aug 2026) as the share of jobs in Karthik's target categories — Platform
 * Engineering (368), SRE (100), DevOps (142) — whose description mentions each
 * project's subject matter. Among the 76 best-matching of those (FitScore ≥ 60):
 *
 *   observability / OTel / SLOs   71%      <- leads
 *   Terraform / policy-as-code    67%
 *   GitOps / IDP / Crossplane     62%
 *   GPU / CUDA / Karpenter        11%      <- was previously first
 *   Kubernetes operator / FinOps   7%
 *
 * The GPU project used to open the page. It is the strongest differentiator he
 * has and stays prominent, but it addresses 72 AI Infrastructure postings while
 * he is applying to 610 Platform/SRE/DevOps ones, so it no longer leads.
 * Re-derive with scripts/project_signal.py (reads the scraper repo) before
 * reordering again — do not reorder on taste.
 *
 * A Helm library chart project was removed here. Frequency was not the reason —
 * it out-scored FinOps 55 mentions to 21. It was redundant: of the 55 jobs
 * mentioning Helm, 76% also mentioned observability, 71% Terraform and 58%
 * GitOps, so only 2 of 610 target jobs (and 0 of the 76 best matches) mentioned
 * Helm and nothing else in the portfolio. The same claim is already made more
 * strongly in experience.ts as production work at Aldi, and skills.ts carries
 * Helm at `deep` tier. FinOps stays despite the lower score because it is the
 * only artifact showing a reconciliation loop written against the Kubernetes
 * API rather than tools composed together — a different kind of evidence, not
 * a weaker copy of the same kind. Restore with:
 *   git show be3541c -- content/projects.ts components/architecture.tsx
 *
 * !! TODO(karthik): still worth a read-through before publishing — the
 * !! wording is mine even where the facts are yours.
 */

export type Decision = {
  /** What was chosen. */
  decision: string
  /** The alternative it was chosen over. Drives the "instead of" line. */
  insteadOf?: string
  /** Why. */
  rationale: string
}

export type Project = {
  slug: string
  title: string
  /** Card blurb — one or two sentences. */
  summary: string
  /** The problem in one sentence, stated before any technology. */
  problem: string
  constraints: string[]
  decisions: Decision[]
  /** What changed as a result. Omit rather than invent one. */
  outcome?: string
  tags: string[]
  githubUrl: string
  /** Featured projects render large on the landing page. */
  featured: boolean
}

export const projects: Project[] = [
  {
    slug: "opentelemetry-platform-on-eks",
    title: "OpenTelemetry & LGTM Platform",
    summary:
      "Cloud-native observability stack using OpenTelemetry Collectors in agent and gateway patterns, feeding the LGTM stack for unified metrics, logs and distributed tracing.",
    problem:
      "Telemetry ends up coupled to whichever vendor was chosen first — instrumentation is rewritten every time the backend changes, and metrics, logs and traces stay in three unconnected tools.",
    constraints: [
      "Instrumentation must outlive any single observability vendor",
      "Metrics, logs and traces need to correlate on the same request",
      "Collection overhead has to stay proportionate to the workload",
    ],
    decisions: [
      {
        decision: "OpenTelemetry Collector as the single ingest point",
        insteadOf: "Vendor agents exporting straight from each app",
        rationale:
          "Applications emit OTLP and know nothing about the backend, so changing or adding one becomes an exporter config change instead of a re-instrumentation project. That is the whole reason to accept the extra hop.",
      },
      {
        decision: "Agent DaemonSet feeding a central gateway",
        insteadOf: "Agent-only collection",
        rationale:
          "Node-local agents enrich with Kubernetes metadata and buffer through brief network trouble. The gateway holds everything needing a global view — filtering, batching and sampling — in one place instead of on every node.",
      },
      {
        decision: "Tail-based sampling at the gateway",
        insteadOf: "Head-based sampling at the source",
        rationale:
          "Keeps 100% of errors and latency outliers while shedding healthy high-volume traces. It cannot work at the agent, which only ever sees part of a trace — which is what forces the gateway tier.",
      },
      {
        decision: "A dedicated observability cluster",
        insteadOf: "Co-locating the backend with the workloads",
        rationale:
          "The platform team owns routing, sampling, dashboards and cost controls on isolated node groups, so a workload cluster incident does not take down the tooling you need to debug it.",
      },
      {
        decision: "Specialised backends behind one Grafana",
        insteadOf: "A single general-purpose store",
        rationale:
          "Metrics, logs and traces have genuinely different retention and query shapes. Grafana unifies them at the point of use, so the split costs nothing where it would be felt.",
      },
    ],
    tags: ["OpenTelemetry", "LGTM Stack", "Prometheus", "Grafana", "Loki", "Tempo"],
    githubUrl: "https://github.com/ok-karthik/opentelemetry-platform-on-eks",
    featured: true,
  },
  {
    slug: "internal-developer-platform",
    title: "IDP & GitOps Reference Architecture",
    summary:
      "Internal Developer Platform blueprint for zero-touch service onboarding and multi-tenant continuous delivery via GitOps.",
    problem:
      "Onboarding a new service means a ticket, a wait, and a platform engineer hand-assembling the same manifests again — the platform team becomes the bottleneck for every team it serves.",
    constraints: [
      "Developers must self-serve without needing cluster access",
      "Multi-tenant isolation cannot depend on tenants behaving correctly",
      "Cluster state must be reconstructible from Git alone",
    ],
    decisions: [
      {
        decision: "Argo CD ApplicationSet with a directory generator",
        insteadOf: "One Application manifest per service",
        rationale:
          "Onboarding becomes a directory appearing in Git rather than a platform-team ticket, which is what makes zero-touch provisioning possible at all rather than merely automated.",
      },
      {
        decision: "Crossplane claims as the infrastructure interface",
        insteadOf: "Handing developers Terraform directly",
        rationale:
          "Infrastructure is requested through a Kubernetes API the platform controls, so the same RBAC, admission policy and GitOps loop govern a database the way they govern a Deployment.",
      },
      {
        decision: "Kyverno admission control",
        insteadOf: "Manual compliance review before merge",
        rationale:
          "Guardrails over gates: the control plane enforces the boundary at admission, so a tenant cannot opt out by editing their own manifests and the platform team is not a queue.",
      },
      {
        decision: "Tenant source repo separate from tenant GitOps repo",
        insteadOf: "One repository holding code and manifests",
        rationale:
          "Application code and desired cluster state have different reviewers, lifecycles and blast radius. Merging them makes every application commit a potential production change.",
      },
      {
        decision: "A Python scaffolder CLI",
        insteadOf: "A web developer portal such as Backstage",
        rationale:
          "Meets developers in the terminal they already work in, and keeps the golden path versionable and reviewable like any other code. A portal is on the roadmap once the templates have stabilised.",
      },
      {
        decision: "Shared team infrastructure split from app-specific infrastructure",
        insteadOf: "One Terraform state per tenant",
        rationale:
          "Onboarding a new application must not risk the shared resources its neighbours depend on, so manual changes to team infrastructure survive subsequent scaffolding runs.",
      },
    ],
    tags: ["IDP", "GitOps", "Argo CD", "Kubernetes", "Python"],
    githubUrl: "https://github.com/ok-karthik/internal-developer-platform",
    featured: true,
  },
  {
    slug: "enterprise-aws-terragrunt",
    title: "Enterprise AWS Infrastructure",
    summary:
      "Multi-environment AWS infrastructure platform built with Terragrunt and Terraform using a hierarchical blueprint pattern — DRY, policy-gated and cost-aware.",
    problem:
      "Multi-environment Terraform drifts: dev and prod diverge through copy-paste, and nothing stops a change that is syntactically valid but violates security or blows the budget.",
    constraints: [
      "Environments must stay structurally identical while differing in scale",
      "Policy violations have to be caught before apply, not in review",
      "Cost impact needs to be visible at pull-request time",
    ],
    decisions: [
      {
        decision: "Hierarchical Terragrunt blueprints",
        insteadOf: "Duplicated Terraform per environment",
        rationale:
          "A generic module library is kept strictly separate from live environment config, which inherits from it. Dev and prod cannot structurally diverge, which is the usual failure mode of per-environment directories.",
      },
      {
        decision: "OPA and Conftest evaluate the plan",
        insteadOf: "Static analysis of the HCL source",
        rationale:
          "The plan shows what will actually be created, with module defaults, variables and computed values resolved. A rule like no-public-buckets is trivially evadable against source, where the offending value can arrive from three modules deep.",
      },
      {
        decision: "Governance gates fan out in parallel",
        insteadOf: "A sequential lint to plan to policy to cost chain",
        rationale:
          "Static analysis, plan, policy and cost are independent. In a chain the first failure hides the rest, so three problems take three round trips to discover; in parallel one run reports every class of failure.",
      },
      {
        decision: "Infracost sits alongside the security gates",
        insteadOf: "Reviewing cost monthly, after the fact",
        rationale:
          "Cost surfaces while the change is still one revert away and in front of the person who made it, rather than weeks later in front of someone who did not.",
      },
      {
        decision: "Nightly drift detection",
        insteadOf: "Trusting that applied state stays applied",
        rationale:
          "Out-of-band changes are found on a schedule instead of during the next incident, which is the only way a Git-declared environment stays true over time.",
      },
      {
        decision: "Manual approval gate on prod only",
        insteadOf: "Uniform automation across environments",
        rationale:
          "Dev applies automatically so the loop stays fast; prod requires a human after dev is stable. The gate is placed where the blast radius is, not everywhere.",
      },
    ],
    tags: ["Terragrunt", "Terraform", "AWS", "OPA/Conftest", "GitHub Actions"],
    githubUrl: "https://github.com/ok-karthik/enterprise-aws-infrastructure-terragrunt",
    featured: true,
  },
  {
    slug: "ai-infrastructure-on-eks",
    title: "AI Infrastructure on Amazon EKS",
    summary:
      "Production-style AI infrastructure on Amazon EKS for provisioning, sharing and observing NVIDIA GPUs — Karpenter, GPU Operator, CUDA workloads and DCGM observability.",
    problem:
      "GPU capacity is expensive, scarce and easy to strand: nodes sit idle between jobs, a single workload can hold a whole accelerator, and standard Kubernetes gives you almost no visibility into what the GPU is actually doing.",
    constraints: [
      "GPU nodes are costly enough that always-on capacity is not an option",
      "Workloads are bursty — capacity has to appear and drain on demand",
      "Standard Kubernetes metrics say nothing about GPU utilisation or memory",
    ],
    decisions: [
      {
        decision: "Karpenter NodePools keyed on nvidia.com/gpu",
        insteadOf: "Static GPU managed node groups",
        rationale:
          "Static groups pay for accelerators between jobs. Karpenter provisions on pending-pod demand across the g4dn and g6 spot families and consolidates when idle — which matters far more at GPU pricing than at CPU pricing.",
      },
      {
        decision: "GPU time slicing for sharing",
        insteadOf: "MIG or MPS",
        rationale:
          "All three were evaluated against VRAM limits. Time slicing needs no hardware partitioning support, so it works on the instance families in play. The cost is no memory isolation between tenants — acceptable for development and inference under one team, not for untrusted multi-tenancy.",
      },
      {
        decision: "GPU Operator owns the driver stack",
        insteadOf: "Baking drivers into a custom AMI",
        rationale:
          "Kernel modules, the container runtime hook, Node Feature Discovery and the device plugin are versioned and reconciled together, so a driver upgrade is a Helm value rather than an AMI rebuild and node roll.",
      },
      {
        decision: "DCGM exporter into the existing Prometheus and Grafana",
        insteadOf: "A separate GPU monitoring tool",
        rationale:
          "GPU telemetry becomes another Prometheus target on port 9400, so the same dashboards, alert rules and on-call paths apply. Utilisation and memory pressure are the two signals that say whether sharing is actually working.",
      },
    ],
    tags: ["GPU Operator", "Karpenter", "CUDA", "Time Slicing", "Observability"],
    githubUrl: "https://github.com/ok-karthik/ai-infrastructure-on-eks",
    featured: false,
  },
  {
    slug: "finops-k8s-operator",
    title: "FinOps Kubernetes Operator",
    summary:
      "Kubernetes operator that scales non-production workloads to zero during declared sleep windows, with per-workload exclusions.",
    problem:
      "Non-production clusters run all night and all weekend at full replica count, paying for capacity nobody is using — and the obvious fix, scaling things down, is exactly the kind of automation that causes an outage when it gets one workload wrong.",
    constraints: [
      "Must never scale down a workload someone depends on",
      "Teams need an escape hatch they control themselves",
      "The operator's own failure must be safe — no action is better than a wrong action",
    ],
    decisions: [
      {
        decision: "Sleep schedules annotated on the namespace",
        insteadOf: "Per-workload schedules or a central config file",
        rationale:
          "A team owns its namespace, so the schedule sits at the boundary the team already controls and every workload inside it inherits one intent rather than drifting apart.",
      },
      {
        decision: "System namespaces skipped unconditionally",
        insteadOf: "Relying on operators to annotate correctly",
        rationale:
          "kube-system and friends can never be scaled to zero by this operator regardless of configuration. The failure mode of a cost tool has to be inaction, never an outage.",
      },
      {
        decision: "Original replica count stored before scaling down",
        insteadOf: "Restoring to a fixed default",
        rationale:
          "Waking a workload has to return it to the size it actually was, not to whatever the chart shipped, or the operator silently resizes production-shaped environments overnight.",
      },
      {
        decision: "Per-workload exclusion annotation",
        insteadOf: "A central allow-list maintained by the platform team",
        rationale:
          "Opting a critical workload out has to be possible without a platform-team round trip. Cost automation only survives contact with users if the escape hatch is trivial.",
      },
      {
        decision: "Server-side field_selector when listing pods",
        insteadOf: "Listing everything and filtering client-side",
        rationale:
          "The API server does the filtering, so the operator does not pull every pod in the cluster into memory to count a handful. It also skips terminating pods, which would otherwise read as rogue workloads.",
      },
      {
        decision: "Timer-based reconciliation every 60 seconds",
        insteadOf: "Event-driven triggers",
        rationale:
          "The trigger is wall-clock time, not a cluster event. A periodic loop matches the shape of the problem and converges after any missed tick, restart or reschedule.",
      },
      {
        decision: "Kopf and Python",
        insteadOf: "The Go operator SDK and controller-runtime",
        rationale:
          "The reconciliation logic is small and schedule-shaped, so Kopf keeps it short and quick to iterate. The trade is a heavier runtime and a smaller ecosystem than controller-runtime.",
      },
    ],
    tags: ["Kubernetes Operator", "Python", "Kopf", "FinOps"],
    githubUrl: "https://github.com/ok-karthik/finops-k8s-operator",
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)
