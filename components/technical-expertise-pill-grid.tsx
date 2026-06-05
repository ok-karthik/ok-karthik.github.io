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
}

type Category = {
  title: string
  skills: Skill[]
}

const categories: Category[] = [
  {
    title: "Cloud & Platform Infrastructure",
    skills: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
      { name: "GCP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg" },
      { name: "K8s Operators & CRDs", lucideIcon: Blocks },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Helm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg" },
      { name: "Istio", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/istio.svg" },
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
      { name: "Datadog", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/datadog.svg" },
      { name: "Loki", icon: "/loki.svg" },
      { name: "Tempo", icon: "/tempo.svg" },
      { name: "Dynatrace", icon: "https://cdn.simpleicons.org/dynatrace" },
      { name: "New Relic", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/newrelic.svg" },
      { name: "OpenTelemetry", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opentelemetry.svg" },
    ],
  },
  {
    title: "Software Engineering & Automation",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
      { name: "Groovy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg" },
    ],
  },
  {
    title: "AI-assisted Engineering",
    skills: [
      { name: "GitHub Copilot", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubcopilot.svg" },
      { name: "Cursor", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/cursor.svg" },
      { name: "Claude Code", lucideIcon: Bot },
      { name: "Ollama", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg" },
      { name: "Antigravity", lucideIcon: Sparkles },
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
    <div
      className="flex items-center gap-3 bg-card/40 hover:bg-card border border-border/50 rounded-full pr-5 pl-2 py-1.5 
                 transition-all duration-200 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] 
                 text-[15px] font-mono text-muted-foreground hover:text-foreground hover:-translate-y-0.5 cursor-default"
    >
      <div className="flex items-center justify-center w-8 h-8 bg-white/95 rounded-full p-1.5 shadow-sm shrink-0">
        {LucideIcon ? (
          <LucideIcon className="w-full h-full text-slate-800" />
        ) : (
          <img
            src={skill.icon}
            alt={`${skill.name} logo`}
            className="w-full h-full object-contain"
            crossOrigin="anonymous"
          />
        )}
      </div>
      <span>{skill.name}</span>
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
                
                <div className="flex flex-wrap gap-3">
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
