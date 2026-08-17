/**
 * Writing.
 *
 * Every established infra engineer's site in the comparison set — Gregg,
 * Fong-Jones, Duggan, Robinson — leads with writing, and none of the
 * job-seeking DevOps portfolios have any. It is also the cheapest available
 * evidence for "technical strategy / direction", which is the largest single
 * gap between how Senior and Staff roles are written (+32pp in the scraped
 * market data).
 *
 * !! NOT PUBLISHED. The /writing routes were removed before the branch merged
 * !! so these drafts don't ship unread under Karthik's name. The drafts stay
 * !! here because this is where they get edited.
 * !!
 * !! To restore: `git checkout 152ea8c -- app/writing` then re-add the nav entry,
 * !! the palette group and the sitemap entries. All four were removed in one
 * !! commit, so its diff is the checklist.
 * !!
 * !! TODO(karthik): THESE ARE DRAFTS. The shape of each argument is yours —
 * !! taken from the `decisions` in content/projects.ts — but the wording is
 * !! mine, so read them before publishing under your name.
 * !!
 * !! First-person claims have been reconciled against the project READMEs
 * !! (fetched 2026-08-03) and now assert only what those repos actually show.
 * !! If you later add a sentence about something you did, hold it to the same
 * !! bar: publishing a technical claim you can't defend in an interview is
 * !! worse than publishing nothing.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang?: string; text: string }

export type Post = {
  slug: string
  title: string
  /** ISO date. Used for ordering and the dateline. */
  date: string
  /** One-sentence summary — index page and meta description. */
  summary: string
  readingMinutes: number
  tags: string[]
  /** Related project slug, if the post came out of one. */
  project?: string
  body: Block[]
}

