# Workflow: ticket

End-to-end **ticket / Kanban** execution using **only bundled skills** under [`skills/`](../../skills/) in this repo (`skills/<name>/SKILL.md`). Pick domain and tooling skills from the **[`skills/README.md`](../../skills/README.md)** catalog (and `node dist/tools.js list-skills` from repo root for a full list). Work is tracked under **`kanban/<ticket>/`** per the **on-disk contract** below — no separate `ex/` package.

**Domain:** `dev` — this file lives under **`workflows/dev/`**. **Filename** follows **`w-<slug>.md`** (see [`workflows/README.md`](../README.md#naming)).

**Invoke:** `/w-ticket` (see [`.claude/commands/w-ticket.md`](../../.claude/commands/w-ticket.md)).

## Metadata

| Field | Value |
|-------|-------|
| **id** | `ticket` |
| **version** | 1.1 |

## Inputs

| Variable | Required | Description |
|----------|----------|-------------|
| `ticket` | Yes | Ticket id (e.g. `PROJ-123`, `42`) — matches `kanban/<ticket>/` |
| `domain_stack` | No | Hint for which bundled skills apply (e.g. NestJS + Postgres + testing) — maps to `*-pro` entries in [`skills/README.md`](../../skills/README.md) |
| `issue_spec` | No | Path or summary of `issue.md` / tracker body — feeds plan and acceptance criteria |

## Outputs

| Variable | Description |
|----------|-------------|
| `kanban_tree` | Paths under `kanban/<ticket>/` with `meta.json` and versioned artifacts |
| `implementation` | Code + tests per active work phase |
| `closing_reports` | `report_ticket.md`, summary, etc. per done phase |
| `bundle_state` | `validate_skills` result if any new `skills/<name>/` was added |

## Ticket / Kanban layout (on-disk contract)

Agents implement this **in the consuming project** (not under `skills/`). Paths are relative to that project root.

**Tree**

- `kanban/<ticket>/` — one folder per ticket id.
- `kanban/<ticket>/meta.json` — canonical phase and version pointer (see schema below).
- `kanban/<ticket>/<version>/` — e.g. `v1/`, `v2/` — phased artifacts for that version. **Active** folder is `meta.json` → `current_version`.
- Optional: `kanban/<ticket>/issue.md` — single issue description; if present, merge into `plan.md` acceptance criteria.

**`meta.json` (minimal)**

```json
{
  "ticket": "PROJ-123",
  "phase": "planning",
  "current_version": "v1",
  "updated_at": "2026-04-01T12:00:00Z"
}
```

Suggested **`phase`** values: `planning` → `work` → `review` → `done` (adjust names to your team if needed; keep `meta.json` the single source of truth).

**Artifacts under `kanban/<ticket>/<current_version>/`**

| Artifact | When |
|------------|------|
| `plan.md`, `todo.md`, `checklist.md`, `estimated.md` | Planning / before implementation |
| `report_work.md`, `gaps.md` | During implementation |
| `report_ticket.md`, `summary.md`, `message.txt` (commit message draft) | Closing / done |

If the team uses a single `issue.md` at ticket root, align **`plan.md`** and **`meta.json`** so acceptance criteria stay consistent.

## Steps

### Step 1 — `skill-inventory`

- **Type:** skill
- **Skill:** `planning-pro` (+ `business-analysis-pro` if requirements are vague)
- **Input:** `issue_spec`, `domain_stack` — list which **bundled** skills from [`skills/README.md`](../../skills/README.md) are needed (every applicable `*-pro`: backend, frontend, data, security, testing, deployment, etc.).
- **Output:** named skill list — [references/scope-and-decomposition.md](../../skills/planning-pro/references/scope-and-decomposition.md)

### Step 2 — `create-missing-skill` (conditional)

- **When:** A required capability has **no** suitable bundled skill and cannot be merged into an existing `*-pro` skill (see [`skills/SKILL_AUTHORING_RULES.md`](../../skills/SKILL_AUTHORING_RULES.md) section 1).
- **Type:** skill
- **Skill:** `skills-self-review-pro` + **`repo-tooling-pro`**
- **Actions:**
  1. Confirm **section 1** in `SKILL_AUTHORING_RULES.md` — topic is distinct and not duplicate.
  2. Copy [`skills/examples/skill-template/`](../../skills/examples/skill-template/) → `skills/<new-name>/` and complete `SKILL.md` per sections 2–7 in that document.
  3. Run **`node dist/tools.js validate-skills`** from repo root; fix until pass.
  4. Apply **section 8** in the **same change**: `skills/README.md`, root **`README.md`**, **`AGENTS.md`**, section 1 list in `SKILL_AUTHORING_RULES.md`, **`knowledge-base/documents/repo/skills-layout.md`**.
  5. Run **`node dist/tools.js build-skill-index`** so routing/embeddings see the new skill.
- **Output:** `bundle_state` — new skill folder is valid and documented.

### Step 3 — `ticket-bootstrap`

- **Type:** skill
- **Skill:** **`planning-pro`**
- **Input:** `ticket`
- **Output:** `kanban_tree` — create or align `kanban/<ticket>/` per **Ticket / Kanban layout** above: write or update `meta.json`, set `phase` and `current_version`, ensure version folder exists. Use structured planning habits from [`planning-pro`](../../skills/planning-pro/SKILL.md); this step is the **filesystem contract**, not a separate package.

### Step 4 — `plan-and-todo`

- **Type:** skill
- **Skill:** `planning-pro` (+ `business-analysis-pro` for acceptance criteria from `issue_spec`)
- **Input:** `kanban_tree` + issue content — align `plan.md`, `todo.md`, `checklist.md`, `estimated.md` under the active version folder.
- **Output:** plan artifacts ready for implementation.

### Step 5 — `implement-and-test`

- **Type:** skill
- **Skill:** every **domain** skill named in Step 1 (from [`skills/README.md`](../../skills/README.md)) + **`testing-pro`**
- **Input:** `plan-and-todo` outputs; implement per stack; record progress in `report_work.md` / `gaps.md` under the active version folder.
- **Output:** `implementation` — tests and coverage expectations per `testing-pro` ([test-pyramid-and-strategy.md](../../skills/testing-pro/references/test-pyramid-and-strategy.md)).

### Step 6 — `ticket-done-and-git`

- **Type:** skill
- **Skill:** **`planning-pro`** (closure: finalize `report_ticket.md`, `summary.md`, `message.txt`; set `meta.json` `phase` → `done`) + **`git-operations-pro`**
- **Input:** completed work — branch/PR hygiene per [`git-operations-pro`](../../skills/git-operations-pro/references/commits-and-branching.md).
- **Output:** `closing_reports`

### Step 7 — `bundle-hygiene` (if skills changed in Step 2)

- **Type:** skill
- **Skill:** `skills-self-review-pro` + **`repo-tooling-pro`**
- **Input:** optional full-tree audit after new skills landed.
- **Actions:**
  1. Run **`node dist/tools.js validate-skills`** — must pass.
  2. Run **`node dist/tools.js analyze-skills --self-review`** (add **`--include-template`** if validating the template too).
  3. Cross-check output against **`skills/SKILL_AUTHORING_RULES.md`** — [references/authoring-rules-crosscheck.md](../../skills/skills-self-review-pro/references/authoring-rules-crosscheck.md), [references/report-structure-and-scripts.md](../../skills/skills-self-review-pro/references/report-structure-and-scripts.md).
- **Output:** `report_md` + **`manual_followups`** — no authoring drift after new skills.

## Notes

- **Skill discovery:** start from [`skills/README.md`](../../skills/README.md); use **`node dist/tools.js list-skills`** for a quick inventory. Route slash commands (`/route`, `/find-skill`) use **`knowledge-base/embeddings/skill_index.json`** after **`build-skill-index`**.
- **`kanban/`** lives in the **application project** you are delivering, not inside this skills bundle. Keep **`meta.json`** authoritative for phase/version.
- Optional **track JSON**: if you maintain a separate board file, mirror phase/status from **`meta.json`** or document one canonical source in `kanban/README.md`.
