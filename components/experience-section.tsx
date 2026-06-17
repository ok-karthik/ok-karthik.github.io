"use client"

import { motion } from "framer-motion"

const experiences = [
  {
    title: "Staff SRE and Platform Engineer",
    company: "Aldi Süd",
    period: "Dec 2022 – Present",
    tags: ["Platform Engineering", "SRE", "Kubernetes", "GitOps", "Observability", "Golden Paths"],
    bullets: [
      "Contributed to a Kubernetes-based Internal Developer Platform, developing reusable IaC modules, Helm library charts, GitOps workflows and golden paths that standardised deployment patterns across multiple engineering teams.",
      "Established AIOps-driven observability using OpenTelemetry and Dynatrace, reducing MTTR and false positives by ~30% via alerting-as-code and SLO frameworks",
      "Accelerated development of IaC modules and GitOps Platform workflows by integrating agentic coding tools (GitHub Copilot, Claude Code) into daily engineering practices",
    ],
  },
  {
    title: "Technical Lead - DevOps, Cloud & Platform",
    company: "Rakuten",
    period: "May 2018 – Nov 2022",
    tags: ["Platform Engineering", "Kubernetes", "Helm", "Azure", "GCP", "Private Cloud", "Security Automation"],
    bullets: [
      "Operated multi-tenant Kubernetes platforms and CI/CD systems supporting 400+ engineers across multiple business domains.",
      "Engineered resilient GitOps CI/CD pipelines enabling automated canary and blue-green deployments, and refactored Jenkins shared libraries used by 150+ teams.",
      "Spearheaded migration from legacy PaaS (Mesos/Marathon) to Kubernetes and then to Private Cloud across multiple business units, leading a team of 5 engineers.",
    ],
  },
  {
    title: "IT Operations Lead & DevOps Engineer",
    company: "Hewlett Packard Enterprise",
    period: "Sep 2015 – Apr 2018",
    tags: ["Production Operations", "Infrastructure Automation", "Incident Management", "Release Engineering"],
    bullets: [
      "Led a 25-member production operations team for high-traffic, enterprise e-commerce platforms.",
      "Automated legacy release pipelines and infrastructure provisioning workflows.",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Tech Mahindra",
    period: "Dec 2010 – Aug 2015",
    tags: ["Backend Systems", "High Availability", "Linux"],
    bullets: [
      "Developed automated reporting tools reducing manual operational effort by ~30% for Vodafone UK backend systems.",
    ],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-6 bg-secondary/20 overflow-hidden">
      <div className="max-w-7xl mx-auto bg-card/10 dark:bg-white/5 backdrop-blur-md border border-border/50 dark:border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Subtle inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-20 pointer-events-none" />
        
        <div className="relative z-10 px-6 py-16 md:px-10 md:py-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
          >
            Experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto"
          >
            15+ years building resilient infrastructure and empowering engineering teams
          </motion.p>

          <div className="grid gap-6 relative">
            {/* Subtle timeline line for desktop */}
            <div className="hidden md:block absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent z-0" />
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 
                           transition-all duration-300 hover:border-primary/50 hover:bg-card/80
                           hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] relative z-10 md:ml-6"
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute -left-[29px] top-6 w-3 h-3 rounded-full bg-primary/30 border border-primary z-20" />
                
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
