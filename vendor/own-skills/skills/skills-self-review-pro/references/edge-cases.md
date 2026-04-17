# Edge cases

- **False positives:** A skill mentions “CI” in prose only — tier may be `consider` without needing a new script.
- **False negatives:** A skill needs scripts but uses **neutral** wording — heuristic misses; rely on human review.
- **Template folder:** `examples/skill-template` — use `--include-template` if you validate the template too.
- **Non-bundled skills** — this repo’s scripts only scan `skills/*/SKILL.md` by default; private forks may add paths manually.
