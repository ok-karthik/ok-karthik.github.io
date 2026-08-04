/**
 * Architecture diagrams, one per project, keyed by slug.
 *
 * Restyled to the page's colour rule: structure is achromatic (border/muted),
 * --primary marks the component that does the work, and the status triple is
 * used only where something genuinely passes, warns or fails. Previously these
 * used blue/purple/emerald/amber decoratively, which meant a reader had no way
 * to tell which colour was telling them something.
 */

import type { ReactNode } from "react"

/* --------------------------------- atoms --------------------------------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card p-5">
      <div className="min-w-[20rem] space-y-4 text-center font-mono text-micro">{children}</div>
    </div>
  )
}

function Node({
  children,
  active,
  className = "",
}: {
  children: ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-md border px-3 py-2 ${
        active
          ? "border-primary/50 bg-primary/5 text-primary"
          : "border-border bg-muted text-foreground"
      } ${className}`}
    >
      {children}
    </div>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-border p-4">
      <p className="label mb-3 text-left">{title}</p>
      {children}
    </div>
  )
}

function Flow({ dir = "→" }: { dir?: string }) {
  return (
    <div className="select-none text-muted-foreground" aria-hidden>
      {dir}
    </div>
  )
}

/* -------------------------------- diagrams -------------------------------- */

function GpuPlatform() {
  return (
    <Frame>
      <Group title="Observability">
        <div className="space-y-2">
          <Node>Grafana</Node>
          <Flow dir="↑" />
          <Node>Prometheus</Node>
          <Flow dir="↑" />
          <Node>DCGM Exporter</Node>
        </div>
      </Group>
      <Flow dir="↑" />
      <Group title="Driver & device lifecycle">
        <Node active className="mb-3 font-semibold">
          GPU Operator
        </Node>
        <div className="grid grid-cols-2 gap-2">
          <Node>Device Plugin</Node>
          <Node>Node Feature Discovery</Node>
          <Node>Container Toolkit</Node>
          <Node>Time Slicing</Node>
        </div>
      </Group>
      <Flow dir="↑" />
      <Group title="Capacity">
        <div className="space-y-2">
          <Node>GPU Node — provisioned by Karpenter</Node>
          <Flow dir="↑" />
          <Node>GPU Workloads (CUDA)</Node>
        </div>
      </Group>
    </Frame>
  )
}

function Observability() {
  return (
    <Frame>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <Group title="Source">
          <div className="space-y-2">
            <Node>Microservices on EKS</Node>
            <Node>OTel instrumentation</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Collect">
          <Node active className="mb-2 font-semibold">
            OTel Collector
          </Node>
          <div className="space-y-2">
            <Node>Receivers</Node>
            <Node>Processors / Exporters</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Store">
          <div className="space-y-2">
            <Node>Prometheus — metrics</Node>
            <Node>Loki — logs</Node>
            <Node>Tempo — traces</Node>
          </div>
        </Group>
      </div>
      <Flow dir="↓" />
      <Node>Grafana — unified query and alerting</Node>
    </Frame>
  )
}

function AwsTerragrunt() {
  return (
    <Frame>
      <Group title="Governance gates — run in parallel">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Node>
            TFLint
            <span className="mt-1 block text-muted-foreground">static analysis</span>
          </Node>
          <Node>
            Plan
            <span className="mt-1 block text-muted-foreground">diff check</span>
          </Node>
          <Node>
            OPA / Conftest
            <span className="mt-1 block text-muted-foreground">security policy</span>
          </Node>
          <Node>
            Infracost
            <span className="mt-1 block text-muted-foreground">cost delta</span>
          </Node>
        </div>
      </Group>
      {/* Status colour earns its place here: this is a real pass condition. */}
      <p className="text-ok">↓ all gates pass ↓</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Group title="Dev">
          <div className="space-y-2">
            <Node>eu-central-1 / vpc</Node>
            <Node>eu-central-1 / eks</Node>
          </div>
        </Group>
        <Group title="Prod — protected">
          <div className="space-y-2">
            <Node>eu-central-1 / vpc</Node>
            <Node>eu-central-1 / eks</Node>
          </div>
        </Group>
      </div>
    </Frame>
  )
}

function GitOps() {
  return (
    <Frame>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <Group title="Developer">
          <div className="space-y-2">
            <Node>IDP scaffolder CLI</Node>
            <Node>Tenant source repo</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Delivery">
          <div className="space-y-2">
            <Node>GitHub Actions</Node>
            <Node>Tenant GitOps repo</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Control plane">
          <div className="space-y-2">
            <Node active>Argo CD ApplicationSet</Node>
            <Node active>Kyverno admission</Node>
          </div>
        </Group>
      </div>
    </Frame>
  )
}

function FinOps() {
  return (
    <Frame>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <Group title="Trigger">
          <Node>Kopf timer — every 60s</Node>
        </Group>
        <Flow />
        <Group title="Reconcile">
          <Node active className="mb-2 font-semibold">
            Scaling engine
          </Node>
          <div className="space-y-2">
            <Node>Read annotations</Node>
            <Node>Compute active window</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Act">
          <div className="space-y-2">
            <div className="rounded-md border border-ok/40 bg-ok/5 px-3 py-2 text-ok">
              Inside sleep window
              <span className="mt-1 block opacity-80">patch replicas → 0</span>
            </div>
            <div className="rounded-md border border-warn/40 bg-warn/5 px-3 py-2 text-warn">
              Excluded
              <span className="mt-1 block opacity-80">bypass workload</span>
            </div>
          </div>
        </Group>
      </div>
    </Frame>
  )
}

/** Slug → diagram. Projects without one render no architecture block. */
export const architectureBySlug: Record<string, () => ReactNode> = {
  "ai-infrastructure-on-eks": GpuPlatform,
  "opentelemetry-platform-on-eks": Observability,
  "enterprise-aws-terragrunt": AwsTerragrunt,
  "internal-developer-platform": GitOps,
  "finops-k8s-operator": FinOps,
}

/**
 * Card thumbnail.
 *
 * Renders the actual diagram at reduced scale inside a clipped, faded box —
 * a genuine preview rather than a decorative glyph. Inert: no pointer events,
 * hidden from the accessibility tree, since the readable version lives on the
 * project page.
 */
export function ArchitecturePreview({ slug }: { slug: string }) {
  const Diagram = architectureBySlug[slug]
  if (!Diagram) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none relative h-32 select-none overflow-hidden rounded-lg border border-border bg-muted/40"
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ transform: "scale(0.38)", width: "263%" }}
      >
        <Diagram />
      </div>
    </div>
  )
}
