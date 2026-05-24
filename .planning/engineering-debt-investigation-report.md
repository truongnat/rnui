# RNUI Engineering Debt Investigation Report

**Date:** 2026-05-24  
**Branch:** `develop` (HEAD `b618d20`)  
**Scope:** Read-only verification — no code fixes applied

---

## 1. Executive Summary

| Gate | Result | Blocker? |
|------|--------|----------|
| `bun install` | ✅ Pass | No |
| `bun run build` | ✅ Pass (7 packages) | No |
| `bun run docs:build` | ✅ Pass (90 pages) | No |
| `bun run typecheck` | ❌ Fail — `@truongdq01/example#typecheck` | **Yes** (CI gate) |
| `bun run lint` | ❌ Fail — `@truongdq01/ui#lint` (2 errors) | **Yes** (CI gate) |
| `bun run test` | ❌ Fail — `@truongdq01/headless#test` (6 failures) | **Yes** (CI gate) |

**Repo health:** Library **build** and **docs** are green. Three verification gates fail due to **pre-existing debt**, not current build breakage. The most impactful gap is a **false sense of safety from `@truongdq01/ui#typecheck`**: it passes while the example app (with RN 0.83 types) surfaces 4 Reanimated/style errors in UI source.

**Top blockers:**

1. Example app typecheck fails on **BottomSheet** + **ToggleButton** Reanimated/`DefaultStyle` vs `ViewStyle` mismatches (surfaced via workspace path mapping to `packages/ui/src`).
2. **`@truongdq01/ui#typecheck` passes incorrectly** — stale `@types/react-native@0.73` in UI package vs runtime RN 0.83.
3. **`@truongdq01/ui#lint`** — 2 Biome **format** errors (`Chip.tsx`, `List.tsx`); 71 warnings.
4. **`@truongdq01/headless#test`** — 5 stale semantic token assertions + 1 suite crash (`useBottomSheet` missing `Easing` in test mock).
5. Narrow example-app-only error: `Dialog.tsx` passes invalid `style` prop to `Input` (full showcases typecheck only).

**Phase 2A / 2B overlap:** `Chip.tsx` format lint and `Dialog.tsx` Input typing may be side effects of in-progress visual work — verify after merge before treating as pure engineering debt.

---

## 2. Commands Run

| Command | Exit | Summary |
|---------|------|---------|
| `bun install` | 0 | 1523 installs, no changes |
| `bun run build` | 0 | tokens, headless, themes, ui, docs built |
| `bun run typecheck` | 2 | Failed: `@truongdq01/example#typecheck` (4 errors in UI source) |
| `bun run lint` | 1 | Failed: `@truongdq01/ui#lint` (2 errors, 71 warnings); tokens 2 warnings |
| `bun run test` | 1 | Failed: `@truongdq01/headless#test` (6 failed, 139 passed) |
| `bun run docs:build` | 0 | 90 static pages, Pagefind index OK |
| `cd packages/ui && bun run typecheck` | 0 | **Passes** (does not catch example-app errors) |
| `cd packages/ui && bun run lint` | 1 | Same 2 format errors + 71 warnings |
| `cd packages/ui && bun run test` | 0 | 460 pass, 2 skip, 0 fail |
| `cd apps/example && bun run typecheck` | 2 | 4 errors (UI source via path map) |
| `cd apps/example && bun run typecheck:showcases` | 2 | 5 errors (4 UI + 1 app `Dialog.tsx`) |
| `cd packages/themes && bun run test` | 0 | 11 pass |
| `cd packages/headless && bun run lint` | 0 | Clean |

**Build warnings (non-blocking):** `@truongdq01/headless` tsup reports unused imports in bundled `dist/hooks/index.js` (`useColorScheme`, `Platform`, `GestureHandlerRootView`, Reanimated default, several token imports).

**Turbo warnings:** `no output files found for task @truongdq01/themes#test` and `@truongdq01/ui#test` — `turbo.json` `outputs` may not match bun test artifacts.

---

## 3. Blocking Failures

Failures that break monorepo verification gates (build itself succeeds).

| Gate | Package | Blocks |
|------|---------|--------|
| Typecheck | `@truongdq01/example` | `bun run typecheck` |
| Lint | `@truongdq01/ui` | `bun run lint` |
| Test | `@truongdq01/headless` | `bun run test` |

