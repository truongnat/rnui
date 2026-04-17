# Repo tooling edge cases

- **Batch query OOM** — Very large embedding matrices + huge batch of long queries can spike RAM; reduce batch size or split `queries.txt`.
- **Wrong cwd** — Scripts assume **repo root** as working directory; run from project root.
- **Missing index** — Batch fails the same way as single `query_kb.py` if `build_kb` not run.
- **Windows console** — UTF-8 handling matches `query_kb.py` (stdout wrapper where needed).
- **Template skill** — `list_skills --include-template` includes `examples/skill-template`; `validate_skills` only checks it with `--include-template`.
