# RNUI — Deep Audit Report

**Date:** 2026-04-02
**Scope:** Full codebase scan — code quality, performance, edge cases, scoring component, design system, animations
**Version audited:** v1.0.3 | Branch: `develop`

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Code Quality](#2-code-quality)
3. [Performance](#3-performance)
4. [Edge Cases](#4-edge-cases)
5. [Rating / Scoring Component Deep Dive](#5-rating--scoring-component-deep-dive)
6. [Design System — Style, Colors, Theme, Animation](#6-design-system--style-colors-theme-animation)
7. [Improvement Roadmap](#7-improvement-roadmap)

---

## 1. Executive Summary

| Area             | Score    | Status                                            |
| ---------------- | -------- | ------------------------------------------------- |
| Code Quality     | 7.5 / 10 | Good, isolated typing gaps                        |
| Performance      | 8 / 10   | Strong Reanimated usage, a few patterns to harden |
| Edge Cases       | 6 / 10   | Several unhandled flows discovered                |
| Rating Component | 5 / 10   | Functional but shallow — significant gaps         |
| Design System    | 8.5 / 10 | Excellent token architecture, minor hardcoding    |
| Animation System | 8 / 10   | Modern worklet approach, missing reduced-motion   |

**Overall health: 7.2 / 10** — Production ready for standard use cases; targeted improvements needed before enterprise/accessibility-critical deployment.

---

## 2. Code Quality

### 2.1 Unsafe `as any` Casts — HIGH Priority

Three places in `Rating.tsx` break type safety with `as any`:

```typescript
// packages/ui/src/components/Rating/Rating.tsx:39-52
const iconSize = (rating.size as any)[size]; // line 39
const activeColor = (rating as any).star.filled.color; // line 40
const inactiveColor = (rating as any).star.empty.color; // line 41
const containerStyle = (rating as any).container; // line 52
```

**Root cause:** `ratingTokens()` in `component.ts` returns the correct shape, but `useComponentTokens()` returns a union type that doesn't expose `rating.star` or `rating.container`. The generated `ComponentTokens` interface doesn't include the full `ratingTokens` return type.

**Fix:** Extend `ComponentTokens` in `component.d.ts` to include a properly typed `rating` key.

---

Similar pattern in `Button.tsx`:

```typescript
// packages/ui/src/components/Button/Button.tsx:223
const iconColor = String((textStyle[0] as any)?.color ?? ...);
```

`textStyle` is a mixed array of `StyleSheet` objects and overrides — TypeScript can't infer `.color` from a flat array. **Fix:** Extract a typed `textStyleBase` from the first element.

---

In `Pressable.tsx`:

```typescript
// packages/ui/src/components/Pressable/Pressable.tsx:22
style={[(pressable as any).container, style, animatedStyle] as any}
```

The `pressable` component token doesn't expose a `container` key typed correctly. **Fix:** Add `container` to `pressableTokens()` return type.

---

### 2.2 Hardcoded Color Values — MEDIUM Priority

| File           | Location                 | Hardcoded value        | Should be                 |
| -------------- | ------------------------ | ---------------------- | ------------------------- |
| `component.ts` | `toastTokens()` line 198 | `"#FFFFFF"`            | `t.color.text.inverse`    |
| `component.ts` | `switchTokens()`         | `"#FFFFFF"` (thumb)    | `t.color.text.inverse`    |
| `component.ts` | `sliderTokens()`         | `"#FFFFFF"` (thumb bg) | `t.color.surface.raised`  |
| `Switch.tsx`   | line 76                  | `shadowColor: "#000"`  | `t.shadow.sm.shadowColor` |
| `Switch.tsx`   | line 50                  | `gap: 12`              | `tokens.spacing[3]`       |
| `Switch.tsx`   | line 94                  | `marginTop: 2`         | `tokens.spacing[0.5]`     |

When using `loveBrand` dark mode, the white thumb appears on a near-white track — contrast collapses. These need to reference semantic tokens.

---

### 2.3 Missing `React.memo` on Some Components

`Rating` and `Skeleton` sub-components are not memoized:

```typescript
// Rating.tsx — function component, no memo
export function Rating({ ... }) { ... }

// Skeleton.tsx
export function SkeletonText({ ... }) { ... }
export function SkeletonCard() { ... }
export function SkeletonListItem() { ... }
```

All peers (`Button`, `Switch`, `Checkbox`, etc.) use `React.memo`. These should be consistent.

---

### 2.4 `Carousel` Uses `index` as React Key — MEDIUM Priority

```typescript
// Carousel.tsx:74
<View key={index} style={{ width: itemWidth, height }}>
```

When `loop=true`, `displayData` is a cloned array with prepended/appended sentinel items. Using `index` as key means React will not reconcile correctly when the list shifts — items will unnecessarily unmount/remount.

**Fix:** Use a stable ID (e.g., `key={isLoop ? `loop-${index}` : String(index)}` or embed a `_key` in `displayData` items).

---

### 2.5 `Skeleton` — Missing `shimmer` Cleanup on Unmount

```typescript
// Skeleton.tsx:32-39
useEffect(() => {
  if (!animate) return;
  shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
}, [animate]);
```

`shimmer` is a `useSharedValue` — Reanimated cleans it up automatically — but when `animate` toggles from `true` → `false` mid-animation, the animation is never cancelled. The shimmer continues running silently.

**Fix:** Return a cancel function or call `cancelAnimation(shimmer)` when `animate` becomes `false`.

---

### 2.6 `handlePress` in Button Created with `useMemo` Instead of `useCallback`

```typescript
// Button.tsx:171-177
const handlePress = useMemo(() => {
  if (!href) return onPress;
  return () => {
    onPress?.();
    Linking.openURL(href);
  };
}, [href, onPress]);
```

`useMemo` for a function is semantically wrong — use `useCallback`. `useMemo` can theoretically discard cached values under memory pressure.

---

### 2.7 `Carousel.tsx` — `SCREEN_WIDTH` Captured at Module Load

```typescript
// Carousel.tsx:11
const { width: SCREEN_WIDTH } = Dimensions.get('window');
```

This is evaluated once when the module is imported. On foldable devices, split-screen mode, or orientation change — `SCREEN_WIDTH` becomes stale.

**Fix:** Use `useDimensions()` hook or `Dimensions.addEventListener` inside the component.

---

### 2.8 `useRating` — `controlledValue` Comparison Bug (Subtle)

```typescript
// useRating.ts:37
if (controlledValue === undefined) setInternalValue(next);
onChange?.(next);
```

When in controlled mode (`value` prop provided), `setInternalValue` is skipped but `onChange` is still called — correct behavior. However if `defaultValue` is provided alongside `value`, the internal state is seeded from `defaultValue` but never updated, creating a stale internal state that would become visible if `value` prop is later removed. This is a standard controlled/uncontrolled pattern hazard.

---

## 3. Performance

### 3.1 Strengths

- All interactive components use Reanimated `useSharedValue` + `useAnimatedStyle` — animations run entirely on the UI thread, no JS bridge cost.
- `Gesture.Tap()` + `GestureDetector` avoids the legacy touch responder system.
- `useMemoStyles` caches `StyleSheet.create()` results and only recomputes on theme change.
- `useComponentTokens()` returns pre-computed style maps — no runtime style merging per render.
- All major components wrapped in `React.memo()`.

### 3.2 Issues Found

#### `PaginationDot` in Carousel — Hook per Dot

```typescript
// Carousel.tsx:123
function PaginationDot({ ... }) {
  const { carousel } = useComponentTokens(); // Called N times per frame
  const dotStyle = useAnimatedStyle(() => { ... });
  ...
}
```

`useComponentTokens()` is called once per dot on every render. With 10+ slides, this is 10+ context reads per render cycle. **Fix:** Pass `carousel` tokens as a prop from the parent, computed once.

---

#### `Button.tsx` — `resolvedColor` Runs 8 `if` Chains Per Render

```typescript
// Button.tsx:114-169
const resolvedColor = useMemo(() => {
  if (color === "inherit") { ... }
  if (color === "secondary") { ... }
  // ... 6 more conditions
}, [color, tokens]);
```

This is wrapped in `useMemo` so it only re-runs on `color`/`tokens` change — acceptable. However the `if-chain` approach vs. a lookup map is a minor readability issue with no measurable performance difference at this scale.

---

#### `Skeleton` Animation — Always Starts Fresh

```typescript
useEffect(() => {
  shimmer.value = withRepeat(withTiming(1, { duration: 1200 }), -1, true);
}, [animate]);
```

When a list of 20 `Skeleton` items are rendered simultaneously, each starts its own `withRepeat` independently. All skeletons animate out of phase — the shimmer wave effect is lost. Industry standard is a single shared `useSharedValue` passed via context or prop.

---

#### `Carousel` — `scrollEventThrottle={16}` Without `useNativeDriver`

```typescript
<ScrollView
  scrollEventThrottle={16}
  onScroll={onScroll}
>
```

With Reanimated's `useAnimatedScrollHandler`, this is fine. Verify `onScroll` in `useCarousel` is wrapped with `useAnimatedScrollHandler` and not a plain JS callback — if it's a plain function, every scroll event crosses the bridge at 60fps.

---

#### Large Component Token Object Re-Creation

In `ThemeProvider`, `useComponentTokens()` computes the full component token map (~1300 lines of token functions) on every theme change. This is correct but could be expensive on low-end Android if theme switching is rapid. Consider memoizing the component token map with a deep-equal check or version counter.

---

### 3.3 Missing Optimizations

| Optimization                                | Impact                             | Effort |
| ------------------------------------------- | ---------------------------------- | ------ |
| Shared skeleton shimmer via context         | Medium — visual coherence + perf   | Low    |
| `PaginationDot` — receive tokens as prop    | Low                                | Low    |
| `Carousel` — stable list keys for loop mode | Medium — avoids unmount/remount    | Low    |
| `Dimensions` hook for responsive width      | Medium — foldable/rotation support | Low    |
| Virtualized rendering in `ImageList`        | High — for large datasets          | Medium |

---

## 4. Edge Cases

### 4.1 Rating — Zero/Negative/Float Inputs

```typescript
// Rating.tsx:47
const snapped = Math.round(next / precision) * precision;
setValue(ratingValue === snapped ? 0 : snapped);
```

**Unhandled cases:**

- `max={0}` — renders 0 stars, no crash but nothing shown. No guard.
- `precision={0}` — division by zero: `Math.round(next / 0)` → `NaN`. No guard.
- `value={-1}` — `ratingValue >= starNumber` is always false but `ratingValue >= starNumber - 0.5` may produce unexpected half-star behavior.
- `value={100}` with `max={5}` — all stars fill correctly, but `onChange` would never fire as pressing is disabled above `max`. Not a bug but undocumented.
- `precision={0.25}` — quarter stars? Supported numerically but no visual half-star glyph means 0.25 looks the same as 0 or 0.5. No documentation.

---

### 4.2 Button — `href` Opens Without Guard

```typescript
// Button.tsx:173-176
return () => {
  onPress?.();
  Linking.openURL(href); // No await, no error handling
};
```

`Linking.openURL()` is async and can reject (e.g., unsupported scheme, no app to handle). A rejected promise with no `.catch()` is a silent failure. On Android this can throw unhandled rejection warnings. **Fix:** Wrap in `try/catch` or `.catch(console.warn)`.

---

### 4.3 `Carousel` Loop Mode — Single-Item Edge Case

```typescript
// useCarousel.ts — displayData for loop mode
// Prepends last item, appends first item
displayData = [lastItem, ...data, firstItem];
```

When `data.length === 1`, `displayData = [item, item, item]`. Loop navigation becomes meaningless — `onMomentumScrollEnd` will always snap back to the center. The pagination renders 1 dot (correct) but visual loop cloning creates a jarring snap. No documentation or guard.

---

### 4.4 `Carousel` Empty Data

```typescript
// Carousel.tsx:72
{displayData.map((item: T, index: number) => { ... })}
```

If `data=[]` is passed:

- `displayData` = `[]` in non-loop mode, `[undefined, undefined]` in loop mode (last/first of empty array = `undefined`).
- `renderItem(undefined, index)` will be called — undefined behavior passed to consumer.
- **Fix:** Guard `if (data.length === 0) return <EmptyState />;` or similar.

---

### 4.5 `Switch` — `thumbTravel` Can Go Negative

```typescript
// Switch.tsx:26
const thumbTravel = tTrack.width - tThumb.width - tTrack.padding * 2;
```

If someone passes a custom `size` token where thumb width exceeds track width (possible via token override), `thumbTravel` becomes negative and the thumb slides in the wrong direction. No runtime guard.

---

### 4.6 `OTPInput` — Paste Handling Unknown

The `useOTPInput` hook manages per-character input. Paste behavior (e.g., user pastes "123456" into the first field) is not accounted for in the basic hook contract. Most native inputs fire `onChange` with the full pasted string, not character-by-character. **Verify:** `useOTPInput` should detect paste events and distribute characters across fields.

---

### 4.7 `Autocomplete` — Race Condition on Async Filter

If `useAutocomplete` supports async filtering (query → fetch → render results), a fast typist can fire multiple requests. Without cancellation (AbortController or debouncing), stale results from an earlier query can arrive after a newer one, overwriting correct results. **Verify:** check `useAutocomplete` for debounce or request cancellation.

---

### 4.8 `DatePicker` — Timezone / Locale Not Surfaced

`DatePicker` wraps `@react-native-community/datetimepicker`. The underlying component is locale-aware but the `DatePicker` wrapper props likely don't expose `locale`, `timeZoneOffsetInMinutes`, or `timeZoneOffsetInSeconds`. For global apps this is a silent localization bug.

---

### 4.9 `Tooltip` — Position Near Screen Edge

`Tooltip` and `Popover` use `@floating-ui/react-native` for positioning. If a tooltip trigger is at the screen edge, the tooltip may render clipped or off-screen on small devices (iPhone SE). Floating UI handles this via `flip()` and `shift()` middleware — verify these are configured.

---

### 4.10 Haptic Feedback — `require()` Inside Render

```typescript
// usePressable.ts:189-206
function triggerHaptic(type: HapticType) {
  try {
    const Haptics = require("expo-haptics"); // Dynamic require
    ...
  } catch { }
}
```

`require()` calls inside event handlers are technically fine (Node/Metro caches them) but may fail in strict bundler environments or when using Hermes with code splitting. The silent `catch {}` means haptics silently fail with no diagnostic. **Consider:** Optional peer-dep detection at module load time with a clear warning log.

---

## 5. Rating / Scoring Component Deep Dive

### 5.1 Current State

The `Rating` component is functional but minimal. It's the only scoring-related UI component in the library. Here's a full gap analysis:

### 5.2 Visual Gaps

| Feature                                  | Status              | Notes                                                                      |
| ---------------------------------------- | ------------------- | -------------------------------------------------------------------------- |
| Whole-star fill                          | ✅ Works            |                                                                            |
| Half-star visual (left/right icon split) | ❌ Missing          | Logic exists but all 3 icon names are `"star"` — no actual half-star glyph |
| Quarter-star or custom precision visual  | ❌ Missing          |                                                                            |
| Hover state (show preview on hover)      | ❌ Missing          | Mobile: no hover, but useful for accessibility previews                    |
| Animated fill on selection               | ❌ Missing          | No spring animation when star is selected                                  |
| Custom icons (hearts, thumbs, emoji)     | ❌ Missing          | Hardcoded to `"star"` icon name                                            |
| Label display (e.g., "4.5 / 5")          | ❌ Missing          |                                                                            |
| Color per brand                          | ❌ Partially broken | Hardcodes `"#F59E0B"` regardless of brand                                  |

**Critical bug on line 69:**

```typescript
// Rating.tsx:69
{
  filled ? 'star' : halfFilled ? 'star' : 'star';
}
```

All three branches render the identical `"star"` icon. The half-star path is logically correct (line 56) but visually identical to a filled star — `"star-half"` should be used for `halfFilled`.

---

### 5.3 Accessibility Gaps

| A11y Feature                                          | Status     |
| ----------------------------------------------------- | ---------- |
| `accessibilityRole="adjustable"`                      | ❌ Missing |
| `accessibilityValue={{ min: 0, max: N, now: value }}` | ❌ Missing |
| Screen reader announcement on value change            | ❌ Missing |
| Keyboard navigation (arrow keys on web/TV)            | ❌ Missing |
| `aria-label` per star ("Rate 3 out of 5")             | ❌ Missing |

The native `Pressable` used in `Rating` inherits no accessibility role. A screen reader user has no way to know this is a rating control.

---

### 5.4 Token Hardcoding

```typescript
// packages/tokens/src/component.ts — ratingTokens()
star: {
  filled: { color: "#F59E0B" },    // ← hardcoded Amber
  empty:  { color: t.color.border.strong },
  half:   { color: "#F59E0B" },    // ← hardcoded Amber
},
```

In the `loveBrand`, the filled star color should ideally be `#F43F5E` (rose) or at minimum `t.color.brand.default`. The hardcoded amber color creates brand inconsistency — a Love-themed app gets amber stars, not rose stars.

**Fix:** Use `t.color.accent.default` for filled stars so each brand can define its own star color naturally through its accent token.

---

### 5.5 Missing Features for a Production Rating Component

- **Read-only display variant** — rendering aggregate scores (e.g., "4.3 stars") with a partial fill percentage
- **Compact numeric display** — `★ 4.3 (128 reviews)` pattern
- **Loading skeleton** — for async score fetching
- **Animated count change** — number rolls up when score updates

---

### 5.6 Score: 5/10

The component handles the basic use case. It is missing: correct half-star rendering, brand-aware colors, accessibility, animation, and advanced display modes. Recommend a targeted rewrite sprint.

---

## 6. Design System — Style, Colors, Theme, Animation

### 6.1 Color System — Detailed Analysis

#### Palette Architecture: ✅ Excellent

The three-layer approach (`primitive → semantic → component`) is best-in-class for a React Native library:

```
primitive.ts   →  raw hex values, scales
semantic.ts    →  intent-mapped (bg.default, text.primary, border.focus)
component.ts   →  per-component style maps
```

#### WCAG Contrast Coverage

| Token pair                       | Mode  | Contrast                       | Result |
| -------------------------------- | ----- | ------------------------------ | ------ |
| `text.primary` on `bg.default`   | Light | 21:1 (`#020617` / white)       | ✅ AAA |
| `text.secondary` on `bg.default` | Light | ~9:1 (`#334155` / white)       | ✅ AAA |
| `text.disabled` on `bg.default`  | Light | ~4.8:1 (`#64748B` / white)     | ✅ AA  |
| `brand.default` on `bg.default`  | Light | ~5.7:1 (`#7C3AED` / white)     | ✅ AA  |
| `accent.text` on `bg.default`    | Light | ~5.0:1 (`#92400E` / white)     | ✅ AA  |
| `text.primary` on `bg.default`   | Dark  | ~17:1 (`#F8FAFC` / `#0D0D14`)  | ✅ AAA |
| `brand.default` on `bg.default`  | Dark  | ~7.1:1 (`#A78BFA` / `#0D0D14`) | ✅ AAA |

**Gap found:** `loveBrand` light mode — `text.tertiary: "#BE123C"` on `bg.default: "#FFFFFF"` = ~5.3:1. Passes AA but is borderline. `text.disabled: "#FDA4AF"` on white = ~2.3:1 — **fails AA**. Disabled text is intentionally reduced but should still meet 3:1 minimum.

---

#### Brand System: ✅ Well Designed

6 brands ship out of the box. The `defineBrand()` factory cleanly overrides only the color layer while spacing, typography, and radius remain universal — correct architecture.

```
default  → Violet + Amber  (premium, modern)
midnight → Indigo          (dark-first, developer)
ocean    → Teal/Cyan       (calm, productivity)
forest   → Emerald         (natural, eco)
sunset   → Orange/Warm     (energetic, playful)
love     → Rose/Blush      (romantic, lifestyle)
```

**Gap:** No brand exposes a **neutral/monochrome** theme. Enterprise apps often need a gray-only palette. Consider a `carbon` or `slate` brand.

---

#### Dark Mode Strategy: ✅ Well Executed

Rather than naive color inversion, the dark tokens use:

- Warm near-black base (`#0D0D14`) — avoids clinical coldness of pure `#000`
- Distinct surface layers (`#0D0D14` → `#0F172A` → `#1E293B`) — creates Z-depth perception
- Elevated shadow opacity (0.25–0.55 vs light's 0.08–0.20) — compensates for dark background

**Gap:** `surface.hover: "#1A1A28"` is a raw hex literal not derived from the primitive palette. This breaks the traceable token chain and makes it harder to reason about at audit time.

---

### 6.2 Typography System

#### Scale: ✅ Well Balanced

```
xs: 11px  (captions, badges)
sm: 13px  (helper text, chips)
md: 15px  (body, buttons)
lg: 17px  (iOS-native body size — correct for platform feel)
xl: 20px  (section headers)
2xl: 24px (card titles)
3xl: 30px (page headers)
4xl: 36px (hero/display)
```

iOS default body size is 17px — using `fontSize.lg` as the default for lists/cells aligns with platform conventions. This is a thoughtful decision.

**Gap 1:** No `fontFamily` tokens. The system assumes the device's default system font (San Francisco on iOS, Roboto on Android). For brands that require custom fonts (e.g., `midnight` → JetBrains Mono for developer tools), there is no font token layer to override.

**Gap 2:** Line height is stored as a multiplier (`1.2`, `1.5`) but React Native requires absolute pixel values. The semantic token layer computes `fontSize.md * lineHeight.normal` — this is correct — but the `text` composite tokens in `shared` only cover `xs` through `3xl`. There's no `4xl` composite text style.

---

### 6.3 Spacing System

#### Scale: ✅ Consistent 4px base

```
0.5 = 2px, 1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 6 = 24px, 8 = 32px
```

**Gap:** The scale jumps from `spacing[16]` (64px) to `spacing[20]` (80px) to `spacing[24]` (96px), with no `spacing[18]` (72px). Fine for most layouts, but occasionally leads to developers hardcoding `72` when building hero sections. Consider adding `spacing[18]` and `spacing[28]` (112px).

---

### 6.4 Radius and Elevation

Button uses `radius.full` (9999px) by default — pill shape. This is a strong visual identity choice that works well for the default/violet brand but may feel jarring for `midnight` (developer tools typically prefer `radius.md`). Brands should be able to override the button radius.

Elevation on Android currently mirrors shadow levels (`sm=2`, `md=4`, `lg=8`, `xl=16`). These are reasonable defaults but can cause Android to show unwanted colored shadows in material-style themes if the app sets a `colorAccent` in the theme file. Consider surfacing an `elevationColor` token for Android.

---

### 6.5 Animation System — Detailed Analysis

#### Architecture: ✅ Excellent

The motion token system is layered and well-separated:

```
motion.ts → spring configs, durations, easing, pressFeedback, motionPreset
↓
headless/usePressable.ts → consumes spring.snappy, pressFeedback tokens
↓
UI components → receive animatedStyle from usePressable
```

Keeping `@truongdq01/tokens` free of Reanimated imports (tokens are plain JS objects) is architecturally clean — the tokens package has zero native dependencies.

---

#### Spring Config Analysis

| Name     | Damping | Stiffness | Mass | Character         | ✅/❌                  |
| -------- | ------- | --------- | ---- | ----------------- | ---------------------- |
| `snappy` | 20      | 400       | 0.8  | Quick, crisp      | ✅ Good for buttons    |
| `bouncy` | 12      | 300       | 1    | Playful overshoot | ✅ Good for badges/FAB |
| `gentle` | 28      | 200       | 1    | Smooth settle     | ✅ Good for modals     |
| `stiff`  | 32      | 500       | 0.6  | Near-instant      | ✅ Good for tooltips   |

**Gap:** No `elastic` or `wobbly` preset for onboarding/celebration animations (confetti, achievement unlocks). The `bouncy` config is close but under-bounces for delight moments.

**Gap:** Easing curves are stored as CSS cubic-bezier strings (`"cubic-bezier(0.4, 0, 1, 1)"`). Reanimated's `withTiming` expects `Easing.bezier()` function objects, not strings. This means the `easing` tokens from `motion.ts` **cannot be used directly** with `withTiming` — they require a parsing step. The `timingPreset` tokens that reference these strings are currently unusable without an adapter. This is a silent API bug.

---

#### Press Feedback

| Mode          | Behavior              | Usage             |
| ------------- | --------------------- | ----------------- |
| `scale`       | 0.96 → 1.0 spring     | Buttons, cards    |
| `scaleSubtle` | 0.98 → 1.0 spring     | List items        |
| `opacity`     | 0.6 → 1.0 timing 60ms | Icon buttons      |
| `none`        | No feedback           | Custom components |

**Gap:** No `highlight` mode (background color flash, as used by native iOS cells). This is the most common press feedback on iOS — a brief tinted background. Currently consumers must implement this manually.

---

#### Reduced Motion — CRITICAL Gap

The entire animation system has no `prefers-reduced-motion` / `AccessibilityInfo.isReduceMotionEnabled` integration:

```typescript
// usePressable.ts — no reduce motion check
const tapGesture = Gesture.Tap().onBegin(() => {
  'worklet';
  scale.value = withSpring(scaleDownPressed, snappySpring); // Always animates
});
```

React Native exposes:

```typescript
AccessibilityInfo.isReduceMotionEnabled() // → Promise<boolean>
AccessibilityInfo.addEventListener('reduceMotionChanged', ...)
```

For users with vestibular disorders, persistent scale animations can cause motion sickness. This is an **WCAG 2.3 Success Criterion 2.3.3** issue.

**Fix:** Create a `useMotionPreference()` hook that subscribes to `reduceMotionChanged`. All animated components should check this and fall back to `feedbackMode="none"` or instant transitions.

---

#### Layout Animation Presets — String vs Object

```typescript
// motion.ts:67-84
export const motionPreset = {
  enter: {
    fadeUp: "FadeInUp",   // String reference
    ...
  }
}
```

These strings are identifiers that map to Reanimated layout animation classes (`FadeInUp`, `ZoomIn`, etc.). They **cannot** be used directly — consumers must do:

```typescript
import { FadeInUp } from 'react-native-reanimated';
<Animated.View entering={FadeInUp} />
```

The `motionPreset` tokens only work if consumers know to import the matching Reanimated export. The mapping from string to class is never documented or automated. **Recommendation:** Export the actual Reanimated animation objects from `@truongdq01/headless` (which can import Reanimated) rather than string tokens.

---

#### Missing Animations

| Interaction               | Current             | Recommended                                   |
| ------------------------- | ------------------- | --------------------------------------------- |
| Star selection (Rating)   | None — instant      | `withSpring(scale, spring.bouncy)`            |
| Skeleton shimmer sync     | Per-item async      | Shared shimmer via context                    |
| Accordion expand/collapse | Unknown             | Height interpolation via `useAnimatedStyle`   |
| Tab indicator slide       | Unknown             | `withSpring` on `translateX`                  |
| Badge count change        | None                | Digit roll animation                          |
| Theme switch              | Instant             | Cross-fade with `withTiming(duration.normal)` |
| Toast entrance            | `SlideInDown`       | Good                                          |
| Modal entrance            | `FadeIn` / `ZoomIn` | Good                                          |

---

### 6.6 Shadow System

Shadows are well-implemented with both iOS and Android approaches. One gap:

In dark mode, shadows use `shadowColor: color.black` but the effective visibility of shadows on dark backgrounds is near zero — shadows blend into the dark surface. The elevated `shadowOpacity` values (0.25–0.55) partially compensate, but for components like `Card` in dark mode, the shadow is mostly invisible. Consider using a **colored glow** effect in dark mode (e.g., `shadowColor: color.brand[900]`) for premium feel.

---

## 7. Improvement Roadmap

Priority levels: 🔴 High · 🟡 Medium · 🟢 Low

### Phase 1 — Critical Fixes (1–2 weeks)

| #   | Area         | Task                                                                                 | Priority |
| --- | ------------ | ------------------------------------------------------------------------------------ | -------- |
| 1.1 | Code Quality | Fix `as any` casts in `Rating.tsx` — extend `ComponentTokens` typing                 | 🔴       |
| 1.2 | Rating       | Fix half-star bug — render `"star-half"` icon for `halfFilled` state                 | 🔴       |
| 1.3 | Animation    | Add `useMotionPreference()` hook — respect `AccessibilityInfo.isReduceMotionEnabled` | 🔴       |
| 1.4 | Rating       | Replace hardcoded `#F59E0B` with `t.color.accent.default` in `ratingTokens()`        | 🔴       |
| 1.5 | Edge Case    | Guard `precision={0}` in `useRating` — prevent division by zero                      | 🔴       |
| 1.6 | Button       | Wrap `Linking.openURL(href)` in try/catch                                            | 🔴       |
| 1.7 | Easing       | Fix `easing` tokens — convert to Reanimated `Easing.bezier()` objects or add adapter | 🔴       |

### Phase 2 — Rating Component Rewrite (1 sprint)

| #   | Task                                                              | Priority |
| --- | ----------------------------------------------------------------- | -------- |
| 2.1 | Implement real half-star visual with `"star-half"` icon           | 🔴       |
| 2.2 | Add `accessibilityRole="adjustable"` + `accessibilityValue`       | 🔴       |
| 2.3 | Add screen-reader announcement on value change                    | 🟡       |
| 2.4 | Add press animation — spring scale on selected star               | 🟡       |
| 2.5 | Wrap in `React.memo()`                                            | 🟡       |
| 2.6 | Support custom icon prop (hearts, thumbs, emoji, custom SVG)      | 🟢       |
| 2.7 | Add read-only aggregate display mode with partial fill percentage | 🟢       |
| 2.8 | Add compact numeric display `★ 4.3 (128)` variant                 | 🟢       |

### Phase 3 — Performance & Edge Cases (1 sprint)

| #   | Task                                                                      | Priority |
| --- | ------------------------------------------------------------------------- | -------- |
| 3.1 | Carousel — stable keys for loop mode                                      | 🟡       |
| 3.2 | Carousel — guard empty data array                                         | 🔴       |
| 3.3 | Carousel — guard single-item loop mode                                    | 🟡       |
| 3.4 | Carousel — replace `Dimensions.get("window")` module-level call with hook | 🟡       |
| 3.5 | Skeleton — cancel shimmer animation when `animate=false`                  | 🟡       |
| 3.6 | Skeleton — shared shimmer context for synchronized wave                   | 🟢       |
| 3.7 | Switch — guard negative `thumbTravel`                                     | 🟡       |
| 3.8 | `PaginationDot` — receive tokens as prop, not via hook                    | 🟢       |
| 3.9 | Button — change `handlePress` to `useCallback`                            | 🟡       |

### Phase 4 — Design System Enhancements (1–2 sprints)

| #    | Task                                                                              | Priority |
| ---- | --------------------------------------------------------------------------------- | -------- |
| 4.1  | Add `fontFamily` token layer for custom font branding                             | 🟡       |
| 4.2  | Add `carbon`/`slate` neutral brand theme                                          | 🟡       |
| 4.3  | Export actual Reanimated animation objects from headless instead of string tokens | 🟡       |
| 4.4  | Add `highlight` press feedback mode (background flash)                            | 🟢       |
| 4.5  | Add `elastic` spring preset for celebration/onboarding animations                 | 🟢       |
| 4.6  | Dark mode — colored glow shadows (brand-tinted)                                   | 🟢       |
| 4.7  | Allow per-brand button radius override                                            | 🟢       |
| 4.8  | Add `spacing[18]` (72px) and `spacing[28]` (112px) to scale                       | 🟢       |
| 4.9  | Add `text.4xl` composite typography style                                         | 🟢       |
| 4.10 | Animate theme switch with `withTiming` cross-fade                                 | 🟢       |
| 4.11 | Fix `loveBrand` `text.disabled` contrast (currently ~2.3:1 fails AA)              | 🟡       |
| 4.12 | Replace `surface.hover: "#1A1A28"` raw literal with derived token                 | 🟡       |

### Phase 5 — Missing Components & Patterns (backlog)

| #   | Task                                                                         | Priority |
| --- | ---------------------------------------------------------------------------- | -------- |
| 5.1 | `NumericScore` component — displays `4.3 / 5` with animated digit roll       | 🟢       |
| 5.2 | `ReviewSummary` — histogram bar chart of ratings breakdown                   | 🟢       |
| 5.3 | `RatingInput` with label + description + helper text (FormField integration) | 🟡       |
| 5.4 | `SentimentPicker` — emoji-based 5-point scale                                | 🟢       |
| 5.5 | Skeleton shimmer context provider for synchronized lists                     | 🟢       |
| 5.6 | `useReduceMotion` hook exported from headless                                | 🔴       |
| 5.7 | OTPInput paste distribution implementation (verify/fix)                      | 🟡       |
| 5.8 | DatePicker locale/timezone prop exposure                                     | 🟡       |

---

## Appendix A — File Reference

| Issue                           | File                                               | Lines           |
| ------------------------------- | -------------------------------------------------- | --------------- |
| `as any` casts                  | `packages/ui/src/components/Rating/Rating.tsx`     | 39–52           |
| Half-star bug                   | `packages/ui/src/components/Rating/Rating.tsx`     | 56–69           |
| Hardcoded star color            | `packages/tokens/src/component.ts`                 | ~ratingTokens() |
| Button handlePress useMemo      | `packages/ui/src/components/Button/Button.tsx`     | 171–177         |
| Button href no error handling   | `packages/ui/src/components/Button/Button.tsx`     | 173–176         |
| Skeleton no cancel              | `packages/ui/src/components/Skeleton/Skeleton.tsx` | 32–39           |
| Carousel SCREEN_WIDTH stale     | `packages/ui/src/components/Carousel/Carousel.tsx` | 11              |
| Carousel loop key               | `packages/ui/src/components/Carousel/Carousel.tsx` | 74              |
| Easing strings (broken)         | `packages/tokens/src/motion.ts`                    | 45–50           |
| motionPreset strings (unusable) | `packages/tokens/src/motion.ts`                    | 66–85           |
| Switch hardcoded gap            | `packages/ui/src/components/Switch/Switch.tsx`     | 50, 94          |
| Switch negative thumbTravel     | `packages/ui/src/components/Switch/Switch.tsx`     | 26              |
| PaginationDot per-dot hook      | `packages/ui/src/components/Carousel/Carousel.tsx` | 123             |
| loveBrand disabled contrast     | `packages/themes/src/brands/love.ts`               | 42              |
| surface.hover raw hex           | `packages/tokens/src/semantic.ts`                  | 148             |
| No reduce motion                | `packages/headless/src/hooks/usePressable.ts`      | 107–115         |

---

_Report generated by deep static analysis — 2026-04-02_
