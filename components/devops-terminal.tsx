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
  { text: "$ platform-cli init", isCommand: true, delay: 400 },
  { text: "✓ Context: karthik-orugonda@platform-eng", isSuccess: true, delay: 300 },
  { text: "Type 'help' for available commands or click a suggestion below.", isSystem: true, delay: 300 },
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
  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim()
    
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
          { id: Math.random().toString(), text: "  gpu       - View GPU Platform experience" },
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
          { id: Math.random().toString(), text: "• Containers & Orchestration: Kubernetes, Docker, Helm, Istio" },
          { id: Math.random().toString(), text: "• CI/CD & GitOps: ArgoCD, GitHub Actions, GitLab, Jenkins" },
          { id: Math.random().toString(), text: "• Infrastructure as Code: Terraform, Terragrunt, Crossplane, Ansible" },
          { id: Math.random().toString(), text: "• Observability: OpenTelemetry, Prometheus, Grafana, Datadog, Dynatrace, Loki, Tempo" },
          { id: Math.random().toString(), text: "• Software Engineering: Python (APIs/Automation), Java (Groovy), Bash" },
          { id: Math.random().toString(), text: "• AI Platform & Agentic Workflows: GPU Platform (Karpenter, GPU Operator, Time Slicing, DCGM), LLM Serving (Ollama, FastAPI Gateway), MCP Servers, Google ADK, n8n" },
        ]
        break
      case "gpu":
        outputLines = [
          { id: Math.random().toString(), text: "GPU Platform", isSystem: true },
          { id: Math.random().toString(), text: "✓ Amazon EKS", isSuccess: true },
          { id: Math.random().toString(), text: "✓ Karpenter GPU NodePools", isSuccess: true },
          { id: Math.random().toString(), text: "✓ NVIDIA GPU Operator", isSuccess: true },
          { id: Math.random().toString(), text: "✓ Device Plugin", isSuccess: true },
          { id: Math.random().toString(), text: "✓ Node Feature Discovery", isSuccess: true },
          { id: Math.random().toString(), text: "✓ Time Slicing", isSuccess: true },
          { id: Math.random().toString(), text: "✓ DCGM Exporter", isSuccess: true },
          { id: Math.random().toString(), text: "✓ Prometheus", isSuccess: true },
          { id: Math.random().toString(), text: "✓ Grafana", isSuccess: true },
          { id: Math.random().toString(), text: "✓ CUDA Validation", isSuccess: true },
        ]
        break
      case "contact":
        outputLines = [
          { id: Math.random().toString(), text: "Connecting to secure channel...", isSystem: true },
          { id: Math.random().toString(), text: "Email: [Protected by IAM] - See Connect section below" },
          { id: Math.random().toString(), text: "Location: Earth (eu-central-1)" },
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

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input)
      setInput("")
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
          <div className="flex flex-col gap-2">
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
            
            {/* Suggested Commands */}
            <div className="flex flex-wrap gap-2 mt-2">
              {['whoami', 'skills', 'gpu', 'contact', 'clear'].map(cmd => (
                <button 
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-2.5 py-1 rounded border border-white/10 text-xs transition-colors duration-200"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
