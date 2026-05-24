# Engineering Debt — Separate from Visual Phases

**Status:** Mostly resolved — 2026-05-24 engineering cleanup  
**Last updated:** 2026-05-24

> Remaining: `@truongdq01/ui` lint **warnings** (~71) — triage in batches; not CI-blocking.

---

## Why this is separate

| Risk if mixed with UI work | Example |
|----------------------------|---------|
| Type fixes touch Reanimated generics | BottomSheet, ToggleButton style props |
| Lint passes require refactors | Unrelated component files |
| Test updates lock old token values | Headless theme tests vs Foundation Pass semantics |
| PR becomes unreviewable | Visual + types + tests in one diff |

---

## Open items

### Lint — `@truongdq01/ui` (warnings only)

| Item | Severity | Notes |
|------|----------|-------|
| Package lint warnings | **Low** | ~71 warnings (`noExplicitAny`, `noArrayIndexKey`, etc.) — triage by rule/category |

**Command:** `bun run lint` — **passes** (errors fixed 2026-05-24)

---

## Resolved (2026-05-24)

### Typecheck — `apps/example` ✅

- `ViewAnimatedStyle` in `@truongdq01/headless/motion.ts`; `usePressable` / `useBottomSheet` use `useAnimatedStyle<ViewStyle>`
- ToggleButton, BottomSheetPanel, BottomSheetBackdrop use `StyleProp<ViewAnimatedStyle>`

### Lint — `@truongdq01/ui` errors ✅

- Chip.test.tsx format; ToggleButton unused import

### Tests — `@truongdq01/headless` ✅

- Theme/hooks tests aligned with Foundation Pass semantic values
- `useBottomSheet.test.tsx` — tokens mock uses `jest.requireActual` so `timingPreset` is available

---

## Previously open (archived)

## Verification (when addressing this file)

```bash
bun run typecheck
bun run lint
bun run test
```

All three should pass before closing an engineering-debt PR.

---

## Not engineering debt (do not file here)

- Modal inset / safe area / keyboard → [phase-2-visual-followups.md](./phase-2-visual-followups.md) **2A**
- Toast contrast / Snackbar surfaces → **2B**
- `modal.md` hardcoded colors → **2C**
- `BadgeVariant` accent exposure → **2B API decision**
