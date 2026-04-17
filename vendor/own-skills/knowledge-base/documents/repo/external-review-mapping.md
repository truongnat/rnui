| Field   | Value                                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| title   | External deep review → this repo                                                                                                              |
| summary | Maps a third-party “Skills Repo” audit (docx/pptx/xlsx, pdf/pdf-reading, …) to `*-pro` template; avoids duplicate work and wrong expectations |
| tags    | repo, skills, planning                                                                                                                        |
| updated | 2026-03-31                                                                                                                                    |

# Mapping external reviews → this template repo

Some **Deep Review** documents describe an Anthropic-style skill set (16× `SKILL.md`, duplicate `scripts/office/`, `pdf` vs `pdf-reading`, `file-reading`, `skill-creator`, `frontend-design`, …). **This template repo** uses **`skills/*-pro/`** (stack + analysis + tooling) — it does **not** ship standalone `docx`/`pptx`/`xlsx` skills, has **no** `scripts/office/`, and has **no** separate `pdf-reading` skill.

When “applying” such a review, map **intent** to the equivalents below — **do not** look for folders that do not exist.

## Covered in this repo (preferred mapping for reviews)

| Review item                                    | This repo                                                                                                                                                                                                                                             |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-analysis` skill                          | [`data-analysis-pro`](../../../skills/data-analysis-pro/) — EDA, pandas, viz, Parquet/SQLite, openpyxl chart / pivot / freeze / validation                                                                                                            |
| `image-manipulation`                           | [`image-processing-pro`](../../../skills/image-processing-pro/) — Pillow                                                                                                                                                                              |
| `web-research` + 404 docs                      | [`web-research-pro`](../../../skills/web-research-pro/) — sources, citations, stale URLs                                                                                                                                                              |
| `code-packaging` / Docker / GHA                | [`code-packaging-pro`](../../../skills/code-packaging-pro/) — split from [`deployment-pro`](../../../skills/deployment-pro/)                                                                                                                          |
| `frontend-design` a11y / responsive / font     | [`design-system-pro`](../../../skills/design-system-pro/) → `references/a11y-responsive-and-web-typography.md`; native mobile → [`mobile-design-pro`](../../../skills/mobile-design-pro/)                                                             |
| SQLite / Parquet / file dispatch               | [`content-analysis-pro`](../../../skills/content-analysis-pro/) → `references/file-formats-dispatch-and-scope.md` (covers `.ipynb`, YAML/TOML, OCR/Tesseract); **SQL file** workflows → [`sql-data-access-pro`](../../../skills/sql-data-access-pro/) |
| `database` / `sql` (query `.db`)               | [`sql-data-access-pro`](../../../skills/sql-data-access-pro/) — handoff to Postgres → [`postgresql-pro`](../../../skills/postgresql-pro/)                                                                                                             |
| `git-operations`                               | [`git-operations-pro`](../../../skills/git-operations-pro/)                                                                                                                                                                                           |
| `frontend-design` performance (lazy load, CLS) | [`design-system-pro`](../../../skills/design-system-pro/) → `references/web-performance-basics.md`                                                                                                                                                    |
| Avoid duplicate “read PDF” vs “create PDF”     | One content-analysis skill + dispatch table (not two separate `pdf` skills)                                                                                                                                                                           |

## Not directly applicable (no matching artifact)

| Review item                                                                            | Note                                                                            |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Merge `scripts/office/` three ways                                                     | No `scripts/office/` in this repo                                               |
| Merge `pdf` + `pdf-reading`                                                            | Those two skills are not present                                                |
| Gaps `docx` / `pptx` / `xlsx` / `pptxgenjs` / `brand-guidelines` / `canvas-design` / … | **Different** skill family; fork or add domain skills if you need parity        |
| `skill-creator` / `mcp-builder` overlap                                                | Not bundled under `skills/` — use IDE-installed skills (Codex/Cursor) if needed |

## Optional follow-ups

- **docx/pptx/xlsx** domain skills like Anthropic’s set — **not** in this template; fork or add a separate package.
- Extra Postgres runbooks — team-specific; **`sql-data-access-pro`** already separates SQLite from **`postgresql-pro`**.

## Source

Original reviews are standalone documents (truongnat/skills or other public skill repos); this file only **positions** them against the current template.
