const experiences = [
  {
    title: "Staff SRE and Platform Engineer",
    company: "Aldi Süd",
    period: "Dec 2022 – Present",
    tags: ["Azure", "AKS", "Terraform", "Dynatrace", "ArgoCD"],
    bullets: [
      "Architected and scaled a Kubernetes-based Internal Developer Platform, standardizing deployments across multiple engineering teams.",
      "Established AIOps-driven observability and SLO frameworks, significantly reducing MTTR and false positives.",
    ],
  },
  {
    title: "Technical Lead - DevOps, Cloud & Platform",
    company: "Rakuten",
    period: "May 2018 – Nov 2022",
    tags: ["Kubernetes", "GCP", "Helm", "Istio", "Prometheus"],
    bullets: [
      "Spearheaded multi-cloud Kubernetes migrations, modernizing legacy architectures to serve 400+ engineers.",
      "Engineered resilient GitOps CI/CD pipelines, enabling automated canary and blue-green deployments.",
    ],
  },
  {
    title: "IT Operations Lead & DevOps Engineer",
    company: "Hewlett Packard Enterprise",
    period: "Sep 2015 – Apr 2018",
    tags: ["Linux", "Automation", "Incident Management"],
    bullets: [
      "Led a 25-member production operations team for high-traffic, enterprise e-commerce platforms.",
      "Automated legacy release pipelines and infrastructure provisioning workflows.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Tech Mahindra",
    period: "Dec 2010 – Aug 2015",
    tags: ["Linux", "Java", "WebLogic"],
    bullets: [
      "Engineered and supported critical backend payment gateway systems.",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Experience
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A decade of building resilient infrastructure and empowering engineering teams
        </p>

        <div className="grid gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 
                         transition-all duration-300 hover:border-primary/50 
                         hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <span className="font-mono text-sm text-muted-foreground">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-primary font-medium mt-1">{exp.company}</p>
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1.5 shrink-0">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                        <circle cx="3" cy="3" r="3" />
                      </svg>
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
