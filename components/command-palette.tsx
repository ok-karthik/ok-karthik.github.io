"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import * as Dialog from "@radix-ui/react-dialog"
import { profile } from "@/content/profile"
import { projects } from "@/content/projects"

/**
 * Replaces the inline terminal.
 *
 * The terminal was charming but sat above the value proposition, cost a full
 * screen of vertical space, and only simulated utility. A palette keeps the
 * keyboard-first personality, actually navigates, and costs nothing above the
 * fold. Radix Dialog gives us the focus trap, Escape handling and scroll lock
 * that the terminal's bare <input> never had.
 */

type Action = {
  id: string
  label: string
  hint?: string
  group: string
  run: () => void
}

export function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [activeIndex, setActiveIndex] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const go = useCallback(
    (href: string) => () => {
      setOpen(false)
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.open(href, href.startsWith("mailto:") ? "_self" : "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router],
  )

  const actions = useMemo<Action[]>(
    () => [
      { id: "top", label: "Home", group: "Navigate", run: go("/#top") },
      { id: "work", label: "Selected work", group: "Navigate", run: go("/#work") },
      { id: "experience", label: "Experience", group: "Navigate", run: go("/#experience") },
      { id: "capabilities", label: "Capabilities", group: "Navigate", run: go("/#capabilities") },
      { id: "contact", label: "Contact", group: "Navigate", run: go("/#contact") },

      ...projects.map((p) => ({
        id: p.slug,
        label: p.title,
        hint: `${p.decisions.length} decisions`,
        group: "Work",
        run: go(`/work/${p.slug}`),
      })),

      {
        id: "cv",
        label: "Download CV",
        hint: "PDF",
        group: "Connect",
        run: go(profile.cvUrl),
      },
      {
        id: "email",
        label: "Email",
        hint: profile.email,
        group: "Connect",
        run: go(`mailto:${profile.email}`),
      },
      { id: "github", label: "GitHub", group: "Connect", run: go(profile.social.github) },
      { id: "linkedin", label: "LinkedIn", group: "Connect", run: go(profile.social.linkedin) },
    ],
    [go],
  )

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return actions
    return actions.filter((a) =>
      `${a.label} ${a.hint ?? ""} ${a.group}`.toLowerCase().includes(q),
    )
  }, [actions, query])

  // Open on Cmd/Ctrl+K from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActiveIndex(0)
    }
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" })
  }, [activeIndex])

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActiveIndex((i) => (results.length ? (i + 1) % results.length : 0))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActiveIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      results[activeIndex]?.run()
    }
  }

  let renderedGroup: string | null = null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-keyshortcuts="Meta+K Control+K"
        className="hidden items-center gap-2 rounded-md border border-border px-2.5 py-1.5 font-mono text-micro text-muted-foreground transition-colors hover:border-primary hover:text-foreground sm:inline-flex"
      >
        Search
        <kbd className="rounded border border-border px-1 py-px">⌘K</kbd>
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed left-1/2 top-[15vh] z-50 w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
            aria-label="Command palette"
          >
            <Dialog.Title className="sr-only">Search and navigate</Dialog.Title>
            <Dialog.Description className="sr-only">
              Type to filter, arrow keys to move, Enter to open, Escape to close.
            </Dialog.Description>

            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to…"
              aria-label="Search"
              aria-controls="palette-results"
              aria-activedescendant={
                results.length ? `palette-option-${activeIndex}` : undefined
              }
              className="w-full border-b border-border bg-transparent px-4 py-3.5 text-body text-foreground outline-none placeholder:text-muted-foreground"
            />

            <ul
              id="palette-results"
              ref={listRef}
              role="listbox"
              aria-label="Results"
              className="max-h-[min(24rem,60vh)] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-small text-muted-foreground">
                  Nothing matches “{query}”.
                </li>
              )}

              {results.map((action, i) => {
                const showGroup = action.group !== renderedGroup
                renderedGroup = action.group
                return (
                  <li key={action.id}>
                    {showGroup && <p className="label px-3 pb-1 pt-3">{action.group}</p>}
                    <button
                      id={`palette-option-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={i === activeIndex}
                      onMouseMove={() => setActiveIndex(i)}
                      onClick={action.run}
                      className={`flex w-full items-baseline justify-between gap-4 rounded-md px-3 py-2 text-left text-body transition-colors ${
                        i === activeIndex
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="truncate">{action.label}</span>
                      {action.hint && (
                        <span className="shrink-0 font-mono text-micro text-muted-foreground">
                          {action.hint}
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
