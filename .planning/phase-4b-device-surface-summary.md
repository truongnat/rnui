# Phase 4B — Device QA + Surface Hardening Summary

**Date:** 2026-05-24  
**Branch:** `develop`  
**Plan:** `.planning/phase-4b-device-surface-plan.md`

---

## What changed

### SurfaceVisibility (`apps/example/app/components/SurfaceVisibility.tsx`)

- **No-shadow row:** Card (`shadow.none`), Paper elevation none, Paper flat, Badge, Chip, Alert (standard/outlined/filled), Input, Button variants
- **5 surface panels:** app, card, white, glass, dark — dark panel runs full stack (not subset)
- **Toast triggers:** default, success, warning, error, info, Undo action
- **Snackbar triggers:** simple + With Undo
- **Manual QA section** pointing to `.planning/device-qa-results.md`

### Alert surface matrix (`apps/example/app/components/Alert.tsx`)

- **Surface visibility** section with 5 `DemoSurfacePanel` backgrounds
- Severities: info, success, warning, error (standard variant)
- Realistic commerce copy (orders, payments, delivery)

### FormGroup grouped border (`packages/tokens/src/components/formGroup.ts`)

- Added `borderWidth: 1`, `borderColor: border.default` to `grouped.card`
- Grouped FormField card visible on white/card without inner input chrome

### Dialog token cleanup (`apps/example/app/components/Dialog.tsx`)

- `marginTop: t.spacing[4]` (was `16`)
- `Stack spacing="md"` (was `spacing={16}`)
- No Dialog API changes

### TextField keyboard (`apps/example/app/components/TextField.tsx`)

- `KeyboardAvoidingView` wrapper matching Input screen
- iOS: `padding` behavior, `keyboardVerticalOffset={100}`

### Planning / QA docs

- `.planning/phase-4b-device-surface-plan.md` — scope, checklist copy, out-of-scope
- `.planning/device-qa-checklist.md` — structured tables (overlays, toast, surfaces)
- `.planning/device-qa-results.md` — **Not executed in this environment**

---

## Tests updated

| File | Change |
|------|--------|
| `packages/tokens/src/__tests__/tokens.test.ts` | `formGroup grouped card has visible border on white/card surfaces` |

Tokens: **22 pass**, 0 fail. No example screen snapshot tests added.

---

## Commands run (2026-05-24)

| Command | Result |
|---------|--------|
| `bun run build` | Pass |
| `bun run typecheck` | Pass |
| `bun run lint` | Pass |
| `bun run test` | Pass (0 fail) |
| `bun run docs:build` | Pass (93 pages) |
| `bun run component-schema:check` | Pass |
| `bun run ai:check` | Pass |

**No command failures.**

---

## Device QA status

**Not executed in this environment.** No simulator/device pass was performed. Do not treat any checklist item as pass until verified manually.

| Area | Code ready | Device verified |
|------|------------|-----------------|
| SurfaceVisibility matrix | Yes | No |
| Alert 5-panel matrix | Yes | No |
| FormGroup grouped border | Yes | No |
| Overlays (Modal/Dialog/AlertDialog) | Yes (Phase 2A) | No |
| Toast/Snackbar triggers | Yes | No |

Use `.planning/device-qa-checklist.md` and record in `.planning/device-qa-results.md`.

---

## Remaining risks

| Risk | Mitigation |
|------|------------|
| Overlay inset/keyboard on real devices | Manual iOS + Android pass |
| Toast/Snackbar contrast on live overlay | Trigger from SurfaceVisibility; light + dark |
| White-on-white nested surfaces (Card on Card) | Known token limitation; not changed in 4B |
| Brand themes (Forest/Love/Ocean) | Phase 4D audit |
| Schema Toast import drift | Phase 4C |

---

## Recommended Phase 4C

**Schema Drift + CI:** Toast import fix, Stack.id/Badge.count alignment, `component-schema:check` in CI.

**After device sign-off:** Brand theme surface audit (P1-2) in parallel.

---

## Files changed

```
apps/example/app/components/SurfaceVisibility.tsx
apps/example/app/components/Alert.tsx
apps/example/app/components/Dialog.tsx
apps/example/app/components/TextField.tsx
packages/tokens/src/components/formGroup.ts
packages/tokens/src/__tests__/tokens.test.ts
.planning/phase-4b-device-surface-plan.md
.planning/phase-4b-device-surface-summary.md
.planning/device-qa-checklist.md
.planning/device-qa-results.md
```
