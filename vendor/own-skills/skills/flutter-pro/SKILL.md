---
name: flutter-pro
description: |
  Professional Flutter development: UI/UX quality (Material 3), performance, multi-platform edge cases, and Dart patterns.

  Use this skill when the user works on Flutter, Dart, widgets, Material / Cupertino, theming, navigation (go_router, Navigator 2), state management (Provider, Riverpod, Bloc, GetIt), animations, platform channels, web, desktop (Windows/macOS/Linux), iOS/Android builds, Impeller/Skia, accessibility, or asks for Flutter code review, layout, lists, isolates, or compile-size concerns.

  Widget-focused: composing StatelessWidget / StatefulWidget, pure `build`, `Key` (ValueKey, GlobalKey), `BuildContext` and InheritedWidget, widget lifecycle (`initState`, `dispose`, `mounted`), splitting widgets vs helper methods, const constructors, or refactoring widget trees.

  Triggers: "Flutter", "Dart", "Widget", "StatelessWidget", "StatefulWidget", "State", "build method", "const widget", "Key", "ValueKey", "GlobalKey", "InheritedWidget", "Theme.of", "Material 3", "Cupertino", "go_router", "Navigator", "Riverpod", "Provider", "Bloc", "BuildContext", "mounted", "async gap", "Sliver", "ListView", "CustomScrollView", "RepaintBoundary", "Impeller", "platform channel", "MethodChannel", "FFI", "web", "Flutter desktop", "semantics", "a11y", "Golden test", "integration_test".

metadata:
  short-description: Flutter — widgets, UI/UX, performance, multi-platform edge cases
---

# Flutter (professional)

Use official [Flutter](https://docs.flutter.dev/) and [Dart](https://dart.dev/) docs for API truth; this skill encodes **professional defaults**, **UI/UX principles**, and **multi-platform edge-case awareness**. Confirm **Flutter SDK channel** and **target platforms** (mobile / web / desktop) when known.

## When to use

- Building or refactoring screens, navigation, theming, forms, lists, or animations.
- Reviewing Flutter code for widget structure, state management boundaries, and performance.
- Debugging iOS vs Android vs web vs desktop differences, async/`BuildContext`, or plugin behavior.
- Aligning UI with Material 3 (or design system), accessibility, and responsive layouts.
- Refactoring **widget trees**: keys, lifecycle, extracting widgets, `const`, and `build` purity.
- Trigger keywords: `Flutter`, `Dart`, `Widget`, `Riverpod`, `go_router`, `BuildContext`, `mounted`, `Material 3`, `a11y`, `integration_test`, …

## Workflow

1. Confirm SDK/channel and target platforms; read official APIs when needed.
2. Apply the principles and topic summaries below; open `references/` when you need depth.
3. Respond using **Suggested response format**; note residual risks and follow-up tests.

### Operating principles

1. **Platform awareness** — `kIsWeb`, `defaultTargetPlatform`, and desktop embedders behave differently; never assume mobile-only layout.
2. **Widget immutability** — Prefer `const` constructors where possible; minimize rebuild scope with **keys** (see [references/widgets.md](references/widgets.md)) and granular state.
3. **Async safety** — Check `mounted` (or cancel subscriptions) before `setState` / `context` use after `await`.
4. **Verify SDK / package versions** — Breaking changes across Flutter majors; read changelogs for `go_router`, state packages, etc.
5. **Accessibility** — `Semantics`, contrast, focus order, and large text / screen readers on each primary flow.

### UI / UX (summary)

- **Material 3** — `ThemeData` / `ColorScheme` / `TextTheme` from seed color; avoid one-off colors outside theme when a design system exists.
- **Layout** — `LayoutBuilder`, `MediaQuery`, breakpoints for tablet/desktop; avoid hard-coded pixel widths for entire pages.
- **Touch targets** — Material recommends at least **48×48 dp** for interactive widgets; use `minimumSize` on buttons when needed.
- **Loading / error / empty** — Explicit states for async UIs; `SelectableText` or copy actions for error details when appropriate.
- **Safe areas** — `SafeArea`, notches, and system UI padding; respect **keyboard** insets (`viewInsets`).

Details: [references/ui-ux-design.md](references/ui-ux-design.md)

### Widget craft (summary)

- **`build` is declarative and should stay pure** — no side effects; split large trees into **widget classes** for clarity and `const`.
- **`StatelessWidget`** for configuration-only UI; **`StatefulWidget`** for ephemeral UI state (controllers, animations) — not as a substitute for app-wide state.
- **`Key`** when list identity or state preservation across reorder matters — prefer **`ValueKey`** from stable ids.
- **`BuildContext`** locates `InheritedWidget`s (`Theme`, `MediaQuery`); dependency registration drives rebuilds — avoid storing context long-lived.
- **Lifecycle**: `dispose` cancels listeners; **`mounted`** before `setState` after async.

Details: [references/widgets.md](references/widgets.md)

### Tips and tricks (summary)

- **Lists**: `ListView.builder` / `SliverList` for large lists; provide **stable keys** for dynamic items; avoid heavy work in `build`.
- **Rebuilds**: `ListenableBuilder` / `Selector` (Riverpod) / `BlocBuilder` scoping; avoid rebuilding the whole tree on small state changes.
- **Images**: `cacheWidth` / `cacheHeight` where applicable; `Image.network` error builders; consider `cached_network_image` when product requires.
- **Isolates** — Offload heavy JSON/image work; do not pass non-sendable state blindly; use `compute` or explicit isolate patterns.
- **Tests** — `widget_test` for units of UI; `integration_test` for flows; goldens for visual regression when design-critical.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **`BuildContext` across async gaps** — invalid after dispose; always check `mounted` or use patterns that cancel work.
- **Web** — CORS, PWA limitations, different file/clipboard APIs; shader compilation and canvas differences.
- **Desktop** — window management, keyboard shortcuts, mouse hover states, menu bars.
- **Platform channels** — threading: method channel callbacks on platform thread; marshal data carefully.
- **Text input** — IME composition, autofill, `TextInputFormatter` order; RTL layouts.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — What is wrong or what we are building.
2. **Recommendation** — Widget/state/navigation choice and platform impact.
3. **Code** — Minimal Dart snippets or diff-style blocks.
4. **Residual risks** — Untested platforms, plugin constraints, or follow-up tests.

## Resources in this skill

- `references/` — detailed docs (widgets, UI/UX, tips, edge cases); open when you need depth.

| Topic | File |
|-------|------|
| **Widget craft** | [references/widgets.md](references/widgets.md) |
| UI/UX design | [references/ui-ux-design.md](references/ui-ux-design.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** User reports `setState()` called after dispose when returning from an async gap on a profile screen.  
**Expected output:** Explain `mounted`, cancellation patterns for `Future`/subscriptions, snippet with `if (!mounted) return` before `setState`, and testing suggestions.

## Checklist before calling the skill done

- [ ] `mounted` / lifecycle respected after `await`; no `BuildContext` misuse across gaps.
- [ ] Accessibility: semantics labels, contrast, focus for interactive widgets.
- [ ] Lists and images bounded; no unbounded `ListView` inside unbounded height without scroll physics fix.
- [ ] Theme/text scale considered; no overflow on small devices or large text.
- [ ] **Widgets**: `build` has no side effects; keys used where list identity changes; `dispose` cleans up; `const` where possible.
- [ ] Platform-specific code paths documented or guarded (`kIsWeb`, `Platform`, `Theme.of(context).platform`).
