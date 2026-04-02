# Automation and CI

## Goals

- **Fast feedback** on every PR for the cheapest checks.
- **Reliable** runs (same result locally vs CI when possible).
- **Observable** failures (logs, screenshots, traces).

## Typical pipeline order

1. Lint / format / typecheck (seconds).
2. Unit tests (parallel).
3. Integration tests (may need services, DB).
4. E2E (optional per PR or nightly; shard if large).

## CI practices

- **Caching**: dependencies (npm/pip/maven) keyed by lockfiles.
- **Matrix**: multiple OS or Node versions only when needed (cost).
- **Parallelism**: `shard` / `--split` / multiple jobs; avoid shared mutable DB without isolation.
- **Retries**: use sparingly for **known** infra flakes; do not retry to hide product bugs.
- **Artifacts**: upload JUnit XML, Playwright HTML report, or Cypress videos on failure.

## Environment parity

- Same Node/Python version as production (or documented delta).
- **Env vars**: document required vars; CI injects secrets; never commit secrets.
- **Timeouts**: CI is slower; use generous but bounded timeouts; avoid unbounded waits.

## Deployment gates

- **Smoke** after deploy: health checks, critical path API or UI.
- **Canary** vs full rollout is an ops concern but tests should support staged verification.

## Notifications

- Fail fast on main; branch policies optional.
- Link failures to **recent commits** and **test name** for triage.
