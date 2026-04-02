# Scope: analysis vs authoring; file-format dispatch

## Single skill, clear boundary (avoid “pdf vs pdf-reading” duplication)

This repo uses **one** multimodal skill — **`content-analysis-pro`** — for **reading, inspecting, and reporting** on user-provided content. It does **not** own **authoring** or **mutating** files (writing PDFs, building slide decks, filling Excel templates).

| If the user wants… | Primary skill |
|---------------------|---------------|
| Summarize, extract, compare, OCR, scene breakdown, evidence report | **`content-analysis-pro`** |
| Turn findings into BRD / requirements / decisions | **`business-analysis-pro`** |
| **Create** or **edit** spreadsheets, charts, pivot tables programmatically | **`data-analysis-pro`** |
| Resize, convert, composite **images** as artifacts (not semantic “what’s in this image?”) | **`image-processing-pro`** |
| Numeric EDA on CSV / Parquet / DB exports | **`data-analysis-pro`** |
| **Query** local `.db` / **SQL** (schema, safe `SELECT`) | **`sql-data-access-pro`** |
| **PostgreSQL** server, migrations, RLS, tuning | **`postgresql-pro`** |

## Quick dispatch: extra formats (attach / path)

| Format | Read / analyze | Typical libraries / notes |
|--------|----------------|---------------------------|
| **SQLite** (`.sqlite`, `.db`) | Schema discovery, row sampling, aggregate questions | `sqlite3` (stdlib), **never** execute untrusted SQL from users without review |
| **Parquet** / **Feather** | Column stats, head, dtypes | `pandas`, `pyarrow` |
| **Password-protected Office** (`.docx`, `.xlsx`, `.pptx`) | Do not guess passwords; ask user to unlock or export; analysis only **after** decryption |
| **CSV** / TSV | Preview, dtypes, missingness | `pandas` — deep statistics → **`data-analysis-pro`** |
| **PDF** | Text vs scan vs mixed; OCR limits | Same skill; choose extraction path per file (no separate “pdf-only” skill in this repo) |
| **Jupyter** (`.ipynb`) | JSON structure — cells, outputs; “what did this notebook do?” | Parse as JSON or `nbformat`; large outputs → **sample** cells; execution **order** matters |
| **YAML** / **TOML** | Config / infra as text | Parse with `yaml` / `tomllib` (Py 3.11+) — **secrets** often here → **`security-pro`** |
| **OCR** (pytesseract) | Image text extraction | **Python** `pytesseract` requires **system** Tesseract (`apt`/`brew` **install** `tesseract-ocr`) — **pip alone is not enough** |

## Why this table exists

Agents can land on the right **workflow** without two overlapping skills for “read PDF.” **Manipulation** (merge PDFs, redact, build workbooks) belongs in implementation skills or **`data-analysis-pro`** / **`image-processing-pro`**, not in **`content-analysis-pro`**.
