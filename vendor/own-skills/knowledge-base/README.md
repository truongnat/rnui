# Knowledge base

Source Markdown for manual lookup, agents following [INDEX.md](INDEX.md), or **RAG** via `scripts/build_kb.py` / `scripts/query_kb.py`.

**Verification:** see [VERIFY.md](VERIFY.md) and run `python scripts/verify_kb.py` after each build.

## Convention

1. **Place files** by topic: `documents/<domain>/<file-name>.md` (lowercase, hyphens).
2. **Optional metadata** at the top of each file as a Markdown table or list, for example:

| Field | Value |
|-------|-------|
| title | Display title |
| summary | One-line description |
| tags | tag1, tag2 |
| updated | 2026-03-31 |

3. **Update [INDEX.md](INDEX.md)** when adding or changing important docs (topic → path → short description).
4. **Do not** commit vectors/index to git — see root `.gitignore`; `embeddings/` holds `rag_embeddings.npy` and `rag_manifest.json` produced by `scripts/build_kb.py`.

## Directories

| Path | Contents |
|------|----------|
| `documents/` | Source-of-truth Markdown (policies, runbooks, product, …) |
| `embeddings/` | Local RAG index `.npy` + `.json` (generated — ignored) |
