# Spreadsheets: charts, pivots, layout, validation (openpyxl / pandas)

## When users ask for Excel features

| Need | Typical approach |
|------|------------------|
| **Pivot-style summaries** | `pandas.pivot_table` / `groupby` + `agg` — export to Excel if required |
| **Charts** (bar, line, pie) | **openpyxl** chart API: `BarChart`, `LineChart`, `PieChart` attached to `Reference` ranges; keep data on a **sheet** and bind series explicitly |
| **Freeze panes** | `worksheet.freeze_panes = "B2"` (cell **below and right** of the split) |
| **Data validation** | `DataValidation` with `type="list"` and `formula1` for dropdowns; or numeric ranges (`whole`, `decimal`) |
| **Business templates** | Prefer **validation + named ranges** for maintainability |

## Limits

- **openpyxl** does not replicate full Excel pivot engine server-side — **pandas** pivot then **write** results is the usual pattern.
- **Macros** (`.xlsm`) — security-sensitive; treat as **untrusted** unless explicitly in scope.

## Boundary

- **`content-analysis-pro`** — **Read and interpret** attachments; **this** file — **author** or **modify** workbook structure for analytics deliverables.
