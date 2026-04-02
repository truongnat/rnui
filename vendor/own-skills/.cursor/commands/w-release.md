# /w-release — Run the release workflow

You are executing the **release** workflow (**file** [`workflows/dev/w-release.md`](../../workflows/dev/w-release.md)).

## User input

$ARGUMENTS

## Instructions

1. **Read** [`workflows/dev/w-release.md`](../../workflows/dev/w-release.md) in full (Metadata, Inputs, Outputs, Steps, Notes).
2. **Resolve inputs:** `release_notes` (required); `version_target`, `stack` from `$ARGUMENTS` or ask.
3. **Execute Steps 1–7 in order** using the listed **Skill** (`skills/<name>/SKILL.md`).
4. **Report** using `parsed_scope`, `implementation_plan`, `ship_definition`, `verification`.

## Rules

- **Notes → implementation detail** is the core handoff between Step 1–2 and Step 3; do not skip decomposition.
- For urgent prod fixes mid-release, switch mentally to [`w-hotfix`](../../workflows/dev/w-hotfix.md); for ticket-shaped work, see [`w-ticket`](../../workflows/dev/w-ticket.md) (Kanban layout and bundled `skills/` there).
