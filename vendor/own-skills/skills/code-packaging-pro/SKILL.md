---
name: code-packaging-pro
description: |
  Professional code packaging and automation: pyproject.toml / setuptools-style metadata, Dockerfiles (multi-stage, slim runtime), GitHub Actions workflows for test matrices, build artifacts, and container or library publishing — complementing deployment strategy.

  Use this skill when the user authors **`pyproject.toml`**, writes or refactors a **Dockerfile**, or wires **GitHub Actions** for **CI** (lint, test, build wheel/image) — not when choosing **Kubernetes** vs **serverless** **runtime** (see **`deployment-pro`**).

  Use **with** **`deployment-pro`** when **images** must be **promoted** across environments; **`security-pro`** for **OIDC**, **secrets**, and **supply chain**; **`testing-pro`** for **what** runs in CI. This skill (`code-packaging-pro`) owns **build artifacts** and **workflow structure**; **`deployment-pro`** owns **release** and **runtime** promotion.

  Triggers: "pyproject.toml", "Dockerfile", "multi-stage", "GitHub Actions", "workflow yml", "build wheel", "publish PyPI", "container image", "CI matrix", "dockerignore", "hatchling", "setuptools", "trusted publishing".

metadata:
  short-description: Code packaging — pyproject, Docker, GitHub Actions, build & publish
---

# Code packaging (professional)

Use **[Python packaging](https://packaging.python.org/)** and **GitHub Actions** official docs for syntax; this skill encodes **artifact** hygiene (**wheels**, **images**) and **CI** layout. Confirm **Python** versions, **registry** targets, and **public** vs **private** package index.

## Related skills (this repo)

| Skill | When to combine with `code-packaging-pro` |
|-------|-------------------------------------------|
| **`deployment-pro`** | After **build** — **where** artifacts run, **rollback**, **canary** |
| **`testing-pro`** | **Test** job design, **flakiness**, coverage gates |
| **`security-pro`** | **Secrets**, **OIDC**, **SBOM**, **fork** PR safety |
| **`nestjs-pro`** / **`nextjs-pro`** | Framework-specific **Docker** or **standalone** output |

**Boundary:** **`code-packaging-pro`** = **build** and **package**; **`deployment-pro`** = **ship** and **operate** in **environments**.

## When to use

- **`pyproject.toml`** — `project` metadata, optional deps, **build** backend choice.
- **Dockerfile** — **multi-stage**, **slim** base, **non-root**, `.dockerignore`.
- **GitHub Actions** — matrices, **cache**, **build** job vs **release** job.
- **Publishing** — wheels, **container** push, **trusted publishing** patterns (overview).
- Trigger keywords: `pyproject`, `Dockerfile`, `Actions`, `workflow`, `wheel`, `CI`, …

## Workflow

1. Confirm **artifact** type (library wheel, **app** image), **Python** range, and **registry** (PyPI, GHCR, ECR).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **runtime** topology to **`deployment-pro`**.
3. Respond using **Suggested response format**; note **supply chain** and **reproducibility** risks.

### Operating principles

1. **Reproducible builds** — **Lockfiles** or pinned deps for **apps**; **tested** ranges for **libraries**.
2. **Smallest** runnable image — **multi-stage**, **minimal** base, **no** dev tools in production stage.
3. **CI clarity** — **Lint** → **test** → **build**; **fail fast** on cheap jobs.
4. **Secrets** — **Short-lived** and **scoped**; **OIDC** over long PATs where possible.
5. **Dockerignore** — Same importance as **.gitignore** for **context** size and **security**.
6. **Docs** — **CHANGELOG** and **version** policy for **library** consumers.

### Python packaging and containers (summary)

- **`pyproject.toml`**, **Dockerfile** patterns, **boundary** vs **`deployment-pro`**.

Details: [references/python-packaging-and-containers.md](references/python-packaging-and-containers.md)

### GitHub Actions and CI (summary)

- Matrices, **caching**, job split, **trusted publishing** pointer, **`testing-pro`** handoff.

Details: [references/github-actions-and-ci.md](references/github-actions-and-ci.md)

### Tips and tricks (summary)

- Slim images, lockfiles, semver discipline.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Monorepos, **native** wheels, **private** indexes.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — **Wheel**, **image**, or **workflow** change.
2. **Recommendation** — **pyproject** / **Docker** / **YAML** structure; cite **`deployment-pro`** for **promotion**.
3. **Code** — Snippets or **workflow** skeleton — still labeled **Code**.
4. **Residual risks** — **Secret** exposure, **wrong** Python ABI, **unpinned** actions.

## Resources in this skill

- `references/` — packaging, Actions, tips, edge cases.

| Topic | File |
|-------|------|
| Python & Docker | [references/python-packaging-and-containers.md](references/python-packaging-and-containers.md) |
| GitHub Actions | [references/github-actions-and-ci.md](references/github-actions-and-ci.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “Add a **Dockerfile** for a FastAPI app with **multi-stage** and **non-root**.”  
**Expected output:** **build** stage installs deps; **runtime** `python:slim`, **copy** only needed files, **`USER`**, **`EXPOSE`**, **health** note; mention **`.dockerignore`**; **`deployment-pro`** for **orchestration**.

## Checklist before calling the skill done

- [ ] **Artifact** type matches **library** vs **service** conventions.
- [ ] **Secrets** not embedded in **Dockerfile** or **public** YAML.
- [ ] **Deployment** concerns (**K8s**, **rollback**) **delegated** when beyond **build**.
