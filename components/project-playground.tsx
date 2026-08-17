"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Server,
  Database,
  Activity,
  Cpu,
  GitBranch,
  CheckCircle2,
  Lock,
  Layers,
  FileCode,
  DollarSign,
  Shield,
  Clock,
} from "lucide-react"

export function ProjectPlayground({ slug }: { slug: string }) {
  if (slug === "opentelemetry-platform-on-eks") {
    return <OtelPlayground />
  }
  if (slug === "internal-developer-platform") {
    return <GitOpsPlayground />
  }
  if (slug === "enterprise-aws-terragrunt") {
    return <TerragruntPlayground />
  }
  if (slug === "ai-infrastructure-on-eks") {
    return <GpuPlayground />
  }
  if (slug === "finops-k8s-operator") {
    return <FinopsPlayground />
  }
  return null
}

/* -------------------------------------------------------------------------- */
/* 1. OpenTelemetry & LGTM Ingest / Tail-Sampling Simulator                   */
/* -------------------------------------------------------------------------- */

type OtelMode = "normal" | "error-spike" | "memory-limit"

function OtelPlayground() {
  const [mode, setMode] = useState<OtelMode>("normal")

  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="label text-primary">Interactive Pipeline Simulator</p>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Ingest & Tail-Sampling Flow
          </h3>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMode("normal")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              mode === "normal"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Steady State (200 OK)
          </button>
          <button
            onClick={() => setMode("error-spike")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              mode === "error-spike"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            5xx Outage Burst
          </button>
          <button
            onClick={() => setMode("memory-limit")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              mode === "memory-limit"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Memory Pressure (80%)
          </button>
        </div>
      </div>

      {/* Simulator Visualization */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Step 1: Workloads & DaemonSet */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 text-primary" />
            <p className="label">1. Node DaemonSet</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <div className="rounded border border-border bg-card p-2 text-foreground">
              Microservices on EKS
              <span className="mt-1 block text-muted-foreground">OTLP / gRPC Egress</span>
            </div>
            <div className="rounded border border-border bg-card p-2 text-foreground">
              Node Metadata Enrichment
              <span className="mt-1 block text-muted-foreground">pod_name, namespace, host</span>
            </div>
          </div>
        </div>

        {/* Step 2: Gateway Tail-Sampling Engine */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            <p className="label">2. Collector Gateway</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <AnimatePresence mode="wait">
              {mode === "normal" && (
                <motion.div
                  key="normal"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded border border-border bg-card p-2 text-foreground"
                >
                  Tail Sampling: <span className="font-semibold text-primary">5% Uniform</span>
                  <span className="mt-1 block text-muted-foreground">
                    Shedding 95% of healthy 200 OK spans to reduce storage cost
                  </span>
                </motion.div>
              )}

              {mode === "error-spike" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded border border-primary/50 bg-primary/10 p-2 text-primary"
                >
                  Tail Sampling: <span className="font-semibold">100% Error Retention</span>
                  <span className="mt-1 block text-foreground">
                    Pattern match: <code className="font-mono">status_code == ERROR</code> captured
                  </span>
                </motion.div>
              )}

              {mode === "memory-limit" && (
                <motion.div
                  key="mem"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="rounded border border-border bg-card p-2 text-foreground"
                >
                  <code className="font-mono text-primary">memory_limiter</code> Triggered
                  <span className="mt-1 block text-muted-foreground">
                    Hard cap at 80%: dropping unsampled debug batches to protect pod
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="rounded border border-border bg-card p-2 text-foreground">
              Batching & Retries
              <span className="mt-1 block text-muted-foreground">5s / 1024 spans queue buffer</span>
            </div>
          </div>
        </div>

        {/* Step 3: LGTM Unified Storage */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <p className="label">3. LGTM Destination</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <div className="flex items-center justify-between rounded border border-border bg-card p-2">
              <span>Prometheus</span>
              <span className="label text-primary">Metrics</span>
            </div>
            <div className="flex items-center justify-between rounded border border-border bg-card p-2">
              <span>Loki</span>
              <span className="label text-primary">Logs</span>
            </div>
            <div className="flex items-center justify-between rounded border border-border bg-card p-2">
              <span>Tempo</span>
              <span className="label text-primary">
                {mode === "error-spike" ? "100% Captured" : "Traces (5%)"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 2. IDP & GitOps Reference Architecture Scaffolding Simulator              */
/* -------------------------------------------------------------------------- */

type ServiceTemplate = "payments" | "analytics"

function GitOpsPlayground() {
  const [template, setTemplate] = useState<ServiceTemplate>("payments")

  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="label text-primary">Interactive Scaffolding & GitOps Flow</p>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Zero-Touch Service Provisioning
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setTemplate("payments")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              template === "payments"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Payments Service (Go + Postgres)
          </button>
          <button
            onClick={() => setTemplate("analytics")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              template === "analytics"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Analytics Engine (Python + Kafka)
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        {/* Step 1: Catalog Contract */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <FileCode className="h-4 w-4 text-primary" />
            <p className="label">1. Catalog Contract</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <div className="rounded border border-border bg-card p-2 text-foreground">
              {template === "payments" ? "golden-path: go-grpc-api" : "golden-path: python-worker"}
              <span className="mt-1 block text-muted-foreground">
                {template === "payments" ? "infra: postgres@v1.4.2" : "infra: kafka-topic@v2.1.0"}
              </span>
            </div>
            <div className="rounded border border-border bg-card p-2 text-foreground">
              Output Schema
              <span className="mt-1 block text-muted-foreground">destinations mapping table</span>
            </div>
          </div>
        </div>

        {/* Step 2: Scaffolder Engine */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <p className="label">2. Scaffolder CLI</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <div className="rounded border border-border bg-card p-2 text-foreground">
              Dual Engine (Go & Python)
              <span className="mt-1 block text-primary">Byte-for-byte CI diff verified</span>
            </div>
            <div className="rounded border border-border bg-card p-2 text-foreground">
              Tenant Directory Tree
              <span className="mt-1 block text-muted-foreground">apps/, infra/, gitops/</span>
            </div>
          </div>
        </div>

        {/* Step 3: ArgoCD Discovery */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4 text-primary" />
            <p className="label">3. Argo CD Delivery</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <div className="rounded border border-border bg-card p-2 text-foreground">
              ApplicationSet Directory
              <span className="mt-1 block text-primary">Auto-discovers tenant repo</span>
            </div>
            <div className="rounded border border-border bg-card p-2 text-foreground">
              Zero-Touch Sync
              <span className="mt-1 block text-muted-foreground">No platform team ticket</span>
            </div>
          </div>
        </div>

        {/* Step 4: Admission Guardrail */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <p className="label">4. Kyverno Guardrail</p>
          </div>
          <div className="mt-3 space-y-2 font-mono text-micro">
            <div className="flex items-center gap-1.5 rounded border border-border bg-card p-2 text-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>Non-Root SecurityContext</span>
            </div>
            <div className="flex items-center gap-1.5 rounded border border-border bg-card p-2 text-foreground">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              <span>Required Limits & Probes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 3. Enterprise AWS Infrastructure Parallel Governance Pipeline Simulator    */
/* -------------------------------------------------------------------------- */

function TerragruntPlayground() {
  const [pipelineMode, setPipelineMode] = useState<"parallel" | "sequential">("parallel")

  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="label text-primary">Interactive CI/CD Pipeline Simulator</p>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Governance Gate Fan-Out & Policy Engine
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPipelineMode("parallel")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              pipelineMode === "parallel"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Parallel Fan-Out (Modern)
          </button>
          <button
            onClick={() => setPipelineMode("sequential")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              pipelineMode === "sequential"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Sequential Chain (Legacy)
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Pipeline Execution Flow */}
        <div className="rounded-lg border border-border bg-muted/40 p-4 font-mono text-micro">
          <p className="label mb-3">CI Job Execution Topology</p>
          {pipelineMode === "parallel" ? (
            <div className="space-y-2">
              <div className="rounded border border-border bg-card p-2 text-foreground">
                PR Trigger → Terraform Plan Generated (60s)
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded border border-primary/40 bg-primary/10 p-2 text-center text-primary">
                  TFLint<span className="block text-foreground">Static Syntax</span>
                </div>
                <div className="rounded border border-primary/40 bg-primary/10 p-2 text-center text-primary">
                  Diff Check<span className="block text-foreground">Plan Analysis</span>
                </div>
                <div className="rounded border border-primary/40 bg-primary/10 p-2 text-center text-primary">
                  OPA / Conftest<span className="block text-foreground">Security Policy</span>
                </div>
                <div className="rounded border border-primary/40 bg-primary/10 p-2 text-center text-primary">
                  Infracost<span className="block text-foreground">Cost Delta</span>
                </div>
              </div>
              <div className="rounded border border-border bg-card p-2 text-center text-primary">
                ✓ All 4 gates fan in simultaneously → Ready to Merge
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="rounded border border-border bg-card p-2 text-foreground">
                1. TFLint (30s) → <span className="text-muted-foreground">Passes</span>
              </div>
              <div className="rounded border border-border bg-card p-2 text-foreground">
                2. Plan (60s) → <span className="text-muted-foreground">Passes</span>
              </div>
              <div className="rounded border border-border bg-card p-2 text-foreground">
                3. OPA Security (15s) → <span className="text-muted-foreground">Blocks</span>
              </div>
              <div className="rounded border border-border bg-card p-2 text-muted-foreground">
                4. Infracost (20s) → <span className="italic">Never ran (hidden behind OPA failure)</span>
              </div>
            </div>
          )}
        </div>

        {/* Feedback Velocity & Metric Summary */}
        <div className="rounded-lg border border-border bg-muted/40 p-4 font-mono text-micro">
          <p className="label mb-3">Review Loop Impact</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">PR Feedback Velocity:</span>
              <span className="font-bold text-primary">
                {pipelineMode === "parallel" ? "1m 15s (1 Round Trip)" : "3m 45s (3 Round Trips)"}
              </span>
            </div>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Cost Gate Timing:</span>
              <span className="font-bold text-foreground">
                {pipelineMode === "parallel"
                  ? "At PR time (revertable)"
                  : "Monthly review (after invoice)"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Policy Target:</span>
              <span className="font-bold text-foreground">
                Evaluated against compiled Plan, not source HCL
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 4. AI Infrastructure on Amazon EKS GPU Allocator Simulator                 */
/* -------------------------------------------------------------------------- */

function GpuPlayground() {
  const [sharingMode, setSharingMode] = useState<"time-slice" | "dedicated">("time-slice")

  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="label text-primary">Interactive Hardware Simulator</p>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            GPU Allocation & VRAM Sharing
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSharingMode("time-slice")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              sharingMode === "time-slice"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Time Slicing (1 GPU : 4 Pods)
          </button>
          <button
            onClick={() => setSharingMode("dedicated")}
            className={`rounded-md px-3 py-1.5 font-mono text-micro transition-colors ${
              sharingMode === "dedicated"
                ? "bg-primary font-semibold text-primary-foreground"
                : "border border-border bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Dedicated (1 GPU : 1 Pod)
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {/* Physical GPU Card */}
        <div className="rounded-lg border border-border bg-muted/40 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              <span className="font-display text-body font-semibold text-foreground">
                NVIDIA T4 (g4dn.xlarge Spot)
              </span>
            </div>
            <span className="font-mono text-micro text-primary">16 GB VRAM</span>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {sharingMode === "time-slice" ? (
              <>
                <div className="rounded border border-primary/40 bg-primary/10 p-3 text-center font-mono text-micro text-primary">
                  Slice 1<span className="mt-1 block text-foreground">PyTorch Pod A</span>
                </div>
                <div className="rounded border border-primary/40 bg-primary/10 p-3 text-center font-mono text-micro text-primary">
                  Slice 2<span className="mt-1 block text-foreground">Inference Pod B</span>
                </div>
                <div className="rounded border border-primary/40 bg-primary/10 p-3 text-center font-mono text-micro text-primary">
                  Slice 3<span className="mt-1 block text-foreground">Jupyter Pod C</span>
                </div>
                <div className="rounded border border-primary/40 bg-primary/10 p-3 text-center font-mono text-micro text-primary">
                  Slice 4<span className="mt-1 block text-foreground">Worker Pod D</span>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-4 rounded border border-border bg-card p-4 text-center font-mono text-micro text-foreground">
                  Dedicated Pod: Holds entire physical card (15 GB unused if workload idles)
                </div>
              </>
            )}
          </div>
        </div>

        {/* Metrics & Trade-off Box */}
        <div className="rounded-lg border border-border bg-muted/40 p-5 font-mono text-micro">
          <p className="label mb-2">Telemetry & Isolation Profile</p>
          <div className="space-y-2.5 text-muted-foreground">
            <div className="flex justify-between border-b border-border pb-1.5">
              <span>Advertised Slices:</span>
              <span className="font-bold text-foreground">
                {sharingMode === "time-slice" ? "4 x nvidia.com/gpu" : "1 x nvidia.com/gpu"}
              </span>
            </div>
            <div className="flex justify-between border-b border-border pb-1.5">
              <span>Hourly Cost (Spot):</span>
              <span className="font-bold text-primary">
                {sharingMode === "time-slice"
                  ? "~$0.22 / hr (for 4 pods)"
                  : "~$0.88 / hr (for 4 pods)"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Telemetry Scrape:</span>
              <span className="text-foreground">DCGM Exporter on port 9400</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* 5. FinOps Kubernetes Operator Schedule Simulator                          */
/* -------------------------------------------------------------------------- */

function FinopsPlayground() {
  const [timeHour, setTimeHour] = useState(21) // 21:00 (Sleep window)

  const isSleep = timeHour >= 19 || timeHour < 8 // 19:00 to 08:00 window

  return (
    <div className="glass rounded-xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <p className="label text-primary">Interactive Operator Simulator</p>
          <h3 className="font-display text-h3 font-semibold text-foreground">
            Reconciliation & Schedule State
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-small font-semibold tabular text-foreground">
            {String(timeHour).padStart(2, "0")}:00 UTC
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 font-mono text-micro font-medium ${
              isSleep
                ? "border border-primary/40 bg-primary/10 text-primary"
                : "border border-border bg-muted text-muted-foreground"
            }`}
          >
            {isSleep ? "Sleep Window (19:00 - 08:00)" : "Active Window (08:00 - 19:00)"}
          </span>
        </div>
      </div>

      {/* Time Slider */}
      <div className="mt-5">
        <label htmlFor="time-slider" className="label mb-2 block">
          Simulate Cluster Wall-Clock Time (UTC):
        </label>
        <input
          id="time-slider"
          type="range"
          min="0"
          max="23"
          value={timeHour}
          onChange={(e) => setTimeHour(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
        />
        <div className="mt-1 flex justify-between font-mono text-micro text-muted-foreground">
          <span>00:00</span>
          <span>08:00 (Wake)</span>
          <span>12:00</span>
          <span>19:00 (Sleep)</span>
          <span>23:00</span>
        </div>
      </div>

      {/* Workload Reconciliation Results */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Workload 1: web-frontend */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="font-mono text-small font-semibold text-foreground">web-frontend</p>
          <p className="mt-1 font-mono text-micro text-muted-foreground">Namespace: qa-env</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="label">Replicas</span>
            <span
              className={`font-mono text-small font-bold tabular ${
                isSleep ? "text-muted-foreground" : "text-primary"
              }`}
            >
              {isSleep ? "0 (Scaled down)" : "3 (Running)"}
            </span>
          </div>
        </div>

        {/* Workload 2: cart-api */}
        <div className="rounded-lg border border-border bg-muted/40 p-4">
          <p className="font-mono text-small font-semibold text-foreground">cart-api</p>
          <p className="mt-1 font-mono text-micro text-muted-foreground">Namespace: qa-env</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="label">Replicas</span>
            <span
              className={`font-mono text-small font-bold tabular ${
                isSleep ? "text-muted-foreground" : "text-primary"
              }`}
            >
              {isSleep ? "0 (Scaled down)" : "2 (Running)"}
            </span>
          </div>
        </div>

        {/* Workload 3: critical-queue-worker (EXCLUDED) */}
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-small font-semibold text-foreground">critical-worker</p>
            <span className="font-mono text-micro text-primary">exclude: true</span>
          </div>
          <p className="mt-1 font-mono text-micro text-muted-foreground">Annotation Bypass</p>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="label">Replicas</span>
            <span className="font-mono text-small font-bold tabular text-primary">
              1 (Protected)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
