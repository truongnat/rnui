# Tips and tricks (Flutter)

## Contents

1. [Widget fundamentals](#widget-fundamentals)
2. [Widget rebuild discipline](#widget-rebuild-discipline)
3. [Lists and scrolling](#lists-and-scrolling)
4. [State management pointers](#state-management-pointers)
5. [Navigation](#navigation)
6. [Images and assets](#images-and-assets)
7. [Performance profiling](#performance-profiling)
8. [Testing](#testing)

---

## Widget fundamentals

For **StatelessWidget vs StatefulWidget**, `build` purity, **Keys**, `BuildContext`, and lifecycle — see **[widgets.md](widgets.md)**.

## Widget rebuild discipline

- **`const` constructors** everywhere possible — reduces rebuild work.
- Split widgets so **only subtrees** rebuild when state changes; avoid giant `build` methods.
- **`RepaintBoundary`** for expensive custom paint or animations — isolates layers (use after profiling, not everywhere).

## Lists and scrolling

- **`ListView.builder`** / **`SliverChildBuilderDelegate`** — build only visible children.
- **Keys** — `ValueKey(id)` for list items when list order/content changes dynamically.
- **`AutomaticKeepAliveClientMixin`** — only when tabs or nested lists must preserve state; memory cost.

## State management pointers

- **Lift state** to the lowest common ancestor; avoid global singletons for domain state unless architecture demands (e.g. service locators).
- **Riverpod**: prefer **`ref.watch`** vs **`ref.read`** intentionally; avoid watching high in tree without `select`.
- **Bloc**: keep events **small** and states **explicit**; avoid mega-blocs without feature split.

## Navigation

- **`go_router`** — declarative routes; deep linking and web URLs; define **redirects** for auth early.
- **Back stack** — Android predictive back (when enabled) may interact with nested navigators; test on device.

## Images and assets

- **`Image.network`**: always provide **errorBuilder** / **loadingBuilder** for flaky networks.
- Resize decode: **`cacheWidth` / `cacheHeight`** in **`ImageProvider`** resolution when displaying thumbnails.

## Performance profiling

- **DevTools** — CPU profiler, memory, shader jank; **Performance overlay** for missed frames.
- **Impeller** (mobile default on supported devices) — shader behavior differs from Skia; test both if issues are graphics-specific.

## Testing

- **`widget_test`** — pump widgets, `find`, `tap`, `drag`.
- **`integration_test`** — driver-based E2E; slower but catches platform/plugin issues.
- **Goldens** — fragile across fonts/platforms; pin fonts and `FakeAsync` where applicable.

---

*Profile before optimizing — Flutter’s defaults are good until proven otherwise.*
