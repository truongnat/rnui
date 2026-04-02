# Accessibility, responsive web, and font loading

## Contrast and WCAG (web baseline)

- **Body text:** Aim for **WCAG 2.1 AA** minimum — contrast ratio **≥ 4.5:1** for normal text, **≥ 3:1** for large text (≥18pt or 14pt bold) against adjacent background.
- **UI components and graphics:** Non-text elements that convey state (icons, focus rings, chart lines that are the only cue) often need **≥ 3:1** against adjacent colors — verify on **real** theme pairs, not only default light.
- **Do not rely on color alone** — Pair hue with icon, label, pattern, or position; **`design-system-pro`** foundations cover status encoding.

## Motion and vestibular safety

- Respect **`prefers-reduced-motion: reduce`** — Provide a no- or low-motion path for critical UI (page transitions, parallax, auto-playing decorative animation).
- Prefer **CSS** `@media (prefers-reduced-motion: reduce)` to disable or shorten transitions; keep **essential** feedback (focus outline) visible.

## Responsive layout (web)

- Define **mobile-first or desktop-first** intentionally; document **breakpoints** in tokens or a single source of truth (avoid scattered `768px` magic numbers).
- Example pattern (illustrative):

```css
/* Base: narrow screens */
.layout { padding: 1rem; }

@media (min-width: 768px) {
  .layout {
    padding: 1.5rem 2rem;
    max-width: 72rem;
    margin-inline: auto;
  }
}
```

- **Touch targets** on responsive web: interactive controls should still meet **≥ 44×44 CSS px** where users tap — see **`mobile-design-pro`** for native; web hybrid apps need both.

## Font loading (avoid invisible text)

- Custom webfonts: prefer **`font-display: swap`** (or `optional` for non-critical faces) so text stays visible while fonts load; pair with **fallback** metrics (`size-adjust` / `ascent-override` where supported) to reduce layout shift.
- Subset fonts to **scripts** and **weights** you use; avoid loading unused families on critical path.

## Relationship to other skills

- **`mobile-design-pro`** — **Native** iOS/Android patterns, safe areas, platform navigation — not the same as CSS `@media` alone.
- **`react-pro`** / **`nextjs-pro`** — Implementation of `prefers-reduced-motion`, `next/font`, CSS modules, Tailwind breakpoints.
