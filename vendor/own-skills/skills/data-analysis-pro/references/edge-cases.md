# Edge cases

- **Leaky** train/test — time-ordered data needs **time-based** splits, not random shuffles.
- **Simpson’s paradox** and **confounding** — aggregate trends can invert within groups.
- **PII** in tabular exports — mask or aggregate before sharing plots (**`security-pro`**).
- **Excel** row limits and **float** precision — avoid using Excel as the only source of truth for IDs.
