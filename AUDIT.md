# RNUI — Expert Technical Audit

**Audited version:** 1.0.3
**Date:** 2026-04-03
**Scope:** All four packages — `@truongdq01/tokens`, `@truongdq01/headless`, `@truongdq01/ui`, `@truongdq01/themes`

---

## Executive Summary

RNUI is an ambitious, architecturally sound React Native design system. The three-tier token system, headless/styled split, and multi-brand theming model are genuinely well designed and reflect serious thought. The Reanimated 4 integration (worklets, `scheduleOnRN`, shared values) is modern and mostly correct. Test coverage is solid with 163 test files across 62 components.

However, several issues — one critical runtime bug, a stale-state design flaw in the most-used hook, and systematic accessibility gaps — need to be addressed before this can be confidently recommended to a broader audience. The package export structure prevents Metro tree-shaking, and an undocumented `@shopify/flash-list` native dependency creates a hidden setup cost for all consumers, even those not using Select.

**Overall rating: 7.5/10** — Production-capable but with blocking issues that need fixing.

---

## 1. Architecture & API Design

### 1.1 Layered Package Architecture

The layering is clean and intentional:

```
primitive.ts (raw values)
  → semantic.ts (design intent, light/dark)
    → brand.ts (color identity)
      → component.ts (per-component recipes)
        → theme.tsx (ThemeProvider, context)
          → UI components (consume via useComponentTokens/useTokens)
```

This correctly enforces the rule that components never import from `primitive.ts`. The `buildSemanticTokens(brand, scheme)` factory elegantly merges brand colors with the shared scale. The `defineBrand()` helper is effectively a type-safe identity function — a valid pattern for DX. Consider switching to `satisfies` (TS 4.9+) which avoids the runtime call entirely:

```ts
// Current (has runtime cost)
export function defineBrand(brand: Brand): Brand { return brand; }

// Better — zero-cost, same type safety
export const loveBrand = { ... } satisfies Brand;
```

### 1.2 Component API Consistency — Mixed Signals

The `Button` component (`packages/ui/src/components/Button/Button.tsx`) has accumulated alias props that create confusion:

```ts
// ButtonProps has all four of these simultaneously:
leadingIcon?: React.ReactNode;   // RNUI naming
trailingIcon?: React.ReactNode;  // RNUI naming
startIcon?: React.ReactNode;     // MUI alias
endIcon?: React.ReactNode;       // MUI alias
```

Similarly, `ButtonVariant` exports both native names and MUI aliases:
```ts
export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive" | "text" | "contained" | "outlined";
```

`"contained"`, `"outlined"`, and `"text"` are resolved via `useMemo` back to `"solid"`, `"outline"`, `"ghost"` (Button.tsx lines 107–112). These aliases appear in public types, pollute autocomplete, and are undocumented. **Pick a convention and drop the aliases**, or at least mark them `@deprecated`.

The `style` prop is typed as `object` (Button.tsx line 70) instead of `StyleProp<ViewStyle>` — this loses all RN style type safety.

### 1.3 Flat Props vs Compound Component Pattern

`Select` uses a flat-props model with the options list passed directly. This is fine for simple cases, but it makes the async pattern awkward — the consumer must wire `loading`, `onLoadMore`, `hasMore`, `loadingMore` together manually. A compound pattern (`Select.Root` / `Select.Trigger` / `Select.Content` / `Select.Option`) would allow more flexible composition and is the direction the RN ecosystem is moving (e.g., Radix/shadcn approach).

`Tabs`/`Tab` uses React Context correctly, but the `<Tabs>` container doesn't have `accessibilityRole="tablist"` set, making the semantic structure incomplete (see Section 3.1).

There is no `TabPanel` component for associating tab content with the tab bar — consumers must handle this themselves, and there's no `aria-controls` / `accessibilityLabelledBy` linkage.

### 1.4 TypeScript Quality

**Good:** `useSlider` uses discriminated union via `range: true` with `UseSliderReturnSingle` / `UseSliderReturnRange` return types — a well-executed generic discriminated union pattern.

