# Phase 1 Critical UI Fixes — Summary

**Date:** 2026-05-23  
**Branch:** develop  
**Scope:** Runtime Text bug, Modal layout, examples/docs/tests alignment

---

## Before → After

| Problem | Fix |
|---------|-----|
| Alert string children in `<View>` → RN warning + invisible text | `AlertContent` wraps plain text in `<Text>` with `alert.message` + severity color |
| Modal content flush to screen edges | `modal.hostInset` + padded host wrapper in `Modal.tsx`; `modal.container` default `padding: spacing[6]` |
| Title clipping during scale animation | Removed `overflow: 'hidden'` from modal container; scale eased `0.9→1` to `0.96→1` |
| Heavy muddy backdrop | `color.bg.overlay` light mode `0.42` → `0.32` |
| Modal demo: empty alert, weak CTAs, Portal mislabel | Recomposed with `ModalHeader`/`ModalFooter`, realistic copy, Cancel + Got it |
| Docs/tests `contentStyle` mismatch | Aligned to `contentContainerStyle` |
| Dialog double padding | Removed duplicate inline padding (now from `modal.container` token) |

---

## Files changed

### UI components
- `packages/ui/src/components/Alert/AlertContent.tsx`
- `packages/ui/src/components/Alert/Alert.tsx`
- `packages/ui/src/components/Alert/__tests__/Alert.test.tsx`
- `packages/ui/src/components/Modal/Modal.tsx`
- `packages/ui/src/components/Modal/ModalContent.tsx`
- `packages/ui/src/components/Modal/ModalHeader.tsx`
- `packages/ui/src/components/Modal/ModalFooter.tsx`
- `packages/ui/src/components/Modal/__tests__/Modal.test.tsx`
- `packages/ui/src/components/Dialog/Dialog.tsx` (duplicate padding removed)
- `packages/ui/src/components/AnimatedOverlay/AnimatedOverlay.tsx` (scale 0.96)

### Tokens
- `packages/tokens/src/components/modal.ts`
- `packages/tokens/src/semantic.ts` (`color.bg.overlay` opacity only)

### Examples & docs
- `apps/example/app/components/Modal.tsx`
- `.ai/examples/login-screen.tsx`
- `.ai/examples/form-screen.tsx`
- `apps/storybook/stories/Feedback.stories.tsx`
- `apps/storybook/stories/MUIExtras.stories.tsx`
- `docs/src/content/docs/components/modal.md`

---

## Verification

| Command | Result |
|---------|--------|
| `bun run build` | Pass |
| `packages/ui` Alert + Modal tests | 45/45 pass |
| `packages/tokens` tests | 15/15 pass |
| `bun run docs:build` | Pass |
| `bun run typecheck` | **Pre-existing** — `apps/example` ToggleButton/BottomSheet Reanimated style types |
| `bun run lint` | **Pre-existing** — `@truongdq01/ui` 2 errors, 76 warnings |
| `bun run test` (monorepo) | **Pre-existing** — `@truongdq01/headless` theme tests expect old semantic token values (`bg.default`, etc.) from before Visual Foundation Pass |

---

## Known risks

1. **Dialog width** still uses 80–90% without explicit host inset (acceptable inset from width).
2. **Custom `contentContainerStyle`** on Modal can override default padding (intentional).
3. **Full-screen Modal** clears container padding via `ModalContent` fullScreen styles.
4. **Alternate brand themes** — overlay opacity change is global for default semantic light tokens.

---

## Phase 2

Visual followups are scoped in **[phase-2-visual-followups.md](./phase-2-visual-followups.md)**:

- **2A** — Modal/Dialog UX (start here)
- **2B** — Status surfaces (Alert, Toast, Snackbar, Badge, Chip)
- **2C** — Docs/example QA

Pre-existing typecheck/lint/test failures → **[engineering-debt.md](./engineering-debt.md)** (separate from visual phases).
