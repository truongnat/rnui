# AGENTS — hints for Cursor / agent tools

## Skills

Cursor loads skills from your IDE config (often `.cursor/skills` or project rules). You can:

- **Copy** a skill from `skills/<name>/` or `skills/examples/skill-template/` into your IDE’s skills folder; or
- **Symlink** (Unix): `ln -s "$(pwd)/skills/my-skill" ~/.cursor/skills/my-skill`

Bundled examples: `skills/react-pro/` (React web), `skills/nextjs-pro/` (Next.js), `skills/react-native-pro/` (React Native), `skills/flutter-pro/` (Flutter), `skills/nestjs-pro/` (NestJS), `skills/postgresql-pro/` (PostgreSQL), `skills/sql-data-access-pro/` (SQLite, SQL access), `skills/testing-pro/` (testing & automation), `skills/security-pro/` (cross-platform security), `skills/electron-pro/` (Electron), `skills/tauri-pro/` (Tauri), `skills/deployment-pro/` (deployment & release), `skills/seo-pro/` (SEO), `skills/design-system-pro/` (design system & UI/UX), `skills/mobile-design-pro/` (mobile UX), `skills/business-analysis-pro/` (business analysis), `skills/content-analysis-pro/` (docs, images, video analysis), `skills/data-analysis-pro/` (EDA, pandas, spreadsheets), `skills/image-processing-pro/` (Pillow, raster), `skills/web-research-pro/` (sources, citations), `skills/market-research-pro/` (market sizing, competitors, positioning), `skills/strategic-consulting-pro/` (strategy options, prioritization, scenarios), `skills/code-packaging-pro/` (pyproject, Docker, Actions), `skills/caching-pro/` (cache strategy, invalidation, observability), `skills/network-infra-pro/` (network topology, traffic, diagnostics), `skills/planning-pro/` (planning, dependency mapping, execution control), `skills/algorithm-pro/` (algorithm modeling, complexity, correctness), `skills/feedback-pro/` (deep feedback, severity, closure), `skills/auth-pro/` (authentication and authorization methods), `skills/self-improve-agent-pro/` (self-improvement loops and quality uplift), `skills/git-operations-pro/` (Git, PRs), `skills/skills-self-review-pro/` (skill bundle audit, gap reports), `skills/bug-discovery-pro/` (bug discovery, GitNexus), `skills/repo-tooling-pro/` (repo scripts, KB batch, `analyze_skills` report).

Each skill needs a `SKILL.md` with clear frontmatter `name` and `description`.

**New skills:** read [`skills/SKILL_AUTHORING_RULES.md`](skills/SKILL_AUTHORING_RULES.md) first. Do not create a new skill directory unless those mandatory rules are met. When you add, remove, or rename a bundled skill, update **§8** there (README files, **§1** list, **`knowledge-base/documents/repo/skills-layout.md`**) in the same change.


## Prompt routing (Claude Code slash commands)

Use these commands to analyze, optimize, and route prompts to the best skills:

| Command | Purpose |
|---------|---------|
| `/route <prompt>` | Full pipeline: analyze + optimize + match skills + suggest workflow |
| `/optimize <prompt>` | Reduce prompt tokens while preserving meaning |
| `/find-skill <prompt>` | Find best matching skill(s) for a prompt |
| `/run-workflow <prompt>` | Match prompt to workflows under `workflows/` and skills, guide execution |
| `/w-ticket` | Run the **ticket** workflow ([`workflows/dev/w-ticket.md`](workflows/dev/w-ticket.md)) — Kanban; layout and phases in that file (skills under [`skills/`](skills/)) |
| `/w-release` | Run the **release** workflow ([`workflows/dev/w-release.md`](workflows/dev/w-release.md)) — release notes → implementation detail |
| `/w-hotfix` | Run the **hotfix** workflow ([`workflows/dev/w-hotfix.md`](workflows/dev/w-hotfix.md)) — prod-urgent fix path |

Commands read from `knowledge-base/embeddings/skill_index.json`. Rebuild after adding/changing skills:

```bash
node dist/tools.js build-skill-index
```

## Knowledge base

Agents should prefer:

1. Read `knowledge-base/INDEX.md` to locate documents.
2. Open `.md` files under `knowledge-base/documents/` for detail.
3. For semantic search over the indexed corpus, run `node dist/tools.js query-kb "…"` (after `build-kb`).
4. **Persist** meaningful decisions and audit outcomes under `knowledge-base/documents/` (see **`.cursor/rules/documentation-persistence.mdc`**, [`documents/repo/activity-log.md`](knowledge-base/documents/repo/activity-log.md)); update **INDEX** when adding files.

## Workflows

Bundled **dev** workflows: [`workflows/dev/README.md`](workflows/dev/README.md) — **`/w-ticket`**, **`/w-release`**, **`/w-hotfix`** (see paths in dev README). Naming: runnable workflow files **`w-<slug>.md`** — see [`workflows/README.md`](workflows/README.md#naming). For ticket flow, **`kanban/<ticket>/`** layout and steps are in [`workflows/dev/w-ticket.md`](workflows/dev/w-ticket.md).

## Configuration

Edit `config.md` (copy from `config.example.md`) — the `kb-config` block in Markdown, not `.yaml`.

## Formatting (common)

- Repo root **`.editorconfig`** — UTF-8, LF, indent; Cursor rule **`.cursor/rules/formatting-common.mdc`** applies to all edits unless a narrower rule overrides.

## Bundle audit

- **`node dist/tools.js analyze-skills --self-review`** — full Markdown report for this repo (skills + manual checklist). Pair with **`skills/skills-self-review-pro/`** and **`node dist/tools.js validate-skills`**.
