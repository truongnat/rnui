# UI / UX design (Flutter)

## Contents

1. [Material 3 and theming](#material-3-and-theming)
2. [Layout and responsiveness](#layout-and-responsiveness)
3. [Typography and density](#typography-and-density)
4. [Touch, hover, and focus](#touch-hover-and-focus)
5. [Accessibility](#accessibility)
6. [Async UI states](#async-ui-states)

---

## Material 3 and theming

- Prefer **`ThemeData` + `ColorScheme.fromSeed`** (or a controlled palette) for light/dark; avoid scattering `Color(0xFF...)` in widgets.
- Use **`Theme.of(context)`** and component themes (`filledButtonTheme`, `inputDecorationTheme`) for consistency.
- **Dynamic Color** (Android 12+) — optional; document when `dynamic_color` package is used.

## Layout and responsiveness

- **`LayoutBuilder`** / **`MediaQuery.sizeOf(context)`** for breakpoints; consider **`flutter_adaptive_scaffold`** or custom breakpoints for tablet/desktop.
- **Avoid** hard-coded widths for full pages; use **Flex**, **Expanded**, **FractionallySizedBox**, or **grids** on wide screens.
- **Scrollables**: unbounded height + `ListView` → typical error — use **`shrinkWrap`** sparingly; prefer **`CustomScrollView`** + slivers for nested scroll coordination.

## Typography and density

- **`TextTheme`** from theme; respect **`MediaQuery.textScaler`** (user font scale) unless product explicitly disables with `TextScaler.noScaling` (accessibility tradeoff).
- **Visual density** — `ThemeData.visualDensity` for compact UIs; test tap targets after compaction.

## Touch, hover, and focus

- Minimum touch target **~48dp** (Material); increase padding for dense lists.
- **Desktop / web**: **`MouseRegion`**, **`Hover`**, keyboard focus (`FocusNode`, `FocusTraversalGroup`); show focus indicators for accessibility.

## Accessibility

- **`Semantics`** / **`MergeSemantics`** for custom interactive widgets; **`ExcludeSemantics`** to hide decorative noise.
- **Contrast** — verify text on `surface` / `primary` with WCAG-style checks for critical flows.
- **Screen readers** — label buttons and images; provide hints for non-obvious actions.

## Async UI states

- Map **loading**, **empty**, and **error** to distinct UI; use **`AsyncValue`** patterns (Riverpod) or explicit state enums in `Bloc`.
- **Skeleton** placeholders reduce layout jump; match final layout structure when possible.

---

*Match your product’s design system; Flutter provides primitives — consistency is a team choice.*
