# Pillow — imaging operations

Use **[Pillow (PIL)](https://pillow.readthedocs.io/)** for raster work: open, convert mode, resize, crop, rotate, paste/composite, save with format options.

## Common patterns

| Task | Approach |
|------|----------|
| **Resize** | `Image.resize((w, h), Image.Resampling.LANCZOS)` — preserve aspect with computed second dimension |
| **Format conversion** | `open()` then `save(..., format="WEBP")` etc.; or `convert("RGB")` before JPEG |
| **Crop** | `img.crop((left, upper, right, lower))` — box in pixels |
| **Thumbnail** | `thumbnail(max_size)` — in-place, preserves aspect |
| **Composite** | `Image.alpha_composite` or paste with mask for transparency |
| **Metadata** | `getexif()` / `info` — strip GPS if sharing (**`security-pro`**) |

## Exports

- **JPEG** — no alpha; **PNG** — lossless; **WebP** — good web balance when supported.
- **DPI** — `save(..., dpi=(300, 300))` when print context matters.

## Boundary

- **`content-analysis-pro`** — **What** is in the image (OCR, chart reading); **this** skill — **transform** pixels as artifacts.
