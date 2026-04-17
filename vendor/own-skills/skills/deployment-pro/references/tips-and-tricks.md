# Deployment tips and tricks

## Configuration

- **12-factor config** — env vars per environment; **no** secrets in repo (**`security-pro`**).
- **Same artifact, many envs** — build once; inject config at deploy (or runtime from secret store).
- **Idempotent deploys** — rerunning should converge, not duplicate broken state.

## Containers

- **Multi-stage builds** — small final image; non-root user; **distroless** or minimal base where possible.
- **Image tags** — prefer **immutable** digests in prod; avoid `latest` for production pins.
- **Health checks** — `HEALTHCHECK` or orchestrator probes aligned with **real** readiness (DB connections).

## Databases and migrations

- Run migrations in a **controlled** step (job, init container, or dedicated pipeline stage) — not ad hoc SSH.
- **Backward-compatible** steps: add column → dual-write → backfill → remove old — for zero-downtime.

## Observability

- **Deploy markers** in APM/logs — correlate incidents with releases.
- **Synthetic checks** post-deploy before full traffic shift (canary gate).

## Cost and speed

- **Cache** layers in CI (deps, Docker layers); **parallel** jobs with shard strategy.
- **Right-size** staging — does not need prod scale; **does** need **behavioral** parity.

## IaC

- **Plan** before **apply** in CI for Terraform/OpenTofu; policy checks (OPA, Sentinel) for guardrails.

## Desktop / edge cases

- **Electron/Tauri** releases — separate from web CD; signing keys and update channels (**`electron-pro`**, **`tauri-pro`**).
