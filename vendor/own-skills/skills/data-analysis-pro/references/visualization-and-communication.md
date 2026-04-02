# Visualization and communication

## Libraries

- **matplotlib** — baseline plots, full control; **seaborn** — statistical aesthetics on DataFrames (when available in the project).
- Prefer **clear labels**, **units**, **time zones** on axes; rotate tick labels when crowded.

## Common plots

- **Distribution:** histogram, KDE (with sample size caveat).
- **Relationship:** scatter (with transparency for density), hexbin for large *n*.
- **Category:** bar counts; avoid pie charts for many slices.
- **Time series:** sort index, show gaps; avoid implying continuity across missing intervals without note.

## Reporting

- Every chart: **title**, **axes**, **source** (file/query), **n** (row count).
- Export **PNG/SVG** for docs; **avoid** misleading **y-axis** truncation on bar charts.
