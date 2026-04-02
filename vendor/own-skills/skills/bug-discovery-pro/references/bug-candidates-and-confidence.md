# Bug candidates, “100%”, and related bugs

## No complete enumeration

**There is no** method or tool that finds **100%** of bugs in a non-trivial codebase. **Halting** and **undecidable** properties guarantee that, in practice:

- **Static** analysis misses runtime-only failures.
- **Tests** only cover exercised paths.
- **Graph** tools (GitNexus) miss **logic** bugs inside a function unless you read code or run tests.

This skill uses **candidate defects** — issues with **evidence** (stack trace, failing test, mismatch) or **strong suspicion** (shape mismatch, missing call path) — and **confidence** labels.

## What “related bugs” means

| Relation | How to find |
|----------|-------------|
| **Same root cause** | Shared helper, shared config, **same commit** regression |
| **Same blast radius** | **`impact`** / **`api_impact`** — callers and consumers of changed symbol |
| **Same symptom** | Search logs, `query` for error string, **duplicate** tickets |
| **Flaky cluster** | Shared **async** or **timing** code in `process` |

## Triage vocabulary (report)

- **Confirmed** — Repro steps + expected vs actual.
- **Likely** — Graph + code read; no repro yet.
- **Hypothesis** — Needs experiment or test.
- **False positive** — Rule or tool wrong; document why.

## Deep scan (without promising completeness)

- Layer **static** smells (linters, types), **graph** navigation (GitNexus), **tests** (unit/integration/e2e), **runtime** (logs, traces).
- **Stop** when marginal value drops — record **residual risk**.

## Handoff

- **Security-sensitive** signals → **`security-pro`**.
- **Test coverage** gaps → **`testing-pro`**.
