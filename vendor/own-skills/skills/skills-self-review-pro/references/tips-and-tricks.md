# Tips and tricks

- Run **`python scripts/analyze_skills.py --self-review`** before a **release** or **large skill PR**; attach output to the PR or save as `skill-self-review.md`.
- Maintainer entry point: **`skills/README.md`** section **Bundle audit** and root **`README.md`** Quick start.
- Pair with **`python scripts/verify_kb.py`** after **`knowledge-base/documents/`** edits so RAG stays aligned.
- Keep a **golden list** of skills that **should** stay `low` (pure prose) — do not force scripts on every skill.
