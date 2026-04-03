# Phase 0: Production Readiness - Research

**Researched:** 2026-04-03  
**Domain:** RN library packaging hygiene, overlay accessibility baseline, docs correctness  
**Confidence:** HIGH (repo-local evidence); MEDIUM (ecosystem best-practice tradeoffs)

## User Constraints (from request)

- Keep it production-quality, minimal breaking changes.
- Prefer changes that reduce consumer burden.
- Provide concrete file paths and suggested diffs in prose (don’t actually apply).
- Provide verification commands (lint/typecheck/tests) and manual a11y test checklist.

## Summary

Phase 0 remaining work splits into three buckets:

1) **Packaging hygiene** in `packages/ui/package.json` for `@truongdq01/ui`: `@types/react-native` should be moved to `devDependencies` (types are build-time only), and `@shopify/flash-list` should stop being a hard runtime dependency *or* the code should stop statically importing it so it can become an **optional peer** with a safe fallback.

2) **Overlay accessibility baseline**: `Modal`, `Dialog`, and `BottomSheet` currently render RN `Modal` plus a backdrop press target, but do not set `accessibilityViewIsModal` (iOS) and do not consistently expose dialog role/labels. Adding these should be API-additive, with sensible default labels derived from existing props (e.g. dialog title/label).

3) **Docs correctness**: Current docs claim peerDependency requirements that don’t match `packages/ui/package.json` (notably Reanimated/gesture/safe-area/worklets), and `docs/docs/components/modal.md` claims keyboard behaviors (ESC/tab-trap) that are not implemented (and are largely non-applicable to native).

**Primary recommendation:** Make `@shopify/flash-list` an **optional peer dependency** and introduce an internal “virtualized list adapter” that uses FlashList when installed and falls back to `FlatList` otherwise, while keeping existing public APIs intact.

## Current State (Evidence)

### Packaging

`packages/ui/package.json` currently contains:

- `dependencies["@types/react-native"] = "^0.73.0"` (should be dev-only)
- `dependencies["@shopify/flash-list"] = "^2.0.2"` (hard dependency)

FlashList is **statically imported** in multiple components:

- `packages/ui/src/components/Select/Select.tsx` (`import { FlashList } ...`)
- `packages/ui/src/components/AnimatedList/AnimatedList.tsx` (`import { FlashList, FlashListProps } ...`)
- `packages/ui/src/components/List/List.tsx` (`import { FlashList } ...`)

Also, the example app and Storybook actively use `Select`, `AnimatedList`, and `ListData`, so changes affect:

- `apps/example/app/index.tsx` (imports `Select`, `AnimatedList`)
- `apps/storybook/stories/*.tsx` (uses `Select`, `AnimatedList`, `ListData`)

### Overlay implementations

- `packages/ui/src/components/Modal/Modal.tsx`
  - Uses RN `Modal` + backdrop `Pressable` (no explicit a11y props)
- `packages/ui/src/components/Dialog/Dialog.tsx`
  - Uses RN `Modal` + backdrop `Pressable` (no explicit a11y props)
- `packages/ui/src/components/BottomSheet/BottomSheet.tsx`
  - Uses RN `Modal` + animated backdrop (gesture detector), no explicit a11y props

### Docs mismatches

Peer dependency requirements in docs are currently inconsistent with `packages/ui/package.json`:

- `docs/getting-started.md` says:
  - reanimated **3.0+** (but `@truongdq01/ui` peers say `>=4.2.0`)
  - safe-area-context **4.0+** (but peers say `>=5.6.0`)
  - does not mention `react-native-worklets` (but peers require `>=0.7.0`)
- Root `README.md` says reanimated **>=3.0** and gesture-handler **>=2.0** (also inconsistent)
- `docs/docs/components/modal.md` claims:
  - “ESC key close” and “Tab cycle / Shift+Tab” as keyboard support, and implies focus trap behavior. The current `Modal` implementation only wires `onRequestClose` (Android back) and backdrop press; no tab trapping exists.

## Project Constraints (from repo rules)

- **Security verification gate before applying changes:** validate input/data safety, auth boundaries (likely N/A here), secrets handling, dependency/config risk, abuse paths. Report pass/fail + risks + mitigation + residual risk.
- **Documentation persistence:** if creating *new* documentation under `knowledge-base/documents/`, update `knowledge-base/INDEX.md` and optionally rebuild/verify KB. (Phase 0 work here is primarily package/docs under `docs/`, not KB.)
- **Avoid mass formatting changes:** keep diffs scoped to touched files.

