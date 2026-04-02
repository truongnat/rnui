---
name: cli-pro
description: |
  Advanced command-line interfaces — argument design, help/usage, exit codes, stdin/stdout/stderr contracts, signals, completions, and cross-platform packaging — for tools users run in terminals, scripts, and CI.

  Use this skill when the user designs or refactors a **CLI** (any language), adds **subcommands** or **global flags**, implements **shell completion**, fixes **broken pipes** / **TTY** behavior, or aligns **machine-readable output** with human-readable logs. Combine with **`code-packaging-pro`** for distribution (pyproject entry points, npm `bin`, Go/Rust install); with **`security-pro`** for secrets and dangerous flags; with **`testing-pro`** for CLI integration tests.

  Triggers: "CLI", "command line", "argparse", "click", "typer", "clap", "cobra", "commander", "yargs", "subcommand", "exit code", "stderr", "POSIX", "completion", "bash completion", "zsh completion", "machine readable", "JSON output", "TTY", "SIGPIPE", "getopt".

metadata:
  short-description: CLI — argv design, help/exit codes, pipes/TTY, completions, cross-platform tools
---

# CLI (professional)

Canonical ergonomics reference: **[clig.dev](https://clig.dev/)** (community guide; align with POSIX/GNU expectations where applicable). This skill encodes **stable contracts** (stdout vs stderr, exit codes), **predictable** flags and subcommands, and **safe** defaults for destructive operations. Confirm **target OS** (Windows vs Unix), **shell** for completions, and **runtime** (Python, Node, Go, Rust, shell).

## Related skills (this repo)

| Skill | When to combine with `cli-pro` |
|-------|--------------------------------|
| **`code-packaging-pro`** | Entry points, `bin`, Docker/CI that invokes the CLI |
| **`security-pro`** | Credentials via env, `--password` anti-patterns, path safety |
| **`testing-pro`** | Snapshot tests for `--help`, golden stderr, subprocess integration |
| **`javascript-pro`** | Node CLIs, ESM/CJS `bin`, shebang edge cases |
| **`repo-tooling-pro`** | Repo-specific **internal** scripts vs **published** CLIs — this skill focuses on **user-facing** CLI design |

## When to use

- Designing **flags**, **positional args**, **subcommands**, or **config precedence** (CLI > env > file).
- **Help text**, **examples**, **version** flags, and **verbosity** (`-q` / `-v` / `--verbose`).
- **Exit codes**, **stderr** for errors/diagnostics, **stdout** for data; **JSON** / `--json` machine output.
- **Pipes**, **SIGPIPE**, **non-interactive** / **CI** detection, **progress** on tty vs log-friendly mode.
- **Shell completion** (bash/zsh/fish), **dynamic** completions.
- Trigger keywords: `CLI`, `argparse`, `click`, `typer`, `clap`, `cobra`, `completion`, `exit code`, `stderr`, `SIGPIPE`, `TTY`, `--json`

## Workflow

1. Confirm **runtime**, **OS targets**, how the tool is **invoked** (global `bin`, `npx`, `python -m`, container), and whether output must be **scriptable** (`--json`).
2. Apply the principles and topic summaries below; open `references/` when you need depth.
3. Respond using **Suggested response format**; note **breaking** argv changes and **shell**-specific completion limits.

### Operating principles

1. **Errors to stderr; data to stdout** — Pipes and `$(cmd)` stay clean; use a dedicated **machine format** flag when mixing logs and data.
2. **Meaningful exit codes** — `0` success; non-zero for failure; reserve **124/125** etc. only if documented; avoid random `1` everywhere without distinction.
3. **Idempotent `--help` / `--version`** — Fast, no side effects, exit `0`.
4. **Destructive actions** need **explicit** flags or **confirm** only when TTY; in CI, refuse ambiguous prompts (clear error).
5. **Stable interface** — Prefer additive flags; document deprecations; semantic versioning for **CLI contract** if published.

### Argument model & UX (summary)

- Subcommand-first layout; global vs local flags; **long options** for scripts; short flags for interactive use.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Runtime patterns (summary)

- Python, Node, Go, Rust — libraries and **testing** hooks for CLIs.

Details: [references/patterns-by-runtime.md](references/patterns-by-runtime.md)

### Edge cases (summary)

- Windows consoles, **quoting**, **color** auto/no/force, broken pipes, **locale** / encoding.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — New CLI, refactor, or bug (pipes, CI, completion).
2. **Recommendation** — Argv layout, exit/stderr policy, flags for JSON/quiet; migration note if breaking.
3. **Code** — Snippets for help text, parsing, subprocess test, or completion stub — still labeled **Code**.
4. **Residual risks** — Breaking changes, shell gaps, Windows path quirks, secret leakage via argv.

## Resources in this skill

- `references/` — Deep dives; external baseline [clig.dev](https://clig.dev/).

| Topic | File |
|-------|------|
| Tips & CLI UX | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Patterns by runtime | [references/patterns-by-runtime.md](references/patterns-by-runtime.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Users pipe our CLI to `head` and we get a traceback from a **broken pipe**.  
**Expected output:** Catch **SIGPIPE** or handle **EPIPE** on write; exit **0** or **141** per platform convention; document; avoid Python traceback noise on stderr for expected pipe closure.

**Input:** Add **zsh** completion for subcommands.  
**Expected output:** Prefer generator-supported frameworks (Click/Typer, Cobra, Clap); document **manual** install path; warn about **dynamic** completion needing a fast `--print-completion` hook.

## Checklist before calling the skill done

- [ ] **stdout vs stderr** contract is explicit for normal operation and errors.
- [ ] **Exit codes** documented; `--help` / `--version` behave and exit `0`.
- [ ] **Non-TTY** / **CI** behavior defined (no stuck prompts; or `--yes` with warning).
- [ ] If **machine-readable** output exists, it is behind **`--json`** (or equivalent) and **stable**.
- [ ] **Breaking** argv changes called out with migration or semver note for published tools.
