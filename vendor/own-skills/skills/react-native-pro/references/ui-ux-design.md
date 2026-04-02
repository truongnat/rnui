# UI / UX design (React Native)

## Contents

1. [Layout and rhythm](#layout-and-rhythm)
2. [Typography](#typography)
3. [Color, theme, dark mode](#color-theme-dark-mode)
4. [Touch and feedback](#touch-and-feedback)
5. [Accessibility](#accessibility)
6. [Safe area and system UI](#safe-area-and-system-ui)
7. [Async UI states](#async-ui-states)

---

## Layout and rhythm

- Prefer a **spacing scale** (4, 8, 12, 16, 24, 32) via constants or design tokens; avoid one-off `margin: 13` unless intentional.
- **Flexbox** is the default mental model: `flexDirection`, `justifyContent`, `alignItems`. Remember default `flexDirection: 'column'` differs from web row defaults.
- For scrollable content, **single responsibility**: one primary `ScrollView` or `FlatList` per screen region; nested scrollables cause gesture conflicts — flatten when possible or use specialized patterns (e.g. `nestedScrollEnabled` on Android only with care).
- **Hit slop**: expand tappable area for small icons using `hitSlop` without growing visual size.

## Typography

- Use **system fonts** or loaded custom fonts consistently; on Android, include font weights the family supports.
- **Font scaling**: `allowFontScaling` (default true) — for dense dashboards, product may set `false` on specific components; document that as an explicit UX tradeoff (accessibility impact).
- Truncate long text with `numberOfLines` + `ellipsizeMode`; avoid clipping without indication.

## Color, theme, dark mode

- Derive colors from a **theme object** (Context, Zustand, or library) — avoid hardcoding `#fff` across 50 files.
- **Dark mode**: set `StatusBar` style and navigation bar (Android) per screen; test colored surfaces against WCAG contrast for body text (rough guide: 4.5:1 for small text).
- Elevation on Android vs shadow on iOS: use platform-specific shadow styles or a small helper; test on real devices — simulators lie about shadows.

## Touch and feedback

- Minimum interactive size **~44×44 pt** (iOS) / **48dp** (Material); if visual design is smaller, use padding or `hitSlop`.
- Provide **pressed / disabled** states for buttons; `Pressable` preferred over legacy `TouchableOpacity` for flexible feedback.
- **Haptics**: use sparingly (`expo-haptics` or platform APIs) for success/error — not on every tap.

## Accessibility

- Set **`accessibilityLabel`** when the visual is icon-only or ambiguous; **`accessibilityHint`** when the action is non-obvious.
- Use **`accessibilityRole`** (`button`, `header`, `link`, `image`) for VoiceOver / TalkBack semantics.
- **Focus order** follows render order; for modals, ensure focus traps and `accessibilityViewIsModal` (iOS) patterns where applicable.
- Test with **VoiceOver** (iOS) and **TalkBack** (Android) on primary flows.

## Safe area and system UI

- Wrap screen content with **`SafeAreaProvider`** (root) and **`SafeAreaView`** or `useSafeAreaInsets()` from `react-native-safe-area-context` for notches and home indicators.
- **`StatusBar`**: `barStyle`, `backgroundColor` (Android), `translucent` — align with header background to avoid visual seams.
- **Android navigation bar** color and contrast with bottom content (gesture nav vs 3-button).

## Async UI states

Every screen that fetches data should define:

| State | User sees |
|-------|-----------|
| Loading | Skeleton or spinner; avoid layout jump if possible |
| Empty | Clear message + primary action (e.g. “Add item”) |
| Error | Retry affordance; non-technical copy + optional detail |

Avoid infinite spinners with no timeout or cancel.

---

*Verify layout APIs against your React Native version — defaults change across releases.*
