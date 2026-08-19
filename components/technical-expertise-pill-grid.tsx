"use client"

import { 
  Layers, 
  Sparkles,
  Terminal,
  ScanSearch,
  Key,
  ShieldCheck,
  Cpu,
  Network,
  Waypoints,
} from "lucide-react"
import { motion } from "framer-motion"

type Skill = {
  name: string
  icon?: string
  lucideIcon?: React.ComponentType<{ className?: string }>
  subSkills?: string[]
  scale?: number
  url?: string
}

type Category = {
  title: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    title: "Cloud & Platform Infrastructure",
    skills: [
      { 
        name: "AWS", 
        icon: "/icons/aws.svg",
        subSkills: [
          "IAM/IRSA", "Multi-account", "EKS", "ECS", "Fargate", "EC2", "Lambda", 
          "VPC", "ALB", "WAF", "RDS", "DynamoDB", "S3", "ElastiCache", "SQS & SNS", 
          "Secrets Manager", "Parameter Store", "CloudWatch", "CodeBuild", "CodeDeploy"
        ],
        url: "https://aws.amazon.com/"
      },
      { 
        name: "Azure", 
        icon: "/icons/azure.svg",
        subSkills: [
          "AKS", "App Service", "ExpressRoute", "Traffic Manager", "Networking", 
          "AI Search", "Entra ID", "Key Vault", "Policy"
        ],
        url: "https://azure.microsoft.com/"
      },
      { 
        name: "GCP", 
        icon: "/icons/gcp.svg",
        subSkills: [
          "GKE", "Cloud IAM", "Cloud SQL", "Pub/Sub", "Cloud Load Balancing", "Networking"
        ],
        url: "https://cloud.google.com/"
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "/icons/kubernetes.svg", subSkills: ["CKA", "CKAD", "Operators / CRDs"], url: "https://kubernetes.io/" },
      { name: "Helm", icon: "/icons/helm.svg", url: "https://helm.sh/" },
      { name: "Docker", icon: "/icons/docker.svg", url: "https://www.docker.com/" },
      { name: "Kustomize", lucideIcon: Layers, url: "https://kustomize.io/" },
      { name: "Istio", icon: "/icons/istio.svg", scale: 1.2, url: "https://istio.io/" },
    ],
  },
  {
    title: "IaC & GitOps",
    skills: [
      { name: "Terraform", icon: "/icons/terraform.svg", subSkills: ["Reusable modules", "Monitoring-as-code"], url: "https://www.terraform.io/" },
      { name: "Terragrunt", icon: "/terragrunt.svg", url: "https://terragrunt.gruntwork.io/" },
      { name: "Ansible", icon: "/icons/ansible.svg", url: "https://www.ansible.com/" },
      { name: "Argo CD", icon: "/icons/argocd.svg", url: "https://argoproj.github.io/cd/" },
      { name: "Jenkins", icon: "/icons/jenkins.svg", scale: 1.2, url: "https://www.jenkins.io/" },
      { name: "GitHub Actions", icon: "/icons/githubactions.svg", url: "https://github.com/features/actions" },
      { name: "GitLab CI", icon: "/icons/gitlab.svg", url: "https://docs.gitlab.com/ee/ci/" },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "Grafana", icon: "/icons/grafana.svg", url: "https://grafana.com/" },
      { name: "Prometheus", icon: "/icons/prometheus.svg", url: "https://prometheus.io/" },
      { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg", scale: 1.25, url: "https://opentelemetry.io/" },
      { name: "Loki", icon: "/loki.svg", url: "https://grafana.com/oss/loki/" },
      { name: "Tempo", icon: "/tempo.svg", url: "https://grafana.com/oss/tempo/" },
      { name: "Datadog", icon: "/icons/datadog.svg", scale: 1.4, url: "https://www.datadoghq.com/" },
      { name: "Dynatrace", icon: "/icons/dynatrace.svg", scale: 1.15, url: "https://www.dynatrace.com/" },
    ],
  },
  {
    title: "Security & Governance",
    skills: [
      { name: "OPA Gatekeeper", icon: "/icons/opa.svg", url: "https://www.openpolicyagent.org/" },
      { name: "Kyverno", icon: "/icons/kyverno.svg", url: "https://kyverno.io/" },
      { 
        name: "External Secrets", 
        lucideIcon: Key,
        subSkills: ["AWS Secrets Manager", "Azure Key Vault"],
      },
      { 
        name: "Kubernetes RBAC", 
        lucideIcon: ShieldCheck,
      },
      { 
        name: "IaC / container scanning", 
        lucideIcon: ScanSearch,
        subSkills: ["SAST", "DAST", "Image scanning"],
      },
    ],
  },
  {
    title: "Linux & Networking",
    skills: [
      { 
        name: "Linux", 
        lucideIcon: Terminal,
        subSkills: ["Administration", "Troubleshooting"],
      },
      { 
        name: "Networking", 
        lucideIcon: Network,
        subSkills: ["DNS", "TCP/IP", "TLS", "Load balancing"],
      },
      { 
        name: "VPC & subnet design", 
        lucideIcon: Waypoints,
        subSkills: ["Cross-account", "connectivity"],
      },
    ],
  },
  {
    title: "Software Engineering",
    skills: [
      { name: "Python", icon: "/icons/python.svg", subSkills: ["Platform APIs", "Operators", "Automation"], url: "https://www.python.org/" },
      { name: "Bash", icon: "/icons/bash.svg", subSkills: ["Automation", "Operational tooling"], url: "https://www.gnu.org/software/bash/" },
      { name: "Go", icon: "/icons/go.svg", subSkills: ["CLIs", "actively deepening"], url: "https://go.dev/" },
      { name: "Java / Groovy", icon: "/icons/java.svg", subSkills: ["Pipeline libraries", "Groovy DSL"] },
    ],
  },
  {
    title: "Data & Messaging",
    skills: [
      { name: "PostgreSQL", icon: "/icons/postgresql.svg", subSkills: ["Stateful workloads", "Schema management"], url: "https://www.postgresql.org/" },
      { name: "Redis", icon: "/icons/redis.svg", subSkills: ["Caching", "Clustering"], url: "https://redis.io/" },
      { name: "RabbitMQ", icon: "/icons/rabbitmq.svg", subSkills: ["Message queues", "AMQP"], url: "https://www.rabbitmq.com/" },
    ],
  },
  {
    title: "AI & GPU Infrastructure",
    skills: [
      { 
        name: "NVIDIA GPU Operator", 
        icon: "/icons/nvidia.svg", 
        subSkills: ["Device plugin", "Time slicing", "GPU metrics"], 
        url: "https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/index.html" 
      },
      { 
        name: "LLM serving", 
        lucideIcon: Cpu, 
        subSkills: ["Ollama", "llama.cpp", "FastAPI gateway"] 
      },
      { 
        name: "Agentic coding workflows", 
        lucideIcon: Sparkles, 
        subSkills: ["Claude Code", "Copilot", "Cursor", "MCP"] 
      },
    ],
  },
]