## Packaging Hygiene Recommendations

### 1) Move `@types/react-native` to `devDependencies` (recommended)

**Why:** Type packages are build-time only and can cause unnecessary transitive installs + version conflicts for consumers (especially when consumer RN types differ).

**Suggested diff (prose):**

- File: `packages/ui/package.json`
  - Remove from `dependencies`:
    - `@types/react-native`
  - Add to `devDependencies`:
    - `@types/react-native` (same version as currently used, or align with repo’s RN version)

**Expected impact:**

- **Consumer apps:** should not be affected at runtime. TypeScript users already have RN types via their app toolchain; if they don’t, their app should add them (which is correct responsibility).
- **Example/Storybook:** no change if they already have RN types via RN tooling; if typecheck fails, add `@types/react-native` to the app devDeps (not recommended unless truly needed).

### 2) Make `@shopify/flash-list` optional/peer OR use an alternate strategy

Because FlashList is statically imported in multiple components, you **cannot** simply move it to `peerDependencies` without also changing code—bundlers will fail to resolve the module when not installed.

Below are two viable strategies.

#### Strategy A (Recommended): Optional peerDependency + internal adapter fallback

**Goal:** Reduce consumer burden by *not requiring* FlashList unless they want it, while keeping existing component APIs.

**Package.json changes:**

- File: `packages/ui/package.json`
  - Move `@shopify/flash-list` from `dependencies` → `peerDependencies`
  - Mark it optional:
    - Add `peerDependenciesMeta["@shopify/flash-list"].optional = true`

**Code changes:**

Introduce a small internal helper that resolves FlashList at runtime:

- Add: `packages/ui/src/internal/virtualizedList.ts` (exact location discretionary; keep it private/non-exported)
  - `import type` FlashList types for TS (type-only, safe)
  - Use `require("@shopify/flash-list")` inside a `try/catch` to avoid hard resolution
  - Export a React component `VirtualizedList` that renders:
    - FlashList when available
    - Otherwise RN `FlatList` fallback

Then update callsites to use the adapter:

- File: `packages/ui/src/components/Select/Select.tsx`
  - Replace `import { FlashList } ...` usage with `VirtualizedList`
- File: `packages/ui/src/components/List/List.tsx` (`ListData`)
  - Replace `FlashList` with `VirtualizedList`
- File: `packages/ui/src/components/AnimatedList/AnimatedList.tsx`
  - This is trickier because it wraps FlashList with Reanimated.
  - Recommendation:
    - If FlashList is available: keep current behavior
    - If not available: fall back to `Animated.FlatList` (or `Animated.createAnimatedComponent(FlatList)`) with reduced perf guarantees, but still functional.

**Trade-offs:**

- **Pros**
  - Consumers that don’t want FlashList can skip installing it.
  - Keeps existing public APIs (`Select`, `ListData`, `AnimatedList`) stable.
  - Avoids “module not found” build failures.
- **Cons**
  - Slightly more internal complexity.
  - Two runtime code paths (FlashList vs FlatList) to maintain and test.
  - `AnimatedList` fallback may not match FlashList perf; docs should clarify.

**Impact on example + Storybook:**

- If you keep FlashList installed in the monorepo root, example/storybook will still work.
- If you want Phase 0 to validate the “optional peer” promise, explicitly add `@shopify/flash-list` to:
  - `apps/example/package.json` dependencies (since it uses `AnimatedList` and `Select`)
  - `apps/storybook/package.json` dependencies (since it uses `AnimatedList`, `ListData`, `Select`)
  - This prevents accidental regressions if workspace hoisting changes.

#### Strategy B: Pluggable list renderer (no FlashList dependency)

**Goal:** Remove FlashList from `@truongdq01/ui` entirely and let consumers choose a list implementation.

**Approach:**

- Default `Select`, `ListData`, `AnimatedList` to RN `FlatList`.
- Add new optional props:
  - `renderList` / `ListComponent` / `virtualizedListComponent`
  - Or `listProps` that are passed to the list implementation

**Trade-offs:**