Build, docs, UI tests, themes tests, headless lint, and UI package typecheck (in isolation) do **not** block.

---

## 4. TypeScript Failures

### 4.1 Monorepo gate — `bun run typecheck`

Fails only on `@truongdq01/example#typecheck`. Other packages (tokens, headless, themes, ui) pass in turbo pipeline.

### 4.2 `@truongdq01/ui` source (via example path mapping)

Example `tsconfig.json` maps `@truongdq01/ui` → `../../packages/ui/src/index.ts`, so example typecheck validates UI **source** with **Expo / RN 0.83** types.

| File | Line | Error | Root cause | Pre-existing | Phase overlap |
|------|------|-------|------------|--------------|---------------|
| `packages/ui/src/components/ToggleButton/ToggleButton.tsx` | 132 | `DefaultStyle` not assignable to `ViewStyle` (`cursor: string` vs `CursorValue`) | `usePressable().animatedStyle` (`ReturnType<typeof useAnimatedStyle>`) merged into `StyleProp<ViewStyle>` array; Reanimated v4 + RN 0.83 types widen to `DefaultStyle` | Yes | No |
| `packages/ui/src/components/BottomSheet/BottomSheetPanel.tsx` | 62 | `DefaultStyle[]` not assignable to `AnimatedStyle<ViewStyle>` | `sheetStyle` array mixes `ViewStyle` + `UseBottomSheetReturn['sheetAnimatedStyle']` without narrowing to view-only animated styles | Yes | No |
| `packages/ui/src/components/BottomSheet/BottomSheetBackdrop.tsx` | 29 | `DefaultStyle` not assignable to `BackdropLayerStyle` | Same Reanimated style widening; `animatedStyle` in backdrop layer array | Yes | No |
| `packages/ui/src/components/BottomSheet/BottomSheetBackdrop.tsx` | 43 | `BackdropLayerStyle[]` not assignable to `Animated.View` style | Cascading from above + `boxShadow` union mismatch on animated styles | Yes | No |

### 4.3 Example app — full showcases (`typecheck:showcases`)

| File | Line | Error | Root cause | Pre-existing | Phase overlap |
|------|------|-------|------------|--------------|---------------|
| `apps/example/app/components/Dialog.tsx` | 109 | `style` does not exist on `InputProps` | Demo passes `style={{ marginTop: 16 }}` to `Input`; component API has no `style` prop | Likely yes | **Phase 2A** (Dialog demo) — verify after merge |

### 4.4 False negative — `@truongdq01/ui#typecheck` passes

| Observation | Detail |
|-------------|--------|
| Command | `cd packages/ui && bun run typecheck` → exit 0 |
| Cause | `packages/ui/package.json` devDependency `@types/react-native": "^0.73.0"` while runtime is `react-native@0.83.2` |
| Effect | ToggleButton/BottomSheet errors **not** caught by UI package gate |
| Fix direction | Align types with RN 0.83; re-run UI typecheck — should then match example failures |

### 4.5 Packages with clean typecheck

- `@truongdq01/tokens` ✅  
- `@truongdq01/headless` ✅  
- `@truongdq01/themes` ✅  
- `@truongdq01/ui` ✅ (misleading — see 4.4)

---

## 5. Lint Failures

### 5.1 Blocking — `@truongdq01/ui#lint` (Biome)

**2 errors (format — fail CI):**

| File | Line | Rule | Message | Root cause | Pre-existing | Phase overlap |
|------|------|------|---------|------------|--------------|---------------|
| `packages/ui/src/components/Chip/Chip.tsx` | 106–114 | format | Multi-line `useMemo` dependency array should be single line | Formatter drift / partial edit | Unclear | **Phase 2B** (Chip visual) — verify after merge |
| `packages/ui/src/components/List/List.tsx` | 9 | format | `filterWhitespaceChildren` signature should break across lines | Formatter drift | Likely yes | No (List whitespace fix, not Modal/Badge) |

**71 warnings (non-blocking, triage in batches):**

