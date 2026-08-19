"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, X, ShieldAlert, FileText, Layers, ExternalLink } from "lucide-react"
import { projects as allProjects } from "@/content/projects"

function OTelArchitecture() {
  return (
    <div className="space-y-6 pt-2 font-mono text-xs">
      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        High-throughput OpenTelemetry collector gateway on EKS with tail sampling, load-balancing exporters, and Grafana LGTM backend integration.
      </p>
      
      <div className="p-5 rounded-xl border border-border bg-secondary/30 backdrop-blur-md space-y-4 text-center">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
            <div className="text-blue-400 font-bold mb-2">1. Workload Pods</div>
            <div className="text-[11px] text-muted-foreground bg-background/60 p-2 rounded border border-blue-500/20">
              OTel Auto-Instrumentation (gRPC / OTLP)
            </div>
          </div>
          <div className="border border-primary/30 rounded-lg p-3 bg-primary/5 shadow-[0_0_15px_rgba(0,255,231,0.15)] relative">
            <div className="text-primary font-bold mb-2">2. Tail-Sampling Gateway</div>
            <div className="space-y-1 text-[11px] bg-background/60 p-2 rounded border border-primary/20">
              <div className="text-foreground">100% 5xx &amp; Error retention</div>
              <div className="text-muted-foreground">1% Healthy Trace Sampling</div>
            </div>
          </div>
          <div className="border border-emerald-500/30 rounded-lg p-3 bg-emerald-500/5">
            <div className="text-emerald-400 font-bold mb-2">3. Storage Backends</div>
            <div className="space-y-1 text-[11px] bg-background/60 p-2 rounded border border-emerald-500/20">
              <div>Tempo (Traces) · Loki (Logs)</div>
              <div>Prometheus (Metrics)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AIInfraArchitecture() {
  return (
    <div className="space-y-6 pt-2 font-mono text-xs">
      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        NVIDIA GPU Operator on Amazon EKS configured with 4-way time-slicing and Karpenter spot consolidation for cost-effective LLM inference.
      </p>
      
      <div className="p-5 rounded-xl border border-border bg-secondary/30 backdrop-blur-md space-y-4 text-center">
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="border border-purple-500/30 rounded-lg p-3 bg-purple-500/5">
            <div className="text-purple-400 font-bold mb-2">Physical Hardware</div>
            <div className="text-[11px] text-muted-foreground bg-background/60 p-2 rounded border border-purple-500/20">
              AWS EC2 g4dn / g5 Spot Instances
            </div>
          </div>
          <div className="border border-primary/30 rounded-lg p-3 bg-primary/5 shadow-[0_0_15px_rgba(0,255,231,0.15)]">
            <div className="text-primary font-bold mb-2">NVIDIA GPU Operator</div>
            <div className="space-y-1 text-[11px] bg-background/60 p-2 rounded border border-primary/20">
              <div className="text-foreground">4-Way GPU Time-Slicing</div>
              <div className="text-muted-foreground">Sub-minute cold starts</div>
            </div>
          </div>
          <div className="border border-emerald-500/30 rounded-lg p-3 bg-emerald-500/5">
            <div className="text-emerald-400 font-bold mb-2">Inference Workloads</div>
            <div className="space-y-1 text-[11px] bg-background/60 p-2 rounded border border-emerald-500/20">
              <div>FastAPI Gateway · Ollama</div>
              <div className="text-emerald-300 font-semibold">75% GPU cost reduction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AWSArchitecture() {
  return (
    <div className="space-y-6 pt-2 font-mono text-xs">
      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        A production-grade, multi-environment AWS infrastructure platform demonstrating the Hierarchical Blueprint Pattern with Terragrunt.
      </p>
      
      <div className="p-5 rounded-xl border border-border bg-secondary/30 backdrop-blur-md space-y-4 text-center">
        <div className="border border-primary/30 rounded-lg p-3 relative bg-background/60">
          <div className="text-primary font-bold mb-2">Parallel CI/CD Governance Gates</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            <div className="bg-primary/10 text-primary p-2 rounded border border-primary/20">
              <div className="font-bold">TFLint</div>
              <div className="text-[10px] opacity-70">Static Analysis</div>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded border border-primary/20">
              <div className="font-bold">Plan</div>
              <div className="text-[10px] opacity-70">Diff Check</div>
            </div>
            <div className="bg-amber-500/10 text-amber-400 p-2 rounded border border-amber-500/20">
              <div className="font-bold">OPA / Conftest</div>
              <div className="text-[10px] opacity-70">Security Policy</div>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-2 rounded border border-emerald-500/20">
              <div className="font-bold">Infracost</div>
              <div className="text-[10px] opacity-70">FinOps Checks</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-primary/60 font-bold">↓ all gates pass ↓</div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5">
            <div className="text-blue-400 font-bold mb-2">Dev Environment</div>
            <div className="space-y-1.5 text-[10px]">
              <div className="bg-blue-500/10 text-blue-300 p-1.5 rounded border border-blue-500/20">eu-central-1 / vpc</div>
              <div className="bg-blue-500/10 text-blue-300 p-1.5 rounded border border-blue-500/20">eu-central-1 / eks</div>
            </div>
          </div>
          
          <div className="border border-purple-500/30 rounded-lg p-3 bg-purple-500/5">
            <div className="text-purple-400 font-bold mb-2">Prod Environment 🔐</div>
            <div className="space-y-1.5 text-[10px]">
              <div className="bg-purple-500/10 text-purple-300 p-1.5 rounded border border-purple-500/20">eu-central-1 / vpc</div>
              <div className="bg-purple-500/10 text-purple-300 p-1.5 rounded border border-purple-500/20">eu-central-1 / eks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GitOpsArchitecture() {
  return (
    <div className="space-y-6 pt-2 font-mono text-xs">
      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        The GitOps Reconciliation Loop: Abstracting infrastructure via a Control Plane for zero-touch provisioning.
      </p>

      <div className="p-5 rounded-xl border border-border bg-secondary/30 backdrop-blur-md space-y-3 text-center flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex-1 w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <div className="text-blue-400 font-bold mb-2">Developer Experience</div>
          <div className="space-y-1.5 text-[10px]">
            <div className="bg-background/60 p-1.5 rounded border border-blue-500/20">IDP Scaffolder CLI</div>
            <div className="bg-background/60 p-1.5 rounded border border-blue-500/20">Tenant Source Repo</div>
          </div>
        </div>

        <div className="text-primary font-bold rotate-90 md:rotate-0">→</div>

        <div className="flex-1 w-full bg-primary/10 border border-primary/30 rounded-lg p-3">
          <div className="text-primary font-bold mb-2">CI/CD Orchestration</div>
          <div className="space-y-1.5 text-[10px]">
            <div className="bg-background/60 p-1.5 rounded border border-primary/20">GitHub Actions</div>
            <div className="bg-background/60 p-1.5 rounded border border-primary/20">Tenant GitOps Repo</div>
          </div>
        </div>

        <div className="text-primary font-bold rotate-90 md:rotate-0">→</div>

        <div className="flex-1 w-full bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
          <div className="text-emerald-400 font-bold mb-2">Platform Control Plane</div>
          <div className="space-y-1.5 text-[10px]">
            <div className="bg-background/60 p-1.5 rounded border border-emerald-500/20">Argo CD AppSet</div>
            <div className="bg-background/60 p-1.5 rounded border border-emerald-500/20">Kyverno Engine</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FinOpsArchitecture() {
  return (
    <div className="space-y-6 pt-2 font-mono text-xs">
      <p className="text-sm text-muted-foreground leading-relaxed font-sans">
        Operator internal scaling engine flow: declarative schedules and granular exclusions to safely scale workloads to 0.
      </p>

      <div className="p-5 rounded-xl border border-border bg-secondary/30 backdrop-blur-md flex flex-col md:flex-row items-center gap-3 text-center">
        <div className="flex-1 w-full bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
          <div className="text-purple-400 font-bold mb-1">Kopf Timer</div>
          <div className="text-muted-foreground text-[10px] bg-background/60 p-1.5 rounded mt-2 border border-purple-500/20">Every 60s loop</div>
        </div>

        <div className="text-primary font-bold rotate-90 md:rotate-0">→</div>

        <div className="flex-1 w-full bg-primary/10 border border-primary/30 rounded-lg p-3 shadow-[0_0_15px_rgba(0,255,231,0.15)]">
          <div className="text-primary font-bold mb-1">Scaling Engine</div>
          <div className="space-y-1 mt-2 text-[10px]">
            <div className="bg-background/60 p-1 rounded border border-primary/20">Parse annotations</div>
            <div className="bg-background/60 p-1 rounded border border-primary/20">Check Active Window</div>
          </div>
        </div>

        <div className="text-primary font-bold rotate-90 md:rotate-0">→</div>

        <div className="flex-1 w-full space-y-2 text-[10px]">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2">
            <div className="text-emerald-400 font-bold">Time == Sleep</div>
            <div className="text-muted-foreground">Replicas → 0</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-2">
            <div className="text-amber-400 font-bold">Exclude: True</div>
            <div className="text-muted-foreground">Bypass Workload</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const customArchitectures: Record<string, React.ReactNode> = {
  "opentelemetry-platform-on-eks": <OTelArchitecture />,
  "internal-developer-platform": <GitOpsArchitecture />,
  "enterprise-aws-infrastructure-terragrunt": <AWSArchitecture />,
  "ai-infrastructure-on-eks": <AIInfraArchitecture />,
  "finops-k8s-operator": <FinOpsArchitecture />,
}

function ProjectDetailDialog({ project }: { project: typeof allProjects[0] }) {
  const [activeTab, setActiveTab] = useState<"decisions" | "architecture" | "failure">("decisions")
  const architecture = customArchitectures[project.slug]

  return (
    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto bg-[#0f0a24]/95 border-border/80 backdrop-blur-2xl text-foreground">
      <DialogHeader>
        <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
          <DialogTitle className="text-xl font-bold font-display text-foreground">
            {project.title}
          </DialogTitle>
          <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {project.decisions.length} Documented Decisions
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed text-left">
          {project.summary}
        </p>
      </DialogHeader>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-2 mt-4 font-mono text-xs">
        <button
          onClick={() => setActiveTab("decisions")}
          className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === "decisions"
              ? "bg-primary text-primary-foreground font-semibold"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Decisions ({project.decisions.length})
        </button>
        {architecture && (
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "architecture"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Architecture
          </button>
        )}
        {project.failureMode && (
          <button
            onClick={() => setActiveTab("failure")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "failure"
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Failure Mode
          </button>
        )}
      </div>

      {/* Tab Contents */}
      <div className="mt-4 space-y-4">
        {activeTab === "decisions" && (
          <div className="space-y-4">
            {project.decisions.map((d, i) => (
              <div key={i} className="p-4 rounded-xl bg-card/40 border border-border/50 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider mb-1">Chose</p>
                      <p className="text-sm font-semibold text-foreground">{d.decision}</p>
                    </div>
                  </div>
                  {d.insteadOf && (
                    <div className="flex gap-2.5 sm:border-l sm:border-border/50 sm:pl-4">
                      <X className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-mono uppercase text-muted-foreground font-bold tracking-wider mb-1">Instead of</p>
                        <p className="text-sm text-muted-foreground">{d.insteadOf}</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground border-t border-border/40 pt-3 leading-relaxed">
                  {d.rationale}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "architecture" && architecture && (
          <div className="p-2">
            {architecture}
          </div>
        )}

        {activeTab === "failure" && project.failureMode && (
          <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20 space-y-4">
            <div>
              <p className="text-xs font-mono uppercase text-amber-400 font-bold mb-1.5 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                Failure Scenario
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {project.failureMode.scenario}
              </p>
            </div>
            <div className="border-t border-amber-500/20 pt-4">
              <p className="text-xs font-mono uppercase text-emerald-400 font-bold mb-1.5 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Resolution &amp; Defense
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {project.failureMode.resolution}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-4 border-t border-border/60">
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
        >
          View Full Case Study
          <ArrowUpRight className="w-4 h-4" />
        </Link>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-medium rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border/60 transition-all"
        >
          GitHub Repository
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </DialogContent>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground font-display"
        >
          Projects
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto font-sans"
        >
          What I built, the architecture proofs, and documented engineering decisions
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.08) }}
              className="bg-card/40 backdrop-blur-md border border-border/60 rounded-2xl p-6 
                         transition-all duration-300 hover:border-primary hover:shadow-[0_0_25px_rgba(0,255,231,0.2)] flex flex-col h-full group"
            >
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] text-primary font-semibold">
                    Project {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {project.decisions.length} decisions
                  </span>
                </div>

                <Link href={`/work/${project.slug}`} className="group/title">
                  <h4 className="text-xl font-bold font-display text-foreground group-hover/title:text-primary transition-colors flex items-center gap-1.5">
                    {project.title}
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover/title:text-primary group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 transition-all" />
                  </h4>
                </Link>

                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-4 border-t border-border/50">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium rounded-lg 
                                 bg-primary/15 hover:bg-primary/25 text-primary 
                                 border border-primary/30 hover:border-primary/50 transition-all cursor-pointer shadow-sm"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Decisions &amp; Architecture
                    </button>
                  </DialogTrigger>
                  <ProjectDetailDialog project={project} />
                </Dialog>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3.5 py-2 text-xs font-mono font-medium rounded-lg 
                             bg-secondary/60 hover:bg-secondary text-foreground 
                             border border-border/60 hover:border-primary/40 transition-all"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
