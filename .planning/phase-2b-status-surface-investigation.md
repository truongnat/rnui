# Phase 2B — Status Surface System — Investigation

**Date:** 2026-05-23  
**Scope:** Alert, Toast, Snackbar, Badge, Chip  
**Status:** Complete (see [phase-2b-status-surfaces-summary.md](./phase-2b-status-surfaces-summary.md))

> Alias: spec references `phase-2b-status-surface-investigation.md` (singular); this file is the canonical investigation doc.

---

## Current behavior (post-2B)

| Component | Behavior |
| --------- | -------- |
| **Alert** | Standard/filled/outlined variants; severity drives bg/border/icon; `AlertTitle` + uncolored `Typography` inherit severity text via context |
| **Toast** | Elevated surface; status variants; action label from `toast.action` token |
| **Snackbar** | Raised surface + border; primary text; brand action — distinct from Toast, not inverse slab |
| **Badge** | bg + border + text per variant; default on `surface.raised`; public `accent` variant |
| **Chip** | solid/outlined/subtle; status via `color` prop; solid default on `surface.raised`; icons use chip text color |

## Problems found (pre-2B)

| Issue | Severity |
| ----- | -------- |
| Alert compound children ignored severity text color | High |
| Toast action used `brand.muted` inline | Medium |
| Snackbar `bg.inverse` invisible-surface risk on some canvases | High |
| Badge default / Chip solid `bg.muted` gray slab | Medium |
| Badge accent token without public type | API drift |

## Token inconsistencies resolved

- Toast action → semantic `brand.text` via component token
- Snackbar → `surface.raised`, `border.subtle`, `text.primary`
- Badge default → `surface.raised`
- Chip solid → `surface.raised` + `border.subtle`

Semantic status families (`success`, `warning`, `error`, `info`) already provide bg/text/border/icon — components now consume them consistently.

## Light / dark concerns

- Light: status `-100` fills + `-300` borders (Foundation Pass)
- Dark: ~20% alpha fills + `-700` borders
- Snackbar/Toast use neutral elevated surfaces in both modes — readable without overlay

## API drift

| Item | Decision |
| ---- | -------- |
| **Badge `accent`** | Added to public `BadgeVariant` — tokens existed; hiding caused drift |
| **Chip `variant="accent"`** | Token in `chip.ts` only; **not** exposed on `ChipVariant` — use `color="primary"` or `variant="subtle"`; document until API review |

## Files modified

### Tokens
- `packages/tokens/src/components/alert.ts` (unchanged structure; consumed by UI)
- `packages/tokens/src/components/toast.ts` — `action`
- `packages/tokens/src/components/snackbar.ts` — elevated surface
- `packages/tokens/src/components/badge.ts` — default surface
- `packages/tokens/src/components/chip.ts` — solid surface

### UI
- `packages/ui/src/components/Alert/*` — context + inheritance
- `packages/ui/src/components/Toast/ToastItem.tsx`
- `packages/ui/src/components/Snackbar/*` (token-driven)
- `packages/ui/src/components/Badge/Badge.tsx` — `accent` type
- `packages/ui/src/components/Chip/Chip.tsx` — icon color = text color

### Docs / examples
- `docs/.../alert.md`, `toast.md`, `snackbar.md`, `badge.mdx`, `chip.md`
- `docs/.../visual-baseline.mdx`, `VisibleSurfaceDemo.tsx`
- `apps/example/.../Alert.tsx`, `Toast.tsx`, `Snackbar.tsx`, `Badge.tsx`, `Chip.tsx`
- `apps/example/demo/DemoSurfacePanel.tsx`

## Out of scope (unchanged)

Modal/Dialog (2A), engineering debt, Chip public `accent` variant.
