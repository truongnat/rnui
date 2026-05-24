# Engineering Debt — Separate from Visual Phases

**Status:** Tracked backlog — **not** part of Phase 2 Visual (2A / 2B / 2C)  
**Last updated:** 2026-05-23

> Fix these in a **dedicated engineering cleanup session** (Phase 2D or ad-hoc).  
> Do **not** mix with Modal polish, status surfaces, or docs staging — agents tend to expand scope into types, APIs, and runtime behavior.

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

### Typecheck — `apps/example`

| Item | Severity | Location | Notes |
|------|----------|----------|-------|
| ToggleButton Reanimated / ViewStyle mismatch | **Medium** | `packages/ui/src/components/ToggleButton/ToggleButton.tsx` (~132) | `DefaultStyle` vs `ViewStyle`; `cursor` type |
| BottomSheetPanel animated style typing | **Medium** | `packages/ui/src/components/BottomSheet/BottomSheetPanel.tsx` (~62) | `DefaultStyle[]` vs `AnimatedStyle<ViewStyle>` |

**Command:** `bun run typecheck` (fails on `@truongdq01/example#typecheck`)

**Suggested approach:** Narrow animated style arrays to `ViewStyle` only; avoid `as any`; fix at source types in BottomSheet/ToggleButton.

---

### Lint — `@truongdq01/ui`

| Item | Severity | Notes |
|------|----------|-------|
| Package lint errors | **Medium** | 2 errors reported at last Phase 1 verification |
| Package lint warnings | **Low** | ~76 warnings — triage before mass fix |

**Command:** `bun run lint` (fails on `@truongdq01/ui#lint`)

**Suggested approach:** Fix errors first; warnings in batches by rule/category, not drive-by during visual PRs.

---

### Tests — `@truongdq01/headless`

| Item | Severity | Notes |
|------|----------|-------|
| Stale semantic token expectations | **Medium** | Tests expect pre–Visual Foundation Pass values (e.g. `lightTokens.color.bg.default` `#F8FAFC`, dark `#0D0D14`) |
| Monorepo `bun run test` failure | **Medium** | Headless theme tests fail until expectations align with current `packages/tokens` semantics |

**Command:** `bun run test` in `packages/headless`

**Suggested approach:** Update test expectations to match current semantic tokens **intentionally** (document why in commit message); do not revert token improvements to green tests.

---

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
