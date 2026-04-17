# Bug discovery tips and tricks

## Before graph search

- **Minimal repro** — Smallest command or URL that fails; **bisect** git commits.
- **Exact error text** — Use in `query` and repo-wide search.

## With GitNexus

- Pass **`task_context`** and **`goal`** on **`query`** — improves ranking.
- Use **`include_content`** sparingly — large payloads; prefer **read file** in IDE after you have the path.
- After **`impact`**, prioritize **d=1** callers for regression tests.

## Without GitNexus

- **Dependency** tracing — Import graph, “find references” in IDE.
- **Git blame** — When did line change; correlate with releases.

## Regression

- When fixing bug A, **search** for copy-paste of same pattern; **impact** is faster when graph exists.

## Reporting

- One **ticket per root cause**; link **related** duplicates as “see also”.
