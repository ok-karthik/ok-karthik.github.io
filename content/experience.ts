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
      "Build and own the internal developer platform on Kubernetes — reusable Helm charts, GitOps workflows and shared CI/CD pipelines standardising deployment across teams for Aldi’s multi-country e-commerce.",
      "Led the New Relic → Dynatrace migration across engineering departments — owned vendor evaluation, RFC and rollout, designing OpenTelemetry Collector and Gateway pipelines for vendor-neutral observability.",
      "Delivered observability as monitoring-as-code in Terraform — dashboards, SLOs and alerts versioned through CI, with AIOps event correlation cutting MTTR and false-positive alerts by ~30%.",
      "Built reusable Terraform modules for shared cloud/platform infrastructure, introducing event-driven autoscaling and reducing infrastructure duplication and provisioning toil for application teams.",
      "Enabled self-service deployment and mentored platform and application engineers through design reviews and documented golden paths, reducing dependency on the platform team.",
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
      "Led multi-cloud migration initiatives from Azure, GCP and legacy systems to Rakuten Private Cloud, defining architecture and driving large-scale platform modernization and cost optimization.",
      "Spearheaded multi-stage migration from on-prem VMs and legacy PaaS (Mesos/Marathon) to Kubernetes and Rakuten Private Cloud, leading a team of 5 engineers and enabling scalable, cloud-native service architectures across multiple business units.",
      "Designed CI/CD and deployment workflows using Helm and GitOps practices, enabling canary and blue-green deployments and improving release reliability.",
      "Operated and evolved multi-tenant Kubernetes platforms and shared CI/CD capabilities supporting 400+ engineers across multiple business domains.",
      "Improved CI/CD reliability by refactoring Jenkins shared libraries used by 150+ teams, enabling reusable pipeline components.",
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
      // Vodafone is named here, as it is on the CV and in the Tech Mahindra
      // entry below. The anonymised "high-traffic enterprise e-commerce" was
      // strictly weaker: it read as a scale claim with nothing behind it.
      "Led production operations for Vodafone UK's e-commerce platform, managing a 25-member team, owning incident lifecycle (detection → RCA → resolution) and driving MTTR reduction through post-incident improvements.",
      "Designed and maintained build and release pipelines for legacy monolithic applications using Jenkins and Puppet, automating workflows across on-prem infrastructure.",
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
      // 40%, not the ~30% this said until 2026-08-12. The CV has always read
      // 40% and the site had rounded it down at some point — the two artefacts
      // must carry the same number, and this is the one Karthik can defend.
      "Developed automated reporting tools that cut manual operational effort by 40%, improving operational efficiency.",
    ],
    tags: ["Backend Systems", "Payment Gateways", "High Availability", "Linux"],
  },
]
