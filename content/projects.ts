/**
 * Selected work.
 *
 * Each project carries a `decisions` list — what was chosen, and what it was
 * chosen *over*. That section is the point of the whole page: describing a
 * stack is table stakes, defending a trade-off is not, and "technical strategy
 * and direction" is the single largest gap between how Senior and Staff roles
 * are written (+32pp in Karthik's scraped market data).
 *
 * !! TODO(karthik): the `decisions` entries below are reconstructed from the
 * !! architecture diagrams and repo READMEs you wrote — the *choices* are
 * !! yours, but some of the *rationales* are my inference. Read every one and
 * !! correct it. A trade-off you can't defend live is worse than no trade-off
 * !! section at all. Entries marked CONFIRM are the ones I'm least sure of.
 */

export type Decision = {
  /** What was chosen. */
  decision: string
  /** Why — and, where it matters, what it was chosen over. */
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
        decision: "Karpenter GPU NodePools instead of static GPU node groups",
        rationale:
          "Static groups mean paying for accelerators between jobs. Karpenter provisions on pending-pod demand and drains when idle, which matters far more on GPU pricing than on CPU.",
      },
      {
        decision: "Time slicing rather than MIG for GPU sharing",
        rationale:
          "CONFIRM — time slicing shares a GPU across pods without partitioning it and works on hardware MIG doesn't support. The trade-off is no memory isolation between tenants, which is acceptable for development and inference but not for untrusted multi-tenancy.",
      },
      {
        decision: "GPU Operator to manage the driver stack rather than baking drivers into AMIs",
        rationale:
          "Device plugin, Node Feature Discovery and container toolkit are versioned and reconciled together by the operator, so a driver upgrade isn't an AMI rebuild.",
      },
      {
        decision: "DCGM exporter into the existing Prometheus/Grafana stack",
        rationale:
          "GPU observability becomes another Prometheus target rather than a separate tool, so the same dashboards and alerting rules apply. Utilisation and memory pressure are the two signals that tell you whether sharing is working.",
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
        decision: "OpenTelemetry Collector as the single ingest point, not direct-to-backend agents",
        rationale:
          "Applications emit OTLP once and know nothing about the backend. Swapping or adding a backend becomes an exporter config change instead of a re-instrumentation project — the whole reason to accept the extra hop.",
      },
      {
        decision: "Agent plus gateway collector topology rather than agent-only",
        rationale:
          "CONFIRM — agents handle node-local collection and the gateway centralises processing, sampling and export, so tail sampling and egress control live in one place rather than on every node.",
      },
      {
        decision: "Specialised backends (Prometheus, Loki, Tempo) over one general store",
        rationale:
          "Each signal has genuinely different retention and query characteristics. Grafana unifies them at the presentation layer, so the split costs nothing at the point of use.",
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
        decision: "Hierarchical Terragrunt blueprints instead of duplicated Terraform per environment",
        rationale:
          "Environment config inherits from a shared blueprint, so dev and prod cannot structurally diverge — the usual failure mode of per-environment directories.",
      },
      {
        decision: "Governance gates run in parallel, not as a sequential chain",
        rationale:
          "TFLint, plan, OPA/Conftest and Infracost are independent checks. Running them concurrently means one pipeline round-trip surfaces every class of failure rather than one at a time.",
      },
      {
        decision: "OPA/Conftest against the plan output rather than the source HCL",
        rationale:
          "CONFIRM — policy evaluated on the plan sees what will actually be created, including values resolved from modules and variables that static HCL analysis can't see.",
      },
      {
        decision: "Infracost as a first-class gate alongside security",
        rationale:
          "Cost is treated as a governance concern rather than a monthly surprise, and it is visible while the change is still cheap to reverse.",
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
        decision: "Separate tenant source repo from tenant GitOps repo",
        rationale:
          "Application code and desired cluster state have different reviewers, lifecycles and blast radius. Merging them makes every app commit a potential production change.",
      },
      {
        decision: "Argo CD ApplicationSets instead of per-tenant Application manifests",
        rationale:
          "Onboarding becomes adding a generator entry rather than authoring another Application, which is what makes zero-touch onboarding possible at all.",
      },
      {
        decision: "Kyverno admission policy as the isolation boundary",
        rationale:
          "CONFIRM — guardrails are enforced by the control plane at admission rather than by convention in templates, so a tenant cannot opt out by editing their own manifests.",
      },
      {
        decision: "A scaffolder CLI as the developer entry point, not a web portal",
        rationale:
          "CONFIRM — meets developers in the terminal where they already are, and keeps the golden path versionable and reviewable like any other code.",
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
        decision: "Annotation-driven schedules rather than a central config file",
        rationale:
          "The sleep window lives next to the workload it governs, owned by the team that owns the deployment, so it survives moves and stays reviewable in the same pull request.",
      },
      {
        decision: "An explicit per-workload exclusion annotation",
        rationale:
          "A safety valve that a team can set without a platform-team round-trip. Cost automation only gets adopted if opting out is trivial.",
      },
      {
        decision: "Timer-based reconciliation on a 60-second loop rather than event-driven",
        rationale:
          "CONFIRM — the trigger is wall-clock time, not a cluster event, so a periodic timer matches the actual problem and converges on the desired state after any missed tick or restart.",
      },
      {
        decision: "Kopf in Python rather than the Go operator SDK",
        rationale:
          "CONFIRM — the reconciliation logic is small and schedule-shaped; Kopf keeps it readable and quick to iterate. The trade-off is a heavier runtime and a smaller ecosystem than controller-runtime.",
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
        decision: "Helm library chart with named templates rather than a copyable starter chart",
        rationale:
          "A starter chart diverges the moment it's copied. A library chart consumed as a dependency means template fixes arrive by version bump instead of by pull request against every repo.",
      },
      {
        decision: "OCI registry distribution instead of a classic Helm repo",
        rationale:
          "Charts live in the same registry as the images, under the same authentication and retention rules, removing a separate piece of infrastructure to run.",
      },
      {
        decision: "Caller charts own their values; the library owns only structure",
        rationale:
          "Keeps the abstraction from becoming a bottleneck — teams change configuration freely and only inherit the shape.",
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
