# Tips and tricks (React)

## Contents

1. [Hooks — mental model](#hooks--mental-model)
2. [Memoization](#memoization)
3. [Effects vs events](#effects-vs-events)
4. [State management](#state-management)
5. [Data fetching](#data-fetching)
6. [Performance profiling](#performance-profiling)
7. [Testing notes](#testing-notes)

---

## Hooks — mental model

- **`useState`** — local UI state; prefer **one state object** vs many `useState` calls based on update granularity.
- **`useReducer`** — when next state depends on complex actions or multiple sub-values.
- **`useEffect`** — sync with **external systems** (DOM APIs, subscriptions, network with cleanup); not for every “X changed”.
- **`useLayoutEffect`** — read layout and sync paint **before** browser paint; use sparingly; SSR: warn / noop on server — prefer `useEffect` unless measuring layout.

---

## Memoization

- **`React.memo`** — wrap components that receive stable props often but re-render from unrelated parent updates.
- **`useMemo`** — expensive **pure** computations; not for every array map.
- **`useCallback`** — stable function identity for **`memo`** children or effect deps; avoid empty deps that hide stale data.

---

## Effects vs events

- **User action** → event handler (`onClick`, `onChange`).
- **Syncing with network/cache/other systems** → `useEffect` with abort/cleanup.
- **Deriving display values** → compute during render; do not store duplicate state.

---

## State management

- **Local state** first; lift before introducing global stores.
- **URL as state** — great for shareable filters/tabs (`useSearchParams` in React Router / Next).
- **Zustand / Redux / Jotai** — choose one pattern per app layer; avoid duplicating server cache in global state.

---

## Data fetching

- **TanStack Query / SWR** — caching, deduping, background refetch, stale-while-revalidate.
- **Fetch with `AbortController`** in `useEffect` cleanup to cancel in-flight requests on unmount or dep change.

---

## Performance profiling

- **React DevTools Profiler** — commit time, why components rendered.
- **Chrome Performance** — long tasks, main thread blocking.

---

## Testing notes

- **React Testing Library** — assert behavior and accessibility, not implementation details.
- **User-event** over `fireEvent` for realistic interaction.

---

*Profile before optimizing — re-renders are often cheaper than broken memoization.*
