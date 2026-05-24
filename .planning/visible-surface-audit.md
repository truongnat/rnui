# Visible Surface Audit

**Date:** 2026-05-23  
**Updated:** Visual Foundation Pass  
**Issue:** Status components (especially Badge) looked like plain text on light surfaces; backgrounds only read after iOS blur/glass blending.

## Definition — visible surface rule

Component surfaces must be **visible directly** on normal app backgrounds without relying on:

- iOS liquid glass or blur
- Notification-shade transparency blending
- Dark overlay stacking
- Accidental contrast from parent transparency

Every affected component needs **all three**:

1. **Background** — at least one step stronger than the page (`-100` tints light; ~20% alpha dark)
2. **Border** — 1px hairline at `-200`/`-300` semantic stop (not the same as fill)
3. **Text** — existing semantic text tokens, WCAG AA on the fill

## Components affected

| Component | Notes |
| --------- | ----- |
| **Badge** | All variants: bg + text + border |
| **Chip** | solid / subtle / accent / status — border when fill is soft |
| **Alert** | standard variant uses 1px severity border |
| **Toast** | elevated surface + status icon tint (not heavy `bg.inverse` slab) |
| **Input / TextField** | default, focus, error, disabled borders must read on `bg.default` and `surface.raised` |

## Test surfaces

Verify on each surface in light **and** dark mode:

| Surface | Light reference | Dark reference |
| ------- | --------------- | -------------- |
| White | `#FFFFFF` | `#FFFFFF` (spot-check) |
| App background | `color.bg.default` | `color.bg.default` |
| Card | `color.surface.raised` | `color.surface.raised` |
| Glass | `color.glass.surface` | `color.glass.surface` |
| Dark panel | — | `color.surface.default` |

Docs baseline: [Visual Baseline](/components/visual-baseline/) — `VisibleSurfaceDemo` matrix.

## Tokens that were too close to surfaces

| Token | Problem | Fix |
| ----- | ------- | --- |
| `color.bg.subtle` vs `color.bg.default` | Badge default invisible | Stronger default badge fill + border |
| Status `*-50` backgrounds | Match white/card/app bg | Light: `-100` fills, `-300` borders |
| Dark status `rgba(..., 0.12)` | Too weak on slate surfaces | ~20% alpha fills, `-700` borders |
| `accent.subtle` at `amber-50` | Accent chip/badge washed out | `amber-100` |

## Fixes applied (Visual Foundation Pass)

- Strengthen light semantic status backgrounds and borders
- Dark status backgrounds → ~20% alpha; borders → `-700` stops
- Badge tokens: all variants get `bg`, `text`, `border` (incl. accent)
- Badge component: applies `borderWidth` + `borderColor` from tokens
- Chip tokens: visible borders on solid/subtle/accent; Chip applies border when non-transparent
- Alert standard variant: 1px border from severity token
- Toast: soft elevated surface; icon uses semantic text color
- Button: `radius.lg`, reduced solid shadow
- Card/Paper: softer border + shadow
- Input: 48px height, `radius.xl`, subtle borders
- Docs: `ComponentPreview` staging, demos, visual-baseline page

## Remaining review

- **Snackbar** — may inherit weak fills; spot-check on app bg
- **Tag / Status** — any raw semantic bg without border
- **Alternate brand themes** (forest, love) — badge/chip on brand-tinted canvases
- **Filled Alert** — intentionally saturated; unchanged by design
