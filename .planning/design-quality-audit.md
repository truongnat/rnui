# RNUI Design Quality Audit

**Date:** 2026-05-23  
**Branch:** develop  
**Scope:** Visual language, tokens, core components, docs presentation

## Current visual problems

1. **Light backgrounds feel generic** — `bg.default` is flat cool gray (`#F8FAFC`) with harsh `text.primary` (`gray.950`). Surfaces lack warmth; the system reads as “default Tailwind” rather than premium mobile.
2. **Borders too strong** — `border.default` / `border.input` use mid-gray stops; inputs and cards look outlined rather than softly elevated.
3. **Shadows are heavy** — Black shadows at 12–20% opacity feel web-bootstrap, not iOS-native. Dark mode shadows use saturated brand purple, which can look neon on panels.
4. **Buttons default to pill shape** — `borderRadius: full` on all buttons feels playful/cartoonish, not refined iOS-like.
5. **Destructive & status surfaces are loud** — Error/success fills use saturated borders; badges use `bg.emphasis` for default variant (gray slab).
6. **Toast uses inverted bar** — Full `bg.inverse` toast feels heavy; not aligned with soft glassy direction.
7. **Typography ramp is heavy** — `display` at 800 weight and 36px; headings compete with body on mobile.
8. **Docs staging is disconnected** — No `ComponentPreview` wrapper; markdown-only docs don’t showcase components. `custom.css` uses unrelated indigo/pink marketing palette, not RNUI tokens.
9. **Chip solid variant** — High-contrast emphasis fill; outlined/subtle are fine.

## Token inconsistencies

| Area | Issue |
|------|--------|
| Semantic light `text.primary` | Near-black on soft bg — high harshness |
| Semantic `border.input` | `gray.400` — stronger than decorative borders |
| Component `button` | Uses `shadow.md` + `radius.full` — not aligned with soft elevation |
| Component `card` | `border.default` + `shadow.sm` — border competes with shadow |
| Component `badge.default` | `bg.emphasis` — reads as disabled gray block |
| Docs CSS | `--color-primary: #6366f1` — not `brand[600]` violet |
| Dark `surface.disabled` | Same as `bg.default` — weak hierarchy |

## Weakest components (visual)

1. **Button** — pill shape, heavy shadow on solid  
2. **Badge / Chip (solid)** — harsh fills  
3. **Toast** — dark slab, not refined  
4. **Card / Paper** — flat border + weak depth  
5. **Alert** — acceptable structure; borders too saturated  
6. **Docs demos** — missing (markdown only)

## Recommended improvements (this pass)

- Soften semantic light/dark backgrounds, borders, shadows, glass  
- Refine typography weights (display/h1)  
- Button: `radius.lg`, lighter shadows, subtler outline/destructive  
- Card/Paper: larger radius, subtle border, softer shadow  
- Input: subtle default border, `radius.xl`  
- Badge/Chip/Alert/Toast: muted status surfaces  
- Add docs `ComponentPreview` + token-aligned CSS  
- Add hero-style web demos for Button, Card, Input, Typography, Badge, Stack  
- Visual quality checklist for future passes  

## Out of scope (no API changes)

- New components, prop renames, architecture rewrites  
- react-native-web live previews in docs (future: optional)  
