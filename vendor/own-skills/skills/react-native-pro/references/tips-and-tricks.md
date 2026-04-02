# Tips and tricks (React Native)

## Contents

1. [Re-renders and memoization](#re-renders-and-memoization)
2. [Lists](#lists)
3. [Images](#images)
4. [Navigation](#navigation)
5. [Animations](#animations)
6. [Hermes and JS engine](#hermes-and-js-engine)
7. [Expo vs bare workflow](#expo-vs-bare-workflow)

---

## Re-renders and memoization

- **`React.memo`** for pure row components that receive stable props; useless if parent passes new object/array every render.
- **`useCallback`** for functions passed to memoized children (`renderItem`, `onPress`); dependency array must include real dependencies — stale closures are a common bug.
- **`useMemo`** for expensive derived data (filtered lists, sorted rows), not for every trivial computation.
- Avoid **inline style objects** in hot paths if they force child updates: extract `StyleSheet.create` or stable references.

## Lists

- **`FlatList`** for large data: always **`keyExtractor`** stable (prefer ids, not index-only).
- **`getItemLayout`** when item height is fixed — skips measurement cost.
- Tune **`initialNumToRender`**, **`windowSize`**, **`maxToRenderPerBatch`** after measuring; defaults are a starting point, not optimal for all devices.
- **`removeClippedSubviews`** can help memory on Android; test for touch glitches on older devices.
- **FlashList** (Shopify): consider when profiling shows list bottleneck — API similar to FlatList; verify recycling behavior with variable-height items.

## Images

- Prefer **`expo-image`** on Expo (caching, placeholders, transitions) or **`react-native-fast-image`** patterns where applicable.
- Provide **explicit width/height** or `aspectRatio` when possible to reduce layout thrash.
- Use **appropriate resolution** (@2x, @3x) for static assets; avoid shipping 4K assets for thumbnails.

## Navigation

- **React Navigation**: use typed params (TypeScript) where possible; avoid passing large objects in params — use ids + store/query.
- **Deep links**: define linking config once; test stack reset vs push when handling URLs.
- **Expo Router**: file-based routes — keep route components thin; load data in hooks or loaders consistent with your data layer.

## Animations

- **`react-native-reanimated`** for UI-thread animations; avoid driving layout every frame from JS `setState`.
- Prefer **layout animations** and **shared transitions** APIs matching your library version — APIs evolved across v2/v3.
- Reduce ** simultaneous** animated values on low-end Android devices.

## Hermes and JS engine

- Hermes is **default** on modern RN — smaller bundle, good startup; some libraries assume JSC quirks — read migration notes.
- **Intl**, **regex**, and **Date** edge cases: test on device; Hermes implements modern JS but version-bound.

## Expo vs bare workflow

- **Expo managed**: faster iteration, OTA via EAS Update; native modules limited to Expo SDK + config plugins.
- **Prebuild / bare**: full native access; you own Gradle/Xcode — only add native deps when Expo cannot cover the use case.

---

*Always profile with Release builds on real devices for list and animation work.*
