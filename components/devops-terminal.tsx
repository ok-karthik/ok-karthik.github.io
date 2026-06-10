"use client"

import { useEffect, useState, useRef, KeyboardEvent } from "react"

type OutputLine = {
  id: string
  text: string
  isCommand?: boolean
  isSuccess?: boolean
  isSystem?: boolean
}

const bootSequence = [
  { text: "$ platform-cli provision --env=production", isCommand: true, delay: 500 },
  { text: "Authenticating via Microsoft Entra ID...", delay: 300 },
  { text: "✓ Authentication successful. Context: Platform Engineer", isSuccess: true, delay: 200 },
  { text: "Initializing Internal Developer Platform (IDP)...", delay: 300 },
  { text: "  [+] Terraform state lock acquired ......... SUCCESS", isSystem: true, delay: 200 },
  { text: "  [+] Core Infrastructure (AWS/Azure) ....... DRIFT-FREE", isSystem: true, delay: 200 },
  { text: "  [+] Kubernetes Fleet (EKS/AKS) ............ ONLINE", isSystem: true, delay: 200 },
  { text: "  [+] GitOps Reconciliation (ArgoCD) ........ SYNCED", isSystem: true, delay: 200 },
  { text: "  [+] Developer Golden Paths ................ READY", isSystem: true, delay: 200 },
  { text: "Platform provisioning complete. Scale is infinite. 🚀", isSuccess: true, delay: 400 },
  { text: "Type 'help' for available commands.", isSystem: true, delay: 300 },
]

