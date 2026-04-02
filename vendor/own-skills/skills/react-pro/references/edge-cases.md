# Edge cases (React)

## Contents

1. [Strict Mode (development)](#strict-mode-development)
2. [SSR and hydration](#ssr-and-hydration)
3. [Server Components and boundaries](#server-components-and-boundaries)
4. [Concurrent rendering](#concurrent-rendering)
5. [Stale closures and functional updates](#stale-closures-and-functional-updates)
6. [Portals and events](#portals-and-events)
7. [Legacy patterns](#legacy-patterns)

---

## Strict Mode (development)

- React **may double-invoke** render and certain effects in development to surface missing cleanup — **idempotent** effects and resilient subscriptions are required.
- Do not rely on “effect ran exactly once on mount” without cleanup story.

---

## SSR and hydration

- **First client render must match server HTML** — avoid `Date.now()`, `Math.random()`, or locale-only formatting on first paint unless same on server.
- **Browser-only APIs** (`window`, `localStorage`) — guard with `typeof window !== 'undefined'` or run in `useEffect`.
- **suppressHydrationWarning** — escape hatch for known mismatches (e.g. timestamps); use rarely and document why.

---

## Server Components and boundaries

- **React Server Components** (e.g. Next App Router): default server; **`"use client"`** for hooks and browser APIs.
- **Do not import client-only modules** into server files — bundler errors or subtle bugs.
- **Pass serializable props** across the boundary (no functions/classes unless framework supports).

---

## Concurrent rendering

- Rendering may **pause and resume** — avoid assumptions that mount/unmount order is strictly synchronous with older React.
- **`startTransition`** — mark non-urgent updates; keep UI responsive for input.

---

## Stale closures and functional updates

- **`setCount(c => c + 1)`** when new state depends on previous — avoids stale state in rapid events.
- **Effects**: include all referenced values in deps or justify eslint-disable with comment.

---

## Portals and events

- **`createPortal`** — renders into another DOM node; **events still bubble** through React tree (not DOM tree) — understand for overlays and modals.

---

## Legacy patterns

- **Class components** — `componentDidMount` etc. in maintenance codebases; prefer hooks in new code.
- **Legacy Context** — old API; use modern `createContext` + `useContext`.

---

*Framework docs (Next.js, Remix) add rules on top — read their React integration guides.*
