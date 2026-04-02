# Configuration (example)

Copy this file to `config.md` and adjust values. Add `config.md` to `.gitignore` if it contains sensitive paths.

## Knowledge base (for `scripts/build_kb.py` and `scripts/query_kb.py`)

Scripts only read the **machine-readable** block below (keep the two marker comment lines).

<!-- kb-config-start -->
documents_path = knowledge-base/documents
embedding_model = sentence-transformers/all-MiniLM-L6-v2
embeddings_path = knowledge-base/embeddings/rag_embeddings.npy
manifest_path = knowledge-base/embeddings/rag_manifest.json
chunk_size = 1000
chunk_overlap = 200
skill_index_path = knowledge-base/embeddings/skill_index.json
skill_embeddings_path = knowledge-base/embeddings/skill_embeddings.npy
<!-- kb-config-end -->

## Notes

- `documents_path`: root directory of `.md` files to index.
- `embedding_model`: Hugging Face / sentence-transformers model name.
- `embeddings_path` / `manifest_path`: files produced by the build (gitignored).
- `chunk_size` / `chunk_overlap`: chunking parameters when splitting documents.

## Project (reference — not required for scripts)

| Field | Example value |
|-------|-----------------|
| Repo name | own-skills |
| Version | 1.0.0 |
