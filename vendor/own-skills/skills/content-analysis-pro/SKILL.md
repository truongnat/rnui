---
name: content-analysis-pro
description: |
  Professional analysis of user-provided content: documents (text, PDF, slides), images (photos, screenshots, diagrams, charts), and video — structured extraction, summaries, timelines, and detailed reports with evidence references and explicit limitations.

  Use this skill when the user supplies files or describes attached media and wants **deep analysis**, **comparison**, **summarization**, **entity/action extraction**, **chart reading**, **scene or transcript review**, or a **formal-style report** with sections, citations (page/time), and confidence notes. This skill encodes **methodology and report shape**; it does not replace domain experts for legal, medical, or forensic decisions.

  Use **with** **`business-analysis-pro`** when findings must become requirements or BRD-style artifacts; **`security-pro`** when content may contain secrets or PII handling matters. This skill (`content-analysis-pro`) owns **multimodal analysis framing and reporting**; stack skills own **tooling implementation** (APIs, pipelines).

  Triggers: "analyze this image", "analyze video", "analyze PDF", "analyze document", "summarize attachment", "OCR", "transcript", "what is in this screenshot", "extract from doc", "compare these files", "timeline", "scene breakdown", "chart in image", "detailed report", "multimodal", "ffmpeg", "ffprobe", "extract frames", "video audio track".

metadata:
  short-description: Content analysis — docs, images, video, structured reports, limitations
---

# Content analysis (professional)

Use this skill when **source material** (files, pasted text, described media) must be read **carefully** and returned as **structured intelligence** — not casual chat. This skill encodes **modality-aware methods**, **evidence-linked reporting**, and **honest limits** (resolution, OCR, hallucination risk). **Optional pre-processing** (e.g. **FFmpeg** for frame/audio extraction) is a **tooling** concern — see `references/analysis-methods-and-frames.md`; the skill still governs **what** you report. Confirm **user goal**, **output format**, and **sensitivity** (PII, confidential).

## Related skills (this repo)

| Skill | When to combine with `content-analysis-pro` |
|-------|---------------------------------------------|
| **`business-analysis-pro`** | Turn extracted facts into requirements, decisions, or BRD sections |
| **`security-pro`** | Redaction, handling credentials or sensitive data seen in screenshots |
| **`seo-pro`** | Rare — only if analyzing **web** or **marketing** assets for search |
| **`data-analysis-pro`** | CSV/Parquet/SQLite **numeric** profiling, pivots, charts — not “what does this PDF say?” |
| **`image-processing-pro`** | Resize, convert, composite **images** — not semantic description of content |
| **`sql-data-access-pro`** | **Query** attached `.db` / **SQL** exploration with **stdlib** — not Postgres **RLS** tuning |
| **`postgresql-pro`** | **Server** PostgreSQL schema, migrations, **EXPLAIN**, ops |

**Boundary:** **`content-analysis-pro`** = **read and report** on provided content (one skill for all modalities — avoid duplicating “read-only” PDF vs doc skills). **`business-analysis-pro`** = **business problem framing** and delivery artifacts. **Authoring** spreadsheets/charts or **pixel** image transforms → **`data-analysis-pro`** / **`image-processing-pro`**.

## When to use

- User provides **documents**, **images**, or **video** (or paste) and wants **detail**, not one-line answers.
- **Extraction** — tables, entities, dates, action items, quotes with references.
- **Synthesis** — Summary, timeline, comparison across sources.
- **Quality** — Note **uncertainty**, **illegible** regions, **missing context**.
- Trigger keywords: `analyze`, `PDF`, `image`, `video`, `screenshot`, `transcript`, `OCR`, `report`, …

## Workflow

1. Confirm **goal** (summarize vs extract vs compare), **modality**, and **constraints** (length, language, redaction).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **business requirements packaging** to **`business-analysis-pro`** when appropriate.
3. Respond using **Suggested response format**; note **fidelity** limits and **residual** uncertainty.

### Operating principles

1. **Ground in the source** — Cite page, timestamp, or visible region; separate **quote** from **interpretation**.
2. **No fabricated facts** — If unclear, say so; **inference** must be labeled.
3. **Structured output** — Headings, bullets, tables; **executive layer** + **detail** when useful.
4. **Modality-aware** — Different checks for **scanned text**, **charts**, **video scenes**.
5. **Safety and privacy** — Minimize reproduction of secrets; refuse harmful requests (**`security-pro`**).
6. **Human-in-the-loop** for **high-stakes** domains (legal, medical, financial) — analysis assists, does not replace experts.

### Analysis methods and frames (summary)

- Per-modality angles; **frames** (entities, timeline, claims); video **timestamps**; image **OCR/chart** cautions.

Details: [references/analysis-methods-and-frames.md](references/analysis-methods-and-frames.md)

### Reporting and limitations (summary)

- Report **sections**, **evidence map**, **confidence**; **hallucination** and **OCR** limits; PII handling.
- **Repeatable** CLI steps (same FFmpeg/OCR every time) → document or add a **project script**; this repo’s shared helpers are under **`scripts/`** (see **`repo-tooling-pro`**).

Details: [references/reporting-and-limitations.md](references/reporting-and-limitations.md)

### Tips and tricks (summary)

- Goal-first, outline-first, **sampling** strategy for long video, **scanned PDF** caveats.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Corrupt files, illegal content, **deepfakes**, **satire**, **password PDFs**, **token limits**.

Details: [references/edge-cases.md](references/edge-cases.md)

### Scope and file-format dispatch (summary)

- **Analysis vs authoring** — this skill does not own building Excel/PDF/slides; **SQLite / Parquet / locked Office** routing in one table.

Details: [references/file-formats-dispatch-and-scope.md](references/file-formats-dispatch-and-scope.md)

### Suggested response format (implement / review)

1. **Issue or goal** — What the user provided and what they need from it.
2. **Recommendation** — Analysis approach (sections, timeline, extraction list) and handoff to **`business-analysis-pro`** / **`security-pro`** if needed.
3. **Code** — Structured report body, tables, or evidence list — **or** markdown template; still labeled **Code** for consistency.
4. **Residual risks** — Uncertainty, unread regions, model bias, need for human review.

## Resources in this skill

- `references/` — methods, reporting, tips, edge cases.

| Topic | File |
|-------|------|
| Methods & frames | [references/analysis-methods-and-frames.md](references/analysis-methods-and-frames.md) |
| Reporting & limitations | [references/reporting-and-limitations.md](references/reporting-and-limitations.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |
| Scope & format dispatch | [references/file-formats-dispatch-and-scope.md](references/file-formats-dispatch-and-scope.md) |

## Quick example

**Input:** User uploads a screenshot of a dashboard chart — “Is revenue growing?”  
**Expected output:** Describe **chart type**, **axes**, **visible** trend; **no** exact numbers if unreadable; **confidence**; suggest higher-res crop if ambiguous.

## Checklist before calling the skill done

- [ ] **Goal** and **output shape** matched.
- [ ] Findings **tied** to evidence (page/time/region) where applicable.
- [ ] **Limitations** and **uncertainty** stated; **inference** labeled.
- [ ] **PII/sensitive** handling considered (**`security-pro`** if needed).
- [ ] **Business packaging** delegated to **`business-analysis-pro`** when the task is “requirements from this doc” not just “summarize doc.”
