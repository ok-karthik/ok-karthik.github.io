"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

const certifications = [
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
]

function AWSArchitecture() {
  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        A production-grade, multi-environment AWS infrastructure platform demonstrating the Hierarchical Blueprint Pattern with Terragrunt.
      </p>

      <div className="p-6 rounded-xl border border-border bg-secondary/30 backdrop-blur-md space-y-6 font-mono text-xs text-center">
        {/* CI/CD Parallel Governance Gates */}
        <div className="border border-primary/30 rounded-lg p-4 relative bg-background/50">
          <div className="absolute -top-2.5 left-4 px-2 bg-background text-primary font-bold">Parallel CI/CD Governance Gates</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            <div className="bg-primary/10 text-primary p-2 rounded border border-primary/20 flex flex-col justify-center items-center">
              <span className="font-bold">TFLint</span>
              <span className="text-[9px] opacity-70">Static Analysis</span>
            </div>
            <div className="bg-primary/10 text-primary p-2 rounded border border-primary/20 flex flex-col justify-center items-center">
              <span className="font-bold">Plan</span>
              <span className="text-[9px] opacity-70">Diff Check</span>
            </div>
            <div className="bg-amber-500/10 text-amber-500 dark:text-amber-400 p-2 rounded border border-amber-500/20 flex flex-col justify-center items-center">
              <span className="font-bold">OPA / Conftest</span>
              <span className="text-[9px] opacity-70">Security Policy</span>
            </div>
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-2 rounded border border-emerald-500/20 flex flex-col justify-center items-center">
              <span className="font-bold">Infracost</span>
              <span className="text-[9px] opacity-70">FinOps Checks</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center text-primary/50">↓ all gates pass ↓</div>

        {/* Live Environments */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="border border-blue-500/30 rounded-lg p-3 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">Dev Environment</div>
            <div className="space-y-2">
              <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-2 rounded border border-blue-500/20">eu-central-1 / vpc</div>
              <div className="bg-blue-500/10 text-blue-600 dark:text-blue-400 p-2 rounded border border-blue-500/20">eu-central-1 / eks</div>
            </div>
          </div>

          <div className="border border-purple-500/30 rounded-lg p-3 bg-purple-500/5 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <div className="text-purple-600 dark:text-purple-400 font-bold mb-2">Prod Environment 🔐</div>
            <div className="space-y-2">
              <div className="bg-purple-500/10 text-purple-600 dark:text-purple-400 p-2 rounded border border-purple-500/20">eu-central-1 / vpc</div>
              <div className="bg-purple-500/10 text-purple-600 dark:text-purple-400 p-2 rounded border border-purple-500/20">eu-central-1 / eks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GitOpsArchitecture() {
  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        The GitOps Reconciliation Loop: Abstracting infrastructure via a Control Plane for zero-touch provisioning.
      </p>

      <div className="p-4 sm:p-6 rounded-xl border border-border bg-secondary/30 backdrop-blur-md space-y-4 font-mono text-xs text-center flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Dev Exp */}
        <div className="flex-1 w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">Developer Experience</div>
          <div className="space-y-2">
            <div className="bg-background/50 p-2 rounded border border-blue-500/20">IDP Scaffolder CLI</div>
            <div className="bg-background/50 p-2 rounded border border-blue-500/20">Tenant Source Repo</div>
          </div>
        </div>

        <div className="text-primary/50 rotate-90 md:rotate-0 font-bold">→</div>

        {/* CI/CD Orchestration */}
        <div className="flex-1 w-full bg-primary/10 border border-primary/30 rounded-lg p-4">
          <div className="text-primary font-bold mb-2">CI/CD Orchestration</div>
          <div className="space-y-2">
            <div className="bg-background/50 p-2 rounded border border-primary/20">GitHub Actions</div>
            <div className="bg-background/50 p-2 rounded border border-primary/20">Tenant GitOps Repo</div>
          </div>
        </div>

        <div className="text-primary/50 rotate-90 md:rotate-0 font-bold">→</div>

        {/* Platform Control Plane */}
        <div className="flex-1 w-full bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative">
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">Platform Control Plane</div>
          <div className="space-y-2">
            <div className="bg-background/50 p-2 rounded border border-emerald-500/20">Argo CD AppSet</div>
            <div className="bg-background/50 p-2 rounded border border-emerald-500/20">Kyverno Engine</div>
          </div>
        </div>

      </div>
    </div>
  )
}

function FinOpsArchitecture() {
  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Operator internal scaling engine flow. Uses declarative schedules and granular exclusions to safely scale workloads to 0.
      </p>

      <div className="p-6 rounded-xl border border-border bg-secondary/30 backdrop-blur-md flex flex-col md:flex-row items-center gap-4 font-mono text-xs text-center">

        {/* Component 1 */}
        <div className="flex-1 w-full bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
          <div className="text-purple-600 dark:text-purple-400 font-bold mb-2">Kopf Timer</div>
          <div className="text-muted-foreground text-[10px] bg-background/50 p-2 rounded mt-2 border border-purple-500/20">Every 60 seconds</div>
        </div>

        <div className="text-primary/50 rotate-90 md:rotate-0 font-bold">→</div>

        {/* Component 2 */}
        <div className="flex-1 w-full bg-primary/10 border border-primary/30 rounded-lg p-4 shadow-[0_0_15px_rgba(34,211,238,0.15)] relative">
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <div className="text-primary font-bold mb-2">Scaling Engine</div>
          <div className="space-y-2 mt-2">
            <div className="bg-background/50 text-[10px] p-1.5 rounded border border-primary/20">Extract annotations</div>
            <div className="bg-background/50 text-[10px] p-1.5 rounded border border-primary/20">Calc Active Window</div>
          </div>
        </div>

        <div className="text-primary/50 rotate-90 md:rotate-0 font-bold">→</div>

        {/* Component 3 */}
        <div className="flex-1 w-full space-y-2">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
            <div className="text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">Time == Sleep</div>
            <div className="text-muted-foreground text-[10px]">Patch Replicas → 0</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
            <div className="text-amber-600 dark:text-amber-400 font-bold text-[10px]">Exclude: True</div>
            <div className="text-muted-foreground text-[10px]">Bypass Workload</div>
          </div>
        </div>

      </div>
    </div>
  )
}

