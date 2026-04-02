---
name: skill-template
description: |
  One-line professional scope for this skill.

  Use this skill when … (concrete situations, stack, user asks).

  Triggers: "keyword1", "keyword2", …

metadata:
  short-description: Short label — areas, comma-separated
---

# Skill display name (professional)

Use official [Primary docs](https://example.com) for API truth; this skill encodes **professional defaults**, **…**, and **…**. Confirm **version** / **environment** from the project when known.

## When to use

- Scenario …
- Scenario …
- Trigger keywords: `…`, `…`

## Workflow

1. Confirm … (versions, stack, constraints).
2. Apply the principles and topic summaries below; open `references/` when you need depth.
3. Respond using **Suggested response format**; note main risks (domain-specific).

### Operating principles

1. **Principle one** — …
2. **Principle two** — …

### Topic area (summary)

- Bullet …
- Bullet …

Details: [references/topic-file.md](references/topic-file.md)

### Suggested response format (implement / review)

1. **Issue or goal** — …
2. **Recommendation** — …
3. **Code** — …
4. **Residual risks** — …

## Resources in this skill

- `references/` — …; keep long content out of `SKILL.md`.

| Topic | File |
|-------|------|
| Topic A | [references/topic-file.md](references/topic-file.md) |

## Quick example

**Input:** …  
**Expected output:** …

## Checklist before calling the skill done

- [ ] Read **`skills/SKILL_AUTHORING_RULES.md`** — new skills must satisfy every mandatory rule before adding a folder under `skills/`.
- [ ] Frontmatter `description` states when to trigger; `name` matches folder name.
- [ ] Section order matches `SKILL_AUTHORING_RULES.md` §2.
- [ ] Workflow steps 2–3 follow §4; **Suggested response format** uses **Issue or goal** / **Recommendation** / **Code** / **Residual risks** (§5).
- [ ] Long docs live in `references/`, not pasted into `SKILL.md`.
