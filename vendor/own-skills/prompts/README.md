# Prompts

Put reusable **Markdown** (`.md`) prompt files here, for example:

- `templates/` — one file per “template” with System / User sections and `{{variable_name}}` placeholders
- `chains/` — (optional) multi-step chains described in Markdown, similar to [workflows/](../workflows/)

Example library and format notes: [templates/PROMPT_TEMPLATES.md](../templates/PROMPT_TEMPLATES.md) (described in Markdown; no required `.yaml`/`.yml`).

## Example prompt (minimal)

Full file: [templates/example-skill-assisted-task.md](templates/example-skill-assisted-task.md). Short version:

```markdown
## System prompt

You are a senior engineer. Pick the right `skills/*-pro/` skill(s) and explain why; break work into verifiable steps.

## User prompt (template)

**Goal:** {{feature_goal}}
**Stack:** {{stack}}
**Constraints:** {{constraints}}

Return (1) MVP scope, (2) risk checklist, (3) skills to combine.
```

Replace `{{feature_goal}}`, `{{stack}}`, `{{constraints}}` with real values (or let the agent fill them) before sending to the model.
