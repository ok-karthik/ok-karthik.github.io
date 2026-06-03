const certifications = [
  { name: "CKA", fullName: "Certified Kubernetes Administrator" },
  { name: "CKAD", fullName: "Certified Kubernetes Application Developer" },
]

const projects = [
  {
    title: "Enterprise AWS Infrastructure",
    description: "Large-scale infrastructure deployment using Terraform + Terragrunt for multi-account AWS environments.",
    tags: ["Terraform", "Terragrunt", "AWS"],
  },
  {
    title: "FinOps Kubernetes Operator",
    description: "Custom Kubernetes operator for cost optimization and resource management across clusters.",
    tags: ["Kubernetes", "Python", "Kopf Framework", "FinOps"],
  },
]

export function ProjectsCertifications() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Projects & Certifications
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Highlighted work and industry-recognized credentials
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Certifications */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="bg-card backdrop-blur-sm border border-border rounded-lg p-4 
                             transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-original.svg"
                      alt="Kubernetes logo"
                      width={32}
                      height={32}
                      className="w-8 h-8 shrink-0"
                    />
                    <div>
                      <span className="font-mono text-xl font-bold text-primary">{cert.name}</span>
                      <p className="text-muted-foreground text-sm">{cert.fullName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              Featured Projects
            </h3>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="bg-card backdrop-blur-sm border border-border rounded-lg p-4 
                             transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                >
                  <h4 className="font-semibold text-foreground">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map((tag) => (
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
        </div>
      </div>
    </section>
  )
}