export function DevOpsTerminal() {
  const [history, setHistory] = useState<OutputLine[]>([])
  const [input, setInput] = useState("")
  const [isBooting, setIsBooting] = useState(true)
  const [bootIndex, setBootIndex] = useState(0)
  const [typedBootCmd, setTypedBootCmd] = useState("")
  
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle auto-scrolling
  useEffect(() => {
    const container = bottomRef.current?.closest('.overflow-y-auto')
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth"
      })
    }
  }, [history, input, typedBootCmd])

  // Handle auto-focus on click
  const handleTerminalClick = () => {
    if (!isBooting) {
      inputRef.current?.focus()
    }
  }

  // Focus input without scrolling the page when boot finishes
  useEffect(() => {
    if (!isBooting) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }, [isBooting])

  // Boot sequence logic
  useEffect(() => {
    if (!isBooting || bootIndex >= bootSequence.length) {
      setIsBooting(false)
      return
    }

    const step = bootSequence[bootIndex]

    if (step.isCommand) {
      let charIndex = 0
      setTypedBootCmd("")
      const interval = setInterval(() => {
        if (charIndex < step.text.length) {
          setTypedBootCmd((prev) => prev + step.text[charIndex])
          charIndex++
        } else {
          clearInterval(interval)
          setHistory((prev) => [...prev, { id: Math.random().toString(), text: step.text, isCommand: true }])
          setTypedBootCmd("")
          setTimeout(() => setBootIndex((prev) => prev + 1), 200)
        }
      }, 30) // fast typing
      return () => clearInterval(interval)
    } else {
      const timer = setTimeout(() => {
        setHistory((prev) => [...prev, { 
          id: Math.random().toString(), 
          text: step.text, 
          isSuccess: step.isSuccess, 
          isSystem: step.isSystem 
        }])
        setBootIndex((prev) => prev + 1)
      }, step.delay)
      return () => clearTimeout(timer)
    }
  }, [bootIndex, isBooting])

  // Command handler
  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim()
      setInput("")
      
      const newCmdLine: OutputLine = { id: Math.random().toString(), text: `$ ${cmd}`, isCommand: true }
      
      if (!cmd) {
        setHistory(prev => [...prev, newCmdLine])
        return
      }

      const lowerCmd = cmd.toLowerCase()
      let outputLines: OutputLine[] = []

      switch (lowerCmd) {
        case "help":
          outputLines = [
            { id: Math.random().toString(), text: "Available commands:", isSystem: true },
            { id: Math.random().toString(), text: "  whoami    - Display bio and role" },
            { id: Math.random().toString(), text: "  skills    - List core technical stack" },
            { id: Math.random().toString(), text: "  contact   - Show contact information" },
            { id: Math.random().toString(), text: "  clear     - Clear terminal history" },
          ]
          break
        case "whoami":
          outputLines = [
            { id: Math.random().toString(), text: "Karthik Orugonda", isSuccess: true },
            { id: Math.random().toString(), text: "Senior Platform & Cloud Infrastructure Engineer" },
            { id: Math.random().toString(), text: "Building Internal Developer Platforms, scaling K8s, and automating Golden Paths." },
          ]
          break
        case "skills":
          outputLines = [
            { id: Math.random().toString(), text: "Platform Engineering Stack:", isSystem: true },
            { id: Math.random().toString(), text: "• Cloud & Platform Infrastructure: AWS, Azure, GCP" },
            { id: Math.random().toString(), text: "• Containers & Orchestration: Kubernetes, K8s Operators, Docker, Helm, Istio, KEDA, Kustomize" },
            { id: Math.random().toString(), text: "• CI/CD, IaC & GitOps: Terraform, ArgoCD, GitHub Actions, Terragrunt, Crossplane, Argo Rollouts, GitLab CI/CD, Jenkins, Ansible" },
            { id: Math.random().toString(), text: "• Security, Policy & Governance: OPA Gatekeeper, Kyverno, Trivy, Snyk, Checkov" },
            { id: Math.random().toString(), text: "• Observability & Reliability: OpenTelemetry, Prometheus, Grafana, Datadog, Dynatrace, New Relic, Loki, Tempo" },
            { id: Math.random().toString(), text: "• Programming & Architecture: Python, Bash" },
            { id: Math.random().toString(), text: "• AI-assisted Engineering: Claude Code, Antigravity, Ollama, Cursor, GitHub Copilot" },
          ]
          break
        case "contact":
          outputLines = [
            { id: Math.random().toString(), text: "Connecting to secure channel...", isSystem: true },
            { id: Math.random().toString(), text: "Email: [Protected by IAM] - See Connect section below" },
            { id: Math.random().toString(), text: "Location: Earth (us-east-1)" },
          ]
          break
        case "clear":
          setHistory([])
          return
        case "sudo deploy":
          outputLines = [
            { id: Math.random().toString(), text: "Error: User 'guest' is not in the sudoers file. This incident will be reported.", isSystem: true },
          ]
          break
        default:
          outputLines = [
            { id: Math.random().toString(), text: `bash: ${cmd}: command not found` },
          ]
          break
      }

      setHistory(prev => [...prev, newCmdLine, ...outputLines])
    }
  }

  return (
    <div 
      className="w-full max-w-4xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0f0a24]/90 backdrop-blur-md font-mono text-xs md:text-sm text-left cursor-text"
      onClick={handleTerminalClick}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0a0518]/90 border-b border-white/5 select-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-slate-400 text-xs font-semibold">karthik@platform-engineer:~</div>
        <div className="w-12" />
      </div>

      {/* Terminal Content Body */}
      <div className="p-5 h-[350px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
        {history.map((line) => (
          <div
            key={line.id}
            className={`${
              line.isCommand 
                ? "text-[#00ffe7] font-semibold" 
                : line.isSuccess
                ? "text-emerald-400 font-semibold"
                : line.isSystem
                ? "text-slate-400"
                : "text-slate-300"
            }`}
          >
            {line.text}
          </div>
        ))}

        {/* Boot Sequence Typing */}
        {isBooting && typedBootCmd && (
          <div className="text-[#00ffe7] font-semibold">
            {typedBootCmd}
            <span className="animate-pulse bg-[#00ffe7] h-4 w-2 inline-block align-middle ml-1" />
          </div>
        )}

        {/* Interactive Prompt */}
        {!isBooting && (
          <div className="flex items-center">
            <span className="text-slate-400 mr-2">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-1 bg-transparent border-none outline-none text-[#00ffe7] font-semibold min-w-0"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
