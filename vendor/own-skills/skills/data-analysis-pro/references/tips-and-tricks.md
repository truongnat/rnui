# Tips and tricks

- Save **random seeds** where sampling is used; log **pandas** version for reproducibility.
- For large Parquet datasets, **column projection** and **row filters** before `read_parquet` into memory.
- Use **`pandas` Styler** for quick HTML tables in notebooks; keep **CSV** exports UTF-8 with BOM if Excel on Windows must open them.