function SkillPill({ skill, isPremium }: { skill: Skill, isPremium?: boolean }) {
  const LucideIcon = skill.lucideIcon

  if (isPremium) {
    const content = (
      <div className={`flex flex-col gap-3 items-start bg-card/30 backdrop-blur-md border border-border/60 rounded-2xl p-5 shadow-xl hover:bg-card/50 hover:border-primary/40 transition-all duration-300 group h-full ${skill.url ? 'cursor-pointer' : 'cursor-default'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white/95 rounded-xl p-2.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(0,255,231,0.4)] shrink-0 overflow-hidden transition-all duration-300 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {LucideIcon ? (
              <LucideIcon 
                className="w-full h-full text-slate-800 transition-transform duration-300 group-hover:scale-110 relative z-10" 
                style={skill.scale ? { transform: `scale(${skill.scale * 1.1})` } : undefined}
              />
            ) : (
              <img
                src={skill.icon}
                alt={`${skill.name} logo`}
                width={32}
                height={32}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                style={skill.scale ? { transform: `scale(${skill.scale * 1.1})` } : undefined}
              />
            )}
          </div>
          <span className="text-xl font-bold font-mono tracking-tight text-foreground group-hover:text-primary transition-colors">
            {skill.name}
          </span>
        </div>

        {skill.subSkills && skill.subSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {skill.subSkills.map((sub) => (
              <span 
                key={sub} 
                className="text-[11px] font-mono text-muted-foreground bg-secondary/80 border border-border/60 rounded-md px-2 py-0.5
                           transition-all duration-200 hover:text-primary hover:border-primary/40 hover:bg-secondary"
              >
                {sub}
              </span>
            ))}
          </div>
        )}
      </div>
    )

    if (skill.url) {
      return (
        <a href={skill.url} target="_blank" rel="noopener noreferrer" className="h-full block">
          {content}
        </a>
      )
    }
    return content
  }

  const PillContent = (
    <>
      <div className="flex items-center justify-center w-10 h-10 bg-white/95 rounded-full p-2 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0 overflow-hidden transition-all duration-300">
        {LucideIcon ? (
          <LucideIcon 
            className="w-full h-full text-slate-800 transition-transform duration-300 group-hover:scale-110" 
            style={skill.scale ? { transform: `scale(${skill.scale * 1.1})` } : undefined}
          />
        ) : (
          <img
            src={skill.icon}
            alt={`${skill.name} logo`}
            width={24}
            height={24}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={skill.scale ? { transform: `scale(${skill.scale * 1.1})` } : undefined}
          />
        )}
      </div>
      <span className="tracking-tight">{skill.name}</span>
    </>
  )

  const pillWrapperClass = `flex items-center gap-3.5 bg-card/40 border border-border/50 rounded-full pr-6 pl-2.5 py-2 transition-all duration-300 text-base font-medium font-mono text-muted-foreground group ${skill.url ? 'hover:bg-card hover:border-primary/60 hover:shadow-[0_0_20px_rgba(0,255,231,0.25)] hover:text-foreground hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'}`

  return (
    <div className="flex flex-col gap-3 items-start">
      {skill.url ? (
        <a href={skill.url} target="_blank" rel="noopener noreferrer" className={pillWrapperClass}>
          {PillContent}
        </a>
      ) : (
        <div className={pillWrapperClass}>
          {PillContent}
        </div>
      )}
      
      {skill.subSkills && skill.subSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 pl-3 max-w-[360px]">
          {skill.subSkills.map((sub) => (
            <span 
              key={sub} 
              className="text-xs font-mono text-muted-foreground/90 bg-secondary/60 border border-border/50 rounded-full px-3 py-1
                         transition-all duration-200 hover:text-primary hover:border-primary/40 hover:bg-secondary/80"
            >
              {sub}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export function TechnicalExpertisePillGrid() {
  return (
    <section id="tech-skills" className="py-20 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground font-display"
        >
          Tech Skills
        </motion.h2>
        
        <div className="space-y-12">
          {categories.map((category, index) => {
            return (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative mb-6"
              >
                <h3 className="text-xl font-bold text-primary mb-6 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {category.title}
                </h3>
                
                <div className={index === 0 ? "grid grid-cols-1 md:grid-cols-3 gap-6 w-full" : "flex flex-wrap gap-4 items-start"}>
                  {category.skills.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} isPremium={index === 0} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
