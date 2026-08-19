/**
 * Architecture diagrams, one per project, keyed by slug.
 *
 * Restyled with high-contrast glassmorphic design and subtle live-telemetry
 * active indicators for critical control plane & pipeline components.
 */

import type { ReactNode } from "react"

/* --------------------------------- atoms --------------------------------- */

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/60 backdrop-blur-md p-5 shadow-inner">
      <div className="min-w-[20rem] space-y-4 text-center font-mono text-xs">{children}</div>
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
      className={`rounded-lg border px-3 py-2 transition-all relative ${
        active
          ? "border-primary/60 bg-primary/10 text-primary shadow-[0_0_16px_rgba(0,255,231,0.18)] font-semibold"
          : "border-border/70 bg-muted/50 text-foreground"
      } ${className}`}
    >
      {active && (
        <span className="absolute -top-1 -right-1 flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      )}
      {children}
    </div>
  )
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-4 relative">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3 text-left">{title}</p>
      {children}
    </div>
  )
}

function Flow({ dir = "→" }: { dir?: string }) {
  return (
    <div className="select-none text-muted-foreground/70 font-mono text-sm" aria-hidden>
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
            <span className="mt-1 block text-[10px] text-muted-foreground">static analysis</span>
          </Node>
          <Node>
            Plan
            <span className="mt-1 block text-[10px] text-muted-foreground">diff check</span>
          </Node>
          <Node>
            OPA / Conftest
            <span className="mt-1 block text-[10px] text-muted-foreground">security policy</span>
          </Node>
          <Node>
            Infracost
            <span className="mt-1 block text-[10px] text-muted-foreground">spend guardrail</span>
          </Node>
        </div>
      </Group>
      <Flow dir="↓" />
      <Group title="Hierarchy — DRY backend & inputs inheritance">
        <div className="space-y-2">
          <Node>root terragrunt.hcl — S3 backend, DynamoDB lock, provider gen</Node>
          <Flow dir="↓" />
          <Node>account.hcl — AWS Account ID, IAM baseline, guardrails</Node>
          <Flow dir="↓" />
          <Node>region.hcl — VPC CIDRs, primary / DR region selection</Node>
          <Flow dir="↓" />
          <Node>env.hcl — dev / stage / prod variables, sizing profiles</Node>
          <Flow dir="↓" />
          <Node active>units — modular Terraform components (VPC, EKS, RDS)</Node>
        </div>
      </Group>
    </Frame>
  )
}

function IdpGitops() {
  return (
    <Frame>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <Group title="Catalog">
          <div className="space-y-2">
            <Node>Golden paths</Node>
            <Node>Output contract</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Developer">
          <div className="space-y-2">
            <Node>Scaffolder CLI</Node>
            <Node>Tenant repos</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Delivery">
          <div className="space-y-2">
            <Node>GitHub Actions</Node>
            <Node>Rendered manifests</Node>
          </div>
        </Group>
        <Flow />
        <Group title="Control plane">
          <div className="space-y-2">
            <Node active>Argo CD Applications</Node>
            <Node>Kyverno admission</Node>
          </div>
        </Group>
      </div>
      <Flow dir="↓" />
      <Node>Workload clusters (EKS)</Node>
    </Frame>
  )
}

function FinOpsOperator() {
  return (
    <Frame>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-center">
        <Group title="Input">
          <div className="space-y-2">
            <Node>Deployment / StatefulSet</Node>
            <Node>Annotations (opt-in / schedule)</Node>
          </div>
        </Group>
        <div className="space-y-2">
          <Flow dir="→" />
          <Node active className="font-semibold">
            Kopf Operator
            <span className="mt-1 block text-[10px] text-muted-foreground">reads annotations, checks cron</span>
          </Node>
          <Flow dir="→" />
        </div>
        <Group title="Action">
          <div className="space-y-2">
            <Node>Scale to 0 (sleep window)</Node>
            <Node>Restore original replicas</Node>
          </div>
        </Group>
      </div>
      <Flow dir="↓" />
      <Node>Capacity scales down via Karpenter / Cluster Autoscaler</Node>
    </Frame>
  )
}

/* --------------------------------- export --------------------------------- */

const diagrams: Record<string, () => ReactNode> = {
  "ai-infrastructure-on-amazon-eks": GpuPlatform,
  "opentelemetry-platform-on-eks": Observability,
  "enterprise-aws-terragrunt": AwsTerragrunt,
  "internal-developer-platform": IdpGitops,
  "finops-kubernetes-operator": FinOpsOperator,
}

export const architectureBySlug: Record<string, () => ReactNode> = diagrams

export function ArchitectureDiagram({ slug }: { slug: string }) {
  const Component = diagrams[slug]
  if (!Component) return null
  return <Component />
}

export function ArchitecturePreview({
  slug,
  className = "h-48",
  fadeFrom = "85%",
}: {
  slug: string
  className?: string
  fadeFrom?: string
}) {
  const Component = diagrams[slug]
  if (!Component) return null

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`relative w-full select-none overflow-hidden rounded-xl border border-border/70 bg-card/60 backdrop-blur-sm pointer-events-none ${className}`}
      style={{
        maskImage: `linear-gradient(to bottom, black 0%, black ${fadeFrom}, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, black 0%, black ${fadeFrom}, transparent 100%)`,
      }}
    >
      <div className="origin-top transform p-3 scale-[var(--arch-scale,0.65)]">
        <Component />
      </div>
    </div>
  )
}
