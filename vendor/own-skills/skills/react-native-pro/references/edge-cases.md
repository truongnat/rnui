# Edge cases (React Native)

## Contents

1. [Keyboard and input](#keyboard-and-input)
2. [Android back button](#android-back-button)
3. [Dimensions and orientation](#dimensions-and-orientation)
4. [Status bar and notches](#status-bar-and-notches)
5. [Deep linking and app state](#deep-linking-and-app-state)
6. [Pixel density and layout](#pixel-density-and-layout)
7. [Fast Refresh and dev-only bugs](#fast-refresh-and-dev-only-bugs)
8. [Builds and native mismatches](#builds-and-native-mismatches)

---

## Keyboard and input

- **`KeyboardAvoidingView`**: `behavior` differs — often `padding` on iOS, `height` or `undefined` on Android; test on both.
- Android **`windowSoftInputMode`** (`adjustResize` vs `adjustPan`) in `AndroidManifest` affects whether the window resizes — misconfiguration looks like “KeyboardAvoidingView does nothing.”
- **Multiline `TextInput`** inside `ScrollView`: set `keyboardShouldPersistTaps` appropriately to allow tapping buttons while keyboard is open.
- **Focus management**: programmatic `focus()` order on submit — avoid race with navigation transitions.

## Android back button

- **`BackHandler`** API: subscribe in `useEffect`, return `true` to consume event. Unsubscribe on cleanup.
- Modals, drawers, and nested stacks: decide whether back dismisses modal first or pops screen — inconsistent behavior confuses users.
- **Predictive back** (newer Android): gesture may interact with custom transitions — test on Android 13+.

## Dimensions and orientation

- **`Dimensions.get('window')`** is a snapshot — subscribe to **`'change'`** or use **`useWindowDimensions`** hook for responsive layout.
- **`useWindowDimensions`** updates on rotation and split-screen; static constants at module load become stale.
- Split-screen and foldables: smallest width may change at runtime — avoid fixed pixel widths for entire layouts.

## Status bar and notches

- **Translucent status bar** + header image: content can draw under status bar — combine with safe area insets.
- **iOS notch / Dynamic Island**: avoid placing critical interactive elements in unsafe corners.
- **Android display cutouts**: `safe-area-context` helps; some OEMs are non-standard — spot-check popular devices.

## Deep linking and app state

- Cold start via URL: navigation tree may not be ready — use linking config and deferred navigation patterns from React Navigation docs.
- **Universal links** (iOS) and **App links** (Android) require **server-hosted** asset files and correct native entitlements.
- **Background → foreground**: refresh stale data; handle `Linking.getInitialURL()` vs event subscription.

## Pixel density and layout

- **`PixelRatio.get()`** for hairline borders: `1 / PixelRatio.get()` for 1px crisp lines.
- Avoid mixing **dp** mental model with raw pixels — RN uses density-independent units in most style props.
- **Blur**, **shadows**, and **elevation** render differently — verify on both platforms.

## Fast Refresh and dev-only bugs

- Fast Refresh can **preserve state** across edits — navigation or form state may not match production. Use **full reload** when debugging lifecycle or navigation.
- **`__DEV__`** branches: never rely on dev-only fixes for production behavior.

## Builds and native mismatches

- **Expo SDK upgrade**: run `expo-doctor`; fix **native version skew** (e.g. Kotlin, Gradle, iOS deployment target).
- **New Architecture** (Fabric / TurboModules): some libraries require explicit compatibility flags — check each native dependency.
- **EAS Build** vs local: environment variables and secrets differ — document `eas.json` env for CI.
- **OTA (EAS Update)**: JS-only changes; native changes always require new store build.

---

*When in doubt, reproduce on a physical device in Release mode with the same OS version as the reported bug.*