**Issue — unsafe casts in `useSlider`:** The hook destructures options via `rest as UseSliderOptionsSingle` / `rest as UseSliderOptionsRange` (lines 98–99). These are unchecked runtime casts. In a controlled component scenario, passing a `range: true` config but calling single-mode handlers would not be caught.

**Issue — `ColorGroup` interface drift:** `semantic.ts` defines `ColorGroup.text` (lines 265–278) as a subset of the actual token shape. The real `lightTokens.color.text` includes `visited`, `selected`, `success`, `warning`, `error`, `info` but the `ColorGroup` interface omits them. Since `SemanticTokens.color` is typed as `ColorGroup` (not `typeof lightTokens.color`), TypeScript won't catch when components access `tokens.color.text.visited` — the property exists at runtime but is invisible to the type system. Derive the type instead:

```ts
export type SemanticTokens = typeof lightTokens; // fully typed, no drift
```

**Issue — `BrandColorGroup` optional vs required mismatch:** `brand.ts`'s `BrandColorGroup.text` makes `visited?`, `selected?`, `success?` etc. optional. But `semantic.ts`'s `ColorGroup.text` omits them entirely. The `loveBrand` brand correctly provides them, but the type says they're optional — creating the situation where a brand could omit them and components would get `undefined` at runtime.

### 1.5 Tree-Shaking & Package Exports

All four packages use a single export entry:
```json
"exports": {
  ".": { "types": "...", "import": "...", "require": "..." }
}
```