- **Pros**
  - No FlashList dependency or optional peer logic needed.
  - Very clear responsibility split.
- **Cons**
  - Either an API addition (new props) or a behavioral downgrade (if you remove FlashList silently).
  - Harder to keep “batteries-included” positioning.
  - Consumers wanting FlashList must do more wiring.

#### Strategy C: Subpath exports (feature-split package surface)

**Goal:** Keep `@truongdq01/ui` core light, and ship FlashList-based components behind a separate entrypoint.

**Approach:**

- Keep core components using FlatList.
- Export FlashList-backed variants as `@truongdq01/ui/flash` or similar via `package.json#exports`.

**Trade-offs:**

- **Pros**
  - Consumers pay for FlashList only when opting in.
  - Clean separation.
- **Cons**
  - More release + docs burden.
  - Harder for tree-shaking in RN bundlers; needs careful entrypoint testing.

## Overlay Accessibility Baseline Recommendations

### Accessibility targets (minimal, consistent, API-additive)

For `Modal`, `Dialog`, and `BottomSheet`:

- **iOS modal grouping:** set `accessibilityViewIsModal={open}` (or `{true}` when visible) on the RN `Modal`
- **Role semantics:** set `accessibilityRole="dialog"` on the *content container* (or nearest stable view)
- **Labeling:** add `accessibilityLabel?: string` prop and apply:
  - Content container: `accessibilityLabel={...}`
  - Default label heuristics:
    - `Dialog`: if `title` is a string, default to that; else `"Dialog"`
    - `Modal`: default `"Modal"` (or allow consumer to pass)
    - `BottomSheet`: default `"Bottom sheet"`
- **Backdrop close affordance:** ensure the backdrop pressable is reachable and self-describing
  - `accessibilityRole="button"`
  - `accessibilityLabel="Close dialog"` / `"Close modal"` / `"Close bottom sheet"`
  - `accessibilityHint="Closes the dialog"` (etc.)

### Suggested API additions (avoid breaking changes)

- File: `packages/ui/src/components/Modal/Modal.tsx`
  - Add to `ModalProps`:
    - `accessibilityLabel?: string`
    - `accessibilityRole?: "dialog"` (optional; default `"dialog"` if present)
    - `backdropAccessibilityLabel?: string`
    - `backdropAccessibilityHint?: string`
- File: `packages/ui/src/components/Dialog/Dialog.tsx`
  - Add to `DialogProps`:
    - `accessibilityLabel?: string` (defaults from title when title is string)
    - `backdropAccessibilityLabel?: string`
    - `backdropAccessibilityHint?: string`
- File: `packages/ui/src/components/BottomSheet/BottomSheet.tsx`
  - Add:
    - `accessibilityLabel?: string`
    - Backdrop a11y props (label/hint)
  - For the backdrop: currently it’s an `Animated.View` inside a gesture detector.
    - Recommendation: wrap the backdrop with a `Pressable` (or `TouchableWithoutFeedback`) layer for accessibility while keeping gesture close behavior, OR mark the backdrop as accessible with `accessibilityRole/label` if Pressable is not possible with gesture detector.

### Why this shouldn’t break existing APIs

- All new props are optional.
- Existing close behavior (`onClose`, `onRequestClose`, backdrop press) remains unchanged.
- Only additional props are passed through to RN primitives; no required prop changes.

### Manual a11y test checklist (Phase 0 gate)

On iOS (VoiceOver enabled):

- Modal/dialog/sheet announces as a distinct “dialog” region (label is read).
- Swipe navigation does not move focus to elements behind the overlay.
- Backdrop close control is discoverable and reads “Close …”.
- Closing returns focus logically to the element that opened the overlay (best-effort; RN focus is limited—verify “not stuck”).

On Android (TalkBack enabled):

- Back button closes overlay where appropriate (`onRequestClose`).
- Focus does not “leak” behind overlay.
- Backdrop close affordance is labeled.

## Docs Correctness Recommendations

### 1) Align peerDependencies versions across docs

**Source of truth:** `packages/ui/package.json#peerDependencies`:

- `react`: `^19.2.0`
- `react-native`: `^0.83.2`
- `react-native-gesture-handler`: `>=2.30.0`
- `react-native-reanimated`: `>=4.2.0`
- `react-native-worklets`: `>=0.7.0`
- `react-native-safe-area-context`: `>=5.6.0`

