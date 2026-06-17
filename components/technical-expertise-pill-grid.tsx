"use client"

import { 
  Layers, 
  ShieldAlert, 
  Sparkles,
  Bot,
  Network,
  LayoutTemplate,
  FileText,
  Blocks,
  ShieldBan,
  Key,
  PlugZap
} from "lucide-react"
import { motion } from "framer-motion"

type SubSkill = string | {
  name: string
  icon?: string
  lucideIcon?: React.ComponentType<{ className?: string, style?: React.CSSProperties }>
}

type Skill = {
  name: string
  icon?: string
  lucideIcon?: React.ComponentType<{ className?: string, style?: React.CSSProperties }>
  subSkills?: SubSkill[]
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
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
        subSkills: ["EKS", "ECS", "Fargate", "EC2", "Lambda", "VPC", "ALB", "WAF", "RDS", "DynamoDB", "S3", "ElastiCache", "SQS & SNS", "IAM", "Secrets Manager", "Parameter Store", "CloudWatch", "CodeBuild", "CodeDeploy"],
        url: "https://aws.amazon.com/"
      },
      { 
        name: "Azure", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
        subSkills: ["AKS", "App Service", "ExpressRoute", "Traffic Manager", "Networking", "AI Search", "Entra ID", "Key Vault", "Policy"],
        url: "https://azure.microsoft.com/"
      },
      { 
        name: "GCP", 
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
        subSkills: ["Networking", "Cloud IAM", "GKE", "Cloud SQL", "Pub/Sub", "Cloud Load Balancing"],
        url: "https://cloud.google.com/"
      },
    ],
  },
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", url: "https://kubernetes.io/" },
      { name: "K8s Operators", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg", url: "https://kubernetes.io/docs/concepts/extend-kubernetes/operator/" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", url: "https://www.docker.com/" },
      { name: "Helm", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/helm/helm-original.svg", url: "https://helm.sh/" },
      { name: "Istio", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/istio.svg", scale: 1.2, url: "https://istio.io/" },
    ],
  },
  {
    title: "CI/CD, IaC & GitOps",
    skills: [
      { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/terraform/terraform-original.svg", url: "https://www.terraform.io/" },
      { name: "ArgoCD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg", url: "https://argoproj.github.io/cd/" },
      { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF", url: "https://github.com/features/actions" },
      { name: "Terragrunt", icon: "/terragrunt.svg", url: "https://terragrunt.gruntwork.io/" },
      { name: "Crossplane", icon: "/crossplane-icon.svg", scale: 1.2, url: "https://www.crossplane.io/" },
      { name: "GitLab CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg", url: "https://docs.gitlab.com/ee/ci/" },
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg", scale: 1.2, url: "https://www.jenkins.io/" },
      { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg", url: "https://www.ansible.com/" },
    ],
  },
  {
    title: "DevSecOps & Governance",
    skills: [
      { 
        name: "Policy-as-Code", 
        lucideIcon: ShieldAlert,
        subSkills: [
          { name: "OPA Gatekeeper", icon: "https://raw.githubusercontent.com/cncf/artwork/master/projects/open-policy-agent/icon/color/opa-icon-color.svg" },
          { name: "Kyverno", icon: "https://raw.githubusercontent.com/cncf/artwork/master/projects/kyverno/icon/color/kyverno-icon-color.svg" }
        ],
      },
      { 
        name: "Security Scanning", 
        lucideIcon: ShieldBan,
        subSkills: [
          "IaC Scanning",
          "Container Scanning",
          "SAST / DAST"
        ],
      },
      { 
        name: "Secrets Management", 
        lucideIcon: Key,
        subSkills: [
          "External Secrets",
          "AWS Secrets Manager",
          "Azure Key Vault"
        ],
      },
      { 
        name: "Kubernetes Security", 
        lucideIcon: Layers,
        subSkills: ["RBAC", "Network Policies"],
      },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "OpenTelemetry", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opentelemetry.svg", scale: 1.25, url: "https://opentelemetry.io/" },
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg", url: "https://prometheus.io/" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg", url: "https://grafana.com/" },
      { name: "Datadog", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/datadog.svg", scale: 1.4, url: "https://www.datadoghq.com/" },
      { name: "Dynatrace", icon: "https://cdn.simpleicons.org/dynatrace", scale: 1.15, url: "https://www.dynatrace.com/" },
      { name: "Loki", icon: "/loki.svg", url: "https://grafana.com/oss/loki/" },
      { name: "Tempo", icon: "/tempo.svg", url: "https://grafana.com/oss/tempo/" },
    ],
  },
  {
    title: "Programming & Platform Architecture",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", url: "https://www.python.org/" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg", url: "https://www.gnu.org/software/bash/" },
    ],
  },
  {
    title: "Agentic Engineering",
    skills: [
      { name: "MCP Servers", lucideIcon: PlugZap, url: "https://modelcontextprotocol.io/" },
      { name: "Google ADK", lucideIcon: Bot, url: "https://github.com/google/agent-development-kit" },
      { name: "Claude Code", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/claude.svg", scale: 1.15, url: "https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview" },
      { name: "n8n", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/n8n.svg", scale: 1.15, url: "https://n8n.io/" },
      { name: "Ollama", icon: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/ollama.svg", scale: 1.25, url: "https://ollama.com/" },
    ],
  },
]

// Removed BigSkillCard

function SkillPill({ skill, isPremium }: { skill: Skill, isPremium?: boolean }) {
  const LucideIcon = skill.lucideIcon

  if (isPremium) {
    const content = (
      <div className={`flex flex-col gap-3 items-start bg-black/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-5 shadow-xl hover:bg-black/10 dark:hover:bg-white/[0.08] hover:border-primary/40 transition-all duration-300 group h-full ${skill.url ? 'cursor-pointer' : 'cursor-default'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white/95 rounded-xl p-2.5 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] shrink-0 overflow-hidden transition-all duration-300 relative">
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
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 relative z-10"
                style={skill.scale ? { transform: `scale(${skill.scale * 1.1})` } : undefined}
                crossOrigin="anonymous"
              />
            )}
          </div>
          <span className="tracking-tight text-lg font-bold font-mono text-foreground/90 group-hover:text-primary transition-colors">{skill.name}</span>
        </div>
        
        {skill.subSkills && skill.subSkills.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2 max-w-[360px]">
            {skill.subSkills.map((sub) => {
              const isString = typeof sub === 'string'
              const name = isString ? sub : sub.name
              const icon = !isString ? sub.icon : undefined
              const LucideIcon = !isString ? sub.lucideIcon : undefined
              const isDarkInvert = false
              const isDarkBrighten = ['OPA Gatekeeper', 'Kyverno'].includes(name as string)
              
              return (
                <span 
                  key={name as string} 
                  className="flex items-center gap-1.5 text-xs font-mono text-foreground/90 bg-black/5 dark:bg-white/5 rounded-full px-3 py-1 border border-black/10 dark:border-white/10
                             transition-all duration-200 hover:text-primary hover:bg-black/10 dark:hover:bg-white/10 hover:border-primary/40 shadow-sm"
                >
                  {LucideIcon && <LucideIcon className="w-3.5 h-3.5" />}
                  {icon && <img src={icon} alt={name as string} className={`w-3.5 h-3.5 object-contain ${isDarkInvert ? 'dark:invert' : ''} ${isDarkBrighten ? 'dark:brightness-200' : ''}`} crossOrigin="anonymous" />}
                  {name}
                </span>
              )
            })}
          </div>
        )}
      </div>
    )

    return skill.url ? (
      <a href={skill.url} target="_blank" rel="noopener noreferrer" className="block h-full outline-none">
        {content}
      </a>
    ) : (
      <div className="h-full">
        {content}
      </div>
    )
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
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            style={skill.scale ? { transform: `scale(${skill.scale * 1.1})` } : undefined}
            crossOrigin="anonymous"
          />
        )}
      </div>
      <span className="tracking-tight">{skill.name}</span>
    </>
  )

  const pillWrapperClass = `flex items-center gap-3.5 bg-black/5 dark:bg-white/[0.03] backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full pr-6 pl-2.5 py-2 [transition-property:color,background-color,border-color,box-shadow,transform] duration-300 text-base font-medium font-mono text-foreground/80 group ${skill.url ? 'hover:bg-black/10 dark:hover:bg-white/[0.08] hover:border-primary/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:text-foreground hover:-translate-y-0.5 cursor-pointer' : 'cursor-default'}`

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
          {skill.subSkills.map((sub) => {
            const isString = typeof sub === 'string'
            const name = isString ? sub : sub.name
            const icon = !isString ? sub.icon : undefined
            const LucideIcon = !isString ? sub.lucideIcon : undefined
            const isDarkInvert = false
            const isDarkBrighten = ['OPA Gatekeeper', 'Kyverno'].includes(name as string)
            
            return (
              <span 
                key={name as string} 
                className="flex items-center gap-1.5 text-xs font-mono text-foreground/90 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-3 py-1
                           [transition-property:color,background-color,border-color,box-shadow] duration-200 hover:text-primary hover:border-primary/40 hover:bg-black/10 dark:hover:bg-white/10 shadow-sm"
              >
                {LucideIcon && <LucideIcon className="w-3.5 h-3.5" />}
                {icon && <img src={icon} alt={name as string} className={`w-3.5 h-3.5 object-contain ${isDarkInvert ? 'dark:invert' : ''} ${isDarkBrighten ? 'dark:brightness-200' : ''}`} crossOrigin="anonymous" />}
                {name}
              </span>
            )
          })}
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
            className="text-3xl md:text-4xl font-bold text-center mb-16 text-foreground"
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
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative mb-6"
                >
                  <h3 className="text-xl font-bold text-primary mb-6 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {category.title}
                  </h3>
                  
                  <div className={index === 0 ? "grid grid-cols-1 md:grid-cols-3 gap-6 w-full" : category.skills.some(s => s.subSkills?.length) ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full" : "flex flex-wrap gap-4 items-start"}>
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
