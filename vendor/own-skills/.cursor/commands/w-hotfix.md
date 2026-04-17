# /w-hotfix — Run the hotfix workflow

You are executing the **hotfix** workflow (**file** [`workflows/dev/w-hotfix.md`](../../workflows/dev/w-hotfix.md)).

## User input

$ARGUMENTS

## Instructions

1. **Read** [`workflows/dev/w-hotfix.md`](../../workflows/dev/w-hotfix.md) in full (Metadata, Inputs, Outputs, Steps, Notes).
2. **Resolve inputs:** `symptom` (required); `prod_ref` and `stack` from `$ARGUMENTS` or ask.
3. **Execute Steps 1–6 in order** using the listed **Skill** (`skills/<name>/SKILL.md`). Keep scope minimal; hotfix is not a full [`w-ticket`](../../workflows/dev/w-ticket.md) cycle.
4. **Report** using `hotfix_branch`, `fix`, `deploy_notes`, `merge_followup`.

## Rules

- Prefer **`git-operations-pro`** + **`deployment-pro`** discipline: branch from production line, deploy with rollback plan, merge back to dev/main.
- For DB or risky changes, combine **`postgresql-pro`** / **`security-pro`** as in the workflow Notes.
