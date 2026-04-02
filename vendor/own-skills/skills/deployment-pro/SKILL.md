---
name: deployment-pro
description: |
  Professional software deployment: hosting models (static, PaaS, containers, serverless, VM), CI/CD flows, release strategies (rolling, blue-green, canary, GitOps), environments, rollback, and operational edge cases.

  Use this skill when the user designs or debugs deployment pipelines, chooses hosting, promotes builds across environments, configures Kubernetes/serverless releases, manages migrations with zero-downtime goals, or asks about GitHub Actions / GitLab CI / cloud deploy patterns at a cross-stack level.

  Use **with** **`testing-pro`** for what runs **in** CI (tests, quality gates); **`deployment-pro`** owns **ship path**, **release strategy**, and **runtime promotion**. Use **`security-pro`** for secrets and supply chain; **`postgresql-pro`** for migration ordering; **`nextjs-pro`** / **`nestjs-pro`** for framework-specific deploy targets (e.g. Vercel, Node Docker); **`electron-pro`** / **`tauri-pro`** for desktop release channels.

  Triggers: "deploy", "deployment", "CI/CD", "CD", "pipeline", "release", "rollback", "blue-green", "canary", "rolling deploy", "Kubernetes", "K8s", "Helm", "GitOps", "Argo CD", "Flux", "Docker", "container", "image", "registry", "serverless", "Lambda", "Cloud Functions", "Terraform", "IaC", "staging", "production", "promote", "environment", "Vercel", "Netlify", "Railway", "Render", "Fly.io", "zero downtime", "migration deploy".

metadata:
  short-description: Deployment — methods, CI/CD flows, release strategies, rollback, edge cases
---

# Deployment (professional)

Use your cloud or platform **official docs** (AWS/GCP/Azure, Kubernetes, GitHub Actions, GitLab CI) for exact syntax; this skill encodes **deployment strategy**, **pipeline flow**, and **cross-platform** release hygiene. Confirm **target environments**, **compliance** (regions, data residency), and **orchestrator** (K8s, serverless, PaaS) from the project.

## Related skills (this repo)

| Skill | When to combine with `deployment-pro` |
|-------|----------------------------------------|
| **`testing-pro`** | What runs in CI (lint, unit, integration, e2e), flakiness, artifacts — not the same as *where* the app runs |
| **`security-pro`** | Secrets in CI/CD, OIDC to cloud, signing, SBOM, fork-PR safety |
| **`postgresql-pro`** | Migration strategy, expand/contract, locks during deploy |
| **`nextjs-pro`** | Next.js / Vercel-style deploy, env and runtime boundaries |
| **`nestjs-pro`** | Node containers, health checks, graceful shutdown hooks |
| **`electron-pro`** / **`tauri-pro`** | Desktop installers, auto-update, store-style releases |
| **`code-packaging-pro`** | **Dockerfile**, **pyproject**, **GitHub Actions** that **build** images/wheels — before **where** they run |
| **`git-operations-pro`** | **Tags**, **release branches**, **merge** hygiene — before **promotion** to environments |

**Boundary:** **`testing-pro`** = quality **gates** in automation; **`deployment-pro`** = **build → publish → promote → observe → rollback** for runnable systems.

## When to use

- Choosing or comparing **deployment methods** (static, PaaS, containers, serverless, VM).
- Designing **CI/CD flow**: stages, approvals, artifacts, environment promotion.
- **Release strategies**: rolling, blue-green, canary, feature flags vs big-bang.
- **Rollback**, **drift** (GitOps), and **zero-downtime** constraints with **DB** changes.
- **Edge cases**: ordering (API vs clients), cold starts, readiness vs liveness, secret rotation during deploy.
- Trigger keywords: `deploy`, `pipeline`, `canary`, `Kubernetes`, `rollback`, `staging`, `production`, `GitOps`, …

## Workflow

1. Confirm runtime (containers, serverless, static), environments, and **SLO** / downtime tolerance; identify stack skills (**`nextjs-pro`**, **`nestjs-pro`**, …) if framework-tied.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **test suite design** to **`testing-pro`** and **DB migration detail** to **`postgresql-pro`** when those dominate.
3. Respond using **Suggested response format**; note blast radius, rollback path, and env drift risks.

### Operating principles

1. **Build once, deploy many** — Same artifact across envs with config injected per stage (where feasible).
2. **Automate the path to prod** — Manual SSH deploys do not scale; document exceptions.
3. **Rollback is first-class** — Know the **previous good** revision (image digest, release version) before shipping.
4. **Migrations are part of deploy** — Coordinate schema with **running** app versions (**expand/contract**).
5. **Observe releases** — Mark deploys in telemetry; alert on **golden signals** after promotion.
6. **Least privilege in pipelines** — OIDC to cloud over long-lived keys when possible (**`security-pro`**).

### Methods and environments (summary)

- **Static/CDN**, **PaaS**, **containers/K8s**, **serverless**, **VM/bare metal**, **edge** — when each fits and main tradeoffs.

Details: [references/methods-and-environments.md](references/methods-and-environments.md)

### Flows and pipelines (summary)

- **CI/CD stages** from commit to prod; **rolling / blue-green / canary**; **GitOps** promotion; branching vs trunk.

Details: [references/flows-and-pipelines.md](references/flows-and-pipelines.md)

### Tips and tricks (summary)

- Immutable artifacts, health checks, **12-factor** config, **IaC plan/apply**, cache discipline in CI.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Deploy **ordering**, long jobs and **drain**, migration **compatibility**, serverless **cold start**, **PDB** and readiness mistakes.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Environment, strategy, or pipeline stage in question; which **Related skill** owns follow-up.
2. **Recommendation** — Method + flow (stages, gates, release type); explicit handoff to **`testing-pro`** / **`postgresql-pro`** / framework skill when needed.
3. **Code** — Pipeline sketch, stage list, checklist, or pseudo-YAML — not a full cloud tutorial duplicated from vendor docs.
4. **Residual risks** — Downtime, failed rollback, schema coupling, cost of canaries, observability gaps.

## Resources in this skill

- `references/` — methods, flows, tips, edge cases.

| Topic | File |
|-------|------|
| Methods & environments | [references/methods-and-environments.md](references/methods-and-environments.md) |
| Flows & pipelines | [references/flows-and-pipelines.md](references/flows-and-pipelines.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Team deploys API and SPA together; DB migration drops a column on deploy — brief outage.  
**Expected output:** Recommend **expand/contract** migrations; deploy order (backward-compatible API first); reference **`postgresql-pro`**; use **`deployment-pro`** release strategy (rolling + health) not big-bang.

## Checklist before calling the skill done

- [ ] Hosting model and **environments** (dev/stage/prod) are clear.
- [ ] **CI/CD** stages and **approval** gates match risk; **`testing-pro`** referenced for test layers if relevant.
- [ ] **Release strategy** (rolling/canary/blue-green) matches capacity and observability.
- [ ] **Rollback** path and **migration** safety addressed; **`postgresql-pro`** if schema changes.
- [ ] Secrets and pipeline **permissions** not hand-waved — **`security-pro`** when non-trivial.
