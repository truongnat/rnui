# Deployment flows and pipelines

End-to-end **flow** from commit to production: automation, promotion, and safe rollback.

## Typical CI/CD stages

1. **Trigger** — push, PR, tag, schedule, manual approval gate.
2. **Build** — install deps, compile, **artifact** (image, tarball, static folder).
3. **Verify** — lint, typecheck, unit/integration tests (**`testing-pro`**); security scans (**`security-pro`**).
4. **Package** — container image with digest; SBOM optional; sign where supported.
5. **Publish** — registry, artifact store, or **GitOps** commit.
6. **Deploy** — to dev → staging → prod with **gates** (manual, policy, canary health).
7. **Observe** — logs, metrics, traces; **rollback** trigger on SLO breach.

## Release strategies

| Strategy | Flow | When |
|----------|------|------|
| **Rolling** | Replace instances in waves | Default K8s; watch **readiness** and **surge** |
| **Blue-green** | Switch traffic to new stack | Needs **double capacity** or fast scale; clean cut |
| **Canary** | Small % → grow | Needs **metrics** and automated promotion or abort |
| **Recreate** | Stop old, start new | Downtime; simple stateless jobs |
| **Feature flags** | Code in prod; behavior toggled | Decouples **deploy** from **release** |

## GitOps (conceptual)

- **Git as source of truth** for desired state (Argo CD, Flux, similar).
- **Drift detection** — cluster vs repo; reconcile loop.
- **Promotion** — merge PR from `staging` overlay to `production` overlay.

## Branching vs trunk

- **Trunk-based** — small batches to main; **feature flags** for risky work.
- **Release branches** — stabilization window; more merge cost; common for mobile store trains.

## Environment promotion

- **Dev** — fast feedback; may skip full e2e.
- **Staging** — prod-like config; data often **anonymized** or synthetic.
- **Prod** — approvals, change windows, **rollback runbooks**.

## Rollback

- **Kubernetes**: `rollout undo`; previous **image digest** pinned.
- **Serverless**: alias/Lambda versions; traffic shift back.
- **DB**: forward-only migrations preferred; **expand/contract** pattern for zero-downtime schema.

## DORA-style signals (orientation)

- **Lead time**, **deployment frequency**, **change failure rate**, **MTTR** — use to tune pipeline friction vs safety.
