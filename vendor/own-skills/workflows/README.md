# Workflows

A workflow is a **Markdown contract** (`.md` file) describing a sequence of steps: each step invokes a **skill** (by `name` in `SKILL.md`) or references a **prompt template** in `prompts/` / [templates/PROMPT_TEMPLATES.md](../templates/PROMPT_TEMPLATES.md).

This repo does **not** require an automated engine: an agent (or you) reads the file and executes steps in order; you can add a dedicated runner later.

## Naming

- **Runnable workflow files** use the prefix **`w-`**: pattern **`w-<slug>.md`** (e.g. `w-ticket.md`, `w-hotfix.md`, `w-release.md`). This matches slash commands **`/w-<slug>`** when you add **`.claude/commands/w-<slug>.md`** and **`.cursor/commands/w-<slug>.md`**.
- **Index files** only: `README.md` in `workflows/` or `workflows/<domain>/` — **no** `w-` prefix.

## Bundled workflows (by domain)

| Domain | Index | Workflows |
|--------|--------|-----------|
| **dev** | [`dev/README.md`](dev/README.md) | [`dev/w-ticket.md`](dev/w-ticket.md) (`ticket`, **`/w-ticket`**), [`dev/w-hotfix.md`](dev/w-hotfix.md) (`hotfix`, **`/w-hotfix`**), [`dev/w-release.md`](dev/w-release.md) (`release`, **`/w-release`**) |

Slash commands live under **`.claude/commands/`** and **`.cursor/commands/`** (e.g. `w-ticket.md`, `w-hotfix.md`, `w-release.md`).

## Convention (Markdown)

Each workflow should include:

1. **Title** `# Workflow: <id>`
2. **Metadata table or list** — `id`, `name`, `version`
3. **Inputs / Outputs** — variable table
4. **Steps** — each step is `###` with:
   - Type: `skill` or prompt template / doc reference
   - Skill name or template id
   - Input/output (variables may use `` `topic` ``)

## Short example

Save as **`w-my-flow.md`** (see [Naming](#naming) above).

```markdown
# Workflow: my-flow

## Metadata
| Field | Value |
|-------|-------|
| **id** | `my-flow` |
| **version** | 1.0 |

## Inputs
| Variable | Required |
|----------|----------|
| `topic` | Yes |

## Steps
### Step 1 — collect
- **Type:** skill
- **Skill:** `my-skill`
- **Input:** `query` = `topic`
```

## Layout

- Domain folders under **`workflows/<domain>/`** (e.g. **`dev/`**). Add **`README.md`** per domain when you introduce a new folder. Update root **`README.md`** when you add or move workflow files.
