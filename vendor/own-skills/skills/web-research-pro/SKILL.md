---
name: web-research-pro
description: |
  Professional multi-step web and technical research: query decomposition, source hierarchy (official docs first), cross-checking, recency/version awareness, citation habits, and handling stale or moved documentation URLs.

  Use this skill when the user needs **reliable** answers from **external** sources (framework docs, APIs, standards), **not** only local Markdown — or when combining **local KB** with **web** verification. Complements **`repo-tooling-pro`** (local RAG scripts) but does not replace **reading** `knowledge-base/documents/` when the answer is already in-repo.

  Use **with** **`repo-tooling-pro`** when the corpus is **this** repo’s KB; **`security-pro`** when sources might touch **secrets** or **unsafe** links. This skill (`web-research-pro`) owns **research method and citations**; stack skills own **implementation details**.

  Triggers: "search the docs", "official documentation", "404", "source evaluation", "citation", "compare sources", "multi-step research", "API reference", "changelog", "is this still true", "link rot".

metadata:
  short-description: Web research — sources, citations, recency, stale docs, KB complement
---

# Web research (professional)

Use **vendor official documentation** and **primary** repositories for **API truth**; this skill encodes **how** to search, **verify**, and **cite** — not a replacement for domain-specific **`security-pro`** or legal advice. Confirm **product**, **version**, and whether **local** KB (this repo) should be queried first.

## Related skills (this repo)

| Skill | When to combine with `web-research-pro` |
|-------|----------------------------------------|
| **`repo-tooling-pro`** | **`query_kb` / `query_kb_batch`** when **`knowledge-base`** is built and relevant |
| **`security-pro`** | Untrusted links, **paste** from unknown sites, **supply chain** |
| **`data-analysis-pro`** / **`content-analysis-pro`** | Research is **supporting** analysis — not the same as EDA or multimodal read |
| **`skills-self-review-pro`** | After **`analyze_skills`**, use **official docs** to **tech-refresh** the skill bundle |

**Boundary:** **`web-research-pro`** = **finding and weighing** external information; **`repo-tooling-pro`** = **running** local RAG scripts on **indexed** Markdown.

## When to use

- **Framework** or **API** behavior **not** in the local project.
- **Comparing** multiple sources or **resolving** a **404** / moved doc path.
- **Version-specific** questions (requires **release notes** or **changelog**).
- **Citations** — user wants **links** and **traceable** claims.
- Trigger keywords: `official docs`, `citation`, `404`, `changelog`, `source`, …

## Workflow

1. Confirm **scope** (library, version), **local KB** availability, and **freshness** needs.
2. Apply the principles and topic summaries below; open `references/` when you need depth; run **`query_kb`** when **`knowledge-base`** may already hold the answer (**`repo-tooling-pro`**).
3. Respond using **Suggested response format**; note **staleness** and **single-source** risk.

### Operating principles

1. **Official first** — Primary docs and **source** repos beat random tutorials.
2. **Version pinned** — Match **runtime** and **doc** generation when possible.
3. **Verify** — Cross-check **signatures** and **defaults**; **breaking** changes in changelogs.
4. **Cite** — Stable URLs; **short** quotes when precision matters.
5. **404s** — **Search** vendor site for **symbol**; do not assume first hit is current.
6. **Local KB** — Prefer **indexed** `documents/` when authoritative **for this project**; **web** when upstream or external.

### Workflow and source evaluation (summary)

- Decomposition, **authority**, **recency**, **cross-check**; relation to **`query_kb`**.

Details: [references/workflow-sources-and-evaluation.md](references/workflow-sources-and-evaluation.md)

### Citations and stale URLs (summary)

- Canonical links, **404** handling, **KB** rebuild vs stale vectors.

Details: [references/citations-and-stale-urls.md](references/citations-and-stale-urls.md)

### Tips and tricks (summary)

- Query log, **site:** filters, version in search strings.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Conflicting sources, SEO spam, **AI** summaries as unreliable primary.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — What must be **verified** externally vs **local** KB.
2. **Recommendation** — Search order, **sources** to trust, **version** to lock.
3. **Code** — **URLs**, **search queries**, or **query_kb** command lines — still labeled **Code**.
4. **Residual risks** — Doc drift, **single** weak source, **blocked** regions.

## Resources in this skill

- `references/` — workflow, citations, tips, edge cases.

| Topic | File |
|-------|------|
| Workflow & evaluation | [references/workflow-sources-and-evaluation.md](references/workflow-sources-and-evaluation.md) |
| Citations & stale URLs | [references/citations-and-stale-urls.md](references/citations-and-stale-urls.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “Does `fetch` in Next.js 15 cache by default?” — **official** doc link returns **404**.  
**Expected output:** Search **Next.js** site for **fetch** + **cache** + **15**; cite **current** page; note **App Router** vs **Pages**; if still ambiguous, point to **release** or **GitHub** discussion with **caveat**.

## Checklist before calling the skill done

- [ ] **Primary** or **official** source preferred over **tertiary** blog.
- [ ] **Version** aligned with user’s **runtime** when it matters.
- [ ] **Local** `knowledge-base` considered when **`build_kb`** has been run.
- [ ] **404** / **moved** path handled with **search** or **archive** only as **secondary** evidence.
