# Surface Contrast Investigation

**Date:** 2026-05-24  
**Branch:** `develop`  
**Scope:** Surface Contrast & Layering Fix (no broad redesign)

## Root cause

Component visibility depended too heavily on **shadow/elevation** because semantic surfaces and borders were too close in luminance:

| Pair (light) | Before | Problem |
| ------------ | ------ | ------- |
| `bg.default` `#F3F1F8` vs `surface.raised` `#FDFCFF` | Δ ~1–2% | Card/Paper nearly invisible without shadow |
| `border.subtle` `#EEEAF4` vs `bg.default` | Very low contrast | Default borders read as “no border” |
| `border.default` `#E4E0EC` | Weak | Outline buttons, inputs, badges lost edge |
| `surface.raised` on `surface.default` | Both near-white | Nested surfaces collapsed |
| Badge default `surface.raised` + weak border | Gray-on-gray feel | Looked disabled without iOS glass |
| Paper `flat` variant | `borderWidth: 0` | Completely invisible on page bg |
| Toast/Snackbar | Heavy shadow + weak border | Readable only as floating slabs |

Dark mode had similar issues: `surface.raised` `#222233` vs `surface.default` `#1A1A28` was modest; `border.subtle` `#2A2A3D` was easy to miss on `#12121C`.

## Components that disappeared without shadow

| Component | Relied on shadow? | Token issue |
| --------- | ----------------- | ----------- |
| **Card** | Yes (default `shadow.sm`) | `surface.raised` ≈ page; `border.subtle` too faint |
| **Paper** | Yes; flat had no border | `border.subtle`; flat variant borderless |
| **Badge default** | No shadow but weak fill | `surface.raised` on tinted bg |
| **Chip solid** | No | `surface.raised` + `border.subtle` |
| **Input** | No | `border.default` ok; `border.input` was generic gray |
| **Button outline** | No | Border too subtle vs `surface.default` |
| **Button ghost** | Text-only (by design) | OK if brand text visible |
| **Toast** | Yes (`shadow.md`) | `border.subtle` |
| **Snackbar** | Yes (`shadow.lg`) | `border.subtle` |
| **Alert** | No | Status bg+border already OK |

## Light mode findings

- Page canvas `bg.default` should stay softly tinted (premium violet wash).
- Component surfaces should use **clean white** (`surface.default` / `raised`) for clear lift.
- Borders must use **`border.default`** for component chrome, **`border.input`** for fields.
- Inset areas: **`surface.sunken`** slightly darker than page.

## Dark mode findings

- Raise `surface.raised` one step above `surface.default`.
- Strengthen `border.default` and `border.input` without neon outlines.
- Glass border alpha increased for visibility on dark panels.

## Files modified

| Layer | Files |
| ----- | ----- |
| Semantic | `packages/tokens/src/semantic.ts` |
| Component tokens | `card.ts`, `paper.ts`, `badge.ts`, `chip.ts`, `input.ts`, `button.ts`, `toast.ts`, `snackbar.ts` |
| Docs | `docs/.../visual-baseline.mdx`, `preview.css`, `NoShadowSurfaceDemo.tsx` |
| Example | `apps/example/app/components/SurfaceVisibility.tsx`, `index.tsx` |
| Tests | `packages/tokens/src/__tests__/tokens.test.ts` |
| Rules | `.planning/surface-layering-rules.md` |

## Out of scope (documented in followups)

- Modal/Dialog surface tokens (shared semantic only)
- Chip `accent` variant public API exposure
- AI builder / component-schema
- Unrelated typecheck debt (`renderer` composite)
