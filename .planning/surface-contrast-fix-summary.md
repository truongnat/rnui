# Surface Contrast Fix — Summary

**Date:** 2026-05-24  
**Branch:** `develop`

## Root cause

Semantic **surface** and **border** tokens were too close in luminance (`surface.raised` ≈ `bg.default`, `border.subtle` ≈ invisible). Card, Paper, Badge, Chip, Toast, and Snackbar relied on **shadow** to appear separated from the page.

## Semantic token changes (`packages/tokens/src/semantic.ts`)

### Light

| Token | Before | After |
| ----- | ------ | ----- |
| `surface.raised` | `#FDFCFF` | `#FFFFFF` |
| `surface.sunken` | `#ECE8F4` | `#E8E4F0` |
| `border.default` | `#E4E0EC` | `#CDC4DE` |
| `border.subtle` | `#EEEAF4` | `#DDD6E8` |
| `border.input` | `gray[300]` | `#C2B8D0` |
| `surface.glass` | 78% white | 88% white |
| `surface.glassBorder` | low contrast | `rgba(30,27,75,0.14)` |

### Dark

| Token | Before | After |
| ----- | ------ | ----- |
| `surface.raised` | `#222233` | `#26263C` |
| `border.default` | `#34344A` | `#454560` |
| `border.subtle` | `#2A2A3D` | `#383852` |
| `border.input` | `#3D3D56` | `#505070` |
| `surface.glassBorder` | 10% white | 14% white |

## Component token changes

| File | Change |
| ---- | ------ |
| `card.ts` | `surface.default` + `border.default` |
| `paper.ts` | `border.default`; `flat` → sunken fill + border (not borderless) |
| `badge.ts` | default → `surface.default` + `border.default` |
| `chip.ts` | solid → `surface.default` + `border.default` |
| `input.ts` | `border.input`; disabled → `surface.sunken` |
| `button.ts` | disabled opacity 40 → 50 |
| `toast.ts` / `snackbar.ts` | `border.default` |

## Components fixed

No public API changes. Visibility improved via tokens only:

- Card, Paper, Badge, Chip, Input, Button (outline/disabled), Toast, Snackbar, Alert (unchanged — already had status surfaces)

## No-shadow baseline

- **Docs:** `visual-baseline.mdx` — new “No-shadow surface visibility test” + `NoShadowSurfaceDemo.tsx`
- **Example app:** `apps/example/app/components/SurfaceVisibility.tsx` (list entry added)
- **Rules:** `.planning/surface-layering-rules.md`

## Files changed

```
packages/tokens/src/semantic.ts
packages/tokens/src/components/{card,paper,badge,chip,input,button,toast,snackbar}.ts
packages/tokens/src/__tests__/tokens.test.ts
packages/ui/src/components/Snackbar/__tests__/Snackbar.test.tsx
docs/src/content/docs/components/visual-baseline.mdx
docs/src/components/demos/NoShadowSurfaceDemo.tsx
docs/src/styles/preview.css
apps/example/app/components/SurfaceVisibility.tsx
apps/example/app/index.tsx
.planning/surface-contrast-investigation.md
.planning/surface-layering-rules.md
.planning/surface-contrast-fix-summary.md
.planning/phase-2-visual-followups.md
```

## Commands run

| Command | Result |
| ------- | ------ |
| `packages/tokens` build | Pass |
| `packages/ui` build | Pass |
| `packages/tokens` test | 20/20 pass |
| `packages/ui` test | 469 pass (after Snackbar test update) |
| `bun run docs:build` | Pass |
| `bun run build` (root) | Fail — pre-existing `@truongdq01/builder` TS18003 (no `src` inputs) |
| `bun run typecheck` | Not run full monorepo (renderer composite debt pre-existing) |

## Known limitations

- Full monorepo `build` / `typecheck` still blocked by unrelated builder/renderer debt
- Docs demos are CSS approximations — native truth is example app `SurfaceVisibility`
- Ghost buttons remain text-forward by design (pressed state uses `brand.subtle`)
- Brand themes (forest/love/ocean) not individually re-spot-checked

## Manual simulator QA checklist

- [ ] Open **SurfaceVisibility** in example app (light + dark)
- [ ] Card/Paper with `shadow.none` / `elevation="none"` on app background
- [ ] Badge default + status variants on app bg and card bg
- [ ] Chip solid + outlined on tinted canvas
- [ ] Input on app background — border visible, not heavy
- [ ] Button outline + ghost + disabled — clickable/readable without shadow
- [ ] Toast/Snackbar on app background without relying on shadow alone
- [ ] Confirm surfaces visible without blur, iOS glass, or overlay tricks
