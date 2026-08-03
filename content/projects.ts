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
        insteadOf: "Static groups pay for accelerators between jobs. Karpenter provisions on pending-pod demand across the g4dn and g6 spot families and consolidates when idle — which matters far more at GPU pricing than at CPU pricing.",
        rationale:
          "Static GPU managed node groups",
      },
      {
        decision: "GPU time slicing for sharing",
        insteadOf: "All three were evaluated against VRAM limits. Time slicing needs no hardware partitioning support, so it works on the instance families in play. The cost is no memory isolation between tenants — acceptable for development and inference under one team, not for untrusted multi-tenancy.",
        rationale:
          "MIG or MPS",
      },
      {
        decision: "GPU Operator owns the driver stack",
        insteadOf: "Kernel modules, the container runtime hook, Node Feature Discovery and the device plugin are versioned and reconciled together, so a driver upgrade is a Helm value rather than an AMI rebuild and node roll.",
        rationale:
          "Baking drivers into a custom AMI",
      },
      {
        decision: "DCGM exporter into the existing Prometheus and Grafana",
        insteadOf: "GPU telemetry becomes another Prometheus target on port 9400, so the same dashboards, alert rules and on-call paths apply. Utilisation and memory pressure are the two signals that say whether sharing is actually working.",
        rationale:
          "A separate GPU monitoring tool",
      },
    ],
    tags: ["GPU Operator", "Karpenter", "CUDA", "Time Slicing", "Observability"],
    githubUrl: "https://github.com/ok-karthik/ai-infrastructure-on-eks",
    featured: true,
  },
  {
    slug: "otel-observability-platform",
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
        insteadOf: "Applications emit OTLP and know nothing about the backend, so changing or adding one becomes an exporter config change instead of a re-instrumentation project. That is the whole reason to accept the extra hop.",
        rationale:
          "Vendor agents exporting straight from each app",
      },
      {
        decision: "Agent DaemonSet feeding a central gateway",
        insteadOf: "Node-local agents enrich with Kubernetes metadata and buffer through brief network trouble. The gateway holds everything needing a global view — filtering, batching and sampling — in one place instead of on every node.",
        rationale:
          "Agent-only collection",
      },
      {
        decision: "A dedicated observability cluster",
        insteadOf: "The platform team owns routing, sampling, dashboards and cost controls on isolated node groups, so a workload cluster incident does not take down the tooling you need to debug it.",
        rationale:
          "Co-locating the backend with the workloads",
      },
      {
        decision: "Tail-based sampling at the gateway",
        insteadOf: "Keeps 100% of errors and latency outliers while shedding healthy high-volume traces. It cannot work at the agent, which only ever sees part of a trace — which is what forces the gateway tier.",
        rationale:
          "Head-based sampling at the source",
      },
      {
        decision: "Specialised backends behind one Grafana",
        insteadOf: "Metrics, logs and traces have genuinely different retention and query shapes. Grafana unifies them at the point of use, so the split costs nothing where it would be felt.",
        rationale:
          "A single general-purpose store",
      },
    ],
    tags: ["OpenTelemetry", "LGTM Stack", "Prometheus", "Grafana", "Loki", "Tempo"],
    githubUrl: "https://github.com/ok-karthik/otel-observability-platform-on-eks",
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
        insteadOf: "A generic module library is kept strictly separate from live environment config, which inherits from it. Dev and prod cannot structurally diverge, which is the usual failure mode of per-environment directories.",
        rationale:
          "Duplicated Terraform per environment",
      },
      {
        decision: "Governance gates fan out in parallel",
        insteadOf: "Static analysis, plan, policy and cost are independent. In a chain the first failure hides the rest, so three problems take three round trips to discover; in parallel one run reports every class of failure.",
        rationale:
          "A sequential lint to plan to policy to cost chain",
      },
      {
        decision: "OPA and Conftest evaluate the plan",
        insteadOf: "The plan shows what will actually be created, with module defaults, variables and computed values resolved. A rule like no-public-buckets is trivially evadable against source, where the offending value can arrive from three modules deep.",
        rationale:
          "Static analysis of the HCL source",
      },
      {
        decision: "Infracost sits alongside the security gates",
        insteadOf: "Cost surfaces while the change is still one revert away and in front of the person who made it, rather than weeks later in front of someone who did not.",
        rationale:
          "Reviewing cost monthly, after the fact",
      },
      {
        decision: "Nightly drift detection",
        insteadOf: "Out-of-band changes are found on a schedule instead of during the next incident, which is the only way a Git-declared environment stays true over time.",
        rationale:
          "Trusting that applied state stays applied",
      },
      {
        decision: "Manual approval gate on prod only",
        insteadOf: "Dev applies automatically so the loop stays fast; prod requires a human after dev is stable. The gate is placed where the blast radius is, not everywhere.",
        rationale:
          "Uniform automation across environments",
      },
    ],
    tags: ["Terragrunt", "Terraform", "AWS", "OPA/Conftest", "GitHub Actions"],
    githubUrl: "https://github.com/ok-karthik/enterprise-aws-infrastructure-terragrunt",
    featured: true,
  },
  {
    slug: "idp-gitops-architecture",
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
        decision: "Tenant source repo separate from tenant GitOps repo",
        insteadOf: "Application code and desired cluster state have different reviewers, lifecycles and blast radius. Merging them makes every application commit a potential production change.",
        rationale:
          "One repository holding code and manifests",
      },
      {
        decision: "Argo CD ApplicationSet with a directory generator",
        insteadOf: "Onboarding becomes a directory appearing in Git rather than a platform-team ticket, which is what makes zero-touch provisioning possible at all rather than merely automated.",
        rationale:
          "One Application manifest per service",
      },
      {
        decision: "Kyverno admission control",
        insteadOf: "Guardrails over gates: the control plane enforces the boundary at admission, so a tenant cannot opt out by editing their own manifests and the platform team is not a queue.",
        rationale:
          "Manual compliance review before merge",
      },
      {
        decision: "A Python scaffolder CLI",
        insteadOf: "Meets developers in the terminal they already work in, and keeps the golden path versionable and reviewable like any other code. A portal is on the roadmap once the templates have stabilised.",
        rationale:
          "A web developer portal such as Backstage",
      },
      {
        decision: "Shared team infrastructure split from app-specific infrastructure",
        insteadOf: "Onboarding a new application must not risk the shared resources its neighbours depend on, so manual changes to team infrastructure survive subsequent scaffolding runs.",
        rationale:
          "One Terraform state per tenant",
      },
      {
        decision: "Crossplane claims as the infrastructure interface",
        insteadOf: "Infrastructure is requested through a Kubernetes API the platform controls, so the same RBAC, admission policy and GitOps loop govern a database the way they govern a Deployment.",
        rationale:
          "Handing developers Terraform directly",
      },
    ],
    tags: ["IDP", "GitOps", "Argo CD", "Kubernetes", "Python"],
    githubUrl:
      "https://github.com/ok-karthik/platform-engineering-idp-gitops-reference-architecture",
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
        insteadOf: "A team owns its namespace, so the schedule sits at the boundary the team already controls and every workload inside it inherits one intent rather than drifting apart.",
        rationale:
          "Per-workload schedules or a central config file",
      },
      {
        decision: "Per-workload exclusion annotation",
        insteadOf: "Opting a critical workload out has to be possible without a platform-team round trip. Cost automation only survives contact with users if the escape hatch is trivial.",
        rationale:
          "A central allow-list maintained by the platform team",
      },
      {
        decision: "Server-side field_selector when listing pods",
        insteadOf: "The API server does the filtering, so the operator does not pull every pod in the cluster into memory to count a handful. It also skips terminating pods, which would otherwise read as rogue workloads.",
        rationale:
          "Listing everything and filtering client-side",
      },
      {
        decision: "Original replica count stored before scaling down",
        insteadOf: "Waking a workload has to return it to the size it actually was, not to whatever the chart shipped, or the operator silently resizes production-shaped environments overnight.",
        rationale:
          "Restoring to a fixed default",
      },
      {
        decision: "Timer-based reconciliation every 60 seconds",
        insteadOf: "The trigger is wall-clock time, not a cluster event. A periodic loop matches the shape of the problem and converges after any missed tick, restart or reschedule.",
        rationale:
          "Event-driven triggers",
      },
      {
        decision: "System namespaces skipped unconditionally",
        insteadOf: "kube-system and friends can never be scaled to zero by this operator regardless of configuration. The failure mode of a cost tool has to be inaction, never an outage.",
        rationale:
          "Relying on operators to annotate correctly",
      },
      {
        decision: "Kopf and Python",
        insteadOf: "The reconciliation logic is small and schedule-shaped, so Kopf keeps it short and quick to iterate. The trade is a heavier runtime and a smaller ecosystem than controller-runtime.",
        rationale:
          "The Go operator SDK and controller-runtime",
      },
    ],
    tags: ["Kubernetes Operator", "Python", "Kopf", "FinOps"],
    githubUrl: "https://github.com/ok-karthik/finops-k8s-operator",
    featured: false,
  },
  {
    slug: "app-library-helm-chart",
    title: "App Library Helm Chart",
    summary:
      "Library Helm chart sharing standardised named templates for DRY generation of environment-specific ConfigMaps, Secrets and Deployments.",
    problem:
      "Every service ends up with its own near-identical copy of the same Deployment and Service templates, so a platform-wide change — a new security context, a label convention — means a pull request against every repository.",
    constraints: [
      "Teams must keep control of their own values",
      "A platform-wide template fix cannot require touching every service repo",
      "Distribution has to work with the registries teams already authenticate against",
    ],
    decisions: [
      {
        decision: "A Helm library chart of named templates",
        insteadOf: "A copied chart diverges the moment it lands. Consumed as a dependency, a template fix reaches every service by version bump instead of by a pull request against every repository.",
        rationale:
          "A starter chart teams copy",
      },
      {
        decision: "OCI registry distribution",
        insteadOf: "Charts live in the same registry as the images, under the same authentication and retention rules, which removes a separate piece of infrastructure to run and secure.",
        rationale:
          "A classic Helm chart repository",
      },
      {
        decision: "Caller charts own their values; the library owns only structure",
        insteadOf: "Teams change configuration freely and inherit only the shape, which keeps the abstraction from becoming the bottleneck it was introduced to remove.",
        rationale:
          "Centralising configuration in the library",
      },
      {
        decision: "Environment-specific ConfigMaps and Secrets generated from files",
        insteadOf: "A default directory plus per-environment overrides means adding an environment is adding a directory, and the diff between environments is visible in one place.",
        rationale:
          "Hand-written manifests per environment",
      },
    ],
    tags: ["Helm", "Kubernetes", "OCI Registry", "Library Chart"],
    githubUrl: "https://github.com/ok-karthik/app-library-helm-chart",
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug)
