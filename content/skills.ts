/**
 * Capabilities, expressed as depth rather than inventory.
 *
 * Why this replaced the logo wall: in Karthik's own scraped market data
 * (1,329 postings, Jun–Jul 2026) *no individual tool* showed a statistically
 * significant lift toward better-paid postings — every row came back within
 * noise. Tools are table stakes; track and tier are what move the offer. So a
 * 49-logo grid spent the largest section of the site on the one variable that
 * doesn't pay, while saying nothing about how well any of it is known.
 *
 * Honest self-calibration is the signal a logo wall can't carry. Under-claiming
 * a tier costs nothing; over-claiming one gets found out in the first
 * deep-dive interview.
 *
 * !! TODO(karthik): these tiers are a first pass — review every line. The
 * !! calibration has to be yours, because you're the one defending it.
 *
 * Notes converted to chip arrays 2026-08-18. The panel's ~175px note-text
 * measure (see components/tech-skills-section.tsx) meant a single wrapped
 * string over ~21 characters broke to a second line, and inconsistent
 * 1-line/2-line notes across adjacent rows in the same column read as
 * misaligned rather than as deliberate — Karthik's word for it was "sloppy."
 * First pass tried shortening every note to fit one line; that traded away
 * real content (AWS lost "ECS", GPU Operator lost "time slicing") to solve a
 * layout problem, which is backwards. Chips solve it properly: each item is
 * its own unit, so a row can wrap between chips without ever looking broken,
 * and nothing had to be cut to make that true. (Chips are the standard
 * pattern for this — "ideal for representing tags, labels, or categories...
 * useful when users need to select multiple options like interests or
 * skills," https://mobbin.com/glossary/chip — this isn't a novel layout.)
 */

export type Tier = "deep" | "production" | "working"

export const tiers: Record<Tier, { label: string; blurb: string }> = {
  deep: {
    label: "Deep",
    blurb: "Daily drivers. Happy to take a whiteboard deep-dive on any of these.",
  },
  production: {
    label: "Production",
    blurb: "Built and operated in production, at team or department scale.",
  },
  working: {
    label: "Working knowledge",
    blurb: "Built something real with it; still deepening.",
  },
}

export type Skill = {
  name: string
  tier: Tier
  /** Optional self-hosted icon path. External CDN icons are deliberately not used. */
  icon?: string
  /** Lucide icon name, for capabilities that have no product logo. */
  lucide?:
    | "Cpu"
    | "Sparkles"
    | "Key"
    | "ShieldCheck"
    | "ScanSearch"
    | "Terminal"
    | "Network"
    | "Waypoints"
    | "Siren"
    | "Layers"
    | "Database"
  /**
   * Evidence, as short chips rather than a joined sentence — this is what
   * actually conveys depth. Each item renders as its own chip and wraps as a
   * complete unit against its siblings, but a single item still has nothing
   * to wrap against itself: at the 4-column grid's ~220px content width, an
   * item over ~20 characters (e.g. "Cross-account connectivity", "Jenkins
   * pipeline libraries") overflows its own column edge rather than wrapping,
   * found 2026-08-18 from a live screenshot. Split any item that long into
   * two shorter ones instead of shortening the words — "Cross-account
   * connectivity" became ["Cross-account", "connectivity"]. Keep new items
   * under that ~20-char ceiling. See the 2026-08-18 note below for why this
   * replaced a single wrapped string in the first place.
   */
  note?: string[]
}

