# Phase 2B — Status Surface System — Investigation

**Date:** 2026-05-23  
**Scope:** Alert, Toast, Snackbar, Badge, Chip

---

## Current state (pre-2B)

| Component | Issue |
|-----------|-------|
| **Alert** | `AlertTitle` / nested `Typography` use theme primary text, not severity color |
| **Toast** | Action label uses inline `brand.muted` — low contrast on elevated/status surfaces |
| **Snackbar** | `bg.inverse` + inverse text — heavy slab; weak visible-surface alignment vs Toast |
| **Badge default** | `bg.muted` gray slab on tinted app canvases |
| **Chip solid** | Same `bg.muted` issue for default solid chips |
| **Badge accent** | Token exists; not in public `BadgeVariant` type |

## Phase 1 / Foundation already done

- Alert plain string → Text wrap
- Alert standard 1px severity border
- Toast elevated surface (not inverse slab)
- Badge/Chip borders from tokens

## Planned fixes

1. `AlertTextColorProvider` + `inheritAlertTextColor` for compound children
2. `toast.action` token (`brand.text`) + ToastItem uses token
3. Snackbar → `surface.raised` + border + primary text + `brand.text` action
4. Badge default → `surface.raised`; expose `accent` in `BadgeVariant`
5. Chip solid → `surface.raised` + `border.subtle`

## Out of scope

Modal/Dialog (2A done), docs baseline (2C), engineering debt.
