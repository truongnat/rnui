# Phase 4C — Surface Visibility Investigation

**Date:** 2026-05-24  
**Scope:** Semantic + component tokens, brand themes, example QA matrix  
**Goal:** Identify why surfaces look blurry, faint, or invisible without shadow/blur

---

## Executive summary

Root cause is **token collapse**, not missing shadows:

1. Light mode had `surface.default === surface.raised === #FFFFFF` — nested cards and elevated panels relied on shadow alone.
2. Brand themes set `bg.default === surface.default === #FFFFFF` with pastel borders too close to white.
3. Several overlay recipes used `border.subtle` where `border.default` is required for panel edges.
4. Neutral Badge/Chip on white/card depend entirely on border when fill matches parent.
5. Skeleton and some list/table dividers used fills/borders below perceptual threshold.

Prior Phase 2 passes strengthened core semantic borders but did not enforce a **hard contract** or automated audit.

---

## Semantic token findings

| Token pair | Issue | Severity |
| ---------- | ----- | -------- |
| `bg.default` vs `surface.default` | Was identical in brand themes; core theme OK (`#F3F1F8` vs `#FFFFFF`) | Critical (brands) |
| `surface.default` vs `surface.raised` | Was identical `#FFFFFF` in light + brands | Critical |
| `surface.default` vs `surface.sunken` | OK in core; brands use tinted sunken | Low |
| `border.subtle` vs `surface.default` | Previously `#EEEAF4` — near invisible on white | High |
| `border.default` vs `surface.default` | Strengthened to `#CDC4DE` — acceptable | Medium |
| `border.input` vs `surface.default` | `#C2B8D0` — visible but was weaker historically | Medium |
| `surface.glassBorder` | Alpha 0.12 too faint on tinted/glass panels | High |
| Dark `bg.default` vs `surface.default` | `#12121C` vs `#1A1A28` — OK | OK |
| Dark status `bg` rgba 0.2 | Readable with `-700` borders; watch neon text | Medium |

**Files:** `packages/tokens/src/semantic.ts`

---

## Component token findings

### Surfaces too close to parent

| Component | Token file | Issue |
| --------- | ---------- | ----- |
| Card | `card.ts` | Fill white on white OK only if border reads; nested needs `surface.raised` |
| Paper flat | `paper.ts` | Used `border.subtle` — faint on sunken fill |
| Badge default | `badge.ts` | `surface.default` fill on card = white-on-white |
| Chip solid | `chip.ts` | Same as badge default |
| Menu | `menu.ts` | Panel border was `border.subtle` |
| Popover | `popover.ts` | Panel border was `border.subtle` |
| List inset | `list.ts` | Missing outer border on inset container |
| Skeleton | `skeleton.ts` | Used `bg.emphasis` — weak pulse contrast |
| SegmentedControl | `segmentedControl.ts` | Active segment had fill only + shadow |

### Relying on shadow

| Component | Notes |
| --------- | ----- |
| Card / Paper | Default includes `shadow.sm` — OK if border+fill pass no-shadow test |
| Snackbar | Has border + raised fill; shadow is enhancement |
| Toast | Status fill + border; shadow optional |
| SegmentedControl active | Previously shadow-only differentiation |

### Glass / transparent too aggressive

| Component | Notes |
| --------- | ----- |
| `surface.glass` | Needs stronger `glassBorder` |
| Tooltip | Inverse fill OK; shadow not required for recognition |

### Status surfaces too faint

| Component | Notes |
| --------- | ----- |
| Badge/Chip neutral | Border-only visibility on white |
| Alert outlined | Depends on status border vs parent |
| Dark mode status rgba fills | Generally OK with `-700` borders |

### Nested surface risks

| Scenario | Risk | Mitigation |
| -------- | ---- | ---------- |
| Card on app bg | Low (tinted bg + white card + border) | — |
| Card on Card | High when both `#FFFFFF` | Inner `surface.raised` |
| Badge on Card | High for default variant | Border + optional sunken fill |
| Input in Card | Medium | `border.input` |
| FormGroup grouped in Card | High without outer border | `border.default` on grouped shell |

---

## Brand theme risks

All six brands (`default`, `forest`, `love`, `ocean`, `sunset`, `midnight`) had:

- Light `bg.default === #FFFFFF` and `surface.default === #FFFFFF`
- Light `surface.raised === #FFFFFF`
- Pastel `border.default` values often `#CCFBF1`-class (barely visible)

**Files:** `packages/themes/src/brands/*.ts`

---

## Exact files to change (Phase 4C)

### Semantic
- `packages/tokens/src/semantic.ts` — raised step, borders, glassBorder

### Component tokens
- `packages/tokens/src/components/paper.ts` — flat border
- `packages/tokens/src/components/menu.ts` — panel border
- `packages/tokens/src/components/popover.ts` — panel border
- `packages/tokens/src/components/list.ts` — inset border
- `packages/tokens/src/components/skeleton.ts` — pulse fill
- `packages/tokens/src/components/segmentedControl.ts` — active border

### Brand themes
- All files in `packages/themes/src/brands/`

### Tooling & QA
- `scripts/audit-surface-contrast.mjs`
- `apps/example/app/components/SurfaceVisibility.tsx`
- `docs/src/content/docs/components/visual-baseline.mdx`
- `packages/tokens/src/__tests__/tokens.test.ts`

---

## Out of scope (this phase)

- AI API / builder / landing page
- Public component API changes
- Broad visual redesign by taste
- Screenshot/device automation

---

## Recommended verification

```bash
bun run build
bun run surface:audit
```

Manual: `SurfaceVisibility` screen — light/dark, all panel types, brand theme switcher if available.