function HelmLibraryArchitecture() {
  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        DRY patterns using Helm Named Templates, shared via an OCI registry to Caller Charts.
      </p>

      <div className="p-6 rounded-xl border border-border bg-secondary/30 backdrop-blur-md flex flex-col items-center gap-6 font-mono text-xs text-center">

        {/* Library Chart */}
        <div className="w-full max-w-sm bg-primary/10 border border-primary/30 rounded-lg p-4">
          <div className="text-primary font-bold mb-3">library-chart (OCI Registry)</div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-background/50 p-1.5 rounded border border-primary/20">_deployment.tpl</div>
            <div className="bg-background/50 p-1.5 rounded border border-primary/20">_configmap.tpl</div>
            <div className="bg-background/50 p-1.5 rounded border border-primary/20">_service.tpl</div>
            <div className="bg-background/50 p-1.5 rounded border border-primary/20">_secret.tpl</div>
          </div>
        </div>

        <div className="text-primary/50 font-bold">↓ Included as dependency ↓</div>

        {/* Caller Chart */}
        <div className="w-full max-w-sm bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <div className="text-emerald-600 dark:text-emerald-400 font-bold mb-2">caller-chart</div>
          <div className="text-left bg-background/50 p-3 rounded border border-emerald-500/20 text-[10px] overflow-hidden whitespace-pre">
            <span className="text-pink-500">{"{{- include \"library-chart.deployment.tpl\" . -}}"}</span><br />
            <span className="text-pink-500">{"{{- include \"library-chart.service.tpl\" . -}}"}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

function ObservabilityArchitecture() {
  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Unified observability platform on EKS. Application telemetry is ingested by OpenTelemetry Collector and routed to specialized backends for metrics, logs, and distributed tracing.
      </p>

      <div className="p-6 rounded-xl border border-border bg-secondary/30 backdrop-blur-md flex flex-col md:flex-row items-center gap-4 font-mono text-xs text-center">

        {/* Source */}
        <div className="flex-1 w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div className="text-blue-600 dark:text-blue-400 font-bold mb-2">EKS Workloads</div>
          <div className="space-y-2 text-[10px]">
            <div className="bg-background/50 p-1.5 rounded border border-blue-500/20">Microservices</div>
            <div className="bg-background/50 p-1.5 rounded border border-blue-500/20">Otel Instrumentation</div>
          </div>
        </div>

        <div className="text-primary/50 rotate-90 md:rotate-0 font-bold">→</div>

        {/* Collector */}
        <div className="flex-1 w-full bg-primary/10 border border-primary/30 rounded-lg p-4 shadow-[0_0_15px_rgba(34,211,238,0.15)] relative">
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </div>
          <div className="text-primary font-bold mb-2">OTel Collector</div>
          <div className="space-y-2 mt-2 text-[10px]">
            <div className="bg-background/50 p-1.5 rounded border border-primary/20">Receivers</div>
            <div className="bg-background/50 p-1.5 rounded border border-primary/20">Processors / Exporters</div>
          </div>
        </div>

        <div className="text-primary/50 rotate-90 md:rotate-0 font-bold">→</div>

        {/* Backends */}
        <div className="flex-1 w-full space-y-2">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-2">
            <div className="text-orange-600 dark:text-orange-400 font-bold text-[10px]">Prometheus</div>
            <div className="text-muted-foreground text-[9px]">Metrics</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2">
            <div className="text-red-600 dark:text-red-400 font-bold text-[10px]">Loki</div>
            <div className="text-muted-foreground text-[9px]">Logs</div>
          </div>
          <div className="bg-blue-400/10 border border-blue-400/30 rounded-lg p-2">
            <div className="text-blue-500 dark:text-blue-400 font-bold text-[10px]">Tempo</div>
            <div className="text-muted-foreground text-[9px]">Traces</div>
          </div>
        </div>
      </div>

      {/* Grafana */}
      <div className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center text-[10px]">
        <div className="text-emerald-600 dark:text-emerald-400 font-bold">Grafana Dashboards</div>
        <div className="text-muted-foreground mt-1">Unified Visualization & Alerting</div>
      </div>
    </div>
  )
}

