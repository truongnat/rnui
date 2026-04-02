# How to verify the knowledge base and scripts

You cannot prove **100% correctness** of *semantic search quality* without defining expected answers (golden tests). You **can** prove **100%** that the **pipeline is wired correctly**: config loads, files are indexed, embeddings match the manifest, and queries run without errors.

## 1. Automated checks (recommended)

```bash
# From repo root, with venv activated and: pip install -r requirements.txt

# List files and chunk counts (no model download for full encode in dry-run... actually dry-run skips encode - good)
python scripts/build_kb.py --dry-run

# Build or rebuild index
python scripts/build_kb.py

# Verify invariants + optional retrieval smoke test
python scripts/verify_kb.py

# Manual query
python scripts/query_kb.py "skills directory" -k 3
```

**What `verify_kb.py` checks**

| Check | Meaning |
|-------|--------|
| `config.md` / `config.example.md` has `kb-config` block | Parser works |
| At least one `.md` under `documents_path` | Nothing to index otherwise |
| If index files exist: row count = manifest length | No desync after partial writes |
| Embedding matrix is 2-D, reasonable dtype | `numpy` load OK |
| Every manifest row has `id` | JSON integrity |
| Optional: smoke query; warns if top doc is unexpected | Heuristic only |

## 2. What “100% working” means in practice

- **Structural / mechanical correctness:** use `verify_kb.py` + successful `build_kb.py` + `query_kb.py` exit code 0. This is as close to “100%” as you get for plumbing.
- **Retrieval quality** (right chunk for a question): requires **golden tests** — store `(query, expected_source_path)` pairs and assert the top-k sources contain the expected file. The repo does not ship a large suite; add your own in CI if needed.

## 3. Quick manual checklist

- [ ] `python scripts/build_kb.py --dry-run` shows expected file count and chunk count
- [ ] After `build_kb.py`, `rag_embeddings.npy` and `rag_manifest.json` exist under `knowledge-base/embeddings/`
- [ ] `python scripts/verify_kb.py` exits 0
- [ ] `query_kb.py` with a phrase from *your* doc returns that doc in top-k (spot-check)

## 4. If something fails

| Symptom | Likely cause |
|---------|----------------|
| `No kb-config block` | Missing `<!-- kb-config-start/end -->` in `config.md` |
| `Index not found` | Run `build_kb.py` first |
| `Manifest length does not match` | Re-run `build_kb.py` (crash mid-write) |
| `UnicodeEncodeError` on Windows | Use UTF-8 terminal or updated `query_kb.py` (wraps stdout) |
| Wrong top search result | Normal for small corpus; tune chunks, model, or add more docs |
