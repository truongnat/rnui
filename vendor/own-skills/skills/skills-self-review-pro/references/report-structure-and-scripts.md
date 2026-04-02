# Automation gap report (`analyze_skills`)

## What it measures

- **Signals:** Keywords suggesting CLI, CI, FFmpeg, shell, OCR, batch work.
- **Mitigation:** Mentions of `scripts/`, `query_kb`, `validate_skills`, `repo-tooling-pro`, `analyze_skills`, etc.
- **Tiers:** `strong` / `consider` / `low` / `ok` / `exempt` / `unknown`.

## How to run

```bash
# Full self-review for THIS repo (tier counts, all skills, manual checklist)
python scripts/analyze_skills.py --self-review

# Heuristic only (tiers + table); use --with-references for stronger signals
python scripts/analyze_skills.py --markdown

# Actionable tiers only; if empty, the script still prints tier distribution + full table
python scripts/analyze_skills.py --with-references --only-actionable --markdown
```

## Interpreting gaps

| Tier | Typical action |
|------|----------------|
| **strong** | Add or link a helper under `scripts/`, or document repeatable commands in `SKILL.md`. |
| **consider** | Score **≥ 6** (after weights); if users repeat the same steps, add a workflow or script link. |
| **low** | Includes **domain** skills (`deployment-pro`, `testing-pro`, …) where CI/automation words are **expected** in prose — not a defect. |
| **ok** | Already references repo tooling — no automation gap from this heuristic. |
| **exempt** | `repo-tooling-pro` — meta skill. |

Heuristic details: **`scripts/analyze_skills.py`** uses low weight for generic **CI/pipeline** mentions to reduce false positives.

## Limits

- Does **not** check section order, frontmatter quality, or duplicate scope — use **`validate_skills`** + **`SKILL_AUTHORING_RULES.md`** for that.