With Metro (React Native's bundler), this is a **tree-shaking dead end**. Metro does not tree-shake across module boundaries — importing `import { Button } from "@truongdq01/ui"` will pull in all 62 components and all their dependencies (including `@shopify/flash-list`, `@react-native-community/datetimepicker`, etc.) into every consumer's bundle.

**Fix:** Add subpath exports in `package.json`:
```json
"exports": {
  ".": { ... },
  "./button": { "types": "./dist/button/index.d.ts", "import": "./dist/button/index.mjs" },
  "./select": { ... }
}
```
And configure `tsup` to output per-component entry points.

**Separate issue:** `@shopify/flash-list` (`^2.0.2`) is in `dependencies`, not `peerDependencies`. FlashList has native code (requires `pod install` / Android linking). Every consumer of `@truongdq01/ui` will have it forced on them even if they never use `Select`. It should be either a peer dependency with an optional indicator, or the Select component should support passing a list renderer as a prop.

Similarly, `@types/react-native` (`^0.73.0`) is in `dependencies` instead of `devDependencies`. This installs TS type declarations as a production dependency — incorrect packaging hygiene.

### 1.6 Polymorphic `as` Prop

Not implemented. `Button` renders as `GestureDetector > Animated.View` always. There's no way to render it as a `TouchableOpacity` or any other underlying component. For a design system, this limits extensibility.

---

## 2. Design Token System

### 2.1 Three-Tier Implementation Quality

The three-tier model (primitive → semantic → component) is implemented correctly and is the strongest part of the codebase. The discipline of `RULE: Never import these directly in components` in `primitive.ts` line 4 is good — but it's only a comment, not enforced by any lint rule. An ESLint rule banning direct imports of `@truongdq01/tokens/primitive` in component code would make this guarantee robust.

The `shared` object in `semantic.ts` (spacing, radius, typography, etc.) correctly separates mode-independent tokens from color tokens, avoiding unnecessary duplication.

### 2.2 Dark Mode Completeness

Dark mode coverage is thorough. `darkTokens` properly inverts surfaces, text contrast, and brand colors. The WCAG contrast ratios noted in comments (e.g., `// #A78BFA — 7.1x on dark-bg ✅ AAA`) show the right thinking.

**Gap:** Shadow tokens in dark mode use higher opacity (`shadowOpacity: 0.25–0.55`) but still use `shadowColor: black`. On dark backgrounds, shadows are nearly invisible regardless of opacity. A common fix is to use a semi-transparent white or brand color glow, or rely entirely on `elevation` (Android) plus `surface.raised` color differentials.

### 2.3 Naming Conventions

**Strong:** The semantic naming (`color.bg.default`, `color.surface.raised`, `color.text.primary`, `color.border.focus`) follows established conventions and maps cleanly to W3C Design Token spec intent.

**Inconsistency:** The tokens package exports `primitive` directly (it's in `index.ts`). This violates the stated rule and lets consumers import primitives directly. Remove `primitive` from the public export or wrap it in a warning.

**Gap:** There are no `color.brand.emphasis` or `color.brand.on-surface` tokens — patterns needed when brand color is used as a surface (e.g., a brand-colored card). The `onBrand` token only covers text-on-brand, not borders or icons on brand backgrounds.

### 2.4 Motion Token Quality

`motion.ts` is well-structured. The four spring presets (`snappy`, `bouncy`, `gentle`, `stiff`) cover the main animation archetypes. `pressFeedback` presets correctly encode the interaction affordance into data.

**Issue — String-based `motionPreset`:** The `motionPreset` object stores animation names as strings (`"FadeInUp"`, `"ZoomIn"` etc.). The comment says "Actual Reanimated imports happen in `@truongdq01/headless`" — but this means consumers who use `motionPreset` directly must map strings to Reanimated classes themselves. The headless package re-exports real Reanimated layout animation objects in `motion.ts`, but this creates two separate APIs for the same concept with no linkage. The string values in `@truongdq01/tokens` are orphaned design metadata.

**Issue — `easing` strings are not Reanimated-compatible:** The `easing` values (`"cubic-bezier(0.4, 0, 1, 1)"`) are CSS strings. Reanimated's `withTiming` requires `Easing.bezier(...)` from `react-native-reanimated`. The comment acknowledges this, but it means these tokens can't be used directly in code — they're documentation only, which defeats the purpose of a code-level token.

---

## 3. Component Quality

### 3.1 Accessibility

**`Badge` (`Badge/Badge.tsx`):** No accessibility props at all. `<View>` with no `accessibilityRole`, no `accessibilityLabel`. For decorative badges this is acceptable, but status badges (error, warning, success) carry semantic meaning that screen readers will miss entirely. Should expose `accessibilityRole="text"` and allow `accessibilityLabel` override.

**`Tabs`/`Tab` (`Tabs/Tabs.tsx`):**
- `Tab` correctly sets `accessibilityRole="tab"` and `accessibilityState={{ selected, disabled }}` — good.
- `Tabs` container `<View>` has no `accessibilityRole="tablist"` — the ARIA tablist role is required for screen readers to announce the tab structure correctly.
- No `TabPanel` component with `accessibilityRole="tabpanel"` means content areas have no programmatic association with their controlling tabs.

**`BottomSheet` (`BottomSheet/BottomSheet.tsx`):**
- Uses `<Modal visible={mounted} transparent>` — React Native Modal handles basic iOS modal accessibility.
- The sheet `<Animated.View>` is missing `accessibilityViewIsModal={true}` — on iOS, VoiceOver will not confine focus to the sheet, letting users navigate behind the backdrop.
- The backdrop `GestureDetector` has no `accessibilityLabel` for the "tap to close" affordance.
- No `accessibilityRole` on the drag handle area.

**`Select` (`Select/Select.tsx`):**
- Trigger `<Pressable>` has `accessibilityState={{ expanded: isOpen }}` but no `accessibilityRole` — should be `"combobox"` or at minimum `"button"`.
- The search `TextInput` inside the sheet has no `accessibilityLabel`.

**`Input` (`Input/Input.tsx`):**
- Sets `accessibilityLabel={label}` on `RNTextInput` — correct.
- Missing `accessibilityState={{ disabled }}` on the outer container — it's on the inner `TextInput` but the container View that shows error states has no accessible annotation.

**`usePressable`:**
- Does not support `accessibilityActions` (custom iOS accessibility actions like "Increment", "Decrement" needed for sliders/steppers).
- Does not support `onAccessibilityTap` for cases where native tap gesture and accessibility tap diverge.

### 3.2 Reanimated Usage

The Reanimated integration is the technical highlight of the codebase.

**`usePressable`:** Correctly separates UI-thread work (`scale.value = withSpring(...)`) from JS-thread callbacks (`runOnJS(setPressedState)`, `scheduleOnRN(handlePress)`). The caching of spring config and press feedback values outside the worklet (lines 124–127) shows awareness of worklet serialization costs. Solid.

**`useSlider`:** Excellent handling of both single and range modes with independent shared values per thumb. The `snapRatioWorklet` helper (line 77) correctly uses `"worklet"` directive inline for pure math on the UI thread. The `emitChange` debounce via `lastEmittedValue.value` comparison (lines 248–250) prevents JS-thread flooding during drag — this is proper worklet usage.

**`useBottomSheet` — stale `isOpen` bug:**

```ts
return {
  isOpen: isOpenRef.current,   // ← Line 237 — BUG
  currentSnapIndex: currentIndexRef.current,  // ← Line 239 — BUG
  ...
};
```

`isOpenRef.current` and `currentIndexRef.current` are Refs. Reading a Ref in a render does not cause a re-render when the Ref changes. Any consumer who writes:
```tsx
const { isOpen } = useBottomSheet();
if (isOpen) { ... }  // This will be STALE — always shows initial value in the render
```
...will see stale state. The hook correctly uses refs internally for gesture/animation coordination (where you don't want re-renders), but the returned `isOpen` / `currentSnapIndex` values should be `useState`-tracked for consumers. This requires a parallel state variable alongside the ref.

**`useBottomSheet` — `animateToSnap` is dead code:**

`animateToSnap` (lines 93–108) is defined as a `useCallback` with `"worklet"` directive, but it is never called. `open`, `close`, and `snapTo` all perform their animations inline without calling it. This is dead code that adds confusion.

**`Input` mixes Animated APIs:**

`Input.tsx` imports `Animated` from React Native (line 8) and uses `Animated.timing` + `Animated.Value` for the focus border transition. This is the old bridge-based API. For a library that requires Reanimated 4, this is inconsistent and runs on the JS thread. Should use `withTiming` + `useSharedValue` from Reanimated consistently.

### 3.3 Critical Bug — `ToastItem.tsx` Line 87

```tsx
// ToastItem.tsx line 87 — LITERAL STRING BUG
<Icon size={20} color={v.iconColor} name={"VARIANT_ICONS[item.variant]" as any} />
```

The `as any` cast hides what is clearly a copy-paste error. The template string was meant to be an expression: `name={VARIANT_ICONS[item.variant] as any}`. As written, the Icon component receives the literal string `"VARIANT_ICONS[item.variant]"` as its `name` prop, not the actual icon name. **Toast icons for `success`, `error`, `warning`, and `info` variants are broken** — they will render nothing or an unknown icon instead of `checkCircle`, `error`, `warning`, `info`.

### 3.4 Component Token Coverage

Most components (62 total) have corresponding token functions in `component.ts` — this is comprehensive. However several token functions are missing or incomplete: `Snackbar`, `Link`, `Popover`, `Popper`, `SpeedDial` appear in `index.ts` exports but do not appear in the `component.ts` token function list, suggesting those components inline their styles from semantic tokens rather than component tokens — inconsistent architecture.

### 3.5 Error/Loading State Coverage

- `Button` has `loading` and `disabled` states — good, with three `loadingPosition` options.
- `Select` has `loading`, `loadingMore`, `hasMore` — good.
- `Input` has `disabled` and `error` states — good.
- `Badge` has no error/loading state (appropriate for the component type).
- `BottomSheet` has no loading state for content — consumers must implement their own skeleton.
- No components implement an `isError` / `errorMessage` compound pattern at the layout level — `FormField` and `FormControl` exist for this purpose but are not cross-referenced in component documentation.

---

## 4. Developer Experience

### 4.1 Missing CLI Tool

There is no `npx @truongdq01/ui add <component>` equivalent. For a design system with 62 components and non-trivial peer dependency setup (Reanimated, RNGH, safe-area-context, Worklets, FlashList), this is a meaningful DX gap. Consumers must manually install 5–6 peer dependencies, configure Babel presets, and set up `GestureHandlerRootView`. A setup CLI or comprehensive "Installation" guide is essential.

### 4.2 Package Exports & Tree-Shaking

Covered in Section 1.5. Metro does not tree-shake. With 62 components in one barrel, consumers who want only `Button` pull in `DatePicker`, `FlashList`, `@react-native-community/datetimepicker`, etc. This meaningfully inflates bundle size for new consumers.

### 4.3 JSDoc Coverage

Token files have reasonable JSDoc. Component prop interfaces have `/** JSDoc */` on individual props — good. However, the component implementations themselves lack usage examples in their JSDoc. Following the JSDoc `@example` pattern would let IDEs surface usage snippets inline.

The `createTheme` export from headless has a useful docblock but the `ThemeOverride` type has a complex partial structure that would benefit from an example in the JSDoc.

### 4.4 Storybook Coverage

23 stories for 62 components — **37% coverage**. The existing stories (e.g., Accordion) are well-structured with `meta` and named `Story` exports. Missing stories for complex components like `DatePicker`, `Autocomplete`, `Table`, `Stepper`, `SpeedDial`, and `OTPInput` make it hard for contributors to develop these components visually.

### 4.5 Documentation Site

The Docusaurus site structure exists in `/docs` but per the README, `rnui.dev` is "coming soon." There are no deployed API docs. This is the most visible DX gap for external consumers.

---

## 5. Testing & CI

### 5.1 Unit Test Quality

163 test files across both packages. Quality is high:

- `Badge.test.tsx`: 25+ test cases covering variants, sizes, icon prop, memoization, edge cases, and multiple-badge rendering — this is exemplary test depth.
- `Button.test.tsx`: Covers rendering, interactions, loading/disabled, and variant resolution — solid.
- `Tabs.test.tsx`: **Only 1 test case** — `handles change`. No tests for keyboard navigation, disabled tabs, vertical orientation, or the compound context behavior.
- `Slider.test.tsx`: **Only 1 test case** — `renders`. No interaction tests for drag behavior, step snapping, range mode, or controlled value updates. Given the complexity of `useSlider`, this is a significant gap.
- No tests for the `useBottomSheet` hook's stale `isOpen` behavior (which is itself a bug — see 3.2).

### 5.2 Detox E2E

`apps/example` has Detox configured (package.json scripts: `e2e:ios`, `e2e:android`, `e2e:build:ios`), but per the README, the E2E suite is listed as "🚧 In Progress." No test files exist under an `e2e/` directory in the example app. This is a placeholder infrastructure.

### 5.3 CI Pipeline (`.github/workflows/ci.yml`)

**Good:**
- Turbo cache between runs.
- Separate `perf-test` job (presumably Reassure or similar, though the actual perf test implementation isn't visible).
- Docs build is CI-gated.
- `--frozen-lockfile` enforced on install.

**Missing — `typecheck` not in CI:**
`turbo.json` defines a `typecheck` task, and all packages have `"typecheck": "tsc --noEmit"` in their scripts. But the CI workflow does not run `bun turbo typecheck`. TypeScript errors can land on `main` without being caught.

**Issue — `bun-version: latest`:**
Pinning `bun-version: "1.3.10"` (matching `packageManager` in root `package.json`) would prevent unexpected breakage from Bun minor releases.

**Issue — No coverage reporting:**
Tests run but coverage is not uploaded to any service (Codecov, Coveralls, etc.). Coverage trends are invisible over time.

**Issue — No release workflow:**
The `changeset publish` mechanism is documented in `package.json` scripts but there's no `.github/workflows/release.yml`. Publishing is a fully manual operation.

---

## 6. Ecosystem Positioning

### 6.1 vs shadcn/ui

shadcn/ui's model (copy source into your project, own the code) is fundamentally different — RNUI is a traditional npm dependency. The headless/styled split is the closest analog to shadcn's pattern (headless = primitives you own, `@truongdq01/ui` = the pre-built layer).

Gaps vs shadcn:
- No CLI to add/customize individual components.
- No "bring your own styles" path at the component level without using the headless package directly.
- shadcn's Storybook shows every variant of every component — RNUI's 37% coverage is well behind.

### 6.2 vs Tamagui

Tamagui's killer feature is compile-time style optimization (removing JS runtime cost). RNUI's runtime component token resolution (`resolveComponentTokens` called in `ThemeProvider`) is correct and cached, but it's fully runtime. For apps with large component trees, Tamagui's static extraction offers a meaningful performance edge.

RNUI's differentiation: cleaner API (no `$` prefix tokens), no custom compiler step required, proper Reanimated 4 integration from day one, and multi-brand theming that Tamagui handles less elegantly.

### 6.3 vs Gluestack / NativeBase

Gluestack (NativeBase v5) is the most direct competitor — also headless + styled, also React Native-first, also dark mode + theming. Key differences:
- RNUI's motion system is more sophisticated (token-backed spring configs, reduce-motion support baked in).
- Gluestack has larger community and more mature docs.
- RNUI's type safety on the token system is stricter.

**Differentiator to lean into:** The brand preset system (`loveBrand`, `oceanBrand`, etc.) with runtime brand-switching is genuinely unique in the RN UI library space. No other library offers this out of the box.

### 6.4 Publishing Hygiene

- `@types/react-native` in `dependencies` (should be `devDependencies`) — forces type packages on consumers.
- `@shopify/flash-list` in `dependencies` (should be `peerDependencies` + optional) — forces a native module on all consumers.
- README version (`v0.1.0`) is out of sync with `package.json` (`1.0.3`).
- No `CHANGELOG.md` visible at root (Changesets would generate this — it may not have been run yet).
- `exports` field only covers `"."` — no `"./package.json"` entry which some tools require.

---

## Priority Action Plan

### 🔴 P0 — Blockers

**P0-1: Fix `ToastItem.tsx` line 87 — literal string bug**
```tsx
// BROKEN — literal string, not variable lookup:
name={"VARIANT_ICONS[item.variant]" as any}

// CORRECT:
name={VARIANT_ICONS[item.variant] as any}
```
All toast variant icons (success/error/warning/info) are visually broken.

**P0-2: Fix `useBottomSheet` stale `isOpen` / `currentSnapIndex`**
Replace ref reads in the return value with state:
```ts
const [isOpen, setIsOpen] = useState(false);
const [currentSnapIndex, setCurrentSnapIndex] = useState(defaultSnapIndex);
// Update these via callbacks alongside the ref mutations
```
Without this, every consumer of `isOpen` from `useBottomSheet` renders stale UI.

**P0-3: Add `typecheck` to CI**
```yaml
- name: Typecheck
  run: bun turbo typecheck
```
TypeScript errors are not CI-gated.

**P0-4: Move `@types/react-native` to `devDependencies` and `@shopify/flash-list` to `peerDependencies`**
These cause incorrect package graphs for consumers.

---

### 🟠 P1 — High Impact

**P1-1: Fix `BottomSheet` accessibility (`BottomSheet.tsx`)**
```tsx
<Animated.View
  accessibilityViewIsModal={true}    // ← add this
  accessibilityRole="dialog"          // ← add this
  accessibilityLabel="Bottom sheet"  // ← or accept as prop
  ...
>
```
Without `accessibilityViewIsModal`, VoiceOver users can interact with content behind the backdrop.

**P1-2: Add `accessibilityRole="tablist"` to `Tabs` container (`Tabs.tsx` line 47)**
```tsx
<View
  accessibilityRole="tablist"   // ← add
  style={[tabs.container, ...]}
>
```

**P1-3: Add `accessibilityRole` to `Select` trigger (`Select.tsx` line 178)**
```tsx
<Pressable
  accessibilityRole="combobox"     // ← add
  accessibilityState={{ expanded: isOpen }}
  ...
>
```

**P1-4: Migrate `Input` focus animation from `Animated` to Reanimated**
`Input.tsx` uses `Animated.Value` from React Native (bridge/JS thread). Replace with `useSharedValue` + `withTiming` from Reanimated for consistency and thread correctness.

**P1-5: Add subpath exports for tree-shaking**
Add per-component exports in `packages/ui/package.json` and configure `tsup` to produce per-entry outputs. Without this, Metro bundles the full library for every app.

**P1-6: Remove `animateToSnap` dead code from `useBottomSheet`**
The `animateToSnap` callback (lines 93–108) is never called. Remove it to reduce confusion.

**P1-7: Fix `SemanticTokens` type — derive from actual tokens**
```ts
// Replace the hand-maintained ColorGroup interface with:
export type SemanticTokens = {
  [K in keyof typeof lightTokens]: typeof lightTokens[K];
} & { color: typeof lightTokens.color | typeof darkTokens.color };
```
This eliminates the drift risk between interface and implementation.

---

### 🟡 P2 — Polish

**P2-1: Drop `ButtonVariant` MUI aliases from public type**
`"contained"`, `"outlined"`, `"text"` create noise in autocomplete. Either remove or mark `@deprecated`.

**P2-2: Drop prop aliases from `ButtonProps`**
Choose either `leadingIcon`/`trailingIcon` (or `startIcon`/`endIcon`) and remove the other pair. The aliases create an inconsistent API surface.

**P2-3: Fix `Badge` accessibility**
Add `accessibilityRole="text"` and an optional `accessibilityLabel` prop. Status badges should be announced.

**P2-4: Add `eslint-plugin-import` rule banning `@truongdq01/tokens/primitive` in component code**
The "never import primitives in components" rule is currently a comment, not enforced.

**P2-5: Pin `bun-version` in CI**
Change `bun-version: latest` to `bun-version: "1.3.10"` to match `packageManager` in `package.json`.

**P2-6: Add release workflow**
Create `.github/workflows/release.yml` using `changeset action` to automate `changeset version` and `changeset publish` on merge to `main`.

**P2-7: Expand test coverage for `Slider` and `Tabs`**
Both have 1-case tests. `Slider` in particular has complex range/step logic deserving interaction tests.

**P2-8: Sync README version**
README states `v0.1.0`; `package.json` is at `1.0.3`. Update README.

**P2-9: Add Storybook stories for `DatePicker`, `OTPInput`, `Autocomplete`, `Table`, `Stepper`**
Currently at 37% story coverage (23/62 components). The 5 complex missing stories are the most valuable to add.

**P2-10: Replace `easing` CSS strings with Reanimated-compatible format**
```ts
// Current (unusable in code):
easeOut: "cubic-bezier(0, 0, 0.2, 1)"

// Proposed (usable):
easeOut: { type: "bezier", x1: 0, y1: 0, x2: 0.2, y2: 1 }
// Then resolve with: Easing.bezier(e.x1, e.y1, e.x2, e.y2) in headless
```

**P2-11: Consider `satisfies` operator for `defineBrand`**
```ts
// Replace the identity function with a no-op type constraint
export const loveBrand = { ... } satisfies Brand;
```
Removes a runtime call with identical type safety.

---

*Audit conducted by reading source directly: `packages/tokens/src/{primitive,semantic,component,motion,brand}.ts`, `packages/headless/src/hooks/{usePressable,useBottomSheet,useToast,useSelect,useSlider}.ts`, `packages/headless/src/theme.tsx`, `packages/ui/src/components/{Button,Input,Select,BottomSheet,Toast,Badge,Tabs,Carousel}/*.tsx`, `packages/themes/src/brands/love.ts`, `packages/ui/package.json`, `turbo.json`, `.github/workflows/ci.yml`, representative test files.*
