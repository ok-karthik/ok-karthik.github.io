/**
 * Capabilities, expressed as depth rather than inventory.
 *
 * Sourced and calibrated against Karthik's scraped market data and
 * production engineering experience.
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
  /** Lucide icon name, for capabilities that have no product logo. */
  lucide?:
    | "Cpu"
    | "Sparkles"
    | "Key"
    | "ShieldCheck"
    | "ScanSearch"
    | "Terminal"
    | "Network"
    | "Waypoints"
    | "Layers"
    | "Database"
    | "MessageSquare"
  /**
   * Evidence, as short chips rather than a joined sentence — this is what
   * actually conveys depth. Each item renders as its own chip.
   */
  note?: string[]
}

export type SkillGroup = {
  title: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "/icons/kubernetes.svg", tier: "deep", note: ["CKA", "CKAD", "Operators / CRDs"] },
      { name: "Helm", icon: "/icons/helm.svg", tier: "deep", note: ["Library charts"] },
      { name: "Docker", icon: "/icons/docker.svg", tier: "deep" },
      { name: "Kustomize", lucide: "Layers", tier: "working" },
      { name: "Istio", icon: "/icons/istio.svg", tier: "working" },
    ],
  },
  {
    title: "IaC & GitOps",
    skills: [
      { name: "Terraform", icon: "/icons/terraform.svg", tier: "deep", note: ["Reusable modules", "Monitoring-as-code"] },
      { name: "Terragrunt", icon: "/terragrunt.svg", tier: "deep", note: ["Hierarchical blueprints"] },
      { name: "Ansible", icon: "/icons/ansible.svg", tier: "production" },
      { name: "Argo CD", icon: "/icons/argocd.svg", tier: "deep", note: ["ApplicationSets", "Sync storms"] },
      { name: "Jenkins", icon: "/icons/jenkins.svg", tier: "deep", note: ["Shared libraries"] },
      { name: "GitHub Actions", icon: "/icons/githubactions.svg", tier: "production", note: ["CI pipelines"] },
      { name: "GitLab CI", icon: "/icons/gitlab.svg", tier: "production" },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "Grafana", icon: "/icons/grafana.svg", tier: "deep", note: ["Unified dashboards"] },
      { name: "Prometheus", icon: "/icons/prometheus.svg", tier: "deep", note: ["DCGM exporter"] },
      { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg", tier: "deep", note: ["Collector", "Gateway pipelines"] },
      { name: "Loki", icon: "/loki.svg", tier: "production" },
      { name: "Tempo", icon: "/tempo.svg", tier: "production" },
      { name: "Datadog", icon: "/icons/datadog.svg", tier: "working" },
      { name: "Dynatrace", icon: "/icons/dynatrace.svg", tier: "working", note: ["Platform migration"] },
    ],
  },
  {
    title: "Security & Governance",
    skills: [
      { name: "OPA Gatekeeper", icon: "/icons/opa.svg", tier: "production", note: ["Policy-as-code", "Plan evaluation"] },
      { name: "Kyverno", icon: "/icons/kyverno.svg", tier: "production", note: ["Admission policies"] },
      { name: "External Secrets", lucide: "Key", tier: "production", note: ["AWS Secrets Manager", "Azure Key Vault"] },
      { name: "Kubernetes RBAC", lucide: "ShieldCheck", tier: "production" },
      { name: "IaC / container scanning", lucide: "ScanSearch", tier: "working", note: ["SAST", "DAST", "Image scanning"] },
    ],
  },
  {
    title: "Cloud Platforms",
    skills: [
      { 
        name: "AWS", 
        icon: "/icons/aws.svg", 
        tier: "production", 
        note: ["IAM/IRSA", "Multi-account", "EKS", "ECS", "VPC", "ALB", "WAF", "RDS", "DynamoDB", "S3", "ElastiCache", "SQS/SNS", "CloudWatch", "CodeBuild"] 
      },
      { 
        name: "Azure", 
        icon: "/icons/azure.svg", 
        tier: "production", 
        note: ["AKS", "Entra ID", "Key Vault", "App Service", "ExpressRoute", "Traffic Manager", "Networking", "AI Search", "Policy"] 
      },
      { 
        name: "GCP", 
        icon: "/icons/gcp.svg", 
        tier: "working", 
        note: ["GKE", "Cloud IAM", "Cloud SQL", "Pub/Sub", "Cloud Load Balancing", "Networking"] 
      },
    ],
  },
  {
    title: "Linux & Networking",
    skills: [
      { name: "Linux", lucide: "Terminal", tier: "deep", note: ["Administration", "Troubleshooting"] },
      { name: "Networking", lucide: "Network", tier: "production", note: ["DNS", "TCP/IP", "TLS", "Load balancing"] },
      { name: "VPC & subnet design", lucide: "Waypoints", tier: "production", note: ["Cross-account", "connectivity"] },
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      { name: "Python", icon: "/icons/python.svg", tier: "deep", note: ["Platform APIs", "Operators", "Automation"] },
      { name: "Bash", icon: "/icons/bash.svg", tier: "deep", note: ["Automation", "Operational tooling"] },
      { name: "Go", icon: "/icons/go.svg", tier: "working", note: ["CLIs", "actively deepening"] },
      { name: "Java / Groovy", icon: "/icons/java.svg", tier: "working", note: ["Pipeline libraries", "Groovy DSL"] },
    ],
  },
  {
    title: "Data & Messaging",
    skills: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg", tier: "production", note: ["Stateful workloads", "Schema management"] },
      { name: "Redis", icon: "/icons/redis.svg", tier: "production", note: ["Caching", "Clustering"] },
      { name: "RabbitMQ", icon: "/icons/rabbitmq.svg", tier: "production", note: ["Message queues", "AMQP"] },
    ],
  },
  {
    title: "AI & GPU Infrastructure",
    skills: [
      { name: "NVIDIA GPU Operator", icon: "/icons/nvidia.svg", tier: "production", note: ["Device plugin", "Time slicing", "GPU metrics"] },
      { name: "LLM serving", lucide: "Cpu", tier: "working", note: ["Ollama", "llama.cpp", "FastAPI gateway"] },
      { name: "Agentic coding workflows", lucide: "Sparkles", tier: "production", note: ["Claude Code", "Copilot", "Cursor", "MCP"] },
    ],
  },
]

/** Flat view, used by the command palette's `skills` command so it can't drift. */
export const skillsByTier = (tier: Tier): string[] =>
  skillGroups.flatMap((g) => g.skills.filter((s) => s.tier === tier).map((s) => s.name))
