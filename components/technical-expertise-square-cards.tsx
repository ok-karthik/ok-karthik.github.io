"use client"

import { 
  Layers, 
  ShieldAlert, 
  Sparkles,
  Bot,
  Network,
  Terminal,
  Waypoints,
  ShieldCheck,
  ScanSearch,
  Key,
  Cpu,
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
      { name: "AWS", icon: "/icons/aws.svg" },
      { name: "Azure", icon: "/icons/azure.svg" },
      { name: "GCP", icon: "/icons/gcp.svg" },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
      { name: "K8s Operators", icon: "/icons/kubernetes.svg" },
      { name: "Docker", icon: "/icons/docker.svg" },
      { name: "Helm", icon: "/icons/helm.svg" },
      { name: "Istio", icon: "/icons/istio.svg" },
      { name: "Kustomize", lucideIcon: Layers },
    ],
  },
  {
    title: "CI/CD, IaC & GitOps",
    skills: [
      { name: "Terraform", icon: "/icons/terraform.svg" },
      { name: "Terragrunt", icon: "/terragrunt.svg" },
      { name: "Argo CD", icon: "/icons/argocd.svg" },
      { name: "GitHub Actions", icon: "/icons/githubactions.svg" },
      { name: "GitLab CI", icon: "/icons/gitlab.svg" },
      { name: "Jenkins", icon: "/icons/jenkins.svg" },
      { name: "Ansible", icon: "/icons/ansible.svg" },
    ],
  },
  {
    title: "DevSecOps & Governance",
    skills: [
      { name: "Policy-as-Code", lucideIcon: ShieldAlert },
      { name: "Security Scanning", lucideIcon: ScanSearch },
      { name: "Secrets Management", lucideIcon: Key },
      { name: "Kubernetes Security", lucideIcon: ShieldCheck },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "Grafana", icon: "/icons/grafana.svg" },
      { name: "Prometheus", icon: "/icons/prometheus.svg" },
      { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg" },
      { name: "Loki", icon: "/loki.svg" },
      { name: "Tempo", icon: "/tempo.svg" },
      { name: "Datadog", icon: "/icons/datadog.svg" },
      { name: "Dynatrace", icon: "/icons/dynatrace.svg" },
    ],
  },
  {
    title: "Software Engineering & Databases",
    skills: [
      { name: "Python", icon: "/icons/python.svg" },
      { name: "Bash", icon: "/icons/bash.svg" },
      { name: "Go", icon: "/icons/go.svg" },
      { name: "Java / Groovy", icon: "/icons/java.svg" },
      { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
      { name: "Redis", icon: "/icons/redis.svg" },
      { name: "RabbitMQ", icon: "/icons/rabbitmq.svg" },
    ],
  },
  {
    title: "AI-assisted Engineering & AI Infrastructure",
    skills: [
      { name: "NVIDIA GPU Operator", icon: "/icons/nvidia.svg" },
      { name: "LLM serving", lucideIcon: Cpu },
      { name: "Claude Code", lucideIcon: Bot },
      { name: "GitHub Copilot", icon: "/icons/githubactions.svg" },
      { name: "Cursor", lucideIcon: Sparkles },
    ],
  },
]

export function TechnicalExpertiseSquareCards() {
  return (
    <section id="tech-skills" className="py-20 px-6 relative z-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
        >
          Tech Skills
        </motion.h2>
        
        <div className="space-y-12">
          {categories.map((category, index) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <h3 className="text-xl font-bold text-primary mb-6 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {category.title}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill) => {
                  const LucideIcon = skill.lucideIcon
                  return (
                    <div 
                      key={skill.name} 
                      className="flex flex-col items-center justify-center p-4 rounded-xl bg-card/40 border border-border/50 backdrop-blur-sm
                                 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:-translate-y-1 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/95 p-2.5 flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform">
                        {LucideIcon ? (
                          <LucideIcon className="w-full h-full text-slate-800" />
                        ) : (
                          <img
                            src={skill.icon}
                            alt={`${skill.name} logo`}
                            width={28}
                            height={28}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <span className="text-xs font-mono text-center font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
