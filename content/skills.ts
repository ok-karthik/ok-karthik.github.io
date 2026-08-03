/**
 * Capabilities, expressed as depth rather than inventory.
 *
 * Why this replaced the logo wall: in Karthik's own scraped market data
 * (1,329 postings, Jun–Jul 2026) *no individual tool* showed a statistically
 * significant lift toward better-paid postings — every row came back within
 * noise. Tools are table stakes; track and tier are what move the offer. So a
 * 49-logo grid spent the largest section of the site on the one variable that
 * doesn't pay, while saying nothing about how well any of it is known.
 *
 * Honest self-calibration is the signal a logo wall can't carry. Under-claiming
 * a tier costs nothing; over-claiming one gets found out in the first
 * deep-dive interview.
 *
 * !! TODO(karthik): these tiers are a first pass — review every line. The
 * !! calibration has to be yours, because you're the one defending it.
 */

export type Tier = "deep" | "production" | "working"

export const tiers: Record<Tier, { label: string; blurb: string }> = {
  deep: {
    label: "Deep",
    blurb: "Daily drivers. Happy to take a whiteboard deep-dive on any of these.",
  },
  production: {
    label: "Production",
    blurb: "Built and operated in production, at team or department scale.",
  },
  working: {
    label: "Working knowledge",
    blurb: "Built something real with it; still deepening.",
  },
}

export type Skill = {
  name: string
  tier: Tier
  /** Optional self-hosted icon path. External CDN icons are deliberately not used. */
  icon?: string
  /** Optional one-line note — used where the tier alone under-sells the depth. */
  note?: string
}

export type SkillGroup = {
  title: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", tier: "deep", note: "CKA + CKAD" },
      { name: "Helm", tier: "deep", note: "Library charts, OCI distribution" },
      { name: "Docker", tier: "deep" },
      { name: "Kubernetes Operators", tier: "production" },
      { name: "Istio", tier: "working" },
    ],
  },
  {
    title: "Infrastructure as Code",
    skills: [
      { name: "Terraform", tier: "deep" },
      { name: "Terragrunt", tier: "deep" },
      { name: "Ansible", tier: "production" },
      { name: "Crossplane", tier: "working" },
    ],
  },
  {
    title: "CI/CD & GitOps",
    skills: [
      { name: "Argo CD", tier: "deep" },
      { name: "Jenkins", tier: "deep", note: "Shared libraries for 150+ teams" },
      { name: "GitHub Actions", tier: "production" },
      { name: "GitLab CI", tier: "production" },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "OpenTelemetry", tier: "deep" },
      { name: "Dynatrace", tier: "deep", note: "Alerting-as-code, SLO frameworks" },
      { name: "Prometheus", tier: "production" },
      { name: "Grafana", tier: "production" },
      { name: "Loki / Tempo", tier: "production" },
      { name: "Datadog", tier: "working" },
    ],
  },
  {
    title: "Cloud Platforms",
    skills: [
      { name: "AWS", tier: "production", note: "EKS, VPC, IAM/IRSA, Karpenter" },
      { name: "Azure", tier: "production", note: "AKS, Entra ID, Key Vault" },
      { name: "GCP", tier: "working", note: "GKE, Cloud IAM" },
    ],
  },
  {
    title: "AI & GPU Infrastructure",
    skills: [
      { name: "NVIDIA GPU Operator", tier: "production", note: "Device plugin, NFD, time slicing" },
      { name: "Karpenter", tier: "production", note: "GPU NodePools" },
      { name: "DCGM", tier: "production", note: "GPU observability" },
      { name: "LLM serving", tier: "working", note: "Ollama, llama.cpp, FastAPI gateway" },
      { name: "Agentic coding workflows", tier: "production", note: "Claude Code, Copilot, Cursor" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Bash", tier: "deep" },
      { name: "Python", tier: "production", note: "Platform APIs, operators, automation" },
      { name: "Go", tier: "working", note: "CLIs — actively deepening" },
      { name: "Java / Groovy", tier: "working", note: "Jenkins pipeline libraries" },
    ],
  },
  {
    title: "Security & Governance",
    skills: [
      { name: "OPA Gatekeeper", tier: "production" },
      { name: "Kyverno", tier: "production" },
      { name: "External Secrets", tier: "production" },
      { name: "Kubernetes RBAC & Network Policies", tier: "production" },
      { name: "IaC / container scanning", tier: "working" },
    ],
  },
]

/** Flat view, used by the command palette's `skills` command so it can't drift. */
export const skillsByTier = (tier: Tier): string[] =>
  skillGroups.flatMap((g) => g.skills.filter((s) => s.tier === tier).map((s) => s.name))
