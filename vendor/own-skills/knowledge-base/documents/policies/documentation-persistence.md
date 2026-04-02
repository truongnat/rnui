| Field | Value |
|-------|-------|
| title | Documentation persistence policy |
| summary | When to write under knowledge-base; update INDEX; link to Cursor rule |
| tags | policy, knowledge-base, documentation |
| updated | 2026-03-31 |

# Documentation persistence policy

## Scope

- Meaningful **changes** in the repo (skill, workflow, script, KB) should leave a **trace** in `knowledge-base/documents/` or the activity log.
- **Do not** store secrets, tokens, or PII.

## Where

- **Activity log:** [../repo/activity-log.md](../repo/activity-log.md)
- **Search index:** [../../INDEX.md](../../INDEX.md)

## Process

1. Add or edit stable `.md` files under `documents/` when content is ready.
2. Update **INDEX.md** in the **same** commit as document changes.
3. After adding/editing many documents: run `python scripts/build_kb.py` and `verify_kb.py` if using RAG.

## Cursor rule

- **`.cursor/rules/documentation-persistence.mdc`** — applied to agents when persisting decisions.
