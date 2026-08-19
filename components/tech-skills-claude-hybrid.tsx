"use client"

import { motion } from "framer-motion"
import {
  Cpu,
  Sparkles,
  Key,
  ShieldCheck,
  ScanSearch,
  Terminal,
  Network,
  Waypoints,
  Layers,
  Database,
  Radio,
  Server,
  Cloud,
  Code2,
} from "lucide-react"

type SkillItem = {
  name: string
  icon?: string
  lucide?: React.ComponentType<{ className?: string }>
  subLabels: string[]
  url?: string
}

type SkillCategory = {
  title: string
  description?: string
  skills: SkillItem[]
}

const hybridCategories: SkillCategory[] = [
  /* Row 1: Cloud, Containers, IaC/GitOps */
  {
    title: "Cloud Platforms",
    skills: [
      {
        name: "AWS",
        icon: "/icons/aws.svg",
        subLabels: ["IAM/IRSA", "EKS", "VPC", "ALB", "RDS", "S3", "Multi-account"],
        url: "https://aws.amazon.com/",
      },
      {
        name: "Azure",
        icon: "/icons/azure.svg",
        subLabels: ["AKS", "App Service", "Entra ID", "Key Vault", "ExpressRoute"],
        url: "https://azure.microsoft.com/",
      },
      {
        name: "GCP",
        icon: "/icons/gcp.svg",
        subLabels: ["GKE", "Cloud IAM", "Cloud SQL", "Pub/Sub", "Cloud Load Balancing"],
        url: "https://cloud.google.com/",
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      {
        name: "Kubernetes",
        icon: "/icons/kubernetes.svg",
        subLabels: ["CKA", "CKAD", "Operators", "CRDs"],
        url: "https://kubernetes.io/",
      },
      {
        name: "Helm",
        icon: "/icons/helm.svg",
        subLabels: ["Library charts", "Releases", "Values schema"],
        url: "https://helm.sh/",
      },
      {
        name: "Docker",
        icon: "/icons/docker.svg",
        subLabels: ["Multi-stage", "BuildKit", "Container runtime"],
        url: "https://www.docker.com/",
      },
      {
        name: "Kustomize",
        lucide: Layers,
        subLabels: ["Overlays", "Patches", "Base composition"],
      },
      {
        name: "Istio",
        icon: "/icons/istio.svg",
        subLabels: ["Service mesh", "mTLS", "Traffic routing"],
        url: "https://istio.io/",
      },
    ],
  },
  {
    title: "IaC & GitOps",
    skills: [
      {
        name: "Terraform",
        icon: "/icons/terraform.svg",
        subLabels: ["Reusable modules", "State management"],
        url: "https://www.terraform.io/",
      },
      {
        name: "Terragrunt",
        icon: "/icons/terragrunt.svg",
        subLabels: ["DRY configs", "Multi-env orchestration"],
        url: "https://terragrunt.gruntwork.io/",
      },
      {
        name: "Argo CD",
        icon: "/icons/argocd.svg",
        subLabels: ["ApplicationSet", "GitOps sync", "Diff engine"],
        url: "https://argoproj.github.io/cd/",
      },
      {
        name: "GitHub Actions",
        icon: "/icons/githubactions.svg",
        subLabels: ["Workflows", "Reusable actions", "Self-hosted runners"],
        url: "https://github.com/features/actions",
      },
      {
        name: "Jenkins & Ansible",
        icon: "/icons/jenkins.svg",
        subLabels: ["Shared libraries", "Configuration automation"],
        url: "https://www.jenkins.io/",
      },
    ],
  },

  /* Row 2: Observability, Security, Linux/Networking */
  {
    title: "Observability & SRE",
    skills: [
      {
        name: "OpenTelemetry",
        icon: "/icons/opentelemetry.svg",
        subLabels: ["Collector pipelines", "Vendor-neutral telemetry"],
        url: "https://opentelemetry.io/",
      },
      {
        name: "Prometheus",
        icon: "/icons/prometheus.svg",
        subLabels: ["PromQL", "Alertmanager", "Custom exporters"],
        url: "https://prometheus.io/",
      },
      {
        name: "Grafana",
        icon: "/icons/grafana.svg",
        subLabels: ["Unified dashboards", "SLO & error budgets"],
        url: "https://grafana.com/",
      },
      {
        name: "Loki & Tempo",
        icon: "/loki.svg",
        subLabels: ["Log aggregation", "Distributed trace waterfalls"],
      },
      {
        name: "Dynatrace & Datadog",
        icon: "/icons/dynatrace.svg",
        subLabels: ["AIOps correlation", "Synthetic monitors"],
      },
    ],
  },
  {
    title: "Security & Governance",
    skills: [
      {
        name: "OPA Gatekeeper",
        icon: "/icons/opa.svg",
        subLabels: ["Admission control", "Rego constraint templates"],
        url: "https://www.openpolicyagent.org/",
      },
      {
        name: "Kyverno",
        icon: "/icons/kyverno.svg",
        subLabels: ["Policy-as-code", "Image signature validation"],
        url: "https://kyverno.io/",
      },
      {
        name: "External Secrets",
        lucide: Key,
        subLabels: ["AWS Secrets Manager", "Azure Key Vault sync"],
      },
      {
        name: "Kubernetes RBAC",
        lucide: ShieldCheck,
        subLabels: ["Least privilege", "ServiceAccounts", "Workload IAM"],
      },
      {
        name: "Security Scanning",
        lucide: ScanSearch,
        subLabels: ["Trivy", "Snyk", "Checkov", "SAST / DAST"],
      },
    ],
  },
  {
    title: "Linux & Networking",
    skills: [
      {
        name: "Linux Systems",
        lucide: Terminal,
        subLabels: ["Kernel tuning", "Systemd", "Performance profiling"],
      },
      {
        name: "Core Networking",
        lucide: Network,
        subLabels: ["DNS", "TCP/IP", "TLS termination", "Load balancing"],
      },
      {
        name: "VPC & Subnet Design",
        lucide: Waypoints,
        subLabels: ["Multi-region peering", "Transit Gateways", "NAT"],
      },
      {
        name: "Cilium / CNI",
        lucide: Layers,
        subLabels: ["eBPF routing", "Network policies", "Cluster mesh"],
      },
      {
        name: "Bash & Scripting",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg",
        subLabels: ["Operational tooling", "Bootstrap automation"],
      },
    ],
  },

  /* Row 3: Software, Data, AI & GPU */
  {
    title: "Software Engineering",
    skills: [
      {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        subLabels: ["Platform APIs", "Kopf / Operator SDK", "Automation"],
        url: "https://www.python.org/",
      },
      {
        name: "Go",
        icon: "/icons/go.svg",
        subLabels: ["Scaffolder CLI tooling", "Actively deepening"],
        url: "https://go.dev/",
      },
      {
        name: "Java / Groovy",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        subLabels: ["CI/CD shared libraries", "Jenkins DSL"],
      },
      {
        name: "REST & Microservices",
        lucide: Code2,
        subLabels: ["Contract testing", "API gateways", "Ingress config"],
      },
    ],
  },
  {
    title: "Data & Messaging",
    skills: [
      {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        subLabels: ["Stateful operators", "HA clusters", "Schema migrations"],
        url: "https://www.postgresql.org/",
      },
      {
        name: "Redis",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        subLabels: ["In-memory caching", "Sentinel", "Cluster replication"],
        url: "https://redis.io/",
      },
      {
        name: "RabbitMQ",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
        subLabels: ["AMQP message brokers", "Exchange topologies"],
      },
      {
        name: "Kafka",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg",
        subLabels: ["Event streaming", "Topic partitioning", "Consumer groups"],
      },
    ],
  },
  {
    title: "AI & GPU Infrastructure",
    skills: [
      {
        name: "NVIDIA GPU Operator",
        icon: "/icons/nvidia.svg",
        subLabels: ["Device plugin", "Time slicing", "MIG partitioning"],
        url: "https://www.nvidia.com/",
      },
      {
        name: "Karpenter & vLLM",
        icon: "/icons/karpenter.svg",
        subLabels: ["Dynamic GPU provisioning", "High-throughput serving"],
      },
      {
        name: "Agentic Engineering",
        lucide: Sparkles,
        subLabels: ["Claude Code", "Copilot", "Cursor", "MCP servers"],
      },
      {
        name: "DCGM & GPU Telemetry",
        lucide: Cpu,
        subLabels: ["CUDA utilization", "Memory bandwidth", "Power metrics"],
      },
    ],
  },
]

function SkillIconChip({ skill }: { skill: SkillItem }) {
  const Lucide = skill.lucide

  if (Lucide) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-primary/20 bg-secondary/80 text-primary transition-all duration-300 group-hover/skill:border-primary/50 group-hover/skill:shadow-[0_0_12px_rgba(0,255,231,0.2)]">
        <Lucide className="h-4 w-4" aria-hidden />
      </span>
    )
  }

  if (skill.icon) {
    return (
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white/[0.08] p-1.5 backdrop-blur-sm transition-all duration-300 group-hover/skill:border-primary/40 group-hover/skill:bg-white/[0.12] group-hover/skill:scale-105">
        <img
          src={skill.icon}
          alt=""
          width={22}
          height={22}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain filter drop-shadow-sm"
        />
      </span>
    )
  }

  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-border bg-muted font-mono text-xs text-muted-foreground">
      {skill.name.slice(0, 2).toUpperCase()}
    </span>
  )
}