export type SkillGroup = {
  title: string
  skills: Skill[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Containers & Orchestration",
    skills: [
      { name: "Kubernetes", icon: "/icons/kubernetes.svg", tier: "deep", note: ["CKA", "CKAD"] },
      { name: "Helm", icon: "/icons/helm.svg", tier: "deep" },
      { name: "Docker", icon: "/icons/docker.svg", tier: "deep" },
      { name: "Kubernetes Operators", icon: "/icons/kubernetes.svg", tier: "production" },
      // Added 2026-08-12 from the CV's Containers line. Lucide rather than a
      // logo: there is no Kustomize SVG in public/icons and the brand-logo rule
      // forbids pulling one from a CDN. Tiered on the file's under-claim rule —
      // raise it if you'd defend it next to Helm.
      { name: "Kustomize", lucide: "Layers", tier: "working" },
      { name: "Istio", icon: "/icons/istio.svg", tier: "working" },
    ],
  },
  {
    // "Infrastructure as Code" and "CI/CD & GitOps" merged 2026-08-07. Adding
    // Linux & Networking had taken the grid to nine cards, which renders 4+4+1
    // at 1440 and left one card alone in an orphan row; merging fixes that
    // without dropping anything, where adding a tenth card would have padded.
    // The pairing also matches Karthik's CV, which lists a single
    // "IaC & GitOps" line — the two artefacts are kept consistent on purpose.
    //
    // Source order here is the requested one. Note it is NOT the rendered
    // order: the section sorts each card by tier, so Ansible (production)
    // renders after Argo CD and Jenkins (both deep). See the note in
    // components/tech-skills-section.tsx.
    //
    // Crossplane was removed from the old IaC card 2026-08-07 — it appeared in
    // 1 of 1,350 target postings in Karthik's scrape. Terragrunt (0.9%) stays.
    title: "IaC & GitOps",
    skills: [
      // Note added 2026-08-12: the CV now lists Monitoring-as-Code as a named
      // capability, and Terraform is where Karthik actually does it. It sits
      // here rather than on an observability row because the point is that the
      // dashboards and alerts go through the same review path as the infra.
      { name: "Terraform", icon: "/icons/terraform.svg", tier: "deep", note: ["Reusable modules", "Monitoring-as-code"] },
      { name: "Terragrunt", icon: "/terragrunt.svg", tier: "deep" },
      { name: "Ansible", icon: "/icons/ansible.svg", tier: "production" },
      { name: "Argo CD", icon: "/icons/argocd.svg", tier: "deep" },
      { name: "Jenkins", icon: "/icons/jenkins.svg", tier: "deep", note: ["Shared libraries", "150+ teams"] },
      { name: "GitHub Actions", icon: "/icons/githubactions.svg", tier: "production" },
      { name: "GitLab CI", icon: "/icons/gitlab.svg", tier: "production" },
    ],
  },
  {
    title: "Observability & Reliability",
    skills: [
      // The note that used to sit on Dynatrace ("Alerting-as-code, SLO
      // frameworks") moved here 2026-08-07 and was rewritten. The claim was
      // worth keeping but Dynatrace was the wrong carrier: it appears in ~0.1%
      // of Karthik's target postings, so a reader who doesn't use it gets
      // nothing. On vendor-neutral OpenTelemetry the same point reads as a
      // transferable architecture decision. SLOs are still represented — see
      // the Incident Response note below and the hero Focus Areas.
      //
      // Kept to two rendered lines at 1440, where the four-column grid gives
      // each card its narrowest text measure (~190px). A third line here grows
      // the whole of row 1, because cards stretch to the tallest in the row.
      { name: "OpenTelemetry", icon: "/icons/opentelemetry.svg", tier: "deep", note: ["Collector", "Gateway", "Vendor-neutral"] },
      { name: "Dynatrace", icon: "/icons/dynatrace.svg", tier: "deep" },
      // Prometheus, then L-G-T in the stack's own order 2026-08-12. "Loki /
      // Tempo" used to sit as one row *after* Grafana, which spelled nothing;
      // read top to bottom these now say LGTM, which is how the stack is named
      // in postings. The rows are separate rather than one "LGTM stack" row so
      // each product still matches a keyword scan on its own.
      //
      // Order works because the tier sort is stable: all three are production,
      // so their source order here survives into the render. Change a tier and
      // the sequence breaks — that is the trade for sorting by tier at all.
      //
      // The M is deliberately absent: Mimir is the fourth letter and Karthik
      // has not run it. Add the row only if that changes; the sequence is worth
      // less than a claim he can defend.
      { name: "Prometheus", icon: "/icons/prometheus.svg", tier: "production" },
      { name: "Loki", icon: "/loki.svg", tier: "production" },
      { name: "Grafana", icon: "/icons/grafana.svg", tier: "production" },
      { name: "Tempo", icon: "/tempo.svg", tier: "production" },
      { name: "Datadog", icon: "/icons/datadog.svg", tier: "working" },
      // Not a tool row, deliberately: on-call and incident response appear in
      // 41.5% of Senior/Staff Platform/SRE postings and had no representation
      // anywhere on the page. Tiered "production" rather than "deep" on the
      // file's own under-claim rule; raise it if you'd defend it as a daily driver.
      { name: "Incident Response", lucide: "Siren", tier: "production", note: ["On-call", "Postmortems", "MTTR reduction"] },
    ],
  },
  {
    title: "Security & Governance",
    skills: [
      { name: "OPA Gatekeeper", icon: "/icons/opa.svg", tier: "production" },
      { name: "Kyverno", icon: "/icons/kyverno.svg", tier: "production" },
      { name: "External Secrets", lucide: "Key", tier: "production", note: ["AWS Secrets Manager", "Azure Key Vault"] },
      { name: "Kubernetes RBAC", lucide: "ShieldCheck", tier: "production", note: ["Network Policies"] },
      { name: "IaC / container scanning", lucide: "ScanSearch", tier: "working", note: ["SAST", "DAST", "Image scanning"] },
    ],
  },
  {
    // Moved out of row 1 (it was position 4) 2026-08-07. Three entries with
    // one-line notes sat directly beside Observability & Reliability, which is
    // seven entries including a three-line Incident Response note — cards in a
    // row stretch to the tallest, so at 1440 that left a conspicuous void in
    // the top-right quadrant. Row 2 position 1 is where the same trailing
    // whitespace is least visible, which is where the previously deployed
    // version had it. Card order here is a height-balancing decision, not a
    // ranking one.
    title: "Cloud Platforms",
    skills: [
      // Karpenter dropped from this note 2026-08-07 — it has its own row in
      // Containers & Orchestration now, and naming it in both places read as
      // padding rather than as scope.
      // Note widened 2026-08-12 to match the CV's expanded AWS line. VPC and
      // cross-account networking are deliberately NOT repeated here — the
      // "VPC & subnet design" row in Linux & Networking carries them, and this
      // note has room for what that row doesn't say.
      { name: "AWS", icon: "/icons/aws.svg", tier: "production", note: ["EKS", "ECS", "IAM/IRSA", "Multi-account"] },
      { name: "Azure", icon: "/icons/azure.svg", tier: "production", note: ["AKS", "Entra ID", "Key Vault"] },
      { name: "GCP", icon: "/icons/gcp.svg", tier: "working", note: ["GKE", "Cloud IAM"] },
    ],
  },
  {
    // Added 2026-08-07. The grid had eight cards and no Linux or networking
    // anywhere, while in Karthik's target roles these are the highest-REQUIRED
    // skills after Kubernetes — Linux 23.0% mentioned / 13.8% required,
    // networking 23.5% / 12.1%, against Terraform at 7.3% required and Go 5.7%.
    // Kept next to Cloud Platforms so the two infrastructure-fundamentals
    // cards sit together; both now sit in row 2 after the 2026-08-07 reorder.
    title: "Linux & Networking",
    skills: [
      // Two clauses, not three: this is a showcase page rather than an ATS
      // target, and three chained keywords read as stuffing where two read as
      // a description. "performance" was the one dropped.
      //
      // Both trimmed again 2026-08-12: at the card's ~190px measure these were
      // the only two notes in the panel still wrapping to three lines, and a
      // three-line note is what made the row rhythm look broken in the first
      // place. Two lines is the ceiling — check it before lengthening either.
      // "ingress" went to Networking's dropped clause because Kubernetes and
      // Istio already carry it two cards over.
      { name: "Linux", lucide: "Terminal", tier: "deep", note: ["Administration", "Troubleshooting"] },
      { name: "Networking", lucide: "Network", tier: "production", note: ["DNS", "TCP/IP", "TLS", "Load balancing"] },
      { name: "VPC & subnet design", lucide: "Waypoints", tier: "production", note: ["Cross-account", "connectivity"] },
    ],
  },
  {
    // Not "Languages" — that word is already used for English/German
    // under Certifications & Education, and two meanings on one page is a bug.
    title: "Software Engineering",
    skills: [
      // Ordered by demand in Karthik's scrape of Senior/Staff Platform/SRE/
      // DevOps roles — Python 35.8% mentioned / 13.6% required, Go 14.1% /
      // 5.7%, Bash 10.3% / 3.5%.
      //
      // Order here is not decided by this list: the section sorts each card by
      // tier, so a row's position is a function of its tier, not of where it
      // sits in the file. Python was raised production -> deep 2026-08-07 to
      // put it at the head of the card, which is Karthik's own calibration and
      // his call to make. Rendered result is Python, Bash, Go, Java / Groovy.
      { name: "Python", icon: "/icons/python.svg", tier: "deep", note: ["Platform APIs", "Operators", "Automation"] },
      { name: "Go", icon: "/icons/go.svg", tier: "working", note: ["CLIs", "actively deepening"] },
      // Note added 2026-08-12. "Automation and scripting" is a phrase that
      // recurs in the target postings, and nothing on the page said it: Python
      // carries "automation" but reads as an application language, and Bash sat
      // as a bare row that a reader has to interpret. Scripting is not assumed
      // from the word "Bash" by anyone scanning — it is assumed by engineers,
      // and they are not the first filter.
      //
      // A separate "Scripting" row was the alternative and was rejected: it
      // would be a capability with no product behind it sitting next to four
      // named languages, which reads as padding. The note attaches the same
      // words to the tool that actually earns them.
      { name: "Bash", icon: "/icons/bash.svg", tier: "deep", note: ["Automation", "Operational tooling"] },
      { name: "Java / Groovy", icon: "/icons/java.svg", tier: "working", note: ["Pipeline libraries", "Groovy DSL"] },
      // Added 2026-08-12 from the CV's Software Engineering line. Kept to a
      // bare row with no note: it is a supporting skill in platform work, and
      // a note would give it more weight on the card than it earns.
      { name: "SQL", lucide: "Database", tier: "working" },
    ],
  },
  {
    // Deliberately last. This is a secondary track, and sitting second in the
    // grid weighted it like a primary one: GPU-specific tooling appears in
    // ~0.1% of Karthik's target roles (2 of 1,350), while observability
    // appears in 63.7% of senior Platform/SRE postings. The content stays —
    // the /work pages back it with a real repo — but it reads as the
    // adjacency it is rather than as the headline.
    title: "AI & GPU Infrastructure",
    skills: [
      // DCGM folded in here 2026-08-07 rather than kept as its own row: the
      // exporter is deployed by the GPU Operator, so listing them as peers was
      // redundant.
      //
      // Named "GPU metrics" rather than "DCGM", and "NFD" dropped outright:
      // both are real to a GPU-infrastructure specialist and opaque to
      // everyone else, and this is a showcase page, not an ATS target. The
      // plain phrasing carries the capability; the product names belong in
      // conversation, where Karthik can expand them if someone probes.
      { name: "NVIDIA GPU Operator", icon: "/icons/nvidia.svg", tier: "production", note: ["Device plugin", "Time slicing", "GPU metrics"] },
      { name: "LLM serving", lucide: "Cpu", tier: "working", note: ["Ollama", "llama.cpp", "FastAPI gateway"] },
      // MCP added 2026-08-12, as the CV now names it. It is the one item on
      // this row that says something about *how* the tools are wired in rather
      // than which ones are open.
      { name: "Agentic coding workflows", lucide: "Sparkles", tier: "production", note: ["Claude Code", "Copilot", "Cursor", "MCP"] },
    ],
  },
]

/** Flat view, used by the command palette's `skills` command so it can't drift. */
export const skillsByTier = (tier: Tier): string[] =>
  skillGroups.flatMap((g) => g.skills.filter((s) => s.tier === tier).map((s) => s.name))
