# Edge cases

- **CMYK** vs **RGB** — convert explicitly for web; JPEG from CMYK can surprise.
- **Huge** images — **downsample** before ML or vision APIs; watch memory.
- **Animated GIF/WebP** — Pillow can iterate frames; not all ops apply to every frame uniformly without extra code.
- **EXIF orientation** — `ImageOps.exif_transpose` when photos appear rotated.
