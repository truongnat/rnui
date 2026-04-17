# Foundations, baseline, and data-heavy UI

## Visual baseline (before components)

- **Typography** — Scale (e.g. modular steps), line-height for readability, **tabular figures** for numeric columns; limit font families (often one UI + optional display).
- **Spacing** — Base unit (4/8px grid); **density** presets (comfortable vs compact) for data products.
- **Color** — Semantic roles: `text`, `surface`, `border`, `primary`, `danger`, `success`; **contrast** against WCAG targets (see below).
- **Elevation** — Shadows or borders for layering; avoid arbitrary one-off depths.

## Accessibility baseline (non-negotiable targets)

- **Contrast** — Aim **WCAG 2.x AA** as default for text and interactive states (focus, hover, disabled read legibility).
- **Focus** — Visible **focus rings** on keyboard nav; do not `outline: none` without an equivalent.
- **Touch targets** — Minimum ~44×44 pt (platform guidelines vary slightly); spacing between hit areas.
- **Motion** — Respect **`prefers-reduced-motion`**; avoid essential information only in animation.

## Data-dense interfaces (dashboards, admin, tables)

- **Hierarchy** — Primary metric vs secondary; **scan patterns** (F/Z) for dashboards; align numbers for comparison (**right-align** numbers, **left-align** text).
- **Tables** — Sticky headers, column resize/visibility, truncation vs wrap rules, empty/loading/error states.
- **Charts** — Color is not the only channel; **direct labels** or patterns for colorblind safety; honest axes (no truncated baselines for deception).

## Density vs clarity

- **Compact** mode for power users — still readable; avoid cramming without **progressive disclosure** (drawers, drill-down).
- **Whitespace** is not waste — it separates signal from noise in analytics UIs.

## References (authoritative)

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — criteria overview.
- [Material Design](https://m3.material.io/) / [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/) / [Microsoft Fluent](https://fluent2.microsoft.design/) — platform baseline patterns (pick one primary system per product).
