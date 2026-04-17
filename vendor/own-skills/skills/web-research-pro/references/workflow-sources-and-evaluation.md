# Multi-step research workflow

## Steps

1. **Decompose** the question — separate **facts** (version-specific) from **concepts** (stable).
2. **Source hierarchy** — Prefer **official** docs and **source** repos; then reputable aggregators; avoid unattributed forum posts for **API truth**.
3. **Cross-check** — One secondary source agreeing is weak; match **primary** text (signature, parameters).
4. **Time** — Note **doc date** or **release**; frameworks change fast.

## Evaluation

- **Authority** — Who publishes the page? **Corporate** docs vs random blogs.
- **Recency** — Deprecated flags and **breaking** changes in changelogs.
- **Primary evidence** — Error messages, **source** code, spec RFCs when standards matter.

## Tools

- Use **repository** `knowledge-base/` and **`query_kb.py`** when the corpus is **local** and indexed — **web** search when facts are external or fresher than the KB.

## Relationship

- **`repo-tooling-pro`** — **This** repo’s scripts (`build_kb`, `query_kb_batch`); **this** skill — **what** to search and **how** to weigh sources.
