# Configuration — template (Markdown)

Equivalent to [config.example.md](../config.example.md) at the repo root. **Source of truth** for running scripts is `config.md` or `config.example.md` at the project root.

Copy what you need into root `config.md` (or edit `config.example.md` directly when forking this template).

---

## Knowledge base (block for scripts)

Keep the `kb-config-start` / `kb-config-end` comment lines; `build_kb.py` and `query_kb.py` only read this section.

<!-- kb-config-start -->
documents_path = knowledge-base/documents
embedding_model = sentence-transformers/all-MiniLM-L6-v2
embeddings_path = knowledge-base/embeddings/rag_embeddings.npy
manifest_path = knowledge-base/embeddings/rag_manifest.json
chunk_size = 1000
chunk_overlap = 200
<!-- kb-config-end -->

## Extensions

Other options (API keys, MCP, logging, …) can be added **in Markdown** in the same file (tables, sections) — current scripts do not parse those; they are for human docs or future tooling.
