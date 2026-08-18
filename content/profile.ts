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

  /**
   * The scan line — four nouns a recruiter reads before the bio. Matches the
   * CV's summary line on purpose, same rule as `title`.
   *
   * "GPU & AI infrastructure" was dropped 2026-08-07. It appears in ~0.1% of
   * Karthik's target postings and it duplicated `focusAreas[3]` word for word,
   * so it spent the most valuable slot on the page's least-demanded track and
   * said nothing new. Observability took the slot on 63.7% of senior
   * Platform/SRE postings. The GPU/AI positioning is unchanged — Focus Areas
   * still names it and the /work pages back it with a real repo.
   *
   * "Multi-cloud" stays over "AWS & Azure" — including after the 2026-08-12 CV,
   * which now reads "AWS & Azure" in this slot. The bio directly below reads
   * "across AWS, Azure and GCP", so the provider names would repeat two lines
   * apart *and* narrow three clouds to two. The abstraction earns its slot by
   * saying something the specifics don't. This is the one line where the site
   * knowingly differs from the CV; it is a slot-level wording call, not a claim
   * difference, so it carries no reference-check risk.
   */
  subtitle: "Kubernetes · Multi-cloud · IDPs · Observability",

  yearsInTech: 15,
  yearsCloudNative: 10,

  // Kept short, tool-free, and scoped to professional work only.
  //
  // It used to close with "— most recently for GPU and AI workloads", which
  // implied recent work at Aldi Süd. It isn't — the GPU platform is a project,
  // not a role. Focus Areas still carries the GPU/AI positioning — the
  // subtitle no longer does, see its comment above — and the /work pages back
  // it with a real repo; this line stays limited to what was done on the job.
  //
  // The opening used to read "15 years in tech, 10 building cloud-native
  // platforms…". Dropped 2026-08-07: total-tenure framing anchors on years
  // rather than scope, and the first five were legacy WebLogic/Java ops that
  // pull against the platform positioning. The Experience section still shows
  // the full span, so nothing is hidden — it just isn't the lead.
  //
  // Realigned to the CV summary 2026-08-12. It now carries the CV's first two
  // sentences almost verbatim — "building *and operating*" (the CV's own
  // addition, and the half of the job a build-only line drops) and the four
  // named focuses. The CV's remaining two sentences are employer-specific
  // ("At Aldi Süd… At Rakuten…") and deliberately stay out: the Experience
  // section carries them, and repeating them here would make the hero the
  // second-best version of a section further down the page.
  //
  // The closing clause is carried over from the pre-CV bio at Karthik's
  // request. Note it restates "observability" and "reliability" from the focus
  // list one sentence earlier; it survives that repetition because the two say
  // different things — the list names observability as a focus, the clause says
  // what it is *for*. If it ever reads as padding, cut the two words from the
  // focus list rather than the clause: the clause is the one doing the work.
  bio:
    "10+ years building and operating cloud-native platforms across AWS, Azure and GCP, " +
    "with a focus on Kubernetes, reliability, observability and developer experience. " +
    "I lead platform initiatives across engineering teams, turning shared infrastructure " +
    "into automated, self-service golden paths — and the observability that keeps them reliable.",

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
   * Earliest start date. NOT currently rendered — see the hero pill in
   * components/hero-section.tsx. Reinstating it is one interpolation.
   *
   * Held back because a date only helps once it beats what a recruiter already
   * assumes. German notice is standardly three months, so a reader silently
   * pencils in "today + 3 months"; on 2026-08-07 that was 7 Nov, which makes
   * 15 Dec look 38 days *worse* than saying nothing at all.
   *
   * The crossover is **15 September 2026** — from then on, today + 3 months
   * lands after 15 Dec and the date becomes a genuine advantage. Add it back
   * then, and remove it again once the date has passed: "available from" a
   * date in the past reads as "unemployed since then, still looking", which is
   * the worst of the three states.
   *
   * Kept as a separate field from `location.availability` on purpose — that
   * one is a *where*, is shared with the footer and the ⌘K palette, and must
   * not absorb a *when*.
   */
  availableFrom: "Available from 15 Dec 2026",

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
   *
   * 2026-08-18: karthik-job-market-radar's stats_and_learning_plan.md
   * ("Title strategy — resolved, do not re-litigate") documents Karthik
   * dropping "Staff" from his LinkedIn headline and CV title line after an
   * A/B test showed more inbound without it (Senior:Staff titles run 10:1 in
   * the German market). Raised as a possible consistency fix for this list
   * too — Karthik's call: keep "Staff" here. The "open to" framing already
   * makes it a target, not a claim, which is the distinction that matters for
   * this list; the headline/CV decision was about search-string performance
   * on a different surface and doesn't automatically carry over here.
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
    name: "Cloud Infrastructure",
    detail: "AWS · Azure · GCP",
  },
  {
    name: "SRE & Reliability",
    detail: "SLOs · Observability · Incident response",
  },
  // Moved from second to last 2026-08-07, for the same reason as the Tech
  // Skills card: it is a real secondary track, not the headline. See the
  // "AI & GPU Infrastructure" group in content/skills.ts for the numbers.
  {
    name: "AI & GPU Infrastructure",
    detail: "GPU scheduling · LLM serving · Observability",
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

/**
 * Real, verifiable speaking engagements only — each one links to a public
 * event page. Do not add anything here that can't be checked by a recruiter
 * clicking through, same bar as everything else on the site.
 *
 * `screenshot` is an archival capture taken 2026-08-18, not a design asset —
 * event sites like this one commonly come down within weeks of the event
 * date, so the claim needs to survive that independent of the live URL.
 */
export const speaking = [
  {
    event: "AI Infrastructure Summit 2026",
    date: "2026-09-29",
    location: "Berlin, Germany",
    session:
      "AI Automation Café: How will AI driven automation reshape cloud infrastructure built on Terragrunt and Terraform?",
    url: "https://www.we-conect.com/events/ai-infrastructure-summit-2026/sprecher/b3188f2c-da96-4884-a1b4-e3d40b2a2ec8",
    screenshot: "/speaking/ai-infrastructure-summit-2026.png",
  },
] as const

/**
 * Real LinkedIn recommendations only, quoted verbatim (only proper-noun
 * capitalisation normalised) — these are other people's words, not
 * Karthik's, so they don't get cleaned up for house style. `relationship`
 * mirrors LinkedIn's own context line so a reader can weigh who is talking.
 * Source: https://www.linkedin.com/in/karthikorugonda/details/recommendations/
 */
export const recommendations = [
  {
    name: "Rohan Das",
    title: "Site Reliability Engineer",
    relationship: "Karthik was senior to Rohan, not his direct manager",
    date: "2022-08-04",
    quote:
      "Karthik always been a great leader with vast expertise on different set of tools and technologies. His leadership skills is one of the best I have met in corporate. His dedication to his craft is nothing short of inspiring, and his ability to coach/guide is incredible. Always helpful and brings idea for the solution to the problem in a optimal way. He's a great asset in DevOps world.",
  },
  {
    name: "Sachin Rajput",
    title: "Principal Engineer, DevOps",
    relationship: "Worked with Karthik on the same team",
    date: "2022-05-24",
    quote:
      "Karthik is an excellent DevOps engineer and a wonderful human being. His expertise as a DevOps engineer is considerable, and it helped our team come up with more efficient solutions on different projects. He is creative, smart, has excellent technical skills. I love his positive attitude and he is my go-to person when I need advice. I would recommend and endorse Karthik.",
  },
  {
    name: "Arun Babu",
    title: "DevOps Engineer",
    relationship: "Reported to Karthik directly",
    date: "2022-12-30",
    quote:
      "During my career I've rarely come across real professionals like Karthik. I've learned so much from working with Karthik, he helped me to become a better professional. Such a great human being with vast knowledge in areas of DevOps and cloud. Highest recommendations to Karthik, not just as a thoughtful leader but as a team player as well.",
  },
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