function GPUPlatformArchitecture() {
  return (
    <div className="space-y-6 pt-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        Production-style GPU platform on Amazon EKS featuring dynamic provisioning, NVIDIA GPU Operator, and DCGM observability.
      </p>

      <div className="p-6 rounded-xl border border-border bg-secondary/30 backdrop-blur-md flex flex-col items-center font-mono text-xs text-center">

        {/* Observability Layer */}
        <div className="flex flex-col items-center w-full max-w-sm mb-4">
          <div className="w-full bg-orange-500/10 border border-orange-500/30 rounded-lg p-2.5 mb-2">
            <div className="text-orange-600 dark:text-orange-400 font-bold">Prometheus & Grafana</div>
          </div>
          <div className="text-orange-500/50">▲</div>
          <div className="text-orange-500/50">│</div>
          <div className="w-full bg-orange-500/5 border border-orange-500/20 rounded-lg p-2.5 mt-2">
            <div className="text-orange-600 dark:text-orange-400 font-bold">DCGM Exporter</div>
          </div>
        </div>

        <div className="text-primary/50">▲</div>
        <div className="text-primary/50">│</div>

        {/* Operator Layer */}
        <div className="w-full max-w-md bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 shadow-[0_0_15px_rgba(16,185,129,0.15)] my-2 relative">
          <div className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mb-3">NVIDIA GPU Operator</div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="bg-background/50 p-2 rounded border border-emerald-500/20">Device Plugin</div>
            <div className="bg-background/50 p-2 rounded border border-emerald-500/20">Node Feature Discovery</div>
            <div className="bg-background/50 p-2 rounded border border-emerald-500/20">Container Toolkit</div>
            <div className="bg-background/50 p-2 rounded border border-emerald-500/20">Time Slicing</div>
          </div>
        </div>

        <div className="text-primary/50">▲</div>
        <div className="text-primary/50">│</div>

        {/* Infrastructure Layer */}
        <div className="flex flex-col items-center w-full max-w-sm mt-2">
          <div className="w-full bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
            <div className="text-blue-600 dark:text-blue-400 font-bold">GPU Node (Karpenter)</div>
          </div>
          <div className="text-blue-500/50 mt-2">▲</div>
          <div className="text-blue-500/50">│</div>
          <div className="w-full bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mt-2">
            <div className="text-purple-600 dark:text-purple-400 font-bold">GPU Workloads (CUDA)</div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Section */}
      <div className="mt-6 border border-border rounded-lg bg-card overflow-hidden text-left">
        <div className="bg-secondary/50 p-3 border-b border-border">
          <h4 className="font-mono text-sm font-bold text-foreground">Production Scenarios Explored (Troubleshooting)</h4>
        </div>
        <div className="p-4 grid sm:grid-cols-2 gap-2 text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2"><span className="text-red-400 font-bold">✗</span> Device Plugin CrashLoopBackOff</div>
          <div className="flex items-center gap-2"><span className="text-red-400 font-bold">✗</span> Broken Time Slicing ConfigMap</div>
          <div className="flex items-center gap-2"><span className="text-red-400 font-bold">✗</span> Node Feature Discovery failures</div>
          <div className="flex items-center gap-2"><span className="text-amber-400 font-bold">⚠</span> GPU Operator reconciliation</div>
          <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Karpenter GPU provisioning</div>
          <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> GPU node scale-down</div>
          <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> DCGM metrics validation</div>
          <div className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> CUDA workload debugging</div>
        </div>
      </div>
    </div>
  )
}

