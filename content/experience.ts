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
    // Title kept as the CV *header* and LinkedIn state it. The CV's own role
    // line reads "Senior SRE and Platform Engineer" — same words, other order —
    // which is drift inside the CV, not a different title. The site keeps one
    // wording so the hero, the JSON-LD and this entry can't disagree with each
    // other; fix the CV's role line rather than forking a second phrasing here.
    title: "Senior Platform Engineer & SRE",
    company: "Aldi Süd",
    period: "Dec 2022 – Present",
    scope: "Reliability and observability across multiple engineering departments, on a Kubernetes internal developer platform",
    bullets: [
      "Build and own the department's Kubernetes internal developer platform — reusable Helm library charts, GitOps workflows and shared CI/CD pipelines that replaced per-team bespoke setups and standardised deployment across engineering teams.",
      "Led the New Relic → Dynatrace migration across engineering departments — owned the vendor evaluation, the RFC and the rollout, and designed the OpenTelemetry Collector and Gateway pipelines that keep the telemetry itself vendor-neutral behind it.",
      "Delivered observability as monitoring-as-code: dashboards, SLOs and alerts versioned in Terraform and shipped through CI, with AIOps event correlation cutting MTTR and false-positive alerts by ~30%.",
      "Built the shared Terraform modules application teams provision from, introducing KEDA-based autoscaling and removing the infrastructure duplication and provisioning toil each team was carrying alone.",
      "Cut non-production cloud spend by 10% — scheduled pipelines and a Python Kubernetes operator that sleep and wake idle workloads out of hours.",
      "Mentored platform and application engineers through design reviews and documented golden paths, so teams self-serve their deployments instead of queueing behind the platform team.",
      "Brought agentic coding tools (GitHub Copilot, Claude Code) into daily platform work, accelerating delivery of IaC modules and GitOps workflows.",
      // Asked and answered: no team-wide workflow was established at Aldi, so
      // there is no adoption to claim here. The bullet stays scoped to Karthik's
      // own daily practice, which is true. Do not upgrade this to "established a
      // practice the team adopted" — it is the single easiest claim on the page
      // to unravel in an interview, because the follow-up is always "how did you
      // roll it out?"
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
      "Owned the CI contract for 150+ teams — refactored the shared Jenkins libraries every team built on, and moved delivery onto GitOps pipelines with automated canary and blue-green rollouts.",
      "Ran multi-tenant Kubernetes platforms and CI/CD systems serving 400+ engineers across multiple business domains.",
      "Led the migration off legacy PaaS (Mesos/Marathon) and on-prem VMs to Kubernetes and private cloud across multiple business units — defining the target architecture, directing a team of 5 engineers and driving the modernisation and cost-optimisation programme behind it.",
      "Built the centralised DevSecOps pipelines that put security and code analysis in front of every team's builds, instead of leaving each team to wire its own.",
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
      // Vodafone is named here, as it is on the CV and in the Tech Mahindra
      // entry below. The anonymised "high-traffic enterprise e-commerce" was
      // strictly weaker: it read as a scale claim with nothing behind it.
      "Led a 25-engineer production operations team for Vodafone UK's e-commerce platform, owning the incident lifecycle end to end — detection, RCA, resolution — and driving MTTR down through post-incident improvements.",
      "Replaced manual release runbooks with automated build, release and provisioning pipelines across on-prem infrastructure.",
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
      "Ran Vodafone UK's backend and payment gateway systems on WebLogic and Linux, including onsite operations at Vodafone UK HQ.",
      // 40%, not the ~30% this said until 2026-08-12. The CV has always read
      // 40% and the site had rounded it down at some point — the two artefacts
      // must carry the same number, and this is the one Karthik can defend.
      "Built automated reporting tooling that cut manual operational effort by 40%.",
    ],
    tags: ["Backend Systems", "Payment Gateways", "High Availability", "Linux"],
  },
]