**Files to update:**

- `README.md` (root)
- `docs/getting-started.md`
- `packages/ui/README.md` (already closer, but verify)

**Suggested edit (prose):**

- Replace “reanimated >= 3.0” with “reanimated >= 4.2.0”
- Replace “gesture-handler >= 2.0” with “gesture-handler >= 2.30.0”
- Replace “safe-area-context >= 4.0” with “safe-area-context >= 5.6.0”
- Add `react-native-worklets >= 0.7.0` where listing peers

### 2) Fix `docs/docs/components/modal.md` incorrect capability claims

**What to remove/adjust:**

- Remove or rewrite “Tab/Shift+Tab focus trap” claims (not implemented; not generally applicable to native)
- Reframe “ESC to close” as:
  - Android hardware back triggers `onRequestClose`
  - External keyboard ESC behavior is not guaranteed unless explicitly handled

**What to add:**

- Document the accessibility props you’re adding in Phase 0:
  - `accessibilityViewIsModal` behavior on iOS
  - `accessibilityRole="dialog"` usage
  - `accessibilityLabel` expectations

## Verification Commands (CI-friendly)

From repo root:

```bash
bun install
bun turbo lint
bun turbo typecheck
bun turbo test
```

Focused (faster) checks while iterating:

```bash
bun -C packages/ui typecheck
bun -C packages/ui test
```

If you implement the optional peer FlashList strategy, add a quick “no flash-list installed” verification locally:

- Temporarily remove `@shopify/flash-list` from workspace install (or simulate missing resolution) and confirm:
  - `packages/ui` builds and typechecks
  - `Select`, `ListData`, `AnimatedList` render with FlatList fallback

## Common Pitfalls (Phase 0)

### Pitfall: “Optional peer” but still statically imported

**What goes wrong:** Consumers who don’t install FlashList get bundler “Cannot resolve @shopify/flash-list”.  
**Avoid:** Ensure all runtime imports are dynamic (`require`) behind try/catch; only `import type` is allowed.

### Pitfall: Breaking example/storybook due to workspace hoisting assumptions

**What goes wrong:** Example/Storybook accidentally “works on my machine” because FlashList is still present elsewhere.  
**Avoid:** If you make FlashList optional, explicitly list it in the apps that use FlashList-powered components.

### Pitfall: Backdrop a11y becoming noisy

**What goes wrong:** Screen readers focus the backdrop before content, confusing users.  
**Avoid:** Ensure content is labeled and discoverable; consider placing backdrop after content in the accessibility order, or disabling backdrop accessibility if it harms UX (but then provide an explicit close button inside content).

## Open Questions / Decisions to Make During Planning

1) **FlashList strategy choice**
   - Recommendation: Strategy A (optional peer + adapter fallback)
   - Decision needed: Do you want to keep apps explicitly depending on FlashList (recommended) or rely on workspace hoisting (not recommended)?

2) **Backdrop accessibility policy**
   - Recommendation: Backdrop is accessible with a clear “Close …” label/hint
   - Alternative: backdrop not accessible; require visible close button in content (more intrusive API/UX changes)

## Sources

### Primary (repo-local, HIGH confidence)

- `packages/ui/package.json` (dependencies and peerDependencies)
- `packages/ui/src/components/Select/Select.tsx` (FlashList usage)
- `packages/ui/src/components/AnimatedList/AnimatedList.tsx` (FlashList usage)
- `packages/ui/src/components/List/List.tsx` (FlashList usage)
- `packages/ui/src/components/Modal/Modal.tsx` (overlay implementation)
- `packages/ui/src/components/Dialog/Dialog.tsx` (overlay implementation)
- `packages/ui/src/components/BottomSheet/BottomSheet.tsx` (overlay implementation)
- `docs/getting-started.md`, `docs/docs/components/modal.md`, `README.md`, `packages/ui/README.md` (docs claims)

## Metadata

**Confidence breakdown:**

- Standard stack (repo deps): HIGH — derived from package.json and code imports
- Packaging strategy choice: MEDIUM — best-practice depends on desired “batteries-included” posture
- Overlay a11y recommendations: MEDIUM — RN a11y varies by platform; must validate with VoiceOver/TalkBack

**Valid until:** 2026-05-03 (re-check peer versions if `packages/ui/package.json` changes)