| Category | Count (approx) | Example files | Rules |
|----------|----------------|---------------|-------|
| `noExplicitAny` | ~35 | `Form.tsx`, `Accordion/*`, `Slider.tsx`, `Icon.tsx` | `lint/suspicious/noExplicitAny` |
| `noArrayIndexKey` | ~12 | `FormField.tsx`, `Skeleton.tsx`, `OTPInput.tsx` | `lint/suspicious/noArrayIndexKey` |
| `noUnusedVariables` / params | ~15 | `FormField.tsx`, `ImageList.tsx`, `TabBar.tsx` | `lint/correctness/noUnused*` |
| `useHookAtTopLevel` | ~6 | `TabBar.tsx`, `Popper.tsx` | `lint/correctness/useHookAtTopLevel` |

Notable **non–Phase 2** warning clusters: `Form/*`, `Accordion/*`, `TabBar.tsx`, `Timeline.tsx`, `Select/*`.

### 5.2 Non-blocking — `@truongdq01/tokens#lint`

| File | Line | Rule | Message |
|------|------|------|---------|
| `packages/tokens/src/components/box.ts` | 3 | `noUnusedFunctionParameters` | Unused `t: SemanticTokens` |
| `packages/tokens/src/components/formField.ts` | 3 | `noUnusedFunctionParameters` | Unused `t: SemanticTokens` |

### 5.3 Clean lint

- `@truongdq01/headless` ✅  
- `@truongdq01/themes` ✅  

---

## 6. Test Failures

### 6.1 Blocking — `@truongdq01/headless#test`

**Summary:** 6 failed, 1 skipped, 139 passed (34 suites; 3 failed suites)

#### A. Stale semantic token expectations (5 tests)

Tests assert pre–Visual Foundation Pass hex values; `packages/tokens/src/semantic.ts` was updated (tokens package tests already expect new values).

| File | Test | Expected | Received (current tokens) |
|------|------|----------|---------------------------|
| `packages/headless/src/__tests__/theme.test.tsx` | light `bg.default` | `#F8FAFC` | `#F3F1F8` |
| `packages/headless/src/__tests__/theme.test.tsx` | light `text.primary` | `#020617` | `#0F172A` |
| `packages/headless/src/__tests__/theme.test.tsx` | dark `bg.default` | `#0D0D14` | `#12121C` |
| `packages/headless/src/__tests__/hooks.test.tsx` | light `bg.default` | `#F8FAFC` | `#F3F1F8` |
| `packages/headless/src/__tests__/hooks.test.tsx` | dark `bg.default` | `#0D0D14` | `#12121C` |

**Root cause:** Headless tests not updated after semantic token refresh in tokens package (`packages/tokens/src/__tests__/tokens.test.ts` expects `#F3F1F8` / `#12121C`).  
**Pre-existing:** Yes  
**Phase overlap:** Indirect — Foundation Pass token work, not Modal/Badge/Chip component edits

#### B. `useBottomSheet` test suite crash (1 suite)

| File | Line | Error |
|------|------|-------|
| `packages/headless/src/hooks/__tests__/useBottomSheet.test.tsx` | — | Suite failed to run |
| `packages/headless/src/motion.ts` | 42 | `TypeError: Cannot read properties of undefined (reading 'bezier')` |

**Root cause:** Test file overrides `react-native-reanimated` mock **without** `Easing`, but `useBottomSheet.ts` imports `motion.ts` which evaluates `Easing.bezier(...)` at module load. Global `jest.setup.ts` uses `createReanimatedMock()` from `packages/ui/test-mocks.ts` (includes `Easing`), but per-file mock replaces it incompletely.

**Pre-existing:** Yes  
**Phase overlap:** No

### 6.2 Passing test packages

| Package | Result |
|---------|--------|
| `@truongdq01/ui` | 460 pass, 2 skip, 0 fail |
| `@truongdq01/themes` | 11 pass |
| `@truongdq01/tokens` | (via turbo test pipeline — headless failed first) |

**UI skipped tests (informational):** `AnimatedList renders without crashing`, `Select component performance`

---

## 7. Docs Build Failures

None. `bun run docs:build` and docs task inside `bun run build` both succeed.

- 90 HTML pages generated  
- Pagefind search index built  
- Note: `Entry docs → 404 was not found` is informational, not a failure  

