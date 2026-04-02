---
name: image-processing-pro
description: |
  Professional raster image processing with Pillow (PIL): open/save, resize, crop, rotate, format conversion (JPEG, PNG, WebP), compositing, thumbnails, EXIF orientation, and batch-oriented workflows.

  Use this skill when the user needs **pixel-level** operations — not **semantic** description of image content (“what is in this screenshot?”). For **meaning**, **OCR**, or **chart reading**, use **`content-analysis-pro`** instead.

  Use **with** **`content-analysis-pro`** when a pipeline **extracts** frames then **processes** them; **`security-pro`** when stripping EXIF or handling **sensitive** screenshots. This skill (`image-processing-pro`) owns **imaging transforms**; vision **interpretation** belongs elsewhere.

  Triggers: "Pillow", "PIL", "resize image", "crop", "convert to PNG", "WebP", "thumbnail", "composite", "alpha", "EXIF", "rotate image", "batch images", "strip metadata".

metadata:
  short-description: Image processing — Pillow, resize, crop, formats, compositing, batch
---

# Image processing (professional)

Use **[Pillow](https://pillow.readthedocs.io/)** for API truth; this skill encodes **safe defaults** for **resize**, **format**, **metadata**, and **batch** hygiene. Confirm **source** colorspace, **output** constraints (max dimensions, format), and whether **EXIF** must be stripped.

## Related skills (this repo)

| Skill | When to combine with `image-processing-pro` |
|-------|---------------------------------------------|
| **`content-analysis-pro`** | **Semantic** analysis, OCR, video **meaning** — not just pixels |
| **`security-pro`** | Redaction, **EXIF** removal before sharing, **screenshots** with secrets |
| **`data-analysis-pro`** | Plots and **charts** as data; **this** skill for **raster** file ops |

**Boundary:** **`image-processing-pro`** = **transform** images; **`content-analysis-pro`** = **interpret** them.

## When to use

- **Resize**, **crop**, **rotate**, **thumbnail** for web or upload limits.
- **Convert** formats (JPEG, PNG, WebP), mode (`RGB`, `RGBA`).
- **Composite** watermarks or overlays; **alpha** masks.
- **Batch** folders — consistent naming and no accidental overwrite.
- Trigger keywords: `Pillow`, `resize`, `crop`, `WebP`, `thumbnail`, `EXIF`, …

## Workflow

1. Confirm **input** paths, **output** format/size, and **metadata** policy (keep vs strip).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **“what does this show?”** to **`content-analysis-pro`**.
3. Respond using **Suggested response format**; note **color space** and **memory** risks for large files.

### Operating principles

1. **Non-destructive** — Keep originals when batching; write to new paths.
2. **Explicit modes** — `RGB` vs `RGBA` vs `L`; **JPEG** has no alpha.
3. **Metadata** — Strip **GPS** and identifiers when publishing (**`security-pro`**).
4. **Resampling** — Use quality resampling (`LANCZOS`) for downscale when available.
5. **Semantics elsewhere** — Do not substitute **resize** for **understanding** image content.
6. **Reproducibility** — Fixed dimensions for pipelines that feed models or tests.

### Pillow operations (summary)

- Resize, crop, thumbnail, rotate, save formats, composite, EXIF.

Details: [references/pillow-operations.md](references/pillow-operations.md)

### Tips and tricks (summary)

- In-place ops, sRGB, batch naming.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- CMYK, huge rasters, animated GIFs, EXIF orientation.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Input/output format, **transform** needed (not “explain image”).
2. **Recommendation** — Pillow API choices, resampling, metadata handling.
3. **Code** — Snippets or small script outline — still labeled **Code**.
4. **Residual risks** — Color loss, memory, accidental overwrite, EXIF leaks.

## Resources in this skill

- `references/` — Pillow ops, tips, edge cases.

| Topic | File |
|-------|------|
| Pillow operations | [references/pillow-operations.md](references/pillow-operations.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “Resize all PNGs in `./in` to max width 1200px, output JPEG 85% quality to `./out`.”  
**Expected output:** Loop with `thumbnail` or proportional resize, `convert("RGB")`, `save(..., quality=85, optimize=True)`; warn about **alpha** loss on JPEG.

## Checklist before calling the skill done

- [ ] **Transform** vs **interpretation** — correct skill (**`content-analysis-pro`** for the latter).
- [ ] **Metadata** policy applied for **sharing**.
- [ ] **Outputs** do not silently overwrite sources unless intended.
