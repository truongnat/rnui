# Widget craft (Flutter)

Deep reference for **building and composing widgets** effectively: structure, lifecycle, keys, and context — the core “widget skill” for Flutter.

## Contents

1. [Widget, Element, RenderObject](#widget-element-renderobject)
2. [StatelessWidget vs StatefulWidget](#statelesswidget-vs-statefulwidget)
3. [The `build` method](#the-build-method)
4. [Keys](#keys)
5. [Context, lookup, and `InheritedWidget`](#context-lookup-and-inheritedwidget)
6. [Splitting and composing widgets](#splitting-and-composing-widgets)
7. [StatefulWidget lifecycle](#statefulwidget-lifecycle)
8. [Anti-patterns](#anti-patterns)

---

## Widget, Element, RenderObject

- **Widget** — immutable configuration; cheap to recreate.
- **Element** — mounted instance in the tree; holds `State` for `StatefulWidget`.
- **RenderObject** — layout and paint (for render objects widgets).

Changing **configuration** (`Widget`) triggers **diff** → element update or rebuild. Understanding this explains why **rebuild scope** matters.

---

## StatelessWidget vs StatefulWidget

- **`StatelessWidget`** — no mutable instance state in the widget; use when all data comes from **parent arguments** or **Inherited** / provider scope.
- **`StatefulWidget`** — use when the widget owns **mutable UI state** (animation controller, text controller, expanded panels) tied to this subtree.

Do not use `StatefulWidget` only to cache **business/domain** state — lift that to your state-management layer (Riverpod, Bloc, etc.).

---

## The `build` method

- **`build` must be pure** — no side effects (network, `setState` of other widgets, modifying globals). Side effects belong in `initState`, listeners, callbacks, or providers.
- **Fast** — avoid heavy sync work; async work should not block `build`.
- **`const`** — if the widget constructor is `const` and arguments are compile-time constant, the framework can short-circuit work.

---

## Keys

| Key type          | When to use                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **`ValueKey<T>`** | Stable identity from data (`id`, value) in **lists** when order/items change.                                                   |
| **`ObjectKey`**   | Identity is the **object instance** itself.                                                                                     |
| **`UniqueKey`**   | Force **new** element when parent rebuilds (use sparingly — loses state if misused).                                            |
| **`GlobalKey`**   | Access `State` or `RenderObject` from outside subtree — **last resort** (testing, `Form`, focus); avoid for normal composition. |

**No key** when the list is static and order never changes in a meaningful way.

---

## Context, lookup, and `InheritedWidget`

- **`BuildContext`** is the position in the tree; **`dependOnInheritedWidgetOfExactType`** (used by `Theme.of`, `MediaQuery.of`) **registers a dependency** — parent updates trigger **rebuild** of dependents.
- Prefer **`Theme.of(context)`**, **`Localizations`**, **`Directionality`** over hard-coded values.
- **`Builder`** / **`LayoutBuilder`** — obtain a `BuildContext` **under** a parent when you need lookups after an `InheritedWidget` is inserted above.

---

## Splitting and composing widgets

- **Extract `Widget` classes** instead of large private `_buildHeader()` methods returning widgets — **const** and rebuild boundaries work better with real widget types.
- **Private `StatelessWidget` subclasses** in the same file are idiomatic for readability.
- **Parameters** — pass only what the child needs; avoid passing entire `BuildContext` when only theme or one value is needed (pass `ThemeData` or values).

---

## StatefulWidget lifecycle

| Method                      | Role                                                                                                                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`initState`**             | One-time setup; `addListener`, **not** `context`-dependent lookups that assume full tree (use `didChangeDependencies` or post-frame callback if needed). |
| **`didChangeDependencies`** | When `InheritedWidget` dependencies change; may run **before** first `build` completes in some cases.                                                    |
| **`didUpdateWidget`**       | Parent replaced widget with new configuration; compare old vs new widget fields.                                                                         |
| **`dispose`**               | Remove listeners, dispose `AnimationController`, `TextEditingController`, **cancel** subscriptions.                                                      |

Always check **`mounted`** before `setState` after async work.

---

## Anti-patterns

- **Huge `build` methods** — hard to optimize and test; split.
- **`setState` in `build`** — infinite loops or logic errors.
- **GlobalKeys everywhere** — couples unrelated parts of the tree.
- **Storing `BuildContext` long-lived** outside widget lifetime — invalid after dispose.

---

_Official: [Widgets introduction](https://docs.flutter.dev/ui/widgets-intro), [State management](https://docs.flutter.dev/data-and-backend/state-mgmt/options)._