ToggleButton and BottomSheet docs pages build successfully (`/components/toggle-button/`, `/components/bottom-sheet/`).

---

## 8. Example App Failures

### 8.1 Typecheck configuration

| Config | Include scope | Used by |
|--------|---------------|---------|
| `tsconfig.typecheck.json` | Narrow: `_layout`, `index`, `demo/**` | `bun run typecheck` (turbo) |
| `tsconfig.json` | Full: `app/**`, `demo/**` | `typecheck:showcases`, IDE |

Both map workspace packages to **source** via `paths`, so UI type errors surface in example typecheck even when example app files are clean.

### 8.2 Component usage (runtime — not typecheck failures)

| Component | Example files | Notes |
|-----------|---------------|-------|
| ToggleButton | `app/components/ToggleButton.tsx`, `app/components/ButtonGroup.tsx` | Standard usage; no app-local TS errors in narrow typecheck |
| BottomSheet | `app/components/BottomSheet.tsx` | Refs + snap points; errors are in UI implementation types |

### 8.3 Legacy error log

`apps/example/tsc_errors.txt` contains older errors (Stack `gap`, `BottomSheetRef` export). Not reproduced in current narrow typecheck — likely stale artifact.

---

## 9. Root Cause Analysis

### 9.1 Reanimated + RN 0.83 type friction

- `usePressable` and `useBottomSheet` return `ReturnType<typeof useAnimatedStyle>`, typed as broad `DefaultStyle` under RN 0.83.
- UI components assign these into `ViewStyle` / `AnimatedStyle<ViewStyle>` arrays without narrowing.
- **ToggleButton** puts `animatedStyle` in a `Pressable`/`View` container style array.
- **BottomSheet** puts animated styles on `Animated.View` alongside theme token styles.

Fix pattern (for E1): narrow animated outputs to `ViewStyle`-compatible types at hook boundary or cast arrays with explicit `ViewStyle` typing — avoid `any`.

### 9.2 Typecheck blind spot in UI package

- UI devDependencies pin outdated `@types/react-native@0.73`.
- Example app uses Expo 55 / RN 0.83 types → stricter checking.
- **Recommendation:** Single RN types version across monorepo; UI typecheck must fail when example fails.

### 9.3 Headless tests out of sync with tokens

- Semantic palette updated in `packages/tokens` (Foundation Pass).
- `packages/tokens` tests updated; `packages/headless` theme/hooks tests still assert old Telegram-style values.
- Intentional fix: update headless expectations to match tokens (do not revert tokens).

### 9.4 Test infrastructure — Reanimated mock fragmentation

- Shared mock: `packages/ui/test-mocks.ts` → `createReanimatedMock()` includes `Easing`.
- `useBottomSheet.test.tsx` replaces mock without `Easing` → module-load crash in `motion.ts`.
- Other hook tests (e.g. `usePressable`) define complete mocks or rely on setup.

### 9.5 Lint — format errors from incomplete formatting

- Biome format errors are mechanical (run `biome format --write` on Chip/List).
- 71 warnings are accumulated debt (`any`, index keys, unused vars) — fix by rule category, not drive-by in visual PRs.

### 9.6 Example app API misuse

- `Dialog.tsx` demo uses `Input` with `style` prop that doesn't exist on `InputProps`.
- Fix: use `Stack` spacing or extend Input API (product decision).

---

## 10. Recommended Fix Phases

### Phase E1: TypeScript fixes (highest priority)

1. Bump `@types/react-native` in `packages/ui` (and verify headless/themes) to match RN 0.83.
2. Fix animated style typing:
   - `ToggleButton.tsx` — separate or narrow `animatedStyle` for container
   - `BottomSheetPanel.tsx`, `BottomSheetBackdrop.tsx` — `ViewStyle`-only style arrays for `Animated.View`
3. Optionally tighten `usePressable` / `useBottomSheet` return types in headless.
4. Re-run `bun run typecheck` — UI package and example should agree.

**Acceptance:** `bun run typecheck` green; `packages/ui` typecheck catches same errors as example without path-mapping workaround.

### Phase E2: Lint fixes

