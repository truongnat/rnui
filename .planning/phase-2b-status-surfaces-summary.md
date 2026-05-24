# Phase 2B — Status Surface System — Summary

**Date:** 2026-05-23  
**Branch:** develop  
**Scope:** Alert, Toast, Snackbar, Badge, Chip — visible surfaces + compound Alert text

---

## What changed

### Alert — compound severity color

| Change | Detail |
|--------|--------|
| `AlertTextColorProvider` | Provides severity `textColor` to compound children |
| `AlertTitle` | Reads context; applies severity color automatically |
| `inheritAlertTextColor` | Clones `Typography` / `Text` without explicit color |
| `Alert.tsx` | Removed `as any` container styles; typed `ViewStyle[]` |

Explicit `Typography color="brand"` (or any preset) is preserved.

### Toast — action contrast

| Before | After |
|--------|-------|
| Inline `brand.muted` on action label | `toast.action` token using `brand.text` |
| `ToastItem.tsx` | Uses token styles |

### Snackbar — visible surface

| Before | After |
|--------|-------|
| `bg.inverse` + inverse text (heavy slab) | `surface.raised` + `border.subtle` |
| Action `brand.default` | Action `brand.text` |
| Primary text inverse | `text.primary` |

Aligns with Toast elevated-surface pattern from visible-surface audit.

### Badge / Chip — surface refinement

| Component | Change |
|-----------|--------|
| Badge `default` variant | `bg.muted` → `surface.raised` |
| Chip `solid` variant | `bg.muted` → `surface.raised`, `border.subtle` |
| **`BadgeVariant`** | Added public `'accent'` (tokens already existed) |

**API decision (accent):** Exposed in public type — token was implemented in Foundation Pass; hiding it caused API drift.

---

## Files changed

### UI
- `Alert/Alert.tsx`, `AlertTitle.tsx`, `AlertContent.tsx`
- `Alert/AlertContext.tsx`, `Alert/inheritAlertTextColor.tsx` (new)
- `Alert/__tests__/Alert.test.tsx`
- `Toast/ToastItem.tsx`, `Toast/__tests__/Toast.test.tsx`
- `Snackbar/__tests__/Snackbar.test.tsx`
- `Badge/Badge.tsx`, `Badge/__tests__/Badge.test.tsx`

### Tokens
- `toast.ts` — `action` token
- `snackbar.ts` — elevated surface + text/action colors
- `badge.ts` — default variant surface
- `chip.ts` — solid variant surface

### Planning
- `phase-2b-status-surfaces-investigation.md`
- `phase-2b-status-surfaces-summary.md`

---

## Verification

| Command | Result |
|---------|--------|
| `bun run build` | Pass |
| `packages/ui` tests | **460 pass**, 2 skip |
| `bun run typecheck` | Pre-existing (example ToggleButton/BottomSheet) |
| `bun run lint` | Pre-existing |
| `bun run test` (monorepo) | Pre-existing (headless) |

---

## Manual QA

1. **Alert screen** — Standard section: title + body should share severity hue (no manual color props)
2. **Toast with Undo action** — action label readable on default + status toast backgrounds
3. **Snackbar** — light elevated card on app bg (not dark inverse slab)
4. **Badge default / accent** — visible on `#F3F1F8` app canvas
5. **Chip solid default** — reads as raised pill, not gray slab
6. **Forest / love / ocean themes** — spot-check badge/chip on tinted backgrounds

---

## Remaining / deferred

- Phase **2C** — docs/visual baseline native QA
- Engineering debt — unchanged
- Filled Alert — intentionally saturated; no change
- Snackbar long-term: optional status-variant styling (not in 2B scope)

See [phase-2-visual-followups.md](./phase-2-visual-followups.md).
