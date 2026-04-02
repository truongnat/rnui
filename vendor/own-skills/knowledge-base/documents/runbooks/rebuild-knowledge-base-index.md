| Field | Value |
|-------|-------|
| title | Rebuild knowledge base index |
| summary | Operational steps to (re)build embeddings and verify the local RAG pipeline for this repo |
| tags | runbook, knowledge-base, scripts, embeddings |
| updated | 2026-03-31 |
| status | active |

# Runbook: rebuild knowledge base index

## When to use

- After **adding, renaming, or removing** files under `knowledge-base/documents/`.
- After changing **`kb-config`** in `config.md` or `config.example.md` (paths, chunk size, model).
- When **`query_kb.py`** fails, embeddings look **stale**, or `verify_kb.py` reports desync.
- On a **new machine** or CI agent that needs a local index.

## Prerequisites

- Python **3.10–3.13** (see root `README.md`).
- Repo root as current directory.
- Virtual environment activated; dependencies installed:

```bash
pip install -r requirements.txt
```

- Optional: copy `config.example.md` to `config.md` and adjust the `<!-- kb-config -->` block if paths or model must differ from defaults.

## Steps

### 1. Dry run (optional but recommended)

```bash
python scripts/build_kb.py --dry-run
```

Confirm listed files and chunk counts match expectations. Fix path or config issues before a full encode.

### 2. Full build

```bash
python scripts/build_kb.py
```

**Note:** First run may **download** the embedding model (network, disk, RAM). Subsequent runs reuse the cache where possible.

### 3. Verify invariants

```bash
python scripts/verify_kb.py
```

Address any errors (missing manifest, row count mismatch, missing `kb-config`). See [`VERIFY.md`](../../VERIFY.md) for meaning of checks.

### 4. Smoke query

```bash
python scripts/query_kb.py "skills directory layout" -k 3
```

Exit code **0** and plausible top chunks indicate the pipeline works. Retrieval **quality** is not guaranteed by this step alone (see `VERIFY.md` §2).

## Rollback / recovery

- **Bad or partial index:** delete outputs under `knowledge-base/embeddings/` (if present), then rerun **Steps 2–4**. Git ignores generated artifacts; rebuilding is safe if source docs are intact.
- **Wrong document in results:** improve chunking, query wording, or add golden tests per `VERIFY.md`; not a rollback of embeddings alone.

## Related documents

- [`VERIFY.md`](../../VERIFY.md) — what “verified” means.
- [`config.example.md`](../../../config.example.md) — configuration block reference.

## Escalation

- Script errors (tracebacks): check Python version and `requirements.txt` pins; open an issue with command, OS, and log.
- Model download blocked: set mirror or use an allowed Hugging Face cache path in the environment (team policy).
