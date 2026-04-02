# Repo tooling tips

- Put **golden queries** in a `queries.txt` and run **`query_kb_batch.py -f queries.txt --json`** for repeatable checks.
- Run **`validate_skills.py`** in **pre-commit** or **CI** after adding skills (matches `SKILL_AUTHORING_RULES.md` §8).
- Use **`list_skills.py --json`** to feed agent context without parsing Markdown tables.
- After large `documents/` changes, **rebuild** KB before trusting retrieval quality.
