# Phase 2A — Modal / Dialog Investigation

**Date:** 2026-05-23  
**Scope:** Pre-implementation snapshot

---

## Modal (Phase 1 baseline)

| Aspect | Current state |
|--------|---------------|
| Host inset | `modal.hostInset` (16px) on wrapper inside `AnimatedOverlay` |
| Container | `modal.container`: padding 24, maxWidth 400, `shadow.lg`, `surface.overlay` |
| Backdrop | Separate `Pressable` with `color.bg.overlay` (not on animated host) |
| Full screen | Skips `hostInset`; `ModalContent` clears padding/radius |
| Safe area | **Not applied** — only fixed 16px inset |
| Keyboard | **None** — form fields can sit under keyboard |
| Compound | `ModalHeader` / `ModalFooter` / `ModalContent` |

## Dialog

| Aspect | Current state |
|--------|---------------|
| Host inset | **Missing** — relies on `width: 80%` / `90%` + `maxWidth: 92%` |
| Container | Uses `modal.container` + inline width overrides (not `dialog.container`) |
| Shadow | `dialog.container` token had `shadow.xl` (heavier than Modal) |
| Surface | `dialog.container` used `surface.default` vs Modal's `surface.overlay` |
| Safe area / keyboard | **None** |
| Structure | Title/content/actions slots; `AnimatedOverlay` without host wrapper |

## AlertDialog

- Thin wrapper over `Dialog` — inherits Dialog layout bugs/fixes automatically.
- No separate tokens (`alertDialog.ts` does not exist).

## Differences (inconsistency)

1. Modal has explicit host inset; Dialog uses percentage width.
2. Modal uses `shadow.lg`; Dialog token used `shadow.xl`.
3. Modal backdrop pattern differs slightly from Dialog (static overlay View vs split backdrop).
4. Neither applies safe-area or keyboard avoidance.
5. Docs still show hardcoded `#fff` / manual padding for Modal.

## Phase 1 already fixed

- Alert string-in-View crash
- Modal clipping (`overflow: hidden` removed, scale 0.96)
- Modal host inset + container padding tokens
- Dialog duplicate inline padding removed (but still on `modal.container`)
- Example Modal composition + docs `contentContainerStyle`

## Planned changes (2A)

| File | Change |
|------|--------|
| `packages/tokens/src/components/dialog.ts` | Align container with modal (overlay surface, lg shadow, maxWidth 400, hostInset) |
| `packages/ui/.../overlayHostLayout.ts` | Shared safe-area + host inset merge |
| `packages/ui/.../Modal/Modal.tsx` | Safe area, KeyboardAvoidingView |
| `packages/ui/.../Dialog/Dialog.tsx` | hostInset wrapper, dialog.container, safe area, keyboard, backdrop align |
| Examples + docs | Form modal, compound patterns, no hardcoded white |
| Tests | Token regression, layout/inset, form render |

## Out of scope

Badge, Chip, Toast, Snackbar, engineering debt, new public APIs.
