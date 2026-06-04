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
  { text: "$ curl -s https://api.karthik.dev/status", isCommand: true, delay: 500 },
  { text: "Connecting to api.karthik.dev...", delay: 300 },
  { text: "✓ Connection established (SSL Verified).", isSuccess: true, delay: 200 },
  { text: "Initializing GitOps reconciliation loop...", delay: 300 },
  { text: "Reconciling state for: ok-karthik/platform-engineering", delay: 200 },
  { text: "  [+] Kubernetes (AKS/EKS) Clusters .. ONLINE", isSystem: true, delay: 200 },
  { text: "  [+] ArgoCD GitOps Engine .......... SYNCED", isSystem: true, delay: 200 },
  { text: "  [+] Dynatrace / Prometheus AIOps .. ACTIVE", isSystem: true, delay: 200 },
  { text: "  [+] Terraform / Terragrunt IaC .... DRIFT-FREE", isSystem: true, delay: 200 },
  { text: "Reconciliation successful. System Status: OPTIMAL 🚀", isSuccess: true, delay: 400 },
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [history, input, typedBootCmd])

  // Handle auto-focus on click
  const handleTerminalClick = () => {
    if (!isBooting) {
      inputRef.current?.focus()
    }
  }

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
            { id: Math.random().toString(), text: "Senior Platform Engineer & SRE" },
            { id: Math.random().toString(), text: "Transitioning to AI Infrastructure / AI Platform Architect." },
          ]
          break
        case "skills":
          outputLines = [
            { id: Math.random().toString(), text: "Core Infrastructure & AI Stack:", isSystem: true },
            { id: Math.random().toString(), text: "• Cloud: AWS, Azure, GCP" },
            { id: Math.random().toString(), text: "• Compute: Kubernetes (EKS/AKS), Docker, KEDA" },
            { id: Math.random().toString(), text: "• IaC & Automation: Terraform, Terragrunt, Ansible" },
            { id: Math.random().toString(), text: "• GitOps: ArgoCD, GitHub Actions" },
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
      className="w-full max-w-2xl mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0f0a24]/90 backdrop-blur-md font-mono text-xs md:text-sm text-left cursor-text"
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
      <div className="p-5 min-h-[300px] max-h-[350px] overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-white/10">
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
              autoFocus
            />
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