function panelGridBorders(i: number, total: number, mdCols: number, lgCols: number) {
  const isLastRow = (cols: number) => i >= total - (total % cols || cols)
  const isLastCol = (cols: number) => i % cols === cols - 1

  return [
    i === total - 1 ? "" : "border-b border-border/40",
    isLastRow(mdCols) ? "md:border-b-0" : "md:border-b md:border-border/40",
    isLastCol(mdCols) ? "" : "md:border-r md:border-border/40",
    isLastRow(lgCols) ? "lg:border-b-0" : "lg:border-b lg:border-border/40",
    isLastCol(lgCols) ? "" : "lg:border-r lg:border-border/40",
  ].join(" ")
}

export function TechSkillsClaudeHybrid() {
  return (
    <section id="tech-skills-claude-hybrid" className="py-24 px-6 relative z-20 scroll-mt-24 border-t border-border/30">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Tech Skills (Claude's 3x3 Balanced Hybrid)
            </p>
            <div className="h-px bg-border/60 flex-1 mx-4 hidden sm:block" />
            <p className="font-mono text-xs text-muted-foreground hidden shrink-0 tabular-nums sm:block">
              {hybridCategories.length} balanced domains · 100% sub-labeled
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight heading-gradient text-balance">
            Balanced 3×3 Grid with Integrated Cloud Cards &amp; Quieter Icons
          </h2>
          <p className="mt-2 text-muted-foreground text-sm md:text-base">
            Refined logo chips, equalized cell heights, and complete sub-label coverage for ATS and recruiters
          </p>
        </header>

        {/* 3x3 Balanced Master Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card/30 backdrop-blur-xl border border-border/60 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            {hybridCategories.map((category, i) => {
              const isCloudCategory = category.title === "Cloud Platforms"

              return (
                <div
                  key={category.title}
                  className={`p-6 md:p-7 flex flex-col justify-between hover:bg-card/20 transition-colors ${panelGridBorders(
                    i,
                    hybridCategories.length,
                    2,
                    3
                  )}`}
                >
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-primary font-bold mb-5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {category.title}
                    </h3>

                    {/* If Cloud Platforms, render as the archive's prominent cloud cards inside the cell */}
                    {isCloudCategory ? (
                      <div className="space-y-3.5">
                        {category.skills.map((skill) => (
                          <div
                            key={skill.name}
                            className="bg-secondary/40 border border-border/60 rounded-2xl p-3.5 transition-all hover:border-primary/40 hover:bg-secondary/60 group/skill"
                          >
                            <div className="flex items-center gap-3 mb-2.5">
                              <SkillIconChip skill={skill} />
                              <span className="text-base font-bold font-mono tracking-tight text-foreground group-hover/skill:text-primary transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {skill.subLabels.map((sub) => (
                                <span
                                  key={sub}
                                  className="rounded-full border border-border/60 bg-secondary/80 px-2 py-0.5 font-mono text-[10.5px] text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"
                                >
                                  {sub}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Standard skill list with complete sublabel coverage */
                      <ul className="space-y-4">
                        {category.skills.map((skill) => (
                          <li
                            key={skill.name}
                            className="flex gap-3.5 items-start group/skill"
                          >
                            <SkillIconChip skill={skill} />
                            <div className="min-w-0 flex-1">
                              <span className="block text-sm font-semibold text-foreground group-hover/skill:text-primary transition-colors leading-snug">
                                {skill.name}
                              </span>
                              <div className="mt-1.5 flex flex-wrap gap-1.5">
                                {skill.subLabels.map((item) => (
                                  <span
                                    key={item}
                                    className="rounded-full border border-border/60 bg-secondary/80 px-2.5 py-0.5 font-mono text-[10.5px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary shadow-sm"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