export const posts: Post[] = [
  {
    slug: "time-slicing-vs-mig",
    title: "Time slicing or MIG: how to actually share a GPU",
    date: "2026-08-03",
    summary:
      "Two ways to put more than one workload on one accelerator, and the isolation trade-off that decides between them.",
    readingMinutes: 6,
    tags: ["GPU", "Kubernetes", "NVIDIA"],
    project: "ai-infrastructure-on-eks",
    body: [
      {
        type: "p",
        text: "A GPU allocated to a pod is a GPU allocated to that pod. Kubernetes treats accelerators as indivisible extended resources, so a notebook idling at 4% utilisation holds an entire card, and the next job queues behind it. On CPU nobody would accept this. On hardware that costs an order of magnitude more per hour, most clusters accept it by default.",
      },
      {
        type: "p",
        text: "NVIDIA gives you two ways out, and they are not interchangeable. Choosing between them is really a question about who your tenants are.",
      },
      { type: "h2", text: "Time slicing" },
      {
        type: "p",
        text: "Time slicing advertises one physical GPU as several allocatable replicas. The scheduler places multiple pods on it and the driver interleaves their kernels. From the workload's point of view it has a GPU; in reality it has a share of one, on a rota.",
      },
      {
        type: "p",
        text: "It is a configuration change, not a hardware feature. That is its main appeal — it works on cards that have no partitioning support at all, which in practice means most of the fleet outside the datacentre-class parts.",
      },
      {
        type: "p",
        text: "What you give up is isolation, and it is worth being precise about which kind. There is no memory partition. Two pods sharing a card share its memory, so one workload allocating aggressively can push another into an out-of-memory failure it did nothing to cause. There is no compute guarantee either — a neighbour saturating the card slows you down with no signal that anything is wrong.",
      },
      { type: "h2", text: "MIG" },
      {
        type: "p",
        text: "Multi-Instance GPU partitions the card in hardware into instances with their own memory, cache and compute slices. A pod bound to an instance cannot see or starve its neighbours. The failure isolation is genuine, not cooperative.",
      },
      {
        type: "p",
        text: "The costs are that it only exists on supported hardware, the partition layout is fixed at configuration time rather than negotiated per workload, and a job that needs the whole card cannot have it while the partitioning stands. You are trading flexibility for a guarantee.",
      },
      { type: "h2", text: "How to choose" },
      {
        type: "p",
        text: "The question that decides it is not utilisation. It is whether your tenants can hurt each other, and whether that matters.",
      },
      {
        type: "ul",
        items: [
          "Development, experimentation and internal inference, run by people who share a Slack channel: time slicing. The workloads are bursty, mostly idle, and a noisy neighbour is a conversation rather than an incident.",
          "Multiple teams with independent SLOs, or anything customer-facing: MIG, where the hardware supports it. A guarantee you can point at beats a convention you have to police.",
          "Untrusted or externally-submitted workloads: MIG, or separate nodes. Shared memory is a shared blast radius.",
        ],
      },
      {
        type: "p",
        text: "On the EKS platform I built, the instance families in play were g4dn and g6 — T4 and L4 class, with no MIG support at all. So the choice was made for me by the hardware, which is often how it goes. What still mattered was recording it: the next person to read that cluster config will otherwise assume an isolation boundary that is not there.",
      },
      { type: "h2", text: "The part people skip" },
      {
        type: "p",
        text: "Whichever you pick, you cannot tell whether it is working without GPU-level telemetry. Standard Kubernetes metrics report that a pod holds a GPU resource. They say nothing about whether the silicon is busy.",
      },
      {
        type: "p",
        text: "DCGM exporter into Prometheus closes that gap, and the two signals worth alerting on are utilisation — is sharing actually being used, or are you paying for idle capacity — and memory pressure, which under time slicing is your only early warning that tenants are about to collide.",
      },
      {
        type: "quote",
        text: "Sharing a GPU without GPU metrics is not capacity management. It is hoping.",
      },
    ],
  },
  {
    slug: "why-the-otel-collector-earns-its-hop",
    title: "Why the OpenTelemetry Collector earns its extra hop",
    date: "2026-07-20",
    summary:
      "Sending telemetry straight to your backend is simpler and cheaper. Here is what that simplicity costs you the second time you change vendors.",
    readingMinutes: 5,
    tags: ["OpenTelemetry", "Observability", "Architecture"],
    project: "opentelemetry-platform-on-eks",
    body: [
      {
        type: "p",
        text: "Every observability vendor ships an agent that takes telemetry directly from your application. It works, it is well documented, and it is one fewer component to run. Putting a collector in the middle is strictly more infrastructure. So it has to earn the hop.",
      },
      { type: "h2", text: "What direct export actually couples" },
      {
        type: "p",
        text: "When applications talk to a backend directly, the vendor's assumptions end up distributed across every service you own. Its SDK is in your dependency tree. Its attribute conventions are in your instrumentation. Its sampling configuration is in your application config, deployed on your application's release cadence.",
      },
      {
        type: "p",
        text: "None of that hurts until the day the answer to \"can we evaluate a different backend?\" is \"we would have to re-instrument everything first.\" At that point the cost of switching has quietly become larger than the saving from switching, and the decision makes itself. That is not a tooling problem, it is a coupling problem, and it was created years earlier by a choice nobody wrote down.",
      },
      { type: "h2", text: "What the collector changes" },
      {
        type: "p",
        text: "With a collector, applications emit OTLP and know nothing else. The backend becomes an exporter configuration — a change to one component, reviewed on its own, rolled back on its own. Adding a second backend to run side by side during an evaluation stops being a migration and becomes a config block.",
      },
      {
        type: "p",
        text: "Processing also moves out of the application. Attribute scrubbing, PII redaction, sampling, batching — all of it happens in a component owned by the platform team rather than being reimplemented, slightly differently, in every service.",
      },
      { type: "h2", text: "Agent, gateway, or both" },
      {
        type: "p",
        text: "Two topologies, and most real deployments want both.",
      },
      {
        type: "ul",
        items: [
          "Agent — a collector per node, usually a DaemonSet. Close to the workload, so it can enrich with node and pod metadata and survive brief network trouble. Cheap and horizontally scaled by definition.",
          "Gateway — a central deployment every agent forwards to. This is where anything needing a global view belongs: tail-based sampling, which cannot work on a node that has only seen part of a trace, plus egress control and credential handling in one place instead of on every node.",
        ],
      },
      {
        type: "p",
        text: "The platform I built runs both: a DaemonSet in each workload cluster enriching with Kubernetes metadata, forwarding to a gateway fleet in a separate observability cluster that owns filtering, batching and sampling. Splitting the cluster as well as the tier matters more than it sounds — it means a workload-cluster incident cannot take down the tooling you need to debug it.",
      },
      { type: "h2", text: "When to skip it" },
      {
        type: "p",
        text: "The collector is not free. It is another deployment to run, size, monitor and page on, and a component that sits between your services and the ability to see them — which makes it a dependency of your own debugging.",
      },
      {
        type: "p",
        text: "For one service, one team, and a vendor you have no intention of leaving, direct export is the honest answer. The collector earns its place when telemetry has to outlive a vendor decision, and it is worth being able to say which of those situations you are in rather than adopting it because it is the recommended architecture.",
      },
    ],
  },
  {
    slug: "governance-gates-belong-in-parallel",
    title: "Governance gates belong in parallel, not in a chain",
    date: "2026-07-06",
    summary:
      "Security, cost and lint checks are independent. Running them in sequence turns one review cycle into four.",
    readingMinutes: 4,
    tags: ["Terraform", "CI/CD", "Policy as Code"],
    project: "enterprise-aws-terragrunt",
    body: [
      {
        type: "p",
        text: "Most infrastructure pipelines are a chain: lint, then plan, then policy, then cost. It reads naturally, each step builds on the last, and it is the default in every example pipeline you will find. It is also the reason engineers batch up changes and stop reading CI output.",
      },
      { type: "h2", text: "What a chain does to feedback" },
      {
        type: "p",
        text: "In a chain the first failure hides everything after it. Push a change with a lint error, a policy violation and a cost regression, and you learn about the lint error. Fix it, push, wait, learn about the policy violation. Fix it, push, wait, learn about the cost.",
      },
      {
        type: "p",
        text: "Three round trips to discover three problems that were all knowable on the first run. If a pipeline takes five minutes, that is a fifteen-minute review loop with two context switches in it. The rational engineer response is to make fewer, larger changes — which is the opposite of what the gates were introduced to encourage.",
      },
      { type: "h2", text: "They are not actually sequential" },
      {
        type: "p",
        text: "The chain implies a dependency that mostly is not there. TFLint reads the configuration. Conftest reads the plan. Infracost reads the plan. Only the plan itself is a genuine prerequisite, and it is a prerequisite for two of the checks, not a step between them.",
      },
      {
        type: "code",
        lang: "pipeline",
        text: "one round trip, every class of failure reported in parallel",
      },
      {
        type: "p",
        text: "Fan out after the plan, join before the merge. One run surfaces every category of problem, and the reviewer sees the full picture of what a change costs before deciding anything.",
      },
      { type: "h2", text: "Evaluate policy against the plan, not the source" },
      {
        type: "p",
        text: "A detail that matters more than the ordering: policy should read the plan output, not the HCL. Static analysis of source sees what was written. The plan sees what will be created, with module defaults resolved, variables substituted and computed values filled in.",
      },
      {
        type: "p",
        text: "A rule like \"no public S3 buckets\" is trivially evadable at the source level, because the value that makes the bucket public may arrive from a variable, a default three modules deep, or a workspace-specific override. Against the plan there is nowhere for it to hide.",
      },
      { type: "h2", text: "Cost belongs in the same row" },
      {
        type: "p",
        text: "Cost is usually treated as a monthly review rather than a gate, which means it surfaces weeks after the change that caused it, to someone who did not make it. Putting Infracost alongside the security checks moves that conversation to the point where the change is still one revert away — and quietly says something about the platform: money is a correctness property, not an afterthought.",
      },
    ],
  },
]

export const getPost = (slug: string): Post | undefined => posts.find((p) => p.slug === slug)

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
