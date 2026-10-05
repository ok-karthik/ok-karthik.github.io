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
  // Re-synced 2026-10-05 against karthik-job-market-radar/cv/content/master.md.
  // Bullets are shortened web versions of the CV's — same claims, same
  // numbers, nothing added; tags follow the CV's per-role "Tech Stack" line
  // where it has one. Deliberate differences from the CV:
  //  - no "AIOps" (AGENTS.md rule 15; the CV still says it);
  //  - the agentic-coding bullet stays although the CV dropped it — the hero's
  //    "AI Platform & Agentic Engineering" focus has nothing else backing it
  //    in this section, and the site has no page limit.
  {
    // Title kept as the CV *header* and LinkedIn state it. Contractual title at
    // Aldi DX is Senior IT Consultant.
    title: "Senior Platform Engineer & SRE",
    company: "Aldi DX",
    period: "Dec 2022 – Present",
    scope: "Reliability and observability across multiple engineering departments, on a Kubernetes internal developer platform",
    bullets: [
      "Build and own the Kubernetes internal developer platform — GitOps workflows, application CI/CD, and reusable Helm charts adopted by multiple teams across Aldi’s multi-country e-commerce.",
      "Led the org-wide move from New Relic to OpenTelemetry: one standard for metrics, logs and traces, with trace-to-log correlation and sampling — cutting annual vendor licensing costs by ~40% and ending vendor lock-in.",
      "Delivered GitOps-based observability with SLO-driven alerting and error budgets, plus event correlation for automated root-cause and impact analysis — reducing false-positive alerts by ~30%.",
      "Built reusable Terraform modules, CI/CD pipelines and governance for shared cloud infrastructure: policy-as-code, security scanning, drift detection and automated remediation.",
      "Mentored platform and application engineers through design reviews and documented golden paths, so teams could adopt the platform self-service.",
      "Brought agentic coding tools (GitHub Copilot, Claude Code) into daily platform work, speeding up delivery of IaC modules and GitOps workflows.",
    ],
    tags: [
      "AWS",
      "Azure",
      "Kubernetes",
      "Terraform",
      "OpenTelemetry",
      "GitLab CI/CD",
      "Helm",
      "Docker",
      "Argo CD",
    ],
  },
  {
    title: "Technical Lead — DevOps, Cloud & Platform",
    company: "Rakuten",
    period: "May 2018 – Nov 2022",
    scope: "Multi-tenant platform and delivery tooling for 400+ engineers",
    bullets: [
      "Led a team of 5 engineers migrating legacy platforms to a Kubernetes-based IDP on Azure and GCP — owning the architecture, platform modernisation and cost optimisation.",
      "Owned capacity planning and scaling for major sales events, keeping the platform reliable through peak traffic surges.",
      "Ran and evolved multi-tenant Kubernetes platforms giving 400+ engineers across multiple business domains shared compute and developer self-service.",
      "Standardised CI/CD across 60+ teams: refactored Jenkins shared libraries into reusable components and introduced GitOps workflows for canary and blue-green releases, with RBAC-based team isolation.",
      "Built centralised DevSecOps pipelines integrating security and code-analysis tools across the organisation.",
    ],
    tags: [
      "Hybrid / On-prem",
      "Azure",
      "GCP",
      "Kubernetes",
      "Istio",
      "CI/CD",
      "Prometheus",
      "Datadog",
      "Ansible",
      "Python",
    ],
  },
  {
    title: "IT Operations Lead & DevOps Engineer",
    company: "Hewlett Packard Enterprise",
    period: "Sep 2015 – Apr 2018",
    scope: "Production operations for Vodafone UK's e-commerce platform",
    bullets: [
      "Led production operations for Vodafone UK’s e-commerce platform with a 25-member team — owning the incident lifecycle (detection → RCA → resolution) and driving MTTR down through post-incident improvements.",
      "Built and maintained Jenkins and Puppet build-and-release pipelines for legacy monolithic applications on on-prem infrastructure.",
    ],
    tags: [
      "Production Operations",
      "Incident Management",
      "Release Engineering",
      "Jenkins",
      "Puppet",
    ],
  },
  {
    title: "Senior Software Engineer",
    company: "Tech Mahindra",
    period: "Dec 2010 – Aug 2015",
    scope: "Backend and payment systems for Vodafone UK",
    bullets: [
      "Supported backend and payment-gateway systems for Vodafone UK on WebLogic and Linux, including onsite operations at Vodafone UK HQ.",
      "Built automated reporting tools that cut manual effort by 40%.",
    ],
    tags: ["Backend Systems", "Payment Gateways", "WebLogic", "Linux"],
  },
]
