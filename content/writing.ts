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
 * !! STATUS (2026-10-05): live on main. Rewritten in plain, conversational
 * !! language at Karthik's request ("simpler understandable terms ... rather
 * !! than complex AI looking things"), modelled on how he writes in chat:
 * !! short sentences, contractions, no punchline endings. Same arguments and
 * !! the same first-person claims as the 2026-08-18 version — only the wording
 * !! changed — but Karthik still hasn't read them end to end. Treat as drafts
 * !! until he does.
 * !!
 * !! First-person claims were reconciled against the project READMEs on
 * !! 2026-08-03 and re-checked 2026-08-18, when one inaccuracy was found and
 * !! fixed: "time-slicing-vs-mig" claimed g4dn *and g6* instance families;
 * !! only g4dn appears anywhere in that repo, so it now says g4dn only. If you
 * !! actually ran g6/L4 somewhere this repo doesn't show, restore the line
 * !! with that context — don't just revert this comment.
 * !!
 * !! If you add a sentence about something you did, hold it to the same bar:
 * !! publishing a technical claim you can't defend in an interview is worse
 * !! than publishing nothing.
 */

import type { PostDiagramName } from "@/components/post-diagrams"

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang?: string; text: string }
  /** A comparison figure from components/post-diagrams.tsx. */
  | { type: "diagram"; name: PostDiagramName }

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
    summary: "Two ways to run more than one workload on a GPU, and how to pick between them.",
    readingMinutes: 5,
    tags: ["GPU", "Kubernetes", "NVIDIA"],
    project: "ai-infrastructure-on-eks",
    body: [
      {
        type: "p",
        text: "By default, Kubernetes gives a whole GPU to one pod. GPUs are an \"extended resource\" that can't be split, so even a notebook sitting at 4% utilisation holds the entire card, and the next job just waits. Nobody would accept that for CPU. For hardware that costs many times more per hour, most clusters accept it without a second thought.",
      },
      {
        type: "p",
        text: "NVIDIA gives you two ways to share a card: time slicing and MIG. They're not interchangeable, and picking one is really a question about who is sharing the card.",
      },
      {
        type: "diagram",
        name: "gpu-sharing",
      },
      {
        type: "h2",
        text: "Time slicing",
      },
      {
        type: "p",
        text: "Time slicing makes one physical GPU show up to the scheduler as several. Kubernetes places multiple pods on it, and the driver takes turns running their work. Each pod thinks it has a GPU. In reality it has a share of one.",
      },
      {
        type: "p",
        text: "The nice part is that it's just configuration, not a hardware feature. So it works on cards with no partitioning support at all, which is most of what you'll actually run outside the big datacentre GPUs.",
      },
      {
        type: "p",
        text: "The catch is isolation, and it helps to be specific about what you lose. Memory isn't split. Pods on the same card share its memory, so one greedy workload can push another into an out-of-memory crash it didn't cause. Compute isn't guaranteed either. If a neighbour keeps the card busy, your job just gets slower, and nothing tells you why.",
      },
      {
        type: "h2",
        text: "MIG (Multi-Instance GPU)",
      },
      {
        type: "p",
        text: "MIG splits the card in hardware. Each slice gets its own memory, cache and compute, and a pod on one slice can't see or slow down the others. That's real isolation, not everyone agreeing to play nice.",
      },
      {
        type: "p",
        text: "The downsides: it only works on GPUs that support it, you choose the slice layout up front instead of per workload, and a job that needs the full card can't have it while the card is split. You give up flexibility to get a guarantee.",
      },
      {
        type: "h2",
        text: "So which one?",
      },
      {
        type: "p",
        text: "I don't think utilisation is the deciding question. The real question is whether the people sharing the card can hurt each other, and whether that matters.",
      },
      {
        type: "ul",
        items: [
          "Dev, experiments and internal inference, run by people on the same team: time slicing. These workloads are bursty and mostly idle, and if someone hogs the card, you just talk to them.",
          "Several teams with their own SLOs, or anything customer-facing: MIG, if your hardware has it. A hard limit is much easier to rely on than an agreement you have to keep checking.",
          "Untrusted or externally submitted workloads: MIG, or separate nodes. Shared memory means one bad job can affect everyone on the card.",
        ],
      },
      {
        type: "p",
        text: "On the EKS platform I built, the nodes were g4dn, which come with T4 GPUs. T4s don't support MIG at all, so the hardware made the choice for me. That happens a lot. What still mattered was writing it down, so the next person reading the cluster config doesn't assume there's isolation that isn't there.",
      },
      {
        type: "h2",
        text: "Don't skip the GPU metrics",
      },
      {
        type: "p",
        text: "Whichever you pick, you can't tell if it's working without GPU-level metrics. Normal Kubernetes metrics only tell you a pod holds a GPU. They don't tell you whether the GPU is actually busy.",
      },
      {
        type: "p",
        text: "On that platform, the DCGM exporter feeds GPU metrics into Prometheus. Two signals are worth alerting on: utilisation, to see whether sharing is actually being used or you're paying for idle cards, and memory pressure, which with time slicing is your only early warning before two pods run into each other.",
      },
    ],
  },
  {
    slug: "why-the-otel-collector-earns-its-hop",
    title: "Why the OpenTelemetry Collector earns its extra hop",
    date: "2026-07-20",
    summary: "Sending telemetry straight to your vendor is simpler. Here's what that costs you the day you want to switch.",
    readingMinutes: 5,
    tags: ["OpenTelemetry", "Observability", "Architecture"],
    project: "opentelemetry-platform-on-eks",
    body: [
      {
        type: "p",
        text: "Every observability vendor gives you an agent or SDK that sends telemetry straight from your app to their backend. It works, the docs are good, and it's one less thing to run. A collector in the middle is extra infrastructure, so it needs a real reason to be there. Here's the reason.",
      },
      {
        type: "h2",
        text: "What sending directly ties you to",
      },
      {
        type: "p",
        text: "When your apps talk straight to a vendor, that vendor ends up spread across every service you own. Their SDK is in your dependencies. Their attribute naming is in your instrumentation. Their sampling settings live in your app config and only change when the app is released.",
      },
      {
        type: "p",
        text: "None of this hurts at first. It hurts the day someone asks \"can we try a different backend?\" and the answer is \"only after we re-instrument everything\". By then switching costs more than it saves, so nobody switches. That's not really a tooling problem. It's a coupling problem, created years earlier by a decision nobody wrote down.",
      },
      {
        type: "diagram",
        name: "collector-hop",
      },
      {
        type: "h2",
        text: "What the collector changes",
      },
      {
        type: "p",
        text: "With a collector in the middle, apps just send OTLP and don't know anything else. The backend becomes exporter config in one component, which you can change, review and roll back on its own. Want to run a second backend side by side while you evaluate it? That's a config block, not a migration.",
      },
      {
        type: "p",
        text: "Processing moves out of the apps too. Scrubbing attributes, redacting PII, sampling and batching all happen in one component the platform team owns, instead of every service doing its own slightly different version.",
      },
      {
        type: "h2",
        text: "Agent, gateway, or both",
      },
      {
        type: "p",
        text: "There are two ways to run it, and most real setups use both.",
      },
      {
        type: "ul",
        items: [
          "Agent: one collector per node, usually a DaemonSet. It sits close to the workload, so it can add node and pod metadata and ride out short network blips. It's cheap, and it scales with your nodes.",
          "Gateway: a central deployment that all the agents forward to. Anything that needs the full picture goes here. Tail-based sampling is the big one, because a single node only ever sees part of a trace. It's also the one place to control egress and handle backend credentials, instead of doing that on every node.",
        ],
      },
      {
        type: "p",
        text: "The platform I built runs both. A DaemonSet in each workload cluster adds Kubernetes metadata and forwards to a gateway fleet in a separate observability cluster, which handles filtering, batching and sampling. Putting the gateway in its own cluster matters more than it sounds: an incident in a workload cluster can't take down the tools you need to debug it.",
      },
      {
        type: "h2",
        text: "When you don't need it",
      },
      {
        type: "p",
        text: "The collector isn't free. It's another deployment to run, size, monitor and get paged for. And it sits between your services and your ability to see them, so if it breaks, your debugging breaks with it.",
      },
      {
        type: "p",
        text: "If you have one service, one team, and a vendor you're happy to stay with, sending directly is fine. The collector is worth it when your telemetry needs to outlive a vendor decision. Just be clear about which situation you're in, rather than adding it because it's the recommended architecture.",
      },
    ],
  },
  {
    slug: "governance-gates-belong-in-parallel",
    title: "Governance gates belong in parallel, not in a chain",
    date: "2026-07-06",
    summary: "Lint, security and cost checks don't depend on each other. Running them one after another turns one review into several round trips.",
    readingMinutes: 4,
    tags: ["Terraform", "CI/CD", "Policy as Code"],
    project: "enterprise-aws-terragrunt",
    body: [
      {
        type: "p",
        text: "Most infrastructure pipelines run their checks in a chain: lint, then plan, then policy, then cost. It looks logical, and it's how nearly every example pipeline is written. It's also why engineers start batching up changes and stop reading CI output.",
      },
      {
        type: "h2",
        text: "What a chain does to feedback",
      },
      {
        type: "p",
        text: "In a chain, the first failure hides everything after it. Say you push a change with a lint error, a policy violation and a cost jump. You only hear about the lint error. Fix it, push, wait, and now you hear about the policy. Fix that, push, wait, and now it's the cost.",
      },
      {
        type: "p",
        text: "That's three round trips to find three problems you could have seen on the first run. If the pipeline takes five minutes, that's a fifteen-minute loop with two context switches in it. So people do the sensible thing and make fewer, bigger changes, which is the opposite of what the checks were meant to encourage.",
      },
      {
        type: "h2",
        text: "They don't actually depend on each other",
      },
      {
        type: "p",
        text: "The chain suggests each step needs the one before it. Mostly they don't. TFLint reads the config. Conftest reads the plan. Infracost reads the plan. The plan is the only real prerequisite, and only for two of the checks.",
      },
      {
        type: "diagram",
        name: "parallel-gates",
      },
      {
        type: "p",
        text: "So run the plan, then run the checks side by side, and wait for all of them before merging. One run shows every kind of problem, and the reviewer sees the full picture, including what the change costs, before deciding anything.",
      },
      {
        type: "h2",
        text: "Check policy against the plan, not the code",
      },
      {
        type: "p",
        text: "One detail matters even more than the ordering: policy should check the plan output, not the HCL. Looking at the source only shows what someone wrote. The plan shows what will actually be created, with module defaults, variables and computed values all filled in.",
      },
      {
        type: "p",
        text: "Take a rule like \"no public S3 buckets\". At source level it's easy to slip past, because the value that makes a bucket public can come from a variable, a default three modules deep, or a workspace override. In the plan, there's nowhere for it to hide.",
      },
      {
        type: "h2",
        text: "Put cost next to the security checks",
      },
      {
        type: "p",
        text: "Cost usually gets looked at in a monthly review, not as a check. So it shows up weeks after the change, to someone who didn't make it. Running Infracost next to the security checks moves that conversation to when the change is still one revert away. It also says something about the platform: cost is part of getting a change right, not something to look at later.",
      },
    ],
  },
]

export const getPost = (slug: string): Post | undefined => posts.find((p) => p.slug === slug)

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
