"use client"

import { 
  Zap, 
  Layers, 
  Plane, 
  RefreshCw, 
  ShieldAlert, 
  Sparkles,
  Bot,
  Network,
  LayoutTemplate,
  FileText,
  Blocks,
  ShieldBan
} from "lucide-react"
import { motion } from "framer-motion"

type Skill = {
  name: string
  icon?: string
  lucideIcon?: React.ComponentType<{ className?: string }>
  subSkills?: string[]
  scale?: number
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
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        subSkills: ["Networking", "IAM", "EKS", "ECS", "Fargate", "EC2", "S3", "ALB", "CloudWatch", "WAF", "Secrets Manager", "Parameter Store", "ElastiCache", "CodeBuild", "CodeDeploy"]
      },
      { 
        name: "Azure", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
        subSkills: ["Networking", "Microsoft Entra ID", "AKS", "Azure App Service", "Azure Key Vault", "Azure AI Search", "Azure Policy", "Azure ExpressRoute", "Azure Traffic Manager"]
      },
      { 
        name: "GCP", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
        subSkills: ["Networking", "Cloud IAM", "GKE", "Cloud SQL", "Pub/Sub", "Cloud Load Balancing"]
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "K8s Operators", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Helm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg" },
      { name: "Istio", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/istio.svg", scale: 1.2 },
      { name: "KEDA", lucideIcon: Zap },
      { name: "Kustomize", lucideIcon: Layers },
    ],
  },
  {
    title: "IaC & GitOps",
    skills: [
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg" },
      { name: "ArgoCD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg" },
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Terragrunt", icon: "/terragrunt.svg" },
      { name: "Crossplane", lucideIcon: Plane },
      { name: "Argo Rollouts", lucideIcon: RefreshCw },
      { name: "GitLab CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
      { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" },
    ],
  },
  {
    title: "Policy & Governance",
    skills: [
      { name: "OPA Gatekeeper", lucideIcon: ShieldBan },
      { name: "Kyverno", lucideIcon: ShieldAlert },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
      { name: "Loki", icon: "/loki.svg" },
      { name: "Tempo", icon: "/tempo.svg" },
      { name: "OpenTelemetry", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opentelemetry.svg", scale: 1.25 },
      { name: "Dynatrace", icon: "https://cdn.simpleicons.org/dynatrace", scale: 1.15 },
      { name: "New Relic", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/newrelic.svg", scale: 1.15 },
      { name: "Datadog", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/datadog.svg", scale: 1.4 },
    ],
  },
  {
    title: "Software Engineering & Automation",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", scale: 1.2 },
      { name: "Groovy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg", scale: 1.25 },
    ],
  },
  {
    title: "AI-assisted Engineering",
    skills: [
      { name: "Claude Code", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg", scale: 1.15 },
      { name: "Antigravity", icon: "/antigravity.png", scale: 1.25 },
      { name: "Ollama", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg", scale: 1.25 },
      { name: "Cursor", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cursor.svg", scale: 1.15 },
      { name: "GitHub Copilot", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubcopilot.svg", scale: 1.25 },
    ],
  },
  {
    title: "Architecture & System Design",
    skills: [
      { name: "Architecture RFCs", lucideIcon: FileText },
      { name: "Confluence", icon: "https://cdn.simpleicons.org/confluence" },
      { name: "Draw.io", lucideIcon: Network },
      { name: "Lucidchart", lucideIcon: LayoutTemplate },
    ],
  },
]

// Removed BigSkillCard

function SkillPill({ skill }: { skill: Skill }) {
  const LucideIcon = skill.lucideIcon

  return (
    <div className="flex flex-col gap-2.5 items-start">
      <div
        className="flex items-center gap-3 bg-card/40 hover:bg-card border border-border/50 rounded-full pr-5 pl-2 py-1.5 
                   transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] 
                   text-[15px] font-mono text-muted-foreground hover:text-foreground hover:-translate-y-0.5 cursor-default"
      >
        <div className="flex items-center justify-center w-8 h-8 bg-white/95 rounded-full p-1.5 shadow-sm shrink-0 overflow-hidden">
          {LucideIcon ? (
            <LucideIcon 
              className="w-full h-full text-slate-800 scale-[1.15]" 
              style={skill.scale ? { transform: `scale(${skill.scale})` } : undefined}
            />
          ) : (
            <img
              src={skill.icon}
              alt={`${skill.name} logo`}
              className="w-full h-full object-contain"
              style={skill.scale ? { transform: `scale(${skill.scale})` } : undefined}
              crossOrigin="anonymous"
            />
          )}
        </div>
        <span>{skill.name}</span>
      </div>
      
      {skill.subSkills && skill.subSkills.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pl-2 max-w-[340px]">
          {skill.subSkills.map((sub) => (
            <span 
              key={sub} 
              className="text-[11px] font-mono text-muted-foreground bg-secondary/60 border border-border/50 rounded-full px-2.5 py-0.5
                         transition-colors hover:text-primary hover:border-primary/30"
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
    <section id="expertise" className="py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        >
          Technical Arsenal
        </motion.h2>
        
        <div className="space-y-12">
          {categories.map((category, index) => {
            return (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative mb-6"
              >
                <h3 className="text-xl font-bold text-primary mb-6 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {category.title}
                </h3>
                
                <div className="flex flex-wrap gap-4 items-start">
                  {category.skills.map((skill) => (
                    <SkillPill key={skill.name} skill={skill} />
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
