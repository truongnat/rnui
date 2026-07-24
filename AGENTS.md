# Agent Rules

This is the **short entrypoint**. Prefer layered reading — do not load every doc.

## Must-read order (every task)

1. `.agents/START_HERE.md` (**2 minutes**) — path Quick/Lite/Full + commands
2. `.agents/settings.yaml` and `.agents/PRJ_REFERENCE.md` (after `init`)
3. `.agents/SKILL_PREAMBLE.md` when invoking a first-party skill
4. The skill’s `SKILL.md` Contract (+ steps when present)
5. `.agents/WHAT_NEXT.md` when unsure which skill to run
6. `.agents/AGENT_POLICY.md` / `AGENT_WORK.md` / `MIGRATION.md` **only when needed**

Re-read settings at the start of every task and every skill invocation. Never
cache `language` across turns. Default language: `en`. Prose follows `language`;
**headings and template keys stay English** (shared form). Do not mix VI/EN in
one artifact body. Blocking unknowns → **Confirm-first** + **Ask method** in
`SKILL_PREAMBLE.md` (STOP, then ask — never quiz-as-document).

## Architecture (map)

| Path | Role |
| --- | --- |
| `AGENTS.md` | This short entrypoint |
| `.agents/START_HERE.md` | 2-minute start |
| `.agents/WHAT_NEXT.md` | Situation → skill map |
| `.agents/` | **Kit** — skills, tools, settings, policy |
| `.agents/AGENT_POLICY.md` | Detailed policy (reference) |
| `.agents/settings.yaml` | Lean knobs |
| `.agents/PRJ_REFERENCE.md` | Generated project facts |
| `.agents/SKILL_PREAMBLE.md` | Shared skill rules |
| `.agents/skills/` | Invokable skills |
| `.agents/tools/` | session, lint, build_context, detect_agents, delegate_worker, … |
| `.agent-work/` | **Work** — sessions + memory (nested git; `session.sh commit` / `archive`) |
| `.agents/examples/` | Good/bad session shapes |
| `.agents/MIGRATION.md` | Host upgrade notes |

### Skill architecture

- `SKILL.md` is authoritative. First-party skills have **Contract** + `agents/openai.yaml`.
- Tiny clear fix → **`quick-fix`** (Path=Quick). Unclear → Lite/Full lifecycle.
- Inventory: `docs/first-party-skills.json`. Profiles: `core` default.
- Validate: `validate_artifacts.py` + `lint_artifacts.py`. Handoff pack: `build_context.py`.
- Kit vs Work: [AGENT_WORK.md](./AGENT_WORK.md).

## Skill compliance

1. START_HERE → preamble (when pointed) → `SKILL.md` → Contract.
2. Produce required artifacts; stop on safety / Spec quality / Quick violations.
3. Before `review` Ready / `done`: `validate_artifacts.py` **and** `lint_artifacts.py` OK.
4. Prefer `session.sh help` / `doctor` over inventing paths.

## Hard stops (summary)

Full text in `AGENT_POLICY.md`. Never: leak secrets; irreversible destructive
commands without confirmation; weaken auth/TLS; hide security findings.

## Workflow (summary)

- `session.sh help|doctor|current|status`
- **Quick:** `quick-fix` → sync (`PASS`) → execution → review → done
- **Full:** brainstorming → business-analysis → design → planning → sync → …
- Step ledger + Spec quality on Full/Lite step skills; Quick forbids BA/design
- TASK Dev context + `[Source:]`; Readable writing mandatory

## Detailed policy

Reference only: `.agents/AGENT_POLICY.md`. If conflict, policy wins on substance;
this file wins on reading order.
