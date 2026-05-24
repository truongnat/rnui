# Phase 2C — Docs / Example Visual QA — Investigation

**Date:** 2026-05-23  
**Scope:** Docs staging, visual baseline, example app pointers — no component code

---

## Pre-2C state

| Area | Gap |
|------|-----|
| `modal.md` | Updated in 2A — no `#fff`; needs example-app cross-link |
| `alert.md` | Missing compound color inheritance (2B), minimal examples |
| `toast.md` / `snackbar.md` | Thin; no visible-surface or action contrast notes |
| `visual-baseline.mdx` | CSS demos only; no native overlay QA checklist |
| `guides/example.md` | Placeholder stub |
| `getting-started.md` | Hardcoded `#fff` in headless snippet |
| Device QA | Not documented in one place |

## Planned (2C)

1. Rewrite `guides/example.md` + sidebar link
2. Expand visual baseline: native overlay QA + device checklist
3. Update Alert, Toast, Snackbar, Modal, Dialog, AlertDialog docs
4. Add `.planning/device-qa-checklist.md`
5. Snackbar block in `StatusComponentsDemo` (CSS parity with 2B tokens)
6. Fix getting-started headless snippet color token

## Out of scope

Component/token changes, engineering debt, example app code changes (demos already updated in 2A/2B).