1. **Errors first:** `biome format --write` on `Chip.tsx`, `List.tsx` (confirm Phase 2B Chip merge state first).
2. **Warnings batch 1:** `noUnusedVariables` / `noUnusedFunctionParameters` (quick wins).
3. **Warnings batch 2:** `noExplicitAny` in `Form.tsx`, `Accordion`, `Select` (needs proper generics).
4. **Warnings batch 3:** `useHookAtTopLevel` in `TabBar`, `Popper` (may need refactor).
5. Tokens: prefix unused params with `_` in `box.ts`, `formField.ts`.

**Acceptance:** `bun run lint` green (or errors-only green with documented warning backlog).

### Phase E3: Test stabilization

1. Update `packages/headless/src/__tests__/theme.test.tsx` and `hooks.test.tsx` token expectations to match `packages/tokens/src/semantic.ts`.
2. Fix `useBottomSheet.test.tsx`: extend reanimated mock with `Easing` (or use shared `createReanimatedMock()`).
3. Consider consolidating Reanimated mocks — single source in headless or shared test-utils.

**Acceptance:** `bun run test` green; headless 146/146 meaningful assertions.

### Phase E4: Example app cleanup

1. Fix `apps/example/app/components/Dialog.tsx` — replace `Input style={...}` with layout primitive (`Stack` gap/margin).
2. Decide CI scope: keep narrow `tsconfig.typecheck.json` vs full `app/**` coverage.
3. Remove or refresh stale `apps/example/tsc_errors.txt`.

**Acceptance:** `typecheck:showcases` green; example demos type-safe under full app include.

---

## 11. Files Likely Needing Changes

### TypeScript (E1)

- `packages/ui/package.json` — `@types/react-native` version
- `packages/ui/src/components/ToggleButton/ToggleButton.tsx`
- `packages/ui/src/components/BottomSheet/BottomSheetPanel.tsx`
- `packages/ui/src/components/BottomSheet/BottomSheetBackdrop.tsx`
- `packages/headless/src/hooks/usePressable.ts` (optional return type tightening)
- `packages/headless/src/hooks/useBottomSheet.ts` (optional return type tightening)

### Lint (E2)

- `packages/ui/src/components/Chip/Chip.tsx` ⚠️ Phase 2B
- `packages/ui/src/components/List/List.tsx`
- `packages/tokens/src/components/box.ts`
- `packages/tokens/src/components/formField.ts`
- (Warning backlog) `packages/ui/src/components/Form/Form.tsx`, `TabBar/TabBar.tsx`, `Accordion/*`, etc.

### Tests (E3)

- `packages/headless/src/__tests__/theme.test.tsx`
- `packages/headless/src/__tests__/hooks.test.tsx`
- `packages/headless/src/hooks/__tests__/useBottomSheet.test.tsx`
- Optionally `packages/headless/jest.setup.ts` / mock consolidation

### Example app (E4)

- `apps/example/app/components/Dialog.tsx` ⚠️ Phase 2A
- `apps/example/tsconfig.typecheck.json` (if expanding CI scope)

### Do not touch in engineering debt PR (visual phases)

Modal, Dialog, AlertDialog, Alert, Toast, Snackbar, Badge, Chip **visual/token** work — except E2 format on Chip if confirmed post-merge.

---

## 12. Risks / Unknowns

| Risk | Detail |
|------|--------|
| Chip/List format tied to open visual PRs | Running formatter may conflict with in-flight Phase 2B/2A branches — coordinate merge order |
| Narrow example typecheck hides app errors | Turbo `typecheck` uses `tsconfig.typecheck.json` — full `app/**` only checked via `typecheck:showcases` |
| UI typecheck false negative | Until `@types/react-native` aligned, CI may ship UI regressions if example typecheck is skipped |
| Reanimated typing fixes may need headless API change | Narrowing at hook level affects all consumers of `usePressable` / `useBottomSheet` |
| 71 lint warnings | Volume suggests phased triage; some `useHookAtTopLevel` may indicate real bugs |
| `turbo.json` test outputs | Warnings about missing outputs — may affect remote cache correctness |
| Headless tsup unused import warnings | Bundler hygiene only; not failing build |
| Stale `tsc_errors.txt` | May confuse future investigations — delete or regenerate when fixing E4 |
| Dialog Input `style` | Product API question: add `style` to Input vs fix demo layout only |

---

*Investigation only — no source files modified except this report.*
