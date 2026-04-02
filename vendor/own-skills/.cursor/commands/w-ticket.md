# /w-ticket — Run the ticket / Kanban workflow

You are executing the **ticket** workflow (**file** [`workflows/dev/w-ticket.md`](../../workflows/dev/w-ticket.md)).

## User input

$ARGUMENTS

## Instructions

1. **Read** [`workflows/dev/w-ticket.md`](../../workflows/dev/w-ticket.md) in full (Metadata, Inputs, Outputs, **Ticket / Kanban layout**, Steps, Notes).
2. **Resolve inputs:** ticket id (ask if missing). Optional: `domain_stack`, `issue_spec` from `$ARGUMENTS` or the open project context.
3. **Execute Steps 1–7 in order.** For each step, apply the listed **Skill** by reading that skill’s **`skills/<name>/SKILL.md`** only (bundled catalog: [`skills/README.md`](../../skills/README.md)). Do not skip conditional steps without explicit user confirmation (e.g. Step 2 only when a new bundled skill is truly needed per [`skills/SKILL_AUTHORING_RULES.md`](../../skills/SKILL_AUTHORING_RULES.md) section 1).
4. **Report** using the workflow’s output variables where helpful: `kanban_tree`, `implementation`, `closing_reports`, `bundle_state`.

## Rules

- **Paths and phases** for `kanban/<ticket>/` are defined **in** [`workflows/dev/w-ticket.md`](../../workflows/dev/w-ticket.md) (section *Ticket / Kanban layout*). There is no separate `ex/ticket` contract.
- **Pick skills** from the full bundled set under [`skills/`](../../skills/) — use the README table and `node dist/tools.js list-skills` when unsure.
- After adding any new `skills/<name>/`, follow **`skills/SKILL_AUTHORING_RULES.md` section 8** and run **`node dist/tools.js validate-skills`** (and `node dist/tools.js build-skill-index` as listed in the workflow).
