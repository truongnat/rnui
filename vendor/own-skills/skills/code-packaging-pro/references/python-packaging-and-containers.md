# Python packaging and containers

## pyproject.toml

- Modern **PEP 621** metadata: **`[project]`** `name`, `version`, `dependencies`, **optional** `[project.optional-dependencies]` (e.g. `dev`).
- **Build backend** — `hatchling`, `setuptools`, `flit` per project policy; **lock** versions for apps, looser ranges for **libraries** with CI matrix.

## Dockerfiles

- **Multi-stage** — **build** stage with compilers; **runtime** slim image (e.g. `python:3.12-slim`).
- **Non-root** user in production images when feasible.
- **`.dockerignore`** — exclude `.git`, `venv`, `__pycache__` to shrink context and **layer** cache health.

## Boundary vs **`deployment-pro`**

- **`code-packaging-pro`** — **Artifact** shape: image, wheel, **CI** that **builds** them.
- **`deployment-pro`** — **Where** and **how** images run (K8s, serverless, **rollback**, **canary**) — orchestration and **promotion**, not the Dockerfile alone.
