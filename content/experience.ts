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

/**
 * One-line deck under the section H2. Lives here rather than inline in the
 * component because it makes a claim about the career, and every such claim
 * has to be checkable against this file: retail (Aldi Süd), e-commerce
 * (Rakuten) and telecom (Vodafone UK, via HPE and Tech Mahindra). It names
 * scope, not tools, and carries no metric — deliberately, since a number in a
 * deck is a number that has to be defended twice.
 */
export const experienceDeck =
  "Platform, reliability and delivery ownership across retail, e-commerce and telecom."

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
    // Title kept as the CV *header* and LinkedIn state it. Contractual title at
    // Aldi DX is Senior IT Consultant.
    title: "Senior Platform Engineer & SRE",
    company: "Aldi DX",
    period: "Dec 2022 – Present",
    scope: "Reliability and observability across multiple engineering departments, on a Kubernetes internal developer platform",
    bullets: [
      "Build and own the internal developer platform on Kubernetes, including GitOps workflows and application CI/CD pipelines supporting diverse services, with reusable Helm charts adopted across multiple development teams for Aldi’s multi-country e-commerce.",
      "Led the strategic migration of the org-wide observability stack from New Relic to OpenTelemetry, standardising metrics, logs and traces, trace-to-log correlation and sampling, while reducing annual vendor licensing costs by ~40% and eliminating vendor lock-in.",
      "Delivered observability through GitOps, versioning dashboards, SLOs, alerts and error budgets, integrating AIOps event correlation for automated RCA, impact analysis, cutting false-positive alerts by ~30%.",
      "Built reusable Terraform modules, CI/CD pipelines and governance frameworks for shared cloud infrastructure, integrating policy-as-code, security scanning, drift detection and automated remediation.",
      "Mentored platform and application engineers through design reviews and documented golden paths, enabling self-service adoption across teams.",
      "Brought agentic coding tools (GitHub Copilot, Claude Code) into daily platform work, accelerating delivery of IaC modules and GitOps workflows.",
    ],
    tags: [
      "Platform Engineering",
      "SRE",
      "Kubernetes",
      "Terraform",
      "GitOps",
      "OpenTelemetry",
      "Observability",
      "Golden Paths",
    ],
  },
  {
    title: "Technical Lead — DevOps, Cloud & Platform",
    company: "Rakuten",
    period: "May 2018 – Nov 2022",
    scope: "Multi-tenant platform and delivery tooling for 400+ engineers",
    bullets: [
      "Spearheaded multi-cloud and platform migrations from legacy platforms to Kubernetes-based IDP, Azure and GCP, leading a team of 5 engineers, defining architecture and driving platform modernization and cost optimisation.",
      "Owned platform capacity planning and scaling activities for major sales events, preparing platform infrastructure for massive traffic surges and maintaining reliability under peak demand.",
      "Operated and evolved multi-tenant Kubernetes platforms providing centralized compute, cluster capabilities and developer self-service for 400+ engineers across multiple business domains.",
      "Standardized CI/CD across 60+ teams by refactoring Jenkins shared libraries into reusable components and establishing GitOps deployment workflows for canary and blue-green releases, with RBAC and multi-tenant Kubernetes patterns supporting secure team isolation.",
      "Built centralized DevSecOps pipelines integrating security and code analysis tools across the organization.",
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
    scope: "Production operations for Vodafone UK's e-commerce platform",
    bullets: [
      "Designed and maintained build and release pipelines for legacy monolithic applications using Jenkins and Puppet, automating workflows across on-prem infrastructure.",
      "Steered production operations for Vodafone UK’s e-commerce platform, managing a 25-member team, owning incident lifecycle (detection → RCA → resolution) and driving MTTR reduction through post-incident improvements.",
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
    scope: "Backend and payment systems for Vodafone UK",
    bullets: [
      "Supported backend and payment gateway systems for Vodafone UK using WebLogic and Linux infrastructure, including onsite operations at Vodafone UK HQ.",
      "Developed automated reporting tools reducing manual effort by 40%, improving operational efficiency.",
    ],
    tags: ["Backend Systems", "Payment Gateways", "High Availability", "Linux"],
  },
]
