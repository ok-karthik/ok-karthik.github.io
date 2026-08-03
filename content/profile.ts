/**
 * Single source of truth for identity and positioning.
 *
 * Every component, the page metadata, the command palette and the JSON-LD
 * schema read from here. Nothing about the title, location or years should be
 * written inline anywhere else — that duplication is what let the portfolio
 * drift out of sync with LinkedIn and the CV.
 */

export const profile = {
  name: "Karthik Orugonda",

  /** Must match LinkedIn and the CV exactly. Verifiable at reference check. */
  title: "Senior Platform Engineer & SRE",

  /** Carries the AI-infrastructure positioning without over-claiming a title. */
  subtitle: "Kubernetes platforms · Multi-cloud · GPU & AI infrastructure",

  yearsInTech: 15,
  yearsCloudNative: 10,

  // Kept short, tool-free, and scoped to professional work only.
  //
  // It used to close with "— most recently for GPU and AI workloads", which
  // implied recent work at Aldi Süd. It isn't — the GPU platform is a project,
  // not a role. The subtitle and Focus Areas still carry the GPU/AI
  // positioning, and the /work pages back it with a real repo; this line
  // stays limited to what was done on the job.
  bio:
    "15 years in tech, 10 building cloud-native platforms across AWS, Azure and GCP. " +
    "I build Kubernetes-based internal developer platforms, Terraform-driven self-service " +
    "infrastructure, GitOps delivery and the observability that keeps them reliable.",

  /**
   * Meta description and OG tags. Keep under ~155 chars — Google truncates
   * past that, and the tail is where the differentiating keywords sit.
   * Currently 154.
   */
  metaDescription:
    "Senior Platform Engineer & SRE. 10 years building cloud-native platforms on AWS, " +
    "Azure and GCP — Kubernetes IDPs, GitOps delivery, observability and SLOs.",

  location: {
    city: "Berlin",
    country: "Germany",
    /** One phrasing, used by both the hero pill and the footer. */
    availability: "Berlin or remote",
    visa: "German Permanent Residence",
  },

  /**
   * Structured rather than a sentence. As prose this ran to three lines and
   * used "roles" twice; it is a list, so it renders as one.
   *
   * Domain leads and level qualifies, because the domain is what a recruiter
   * filters on. Note the distinction from the title rule: naming a level he
   * will *consider* is not claiming a title he holds — "Senior or Staff" here
   * is fine, "Staff" in the Aldi Süd entry would not be.
   */
  /*
   * Titles chosen on posting volume, not on what sounds best. Counts come from
   * Karthik's own scrape: 3,086 unique German postings over 16 scrape days,
   * 13-31 July 2026. Earlier months were lost to rate limiting, so this is a
   * three-week snapshot rather than a seasonal average — treat it as ranking
   * signal, not absolute demand.
   *
   *   DevOps Engineer            102   Platform Engineer           95
   *   Site Reliability Engineer   48   Cloud + Infra Engineer      52
   *   AI Platform Engineer        21   AI Infrastructure           10
   *
   * "AI Infrastructure" was dropped: at 10 postings it is a category name in
   * the tracker, not a title employers post. "AI Platform Engineer" is twice as
   * common and sits in the learning plan's primary focus list.
   *
   * "AI Engineer" is the largest AI title (108) and is deliberately NOT here.
   * Those are application-layer roles building with LLMs, where the
   * infra-transferable slice is only 10-14% of what is asked.
   *
   * Lead is included at Karthik's request and is defensible — he was Technical
   * Lead at Rakuten directing five engineers. Note it is ambiguous in this
   * market: his own classifier splits IC-lead ("tech lead", "lead engineer")
   * from people-manager ("team lead", "engineering lead"), so expect some
   * management approaches alongside the IC ones.
   */
  openToRoles: [
    { domain: "Platform Engineering & SRE", level: "Senior · Staff · Lead" },
    { domain: "DevOps & Cloud Infrastructure", level: "Senior · Staff · Lead" },
    { domain: "AI Platform Engineering", level: "Senior" },
  ],

  /** One-line form, for meta descriptions and the ⌘K palette. */
  openToSummary:
    "Senior, Staff and Lead roles in Platform Engineering, SRE and DevOps, and Senior AI Platform Engineering",

  email: "karthik.orugonda@gmail.com",

  social: {
    github: "https://github.com/ok-karthik",
    linkedin: "https://linkedin.com/in/karthikorugonda",
  },

  /**
   * Google Docs export, deliberately — do not "fix" this to a committed PDF.
   *
   * It auto-updates: Karthik edits the doc and the link serves the new version.
   * Committing a PDF would mean remembering to re-export and commit on every
   * CV change, and a stale CV on the site is a worse failure than anything the
   * link risks. The doc is already publicly viewable, so the visible id grants
   * nothing the URL doesn't.
   */
  cvUrl:
    "https://docs.google.com/document/d/1ELiwLJcYCaPdQIdW1SQ24PowzJ1ZVwQ_bdLh6aXjO7E/export?format=pdf",

  /** Canonical host. The other deployment should point here to avoid duplicate content. */
  siteUrl: "https://ok-karthik.github.io",
} as const

/**
 * Hero metrics. Each one is an outcome, not an inventory count — "3 cloud
 * providers" was replaced because breadth reads junior next to blast radius.
 */
export const stats = [
  { value: "10+", label: "Years cloud native" },
  { value: "400+", label: "Engineers served" },
  { value: "~30%", label: "MTTR reduction" },
] as const

export const focusAreas = [
  {
    name: "Platform Engineering",
    detail: "IDP · GitOps · Self-service infra",
  },
  {
    name: "AI & GPU Infrastructure",
    detail: "GPU scheduling · LLM serving · Observability",
  },
  {
    name: "Cloud Infrastructure",
    detail: "AWS · Azure · GCP",
  },
  {
    name: "SRE & Reliability",
    detail: "SLOs · Observability · Incident response",
  },
] as const

export const education = {
  degree: "Bachelor of Engineering in Information Technology",
  institution: "SVEC, affiliated to JNT University, India",
  graduated: "2010",
  // No grade: German grades run 1.0 (best) to 5.0, so an Indian 7.2/10 has no
  // local meaning and a recruiter can only misread it.
} as const

export const languages = [
  { name: "English", level: "Fluent (C2)", proficiency: 1 },
  { name: "German", level: "Beginner (A1)", proficiency: 0.2 },
] as const

export const certifications = [
  {
    name: "CKA",
    fullName: "Certified Kubernetes Administrator",
    badge: "/logo_cka_whitetext.png",
  },
  {
    name: "CKAD",
    fullName: "Certified Kubernetes Application Developer",
    badge: "/kubernetes-ckad-color.png",
  },
] as const
