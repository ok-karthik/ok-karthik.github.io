const experiences = [
  {
    title: "Staff SRE and Platform Engineer",
    company: "Aldi Süd",
    period: "Dec 2022 – Present",
    tags: ["Azure", "AWS", "AKS", "Terraform"],
    description:
      "Contributed to internal developer platform, developed Helm library charts, and established observability using OpenTelemetry and Dynatrace.",
  },
  {
    title: "Technical Lead - DevOps, Cloud & Platform",
    company: "Rakuten",
    period: "May 2018 – Nov 2022",
    tags: ["Azure", "GCP", "Kubernetes"],
    description:
      "Led multi-cloud migration initiatives and operated multi-tenant Kubernetes platforms serving 400+ engineers.",
  },
  {
    title: "IT Operations Lead & DevOps Engineer",
    company: "Hewlett Packard Enterprise",
    period: "Sep 2015 – Apr 2018",
    tags: [],
    description: "",
  },
  {
    title: "Senior Software Engineer",
    company: "Tech Mahindra",
    period: "Dec 2010 – Aug 2015",
    tags: [],
    description: "",
  },
]

export function ExperienceSection() {
  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
          Experience
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A decade of building resilient infrastructure and empowering engineering teams
        </p>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1 md:-translate-x-1.5 mt-2 shadow-[0_0_10px_rgba(34,211,238,0.5)]" />

                {/* Content card */}
                <div
                  className={`ml-6 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                    <span className="font-mono text-xs text-primary">{exp.period}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1">{exp.title}</h3>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    
                    {exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-xs px-2 py-1 rounded bg-secondary/50 text-muted-foreground border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {exp.description && (
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
