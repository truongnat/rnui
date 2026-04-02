# Web performance basics (layout and media)

Complements **accessibility** (`a11y-responsive-and-web-typography.md`) — **perceived speed** and **main-thread** health.

## Layout thrash

- **Read** then **write** DOM geometry in loops causes forced **reflow** — batch reads, then writes; avoid interleaving in tight loops.

## `will-change`

- Use **sparingly** on elements that **will** animate (`transform`, `opacity`); remove after animation completes — **overuse** hurts **memory** and **layer** explosion.

## Images

- **`loading="lazy"`** for below-the-fold **images**; **explicit** `width` / `height`** or **aspect-ratio** to reduce **CLS**.
- **Modern formats** (WebP/AVIF) with **fallback** when required.

## Scripts

- **Defer** non-critical JS; **critical** CSS inline only when measured as necessary.

## Motion

- Heavy animation — pair with **`prefers-reduced-motion`** (see a11y reference).
