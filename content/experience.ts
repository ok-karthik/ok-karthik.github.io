/**
 * Career history, written for blast radius rather than tool inventory.
 *
 * Every bullet leads with *who else changed* — teams standardised, contracts
 * owned, migrations led — because that is the axis these roles are actually
 * screened on. Tools appear in `tags`, not in the prose.
 *
 * Rule for editing: every metric here must be one Karthik can defend in an
 * interview. Do not add a number that isn't already backed by the CV.
 */

export type Experience = {
  title: string
  company: string
  period: string
  /** Present-tense summary of the role's scope, one line. */
  scope: string
  bullets: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    title: "Senior Platform Engineer & SRE",
    company: "Aldi Süd",
    period: "Dec 2022 – Present",
    scope: "Platform and reliability engineering for a Kubernetes-based internal developer platform",
    bullets: [
      "Set the deployment standard used across multiple engineering teams — reusable Terraform modules, Helm library charts and GitOps golden paths that replaced per-team bespoke pipelines on the department's Kubernetes-based internal developer platform.",
      "Owned the observability practice end to end: OpenTelemetry and Dynatrace with alerting-as-code and SLO frameworks, cutting MTTR and false-positive alerts by ~30%.",
      "Brought agentic coding tools (GitHub Copilot, Claude Code) into daily platform work, accelerating delivery of IaC modules and GitOps workflows.",
      // TODO(karthik): did other engineers pick up the agentic workflow you established?
      // If yes, say so — adoption and mentorship are the two signals that most
      // separate top-of-band Senior from the rest, and this is currently unclaimed.
    ],
    tags: ["Platform Engineering", "SRE", "Kubernetes", "GitOps", "Observability", "Golden Paths"],
  },
  {
    title: "Technical Lead — DevOps, Cloud & Platform",
    company: "Rakuten",
    period: "May 2018 – Nov 2022",
    scope: "Multi-tenant platform and delivery tooling for 400+ engineers",
    bullets: [
      "Owned the CI contract for 150+ teams — refactored the shared Jenkins libraries every team built on, and moved delivery onto GitOps pipelines with automated canary and blue-green rollouts.",
      "Ran multi-tenant Kubernetes platforms and CI/CD systems serving 400+ engineers across multiple business domains.",
      "Led the migration off legacy PaaS (Mesos/Marathon) to Kubernetes, and then to private cloud, across multiple business units — directing a team of 5 engineers.",
    ],
    tags: [
      "Platform Engineering",
      "Kubernetes",
      "Helm",
      "Azure",
      "GCP",
      "Private Cloud",
      "Security Automation",
    ],
  },
  {
    title: "IT Operations Lead & DevOps Engineer",
    company: "Hewlett Packard Enterprise",
    period: "Sep 2015 – Apr 2018",
    scope: "Production operations for high-traffic enterprise e-commerce",
    bullets: [
      "Led a 25-engineer production operations team for high-traffic enterprise e-commerce platforms.",
      "Replaced manual release runbooks with automated pipelines and infrastructure provisioning workflows.",
    ],
    tags: [
      "Production Operations",
      "Infrastructure Automation",
      "Incident Management",
      "Release Engineering",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Tech Mahindra",
    period: "Dec 2010 – Aug 2015",
    scope: "Backend systems for Vodafone UK",
    bullets: [
      "Built automated reporting tooling for Vodafone UK backend systems, cutting manual operational effort by ~30%.",
    ],
    tags: ["Backend Systems", "High Availability", "Linux"],
  },
]