const projects = [
  {
    title: "GPU Platform on Amazon EKS",
    description: "Built a production-style GPU platform on Amazon EKS. Features dynamic provisioning using Karpenter, NVIDIA GPU Operator via Helm, GPU Time Slicing, and DCGM metrics visualization.",
    tags: ["NVIDIA GPU Operator", "Karpenter", "EKS", "CUDA", "DCGM"],
    githubUrl: "https://github.com/ok-karthik/ai-infrastructure-on-eks",
    architecture: <GPUPlatformArchitecture />
  },
  {
    title: "Enterprise AWS Infrastructure",
    description: "Production-grade, multi-environment AWS infrastructure platform built with Terragrunt and Terraform. Fully DRY, secure, observable, and automated.",
    tags: ["Terragrunt", "Terraform", "AWS", "OPA/Conftest", "GitHub Actions"],
    githubUrl: "https://github.com/ok-karthik/enterprise-aws-infrastructure-terragrunt",
    architecture: <AWSArchitecture />
  },
  {
    title: "IDP & GitOps Architecture",
    description: "Enterprise-grade Internal Developer Platform (IDP) blueprint for zero-touch onboarding and multi-tenant continuous delivery via GitOps.",
    tags: ["IDP", "GitOps", "Argo CD", "Kubernetes", "Python"],
    githubUrl: "https://github.com/ok-karthik/platform-engineering-idp-gitops-reference-architecture",
    architecture: <GitOpsArchitecture />
  },
  {
    title: "FinOps Kubernetes Operator",
    description: "High-performance Kubernetes operator designed to radically reduce cloud costs by intelligently scaling down non-production workloads during sleep windows.",
    tags: ["Kubernetes Operator", "Python", "Kopf", "FinOps"],
    githubUrl: "https://github.com/ok-karthik/finops-k8s-operator",
    architecture: <FinOpsArchitecture />
  },
  {
    title: "App Library Helm Chart",
    description: "Library Helm chart sharing standardized named templates for DRY generation of environment-specific ConfigMaps, Secrets, and Deployments.",
    tags: ["Helm", "Kubernetes", "OCI Registry", "Library Chart"],
    githubUrl: "https://github.com/ok-karthik/app-library-helm-chart",
    architecture: <HelmLibraryArchitecture />
  },
  {
    title: "OpenTelemetry & LGTM Platform",
    description: "Cloud-native observability stack using OpenTelemetry Collectors (Agent & Gateway patterns) and the LGTM stack for unified metrics, logs, and distributed tracing.",
    tags: ["OpenTelemetry", "LGTM Stack", "Prometheus", "Grafana", "Loki", "Tempo"],
    githubUrl: "https://github.com/ok-karthik/otel-observability-platform-on-eks",
    architecture: <ObservabilityArchitecture />
  },
]

