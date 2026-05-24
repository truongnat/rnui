# Phase 2D — Engineering Cleanup — Summary

**Date:** 2026-05-24  
**Branch:** develop (uncommitted)  
**Scope:** Typecheck, lint errors, headless tests — no visual/API changes

---

## What changed

### Reanimated style typing (root fix)

- `ViewAnimatedStyle` exported from `@truongdq01/headless` (`motion.ts`)
- `usePressable` / `useBottomSheet` return `ViewAnimatedStyle` via `useAnimatedStyle<ViewStyle>`
- UI: ToggleButton, BottomSheetPanel, BottomSheetBackdrop use `StyleProp<ViewAnimatedStyle>`

### Tests

- `useBottomSheet.test.tsx` — tokens mock spreads `jest.requireActual` (fixes missing `timingPreset`)
- Theme/hooks tests already aligned with Foundation Pass tokens

### Lint

- ToggleButton unused `ViewStyle` import removed
- Biome format on headless `useBottomSheet.test.tsx`

### Phase 2B follow-ups (same session)

- Chip icon color aligns with chip text
- Example app: `DemoSurfacePanel`, Badge/Chip/Alert surface QA + product copy
- Docs: badge.mdx, chip.md visible-surface sections
- Planning: `phase-2b-status-surface-investigation.md`, updated `visible-surface-audit.md`

---

## Verification

| Command | Result |
|---------|--------|
| `bun run build` | Pass |
| `bun run typecheck` | Pass |
| `bun run lint` | Pass (71 warnings remain in UI — non-blocking) |
| `bun run test` | Pass (151 headless + UI packages) |
| `packages/ui` tests | 464 pass |

---

## Remaining

- UI lint warnings batch triage (`noExplicitAny`, etc.)
- Optional: align `@types/react-native` in UI package with RN 0.83 so UI-only typecheck catches example-app errors
- Manual device QA: `.planning/device-qa-checklist.md`
