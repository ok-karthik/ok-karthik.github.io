/**
 * Easter-egg commands for the ⌘K palette.
 *
 * The old site had a simulated terminal. It was charming but sat above the
 * value proposition, cost a screen of height, and only pretended to be useful.
 * The palette already carries the keyboard-first personality and actually
 * navigates, so the commands live inside it instead — same charm, one
 * interaction rather than two.
 *
 * Output is derived from content/ so it cannot drift from the page. The old
 * terminal's `skills` output had already fallen out of sync with the skills
 * grid, which is exactly the failure this avoids.
 */

import { profile, stats } from "./profile"
import { skillGroups } from "./skills"
import { projects } from "./projects"

export type Command = {
  name: string
  hint: string
  lines: () => string[]
}

export const commands: Command[] = [
  {
    name: "whoami",
    hint: "who is this",
    lines: () => [
      profile.name,
      profile.title,
      profile.subtitle,
      "",
      `${profile.location.city}, ${profile.location.country} · ${profile.location.availability}`,
    ],
  },
  {
    name: "skills",
    hint: "the stack",
    lines: () =>
      skillGroups.map(
        (g) => `${g.title}: ${g.skills.map((s) => s.name).join(", ")}`,
      ),
  },
  {
    name: "gpu",
    hint: "GPU platform",
    lines: () => {
      const gpu = skillGroups.find((g) => g.title === "AI & GPU Infrastructure")
      return [
        "GPU infrastructure on Amazon EKS",
        ...(gpu?.skills.map((s) => `  ✓ ${s.name}${s.note ? ` — ${s.note}` : ""}`) ?? []),
        "",
        "Full write-up: /work/ai-infrastructure-on-eks",
      ]
    },
  },
  {
    name: "projects",
    hint: "what I built",
    lines: () =>
      projects.map((p) => `${p.decisions.length} decisions  ·  ${p.title}`),
  },
  {
    name: "stats",
    hint: "the numbers",
    lines: () => stats.map((s) => `${s.value.padEnd(6)} ${s.label}`),
  },
  {
    name: "contact",
    hint: "get in touch",
    lines: () => [
      `Email     ${profile.email}`,
      "LinkedIn  linkedin.com/in/karthikorugonda",
      "GitHub    github.com/ok-karthik",
      "",
      `Open to ${profile.openToSummary}.`,
    ],
  },
  {
    name: "sudo",
    hint: "don't",
    lines: () => [
      "karthik is not in the sudoers file.",
      "This incident will be reported.",
    ],
  },
]

export const findCommand = (q: string): Command | undefined => {
  const norm = q.trim().toLowerCase()
  return commands.find((c) => c.name === norm || norm.startsWith(`${c.name} `))
}
