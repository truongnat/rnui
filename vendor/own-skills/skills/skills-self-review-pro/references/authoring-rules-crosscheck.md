# Authoring rules cross-check

## Automated

1. **`python scripts/validate_skills.py`** — `name:` in frontmatter must match folder basename; fails CI if drift.
2. **`python scripts/list_skills.py --json`** — inventory for “did we forget a row in README?”

## Manual (agent or human)

Open **`skills/SKILL_AUTHORING_RULES.md`** and verify for the skill under edit:

- [ ] §2 **section order** — frontmatter, H1, Related (optional), When to use, Workflow (3 steps), Operating principles, topic summaries + `Details:`, Suggested response format, Resources, Quick example, Checklist.
- [ ] §4 **Workflow** wording — steps 2–3 match template unless documented exception.
- [ ] §5 **Suggested response** labels — **Issue or goal**, **Recommendation**, **Code**, **Residual risks**.
- [ ] §8 **same-change docs** — if adding/removing/renaming a bundled skill: `skills/README.md`, root `README.md`, `AGENTS.md`, §1 list, `skills-layout.md`, and `INDEX.md` when KB docs change.

## Duplicate scope

- Read **§1** list — new topic must not be covered by an existing `*-pro` skill without a **Related skills** boundary table.
