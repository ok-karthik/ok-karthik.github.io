#!/usr/bin/env python3
"""
Eval harness for the `premium-portfolio-ui` skill.

Enforces the design rules in evals/golden_dataset.json against the codebase.

This replaces a stub that incremented `passed` unconditionally for every case
and then printed "GRADUATED" — it could not fail, so it could not catch
anything. Meanwhile the rules it claimed to check were real, and the codebase
had drifted from two of them.

Deliberately NOT an LLM judge. Most of these rules are greppable, and a
deterministic check that runs in 40ms with no API key is worth more than a
probabilistic one that needs a network round trip. Cases that genuinely cannot
be checked statically are reported as MANUAL rather than silently passed —
overstating coverage is the failure this file is fixing.

Usage:  pnpm eval          (or: python3 .agents/skills/premium-portfolio-ui/scripts/evaluate.py)
Exit:   0 all enforceable cases pass · 1 any fail
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
DATASET = Path(__file__).resolve().parents[1] / "evals" / "golden_dataset.json"

GREEN, RED, YELLOW, DIM, BOLD, RESET = (
    "\033[32m", "\033[31m", "\033[33m", "\033[2m", "\033[1m", "\033[0m"
)

# Comment lines are stripped before matching: a rule that names a forbidden
# pattern in its own explanatory comment must not trip that rule.
COMMENT = re.compile(r"^\s*(//|/\*|\*|#)")


def files_for(globs: list[str], exclude: list[str] | None = None) -> list[Path]:
    excluded: set[Path] = set()
    for pattern in exclude or []:
        excluded.update(REPO.glob(pattern))
    out: list[Path] = []
    for pattern in globs:
        for path in REPO.glob(pattern):
            if path.is_file() and path not in excluded:
                out.append(path)
    return sorted(set(out))


def code_lines(path: Path) -> list[tuple[int, str]]:
    """Source lines with comments dropped, 1-indexed."""
    lines = path.read_text(encoding="utf-8", errors="ignore").splitlines()
    return [(i, l) for i, l in enumerate(lines, 1) if not COMMENT.match(l)]


def run_forbid(chk: dict) -> list[str]:
    """The pattern must not appear."""
    rx = re.compile(chk["pattern"])
    skip = re.compile(chk["exclude_lines"]) if chk.get("exclude_lines") else None
    hits = []
    for path in files_for(chk["globs"], chk.get("exclude_globs")):
        for num, line in code_lines(path):
            if rx.search(line) and not (skip and skip.search(line)):
                rel = path.relative_to(REPO)
                hits.append(f"{rel}:{num}  {line.strip()[:88]}")
    return hits


def run_require(chk: dict) -> list[str]:
    """The pattern must appear in every matched file."""
    rx = re.compile(chk["pattern"])
    misses = []
    for path in files_for(chk["globs"], chk.get("exclude_globs")):
        if not any(rx.search(l) for _, l in code_lines(path)):
            misses.append(f"{path.relative_to(REPO)}  missing /{chk['pattern']}/")
    return misses


def run_pairing(chk: dict) -> list[str]:
    """A file containing X must also contain Y."""
    trigger = re.compile(chk["when_contains"])
    required = re.compile(chk["must_contain"])
    misses = []
    for path in files_for(chk["globs"], chk.get("exclude_globs")):
        text = path.read_text(encoding="utf-8", errors="ignore")
        if trigger.search(text) and not required.search(text):
            rel = path.relative_to(REPO)
            misses.append(f"{rel}  has /{chk['when_contains']}/ but not /{chk['must_contain']}/")
    return misses


RUNNERS = {"forbid": run_forbid, "require": run_require, "require_pairing": run_pairing}


def main() -> int:
    if not DATASET.exists():
        print(f"{RED}golden_dataset.json not found at {DATASET}{RESET}")
        return 1

    cases = json.loads(DATASET.read_text())
    print(f"{BOLD}premium-portfolio-ui{RESET}  {len(cases)} cases  ({REPO})\n")

    passed = failed = manual = 0
    failures: list[tuple[str, str, list[str]]] = []

    for case in cases:
        cid = case["id"]
        chk = case.get("check")

        if not chk:
            print(f"  {YELLOW}MANUAL{RESET}  {cid}")
            print(f"          {DIM}{case['expected_output_constraint'][:96]}{RESET}")
            manual += 1
            continue

        runner = RUNNERS.get(chk["kind"])
        if runner is None:
            print(f"  {RED}ERROR {RESET}  {cid}  unknown check kind {chk['kind']!r}")
            failed += 1
            continue

        hits = runner(chk)
        if hits:
            print(f"  {RED}FAIL{RESET}    {cid}")
            failed += 1
            failures.append((cid, chk.get("message", case["expected_output_constraint"]), hits))
        else:
            print(f"  {GREEN}PASS{RESET}    {cid}")
            passed += 1

    if failures:
        print(f"\n{BOLD}Failures{RESET}")
        for cid, message, hits in failures:
            print(f"\n{RED}{cid}{RESET}\n  {message}")
            for h in hits[:12]:
                print(f"    {h}")
            if len(hits) > 12:
                print(f"    {DIM}… and {len(hits) - 12} more{RESET}")

    print(
        f"\n{BOLD}{passed} passed{RESET} · "
        f"{(RED if failed else DIM)}{failed} failed{RESET} · "
        f"{YELLOW}{manual} manual{RESET}"
    )
    if manual:
        print(f"{DIM}MANUAL cases are not statically checkable — verify them by eye.{RESET}")

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
