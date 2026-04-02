# SKILLS — Skills, workflows & knowledge base (Markdown)

Template repo: **`skills/`** (`SKILL.md` bundles), **`workflows/`** (Markdown steps), **`knowledge-base/`** (`.md` + local RAG). Config and workflow contracts use **Markdown**, not `.yaml`/`.yml` for those roles (scripts may emit JSON for embeddings).

## Contents

- [Directory layout](#directory-layout)
- [Quick start](#quick-start)
- [Knowledge base & RAG](#knowledge-base--rag)
- [Skills](#skills)
- [Workflows](#workflows)
- [Prompt templates](#prompt-templates)
- [Cursor / Agent](#cursor--agent)
- [More docs under `templates/`](#more-docs-under-templates)

## Directory layout

```
skills/                        # repo root (remote install → vendor/own-skills/)
├── config.example.md          # kb-config block for scripts
├── requirements.txt           # Legacy file (Python runtime no longer required)
├── skills/
│   ├── README.md
│   ├── examples/skill-template/SKILL.md
│   ├── <skill-name>/          # e.g. react-pro, nextjs-pro, …
│   └── …
├── workflows/
│   ├── README.md              # Conventions + naming (`w-<slug>.md`)
│   └── dev/                   # /w-ticket, /w-release, /w-hotfix
├── knowledge-base/
│   ├── INDEX.md
│   ├── documents/             # Source .md for RAG
│   └── embeddings/            # rag_*.npy, .json (generated, gitignored)
├── prompts/
│   └── README.md
├── package.json               # npx CLI (`own-skills`) + Node deps
├── src/                       # TypeScript source (CLI + tool commands)
│   ├── own-skills.ts
│   ├── tools.ts
│   └── ...
├── dist/                      # compiled runtime (used by npx bin)
│   ├── own-skills.js
│   └── tools.js
├── scripts/
│   ├── README.md
│   └── (documentation only; runtime commands are in `dist/tools.js`)
├── .claude/commands/          # Slash commands (e.g. /w-ticket, /route)
└── templates/
```

## Architecture overview

```mermaid
flowchart LR
  USER[User / Agent] --> SKILLS[skills/*-pro]
  USER --> WF[workflows/dev]
  USER --> PROMPTS[prompts/templates]

  SKILLS --> DOCS[knowledge-base/documents]
  WF --> DOCS
  PROMPTS --> DOCS

  DOCS --> BUILD[node dist/tools.js build-kb]
  BUILD --> EMB[knowledge-base/embeddings]
  EMB --> QUERY[node dist/tools.js query-kb or query-kb-batch]
  QUERY --> USER

  SKILLS --> VALIDATE[node dist/tools.js validate-skills]
  SKILLS --> ANALYZE[node dist/tools.js analyze-skills]
  VALIDATE --> USER
  ANALYZE --> USER
```

## Quick start

### Install into another project (no manual clone)

From the **target project root**. Re-running install **updates** the bundle.

**Node 18+** — use the **`own-skills`** CLI (`npx` downloads this package, fetches the repo with degit or shallow git, then performs install/uninstall in Node). Requires **git** on `PATH`.

```bash
# Interactive (default command = install)
npx github:truongnat/skills

# Non-interactive full install (forward args after --)
npx --yes github:truongnat/skills -- install --yes --project-dir .

npx --yes github:truongnat/skills -- uninstall --force --yes
```

If `npx` does not pick the binary automatically: `npx --yes github:truongnat/skills own-skills install --yes`.

**From a local clone**: `npm install && npm run build`, then `node dist/own-skills.js --help`.

**`npm error enoent … package.json`** when running `npx github:…/skills`: the **default branch on GitHub** must contain **`package.json`** at repo root (and `dist/own-skills.js` published by build output).

Bundle root: `./vendor/own-skills/`. Flags: `--repo`, `--skills-only`, `--cursor-only` (see `node dist/own-skills.js --help`).

**Sanity check** (after a full install, not `--skills-only`):

```bash
node vendor/own-skills/dist/tools.js verify-bundle-install --project-dir .
```

### Work in this repo (Node + TypeScript)

```bash
cd <repo-root>                 # e.g. folder `skills` after clone
npm install
npm run build
cp config.example.md config.md   # optional
node dist/tools.js build-kb
node dist/tools.js query-kb "…" -k 5
```

See [`scripts/README.md`](scripts/README.md) for full command map.

## Knowledge base & RAG

1. Edit `.md` under [`knowledge-base/documents/`](knowledge-base/documents/).
2. Update [`knowledge-base/INDEX.md`](knowledge-base/INDEX.md) when you add a doc.
3. `node dist/tools.js build-kb` → `rag_embeddings.json` + `rag_manifest.json` in `knowledge-base/embeddings/` (gitignored).
4. Query: `node dist/tools.js query-kb "…"`; for many queries, `node dist/tools.js query-kb-batch` (multiple queries).
5. `node dist/tools.js verify-kb` after builds ([`knowledge-base/VERIFY.md`](knowledge-base/VERIFY.md)).

Model paths live in the `<!-- kb-config-start -->` … `<!-- kb-config-end -->` block in [`config.example.md`](config.example.md) or `config.md`.

**After changing bundled skills** (under `skills/*/`), run `node dist/tools.js build-skill-index` so `knowledge-base/embeddings/skill_index.json` stays current (used by `/route`, `/find-skill`, etc.).

## Skills

- **Rules:** [`skills/SKILL_AUTHORING_RULES.md`](skills/SKILL_AUTHORING_RULES.md) — do not add a skill folder until every mandatory item passes; **section 8** lists repo files to update with the same change.
- **Template:** [`skills/examples/skill-template/`](skills/examples/skill-template/) → `skills/<name>/`.
- **Catalog:** full list and descriptions in **[`skills/README.md`](skills/README.md)** (bundled examples table).

## Workflows

Conventions and **`w-<slug>.md`** naming: [`workflows/README.md`](workflows/README.md). Slash commands live in **`.claude/commands/`** and **`.cursor/commands/`**.

| Slash | File | Purpose |
|-------|------|---------|
| **`/w-ticket`** | [`workflows/dev/w-ticket.md`](workflows/dev/w-ticket.md) | Ticket / Kanban (`kanban/<ticket>/`, phased work) |
| **`/w-release`** | [`workflows/dev/w-release.md`](workflows/dev/w-release.md) | Release notes → implementation |
| **`/w-hotfix`** | [`workflows/dev/w-hotfix.md`](workflows/dev/w-hotfix.md) | Prod-urgent fix path |

Index: [`workflows/dev/README.md`](workflows/dev/README.md) — Markdown step contracts; no automated runner required.

## Prompt templates

- Layout: [`prompts/README.md`](prompts/README.md).
- Examples: [`templates/PROMPT_TEMPLATES.md`](templates/PROMPT_TEMPLATES.md).

## Cursor / Agent

[`AGENTS.md`](AGENTS.md) — skills install paths, slash commands (`/route`, `/optimize`, …), KB usage.

## More docs under `templates/`

[`templates/START_HERE.md`](templates/START_HERE.md), [`templates/SKILL_SYSTEM_GUIDE.md`](templates/SKILL_SYSTEM_GUIDE.md), [`templates/config.template.md`](templates/config.template.md) — some sections are historical; **this README** and **`config.example.md`** are the source of truth for this repo.

## License

MIT (add a `LICENSE` file if you publish the repo).
