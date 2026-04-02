# Templates folder — extra docs & samples

> **Canonical repo layout and commands:** [README.md at the repo root](../README.md). Configuration uses **Markdown** (`config.example.md`); workflows are **`.md`** files — no `.yaml`/`.yml` for config or workflows in the root repo.

This directory holds supplementary guides (deployment ideas, tech survey, prompt examples). **Source of truth** for structure and scripts is the root **README.md** and **config.example.md**.

## Contents

| File | Purpose |
|------|---------|
| [START_HERE.md](START_HERE.md) | Onboarding checklist and quick start |
| [SKILL_SYSTEM_GUIDE.md](SKILL_SYSTEM_GUIDE.md) | Longer notes on skills, KB, prompts |
| [PROMPT_TEMPLATES.md](PROMPT_TEMPLATES.md) | Prompt template examples (Markdown) |
| [config.template.md](config.template.md) | Duplicate of root kb-config reminder |
| [COOL_TECHNOLOGIES.md](COOL_TECHNOLOGIES.md) | Ecosystem pointers (informational) |
| [GITHUB_DEPLOYMENT_GUIDE.md](GITHUB_DEPLOYMENT_GUIDE.md) | GitHub / CI ideas |

## Skills & workflows (root repo)

- Skills: `skills/examples/skill-template/`, `skills/*-pro/` (see [`skills/README.md`](../skills/README.md))
- Workflows: `workflows/README.md`, `workflows/dev/` (`/w-ticket`, `/w-release`, `/w-hotfix`)
- Knowledge base: `knowledge-base/README.md`, `scripts/build_kb.py`

## MCP

Describe MCP servers in **Markdown** (tables, lists) in your docs; no required `.yaml` in this repo.

## License

MIT (same as root).
