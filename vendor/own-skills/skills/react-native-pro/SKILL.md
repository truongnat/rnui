---
name: react-native-pro
description: |
  Professional React Native and Expo development: UI/UX quality, performance patterns, and platform edge cases.

  Use this skill when the user works on React Native, Expo, mobile screens, navigation, lists, animations, native modules, EAS builds, Hermes, New Architecture, or asks for RN code review, styling, accessibility, keyboard handling, Safe Area, Android back behavior, deep linking, images, or FlatList/FlashList performance.

  Triggers: "React Native", "Expo", "RN", "FlatList", "FlashList", "SafeArea", "keyboard avoiding", "Android back", "Hermes", "Reanimated", "Expo Router", "EAS", "touch target", "a11y", "accessibility", "StatusBar", "notch", "pixel ratio", "deep link", "New Architecture", "performance", "re-render", "memo".

metadata:
  short-description: RN/Expo — UI/UX, tips, edge cases, performance
---

# React Native (professional)

Use official React Native and Expo docs for API details; this skill encodes **professional defaults**, **UI/UX principles**, and **edge-case awareness**. Always confirm **Expo vs bare workflow** and **SDK / RN version** from the project when the user provides them.

## When to use

- Building or refactoring screens, navigation, lists, forms, modals, or animations.
- Reviewing RN/Expo code for performance, accessibility, or platform correctness.
- Debugging iOS vs Android differences, keyboard, safe areas, linking, or build/runtime issues.
- Aligning UI with sensible spacing, typography, loading/error/empty states, and touch targets.
- Trigger keywords: `React Native`, `Expo`, `FlatList`, `SafeArea`, `Hermes`, `a11y`, `EAS`, …

## Workflow

1. Confirm Expo vs bare and SDK/RN version from the repo when available.
2. Apply the principles and topic summaries below; open `references/` when you need depth.
3. Respond using **Suggested response format**; note iOS vs Android differences when relevant.

### Operating principles

1. **Platform first** — Call out iOS-only vs Android-only behavior; never assume web/CSS semantics (no `vh`, different z-index stacking).
2. **Measure before optimizing** — Prefer stable keys, memoized callbacks, and list virtualization; avoid premature micro-optimization.
3. **Explicit boundaries** — Separate presentational vs container logic; keep side effects (subscriptions, linking) in `useEffect` with cleanup.
4. **Verify versions in-repo** — Check `package.json` / Expo SDK before suggesting APIs that changed across majors.
5. **Accessibility by default** — Labels, roles, contrast, and focus order where interactive elements exist.

### UI / UX (summary)

- Use consistent spacing rhythm (e.g. 4/8 pt grid); avoid arbitrary magic numbers without tokens.
- Support dynamic type / font scaling where product requires; test large text on small devices.
- Reserve **loading**, **empty**, and **error** states for async and list UIs; do not leave blank screens.
- Respect **SafeArea** for notches and home indicators; pair with `StatusBar` style per screen theme.
- Minimum touch targets ~44×44 pt (iOS HIG); Android Material often ~48dp — document tradeoffs.

Details: [references/ui-ux-design.md](references/ui-ux-design.md)

### Tips and tricks (summary)

- Long lists: `FlatList` with stable `keyExtractor`, `getItemLayout` when item height is fixed, `windowSize` / `maxToRenderPerBatch` tuned if needed; consider **FlashList** for heavy lists after profiling.
- Avoid anonymous inline functions in `renderItem` when they cause child remounts; combine with `React.memo` on row components.
- Images: cache and size appropriately (e.g. `expo-image` on Expo); avoid decoding huge bitmaps on JS thread.
- Navigation: prefer params and typed routes (React Navigation or Expo Router); avoid global singletons for navigation state.
- Hermes is default on modern RN — rely on compatible libraries; check JSI / New Arch compatibility for native-heavy modules.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Keyboard covering inputs: `KeyboardAvoidingView` behavior differs by OS; sometimes `android:windowSoftInputMode` matters on Android.
- Android hardware back: intercept with `BackHandler` when modals or nested navigators need custom behavior.
- Dimensions and orientation: use `useWindowDimensions` or subscription to `Dimensions` changes; avoid one-time static reads for layout-critical code.
- Deep linking: universal links / app links require native config + server files; test cold start vs warm.
- Fast Refresh can mask stale closure bugs — verify full reload for navigation and global state.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — What is wrong or what we are building.
2. **Recommendation** — Decision and why (platform, performance, a11y).
3. **Code** — Minimal, copy-pasteable snippet or diff-style blocks.
4. **Residual risks** — Untested devices, native module constraints, or follow-up tasks.

## Resources in this skill

- `references/` — detailed UI/UX, tips, and edge cases.

| Topic | File |
|-------|------|
| UI/UX design | [references/ui-ux-design.md](references/ui-ux-design.md) |
| Tips & performance | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** `FlatList` scroll jank on a long chat list; user is on a recent Expo SDK.  
**Expected output:** Suggest `keyExtractor`, memoized row, tune `windowSize`/`maxToRenderPerBatch`, consider FlashList after profiling; short snippet.

## Checklist before calling the skill done

- [ ] Accessibility: `accessibilityLabel` / `accessibilityRole` on tappable elements; contrast for text on backgrounds.
- [ ] Safe areas and `StatusBar` appropriate for screen (light/dark).
- [ ] Keyboard does not hide primary actions; scroll containers behave on small screens.
- [ ] Lists: keys stable; no obvious O(n²) patterns; images bounded.
- [ ] Loading / error / empty states for async UIs.
- [ ] Android back and iOS swipe-back behavior considered for stacks and modals.
