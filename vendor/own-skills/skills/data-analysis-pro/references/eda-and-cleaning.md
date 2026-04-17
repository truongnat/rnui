# Exploratory analysis and cleaning

## Defaults

- Load tabular data with explicit **dtypes** where possible; parse **dates** explicitly (`parse_dates`, `dayfirst` awareness).
- **Inspect first:** `head`, `info`/`dtypes`, `describe`, missing counts per column, duplicate row counts.
- **Cardinality** before one-hot: high-cardinality IDs are usually not categorical features for naive encoding.

## Cleaning heuristics

- **Missingness:** MCAR vs systematic — document assumptions; prefer **domain** imputation over blind fill.
- **Outliers:** Use robust stats (median, IQR) and **plots**; flag extremes for review rather than silent deletion unless rules are agreed.
- **Strings:** Strip whitespace, normalize booleans and enums; watch **locale** number formats.

## SQL and SQLite

- For **`.db` / `.sqlite`**: inspect schema, then use **parameterized** queries; never interpolate untrusted user strings into SQL.

## Relationship to other skills

- **`content-analysis-pro`** — Narrative or multimodal **interpretation** of documents; **this** skill = **numeric/tabular** work.
- **`postgresql-pro`** — Production schema, migrations, RLS — when analysis becomes **persistent** data modeling.
