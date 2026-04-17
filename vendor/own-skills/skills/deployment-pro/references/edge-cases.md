# Deployment edge cases

## Downtime and ordering

- **Deploy order** — API before breaking consumers, or **versioned** contracts; **feature flags** to hide incomplete APIs.
- **Sticky sessions** — rolling deploy + session store mismatch; prefer **stateless** + shared session store or JWT.
- **Long-running jobs** — drain workers before kill; **SIGTERM** handling in containers.

## Data and schema

- **Destructive migration** — dropping column while old code still runs → **expand/contract** only.
- **Seed data** in prod — dangerous automation; separate **bootstrap** from **migrate**.

## Secrets and compliance

- **Secret rotation** — deploy must tolerate **two** valid keys during overlap.
- **Regional** deploys — data residency; **cross-region** failover and **RPO/RTO** assumptions.

## CI/CD footguns

- **Cached** `node_modules` / pip with **stale** lockfile — “works on CI” but wrong deps.
- **Non-deterministic** builds — un-pinned base images or **floating** semver in CI.
- **`pull_request` from forks** — no secrets in untrusted workflows (**`security-pro`**).

## Kubernetes-specific

- **Readiness** too aggressive — traffic before DB migrations complete.
- **PodDisruptionBudget** missing — voluntary evictions during node drain break SLOs.
- **Resource limits** unset — noisy neighbor OOM; **limits** without **requests** skew scheduling.

## Serverless

- **Cold start** under load — provisioned concurrency or **min instances** where product requires.
- **Timeout** during DB connection storms — pool sizing and **RDS proxy**-style patterns.

## Rollback failures

- **Forward-only** migration already applied — rollback is **new migration**, not `down` in panic.
- **Cache** poisoning after bad deploy — purge CDN/feature-flag state explicitly.
