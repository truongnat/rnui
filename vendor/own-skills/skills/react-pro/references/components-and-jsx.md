# Components and JSX craft (React)

## Contents

1. [Functional components](#functional-components)
2. [JSX rules and fragments](#jsx-rules-and-fragments)
3. [Composition patterns](#composition-patterns)
4. [Props and typing](#props-and-typing)
5. [Refs and `forwardRef`](#refs-and-forwardref)
6. [Lists and keys](#lists-and-keys)
7. [Controlled components](#controlled-components)

---

## Functional components

- **Default** for new code — use hooks for state and effects; avoid class components unless maintaining legacy.
- **Pure presentation** — receive data via props; lift state up when multiple children must share it.

---

## JSX rules and fragments

- **Single parent** — use `<>...</>` (fragment) to avoid extra DOM nodes when grouping.
- **`className`**, **`htmlFor`**, **`tabIndex`** — DOM property names in camelCase where applicable.
- **`dangerouslySetInnerHTML`** — last resort; sanitize untrusted HTML server-side or with a vetted library.

---

## Composition patterns

- **`children`** — flexible layout shells (`Card`, `Layout`); document expected child types in TypeScript.
- **Render props / slots** — `(props) => ReactNode` when customization needs more than props.
- **Compound components** — static subcomponents (`Menu`, `Menu.Item`) with context for shared state — great DX when API stays coherent.

---

## Props and typing

- **TypeScript**: prefer explicit `Props` interfaces / `type`; use `React.ComponentPropsWithoutRef<'button'>` when wrapping native elements.
- **Avoid** passing entire objects when only `id` or `name` is needed — reduces accidental rerenders if referential identity changes.

---

## Refs and `forwardRef`

- Use **`useRef`** for DOM nodes and mutable boxes that do not trigger re-render.
- **`forwardRef`** when library consumers must attach a ref to your inner button/input — document `displayName` for DevTools.

---

## Lists and keys

- **`key` must be stable** across reorders for the same item — typically database id.
- **Index as key** only when list is static and never reordered/filtered in a way that confuses identity.

---

## Controlled components

- **Controlled**: React owns value via `value` + `onChange`.
- **Uncontrolled**: read via `ref` — useful for file inputs or integrating non-React widgets.
- Do not switch modes mid-lifecycle without resetting state.

---

*See [React — Learn](https://react.dev/learn) for official patterns.*
