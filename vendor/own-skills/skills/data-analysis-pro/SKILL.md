---
name: data-analysis-pro
description: |
  Professional data analysis in Python: exploratory data analysis (EDA), cleaning, descriptive statistics, pandas workflows, Parquet/CSV/SQLite IO, visualization (matplotlib/seaborn-style), pivot-style summaries, and spreadsheet deliverables (openpyxl charts, freeze panes, validation).

  Use this skill when the user asks to **analyze** CSV/Parquet/SQLite exports, profile a dataset, plot distributions or trends, build pivot-style tables, or **author** Excel features (charts, validation, frozen headers) — not for multimodal “what does this PDF/image mean?” interpretation.

  Use **with** **`content-analysis-pro`** when the task mixes **narrative documents** and **tabular** extracts; **`postgresql-pro`** when analysis leads to **schema** or warehouse design; **`business-analysis-pro`** when outputs feed **requirements** or KPI definitions. This skill (`data-analysis-pro`) owns **tabular analytics and viz**; **`content-analysis-pro`** owns **semantic reading** of unstructured attachments.

  Triggers: "analyze CSV", "pandas", "EDA", "Parquet", "pivot table", "matplotlib", "seaborn", "describe()", "missing values", "outliers", "correlation", "histogram", "openpyxl", "BarChart", "data validation", "freeze panes", "SQLite analyze", "profiling".

metadata:
  short-description: Data analysis — EDA, pandas, viz, Parquet/SQLite, Excel charts & validation
---

# Data analysis (professional)

Use **[pandas](https://pandas.pydata.org/docs/)** and your stack’s **official** plotting docs for API truth; this skill encodes **EDA discipline**, **honest statistics**, and **spreadsheet** delivery patterns. Confirm **Python version**, **environment** (notebook vs batch), and **data sensitivity** (PII, production DB vs sample).

## Related skills (this repo)

| Skill | When to combine with `data-analysis-pro` |
|-------|----------------------------------------|
| **`content-analysis-pro`** | Unstructured **PDF/image/video** meaning — not pivot tables |
| **`business-analysis-pro`** | Turn metrics into **requirements**, KPIs, or BRD sections |
| **`postgresql-pro`** | From ad-hoc SQL to **migrations**, indexing, or RLS when the database becomes the product |
| **`security-pro`** | Anonymization, **exports** of sensitive data, notebook sharing |
| **`repo-tooling-pro`** | Batch **KB** queries over this repo’s Markdown — unrelated to pandas unless orchestrating scripts |

**Boundary:** **`data-analysis-pro`** = **tabular** analytics and **charted** communication; **`content-analysis-pro`** = **interpretation** of documents and media.

## When to use

- **EDA** — dtypes, missingness, duplicates, simple aggregates.
- **Cleaning** — Imputation assumptions, outliers, string normalization (with documented trade-offs).
- **Visualization** — Histograms, scatter, bar, time series with honest axes.
- **Pivot-style** summaries — `pivot_table`, `groupby`, export to Excel.
- **Spreadsheet authoring** — openpyxl **charts**, **freeze_panes**, **DataValidation**.
- Trigger keywords: `pandas`, `CSV`, `Parquet`, `EDA`, `pivot`, `matplotlib`, `histogram`, `openpyxl`, …

## Workflow

1. Confirm **data location** (file path, DB), **columns of interest**, **output** (notebook vs script vs Excel), and **privacy** constraints.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **BRD** packaging to **`business-analysis-pro`** when the ask is product scope, not plots.
3. Respond using **Suggested response format**; note **sample bias**, **leakage**, and **reproducibility** risks.

### Operating principles

1. **Look at the data** — `head`, counts, dtypes before models or charts.
2. **Label uncertainty** — Missing data and outliers are **claims**; document handling.
3. **Plots serve questions** — One clear question per figure where possible.
4. **Reproducibility** — Fixed seeds when randomness is used; note package versions for non-trivial work.
5. **Spreadsheet features** — Prefer **pandas** for logic, **openpyxl** for Excel-specific presentation.
6. **Security** — Treat exports and notebooks as **potential data leaks** by default.

### EDA and cleaning (summary)

- Dtypes, missingness, duplicates, SQLite **parameterized** queries, cleaning heuristics.

Details: [references/eda-and-cleaning.md](references/eda-and-cleaning.md)

### Visualization and communication (summary)

- Matplotlib/seaborn-style patterns; honest axes; export and reporting habits.

Details: [references/visualization-and-communication.md](references/visualization-and-communication.md)

### Spreadsheets: charts, pivots, validation (summary)

- **Pivot_table** vs Excel pivot engine; **BarChart** / **LineChart** / **PieChart**; **freeze_panes**; **DataValidation**.

Details: [references/spreadsheets-charts-and-validation.md](references/spreadsheets-charts-and-validation.md)

### Tips and tricks (summary)

- Seeds, Parquet projection, Excel/UTF-8 quirks.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Leakage, Simpson’s paradox, PII in plots, Excel precision limits.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Dataset shape, question, and deliverable (figure, table, `.xlsx`).
2. **Recommendation** — EDA steps, plot types, or openpyxl feature choice; cite **Related skill** for non-tabular work.
3. **Code** — pandas / matplotlib / openpyxl snippets or notebook outline — still labeled **Code**.
4. **Residual risks** — Bias, leakage, unstable aggregates, PII exposure.

## Resources in this skill

- `references/` — EDA, visualization, spreadsheets, tips, edge cases.

| Topic | File |
|-------|------|
| EDA & cleaning | [references/eda-and-cleaning.md](references/eda-and-cleaning.md) |
| Visualization | [references/visualization-and-communication.md](references/visualization-and-communication.md) |
| Spreadsheets (charts, validation) | [references/spreadsheets-charts-and-validation.md](references/spreadsheets-charts-and-validation.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “This CSV has 200k rows — is revenue trending up?”  
**Expected output:** Load sample with dtypes; plot **time-aggregated** series; note **missing days** and **seasonality** caveats; suggest **grouped** analysis if multiple products.

## Checklist before calling the skill done

- [ ] **EDA** steps match the **question** (not a kitchen-sink notebook).
- [ ] **Missing** and **outliers** addressed or explicitly deferred with reason.
- [ ] **Charts** have labels, units, and **n** where relevant.
- [ ] **Excel** features justified if used (chart ranges, validation lists).
- [ ] Unstructured **“read this PDF”** work routed to **`content-analysis-pro`** when dominant.