export function ProjectsCertifications() {
  return (
    <section id="projects" className="py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-display font-bold text-center mb-4 text-foreground"
        >
          Projects & Certifications
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Highlighted work and industry-recognized credentials
        </motion.p>

        {/* Projects Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-bold text-foreground mb-8 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
            Featured Projects
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="bg-card backdrop-blur-sm border border-border rounded-lg p-5 
                           [transition-property:color,background-color,border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] flex flex-col h-full group"
              >
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h4>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{project.description}</p>
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

                <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xs font-mono font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-md border border-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-6-6H4a2 2 0 0 0-2 2v16z" /><path d="M14 2v6h6" /><path d="M10 12h4" /><path d="M10 16h4" /><path d="M8 12h.01" /><path d="M8 16h.01" /></svg>
                        View Architecture
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px] border-primary/20 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-foreground font-mono flex items-center gap-3">
                          {project.title}
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                          </a>
                        </DialogTitle>
                      </DialogHeader>
                      {project.architecture}
                    </DialogContent>
                  </Dialog>

                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    Source Code
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Credentials & Background */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Certifications */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
              Certifications
            </motion.h3>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="bg-card backdrop-blur-sm border border-border rounded-lg p-4 
                             [transition-property:color,background-color,border-color,box-shadow] duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center gap-5"
                >
                  <img
                    src={cert.badge}
                    alt={`${cert.name} Badge`}
                    className="h-16 w-auto shrink-0 object-contain drop-shadow-md"
                  />
                  <div>
                    <span className="font-mono text-xl font-bold text-primary">{cert.name}</span>
                    <p className="text-muted-foreground text-sm font-medium mt-1">{cert.fullName}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Languages */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M2 12h2" /></svg>
              Education & Languages
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Education */}
              <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-5">
                <h4 className="font-mono text-lg font-bold text-primary mb-2">Bachelor of Engineering in Information Technology</h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                  <span className="text-foreground font-medium">SVEC, affiliated to JNT University, India</span>
                  <span className="text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded text-xs font-mono">Graduated: 2010</span>
                </div>
                <p className="text-muted-foreground text-sm mt-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4" /><path d="M3.34 19a10 10 0 1 1 17.32 0" /></svg>
                  CGPA: <span className="font-mono font-bold text-foreground">7.2 / 10</span>
                </p>
              </div>

              {/* Languages */}
              <div className="bg-card backdrop-blur-sm border border-border rounded-lg p-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <div className="font-mono text-base font-bold text-foreground mb-1">English</div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                      <span className="text-sm text-primary font-medium">Fluent (C2)</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-base font-bold text-foreground mb-1">German</div>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-8 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-amber-500 font-medium">Beginner (A1)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
