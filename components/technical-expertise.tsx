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
      { name: "Terragrunt", lucideIcon: Blocks },
      { name: "Crossplane", lucideIcon: Plane },
      { name: "ArgoCD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/argocd/argocd-original.svg" },
      { name: "Argo Rollouts", lucideIcon: RefreshCw },
      { name: "GitHub Actions", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "GitLab CI/CD", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
      { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ansible/ansible-original.svg" },
    ],
  },
  {
    title: "Policy & Governance",
    skills: [
      { name: "Kyverno", lucideIcon: ShieldAlert },
      { name: "OPA Gatekeeper", lucideIcon: ShieldBan },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      { name: "Prometheus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
      { name: "Grafana", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg" },
      { name: "Dynatrace (AIOps / Davis AI)", icon: "https://cdn.simpleicons.org/dynatrace" },
      { name: "New Relic", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/newrelic.svg" },
      { name: "Datadog", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/datadog.svg" },
      { name: "OpenTelemetry", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opentelemetry.svg" },
    ],
  },
  {
    title: "Software Engineering & Automation",
    skills: [
      { name: "Jenkins", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jenkins/jenkins-original.svg" },
      { name: "Groovy", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/groovy/groovy-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg" },
      { name: "Bash", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg" },
    ],
  },
  {
    title: "AI-assisted Engineering",
    skills: [
      { name: "GitHub Copilot", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubcopilot.svg" },
      { name: "Antigravity", lucideIcon: Sparkles },
      { name: "Claude Code", lucideIcon: Bot },
    ],
  },
  {
    title: "Architecture & System Design (RFCs)",
    skills: [
      { name: "Confluence", icon: "https://cdn.simpleicons.org/confluence" },
      { name: "Draw.io", lucideIcon: Network },
      { name: "Lucidchart", lucideIcon: LayoutTemplate },
      { name: "Architecture RFCs", lucideIcon: FileText },
    ],
  },
]

function SkillCard({ skill }: { skill: Skill }) {
  const LucideIcon = skill.lucideIcon

  return (
    <div
      className="group relative bg-card backdrop-blur-sm border border-border rounded-lg p-4 
                 flex flex-col items-center gap-3 
                 transition-all duration-300 ease-out
                 hover:border-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.3),0_0_40px_rgba(34,211,238,0.15)]
                 hover:-translate-y-1"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white p-2">
        {LucideIcon ? (
          <LucideIcon className="w-7 h-7 text-slate-700 transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <img
            src={skill.icon}
            alt={`${skill.name} logo`}
            width={28}
            height={28}
            className="w-7 h-7 object-contain transition-transform duration-300 group-hover:scale-110"
            crossOrigin="anonymous"
          />
        )}
      </div>
      <span className="font-mono text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors">
        {skill.name}
      </span>
    </div>
  )
}

export function TechnicalExpertise() {
  return (
    <section id="expertise" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Technical Expertise
        </h2>
        
        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="text-lg font-semibold text-primary mb-4 font-mono">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
