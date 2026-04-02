# Edge cases (Flutter)

## Contents

1. [BuildContext and async gaps](#buildcontext-and-async-gaps)
2. [Platform differences](#platform-differences)
3. [Web](#web)
4. [Desktop](#desktop)
5. [Plugins and platform channels](#plugins-and-platform-channels)
6. [Text input and IME](#text-input-and-ime)
7. [Localization and RTL](#localization-and-rtl)
8. [Build modes and trees](#build-modes-and-trees)

---

## BuildContext and async gaps

- After **`await`**, the widget may be **disposed** — always **`if (!context.mounted) return;`** before using `context` or `setState` (Flutter 3.7+ `mounted` on `State`).
- **Streams** and **listeners** — cancel in `dispose` to avoid leaks and callbacks after unmount.
- **`Navigator.pop`** after async — ensure route still exists; use **`mounted`** checks or pass **`NavigatorState`** carefully.

## Platform differences

- **iOS** — Cupertino patterns, back gesture, **SF Symbols** (via packages), **App Store** privacy manifests for plugins.
- **Android** — predictive back, **edge-to-edge** display cutouts, **Gradle** / Kotlin version coupling with plugins.
- **`defaultTargetPlatform`** vs **`Theme.of(context).platform`** — prefer theme when emulating platform in widget tests.

## Web

- **CORS** for API calls; **PWA** limitations; **clipboard**, **file pickers**, and **URL strategy** (`usePathUrlStrategy`).
- **CanvasKit vs HTML renderer** — bundle size and text rendering differ; test both if shipping web.
- **SEO** — limited for pure client Flutter web; consider **server-side** or **meta** strategy for public pages.

## Desktop

- **Window** size/min/max, **multi-window** (experimental packages), **menu bar** (macOS), **keyboard shortcuts** (`Shortcuts`, `Actions`).
- **Mouse** hover and **right-click** contexts; scroll physics differ from touch.

## Plugins and platform channels

- **MethodChannel** — encode arguments as supported types; watch for **null** safety on native side.
- **Threading** — platform callbacks may not be on Dart isolate; use **`scheduleMicrotask`** or **`WidgetsBinding`** to hop to UI thread when updating UI.
- **FFI** — memory ownership and lifecycle; extremely easy to crash if mismanaged.

## Text input and IME

- **Composition** — Asian IMEs: do not strip composing ranges in formatters incorrectly.
- **`TextInputFormatter`** order matters; **`AutofillGroup`** for password managers.

## Localization and RTL

- **`Directionality`** — mirror layouts for RTL; avoid hard-coded `EdgeInsets` that assume LTR only.
- **Date/time** — use **`intl`** and device locale; store UTC, display local.

## Build modes and trees

- **Debug** — asserts and dev tooling; **Profile** — performance; **Release** — tree shaking and obfuscation (`--obfuscate` with symbol files for crash reports).

---

*Test on real devices for each shipped platform — simulators/emulators miss GPU and IME behavior.*
