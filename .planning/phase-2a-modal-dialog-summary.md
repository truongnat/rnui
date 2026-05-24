# Phase 2A — Modal / Dialog UX Consistency — Summary

**Date:** 2026-05-23  
**Branch:** develop  
**Scope:** Modal, Dialog, AlertDialog overlay layout, safe area, keyboard, examples, docs, tests

---

## What changed

### Shared overlay layout (`overlayHostLayout.ts`)

- `useOverlayHostPadding` — merges `hostInset` tokens with `useSafeAreaInsets()` (max per edge)
- `getOverlayKeyboardBehavior` — iOS `padding`, Android default
- `overlayHostStyles` — shared host + root flex container

### Tokens (`packages/tokens/src/components/dialog.ts`)

| Before | After |
|--------|-------|
| No `hostInset` | `hostInset` (16px, matches modal) |
| `surface.default` | `surface.overlay` (matches modal) |
| `shadow.xl` | `shadow.lg` |
| `maxWidth: '100%'` + width % in component | `maxWidth: 400`, `width: '100%'` |

Modal tokens unchanged (already correct from Phase 1).

### Modal (`Modal.tsx`)

- Safe-area-aware host padding via shared hook
- `KeyboardAvoidingView` wrapper (iOS padding behavior)
- Backdrop/host structure unchanged from Phase 1

### Dialog (`Dialog.tsx`)

- **hostInset pattern** — host wrapper inside `AnimatedOverlay` (no more 80%/90% width hacks)
- Uses `dialog.container` tokens (not `modal.container`)
- Safe area + keyboard avoidance (same as Modal)
- Backdrop aligned with Modal (separate `Pressable`, transparent when closing)
- `fullWidth` expands within host inset (`maxWidth: '100%'`)

### AlertDialog

- No code changes — inherits Dialog layout automatically

---

## Examples

| File | Updates |
|------|---------|
| `apps/example/.../Modal.tsx` | Form modal with `Input`; updated safe-area copy |
| `apps/example/.../Dialog.tsx` | Confirmation + form-in-dialog examples; actions slot patterns |
| `apps/example/.../AlertDialog.tsx` | Unchanged (already good) |

---

## Docs

| File | Updates |
|------|---------|
| `modal.md` | Compound helpers, layout defaults, safe area/keyboard notes, removed `#fff` hacks |
| `dialog.md` | Full usage, layout defaults, examples |
| `alert-dialog.md` | Replaced placeholder with real content |

---

## Tests

| File | Added/updated |
|------|---------------|
| `Dialog.test.tsx` | Token regression, KeyboardAvoidingView, actions/form slots |
| `Modal.test.tsx` | KeyboardAvoidingView, header/footer composition |
| `test-setup.ts` | `KeyboardAvoidingView` mock for bun test |

**UI package:** 453 pass, 2 skip

---

## Verification commands

| Command | Result |
|---------|--------|
| `bun run build` | Pass |
| `bun run docs:build` | Pass (via build) |
| `packages/ui` tests | 453 pass |
| `bun run typecheck` | **Pre-existing** — `apps/example` ToggleButton, BottomSheet Reanimated types |
| `bun run lint` | **Pre-existing** — `@truongdq01/ui` 5 errors, 74 warnings (format fixed in touched Dialog files) |
| `bun run test` (monorepo) | **Pre-existing** — `@truongdq01/headless` theme/motion test failures |

---

## Manual QA (simulator / device)

1. **Modal basic** — visible horizontal inset on iPhone; title not clipped on open animation
2. **Modal form** — focus email field; keyboard should not fully cover footer actions (iOS)
3. **Dialog confirmation** — centered, inset from edges, actions visible
4. **Dialog form** — rename project; keyboard avoidance on input focus
5. **AlertDialog destructive** — layout matches Dialog; buttons not clipped on notch devices
6. **Full-screen Modal** — no host inset; content fills screen as before
7. **Dark mode** — overlay + surface contrast still readable

---

## Remaining risks

1. **Android keyboard** — no explicit `behavior` on Android; may need `android:windowSoftInputMode` at app level for best results
2. **Long dialog content** — no built-in ScrollView; very long copy may overflow on small phones (consumer can scroll inside children)
3. **KeyboardAvoidingView + scale animation** — rare layout jump on very small screens; monitor on device
4. **`fullWidth` Dialog** — wider but still inset; not edge-to-edge by design

---

## Deferred to Phase 2B / 2C

- Alert compound severity colors
- Toast / Snackbar / Badge / Chip surfaces
- Native visual baseline QA checklist
- Engineering debt (typecheck, lint, headless tests)

See [phase-2-visual-followups.md](./phase-2-visual-followups.md) and [engineering-debt.md](./engineering-debt.md).
