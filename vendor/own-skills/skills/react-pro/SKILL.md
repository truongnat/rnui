---
name: react-pro
description: |
  Professional React (web) development: component design, hooks and performance, UI/a11y, and framework edge cases (Vite, Next.js, SSR).

  Use this skill when the user works on React, JSX/TSX, hooks (useState, useEffect, useMemo, useCallback, useRef, useReducer, useContext, useLayoutEffect), Server Components (Next/App Router), client boundaries, React Router / TanStack Router, TanStack Query, Zustand/Redux, forms (React Hook Form), testing (Vitest/Jest, RTL, Playwright), bundlers (Vite, webpack), or asks for review of effects, memoization, lists/keys, hydration, or bundle size.

  Triggers: "React", "JSX", "TSX", "hooks", "useEffect", "useMemo", "useCallback", "useRef", "memo", "React.memo", "re-render", "Strict Mode", "hydration", "SSR", "RSC", "Server Component", "use client", "Next.js", "Vite", "React Router", "TanStack Query", "React Hook Form", "forwardRef", "lazy", "Suspense", "Error Boundary", "key prop", "Virtual DOM", "flushSync", "a11y", "ARIA", "semantic HTML".

metadata:
  short-description: React — components, performance, UI/a11y, SSR and edge cases
---

# React (professional)

Use official [React](https://react.dev/) docs for API truth; this skill encodes **professional defaults**, **UI and accessibility habits**, and **edge-case awareness** (effects, hydration, concurrent React). Confirm **React major version**, **framework** (CRA/Vite/Next/Remix), and **SSR vs SPA** when known.

## When to use

- Building or refactoring components, hooks, context, and data-fetching boundaries.
- Reviewing React code for effect correctness, memoization scope, list keys, and a11y.
- Debugging hydration mismatches, double effects in Strict Mode, stale closures, or SSR/RSC boundaries.
- Aligning UI with semantic HTML, keyboard support, and responsive layouts.
- Trigger keywords: `React`, `useEffect`, `hydration`, `RSC`, `use client`, `TanStack Query`, `a11y`, …

## Workflow

1. Confirm React version and framework (Vite/Next/…); prefer react.dev for API details.
2. Apply the principles and topic summaries below; open `references/` when you need depth.
3. Respond using **Suggested response format**; call out SSR/hydration risks when relevant.

### Operating principles

1. **Effects are for synchronization** — Not every “on change” belongs in `useEffect`; prefer event handlers or derived state during render when possible.
2. **Minimize re-render surface** — Split components; use `memo` / selectors after measuring; avoid premature optimization.
3. **Lists need stable keys** — Prefer domain ids over array index when order/content changes.
4. **Framework-aware** — Next.js App Router, RSC, and `"use client"` change where hooks and browser APIs run.
5. **Accessibility is not optional** — Labels, roles, focus management for interactive UIs.

### UI / UX and semantics (summary)

- Prefer **semantic HTML** (`button`, `nav`, `main`, headings) before ARIA; add ARIA when semantics are insufficient.
- **Focus** — visible focus styles; trap focus in modals; restore focus on close.
- **Responsive** — mobile-first layout; avoid fixed widths for entire layouts; test zoom and text scaling.
- **Loading / error / empty** — explicit UI states; avoid silent failures.

Details: [references/ui-ux-design.md](references/ui-ux-design.md)

### Components and JSX craft (summary)

- **Composition** over inheritance; **children** and render props when they clarify APIs.
- **`key`** on lists — stable identity; avoid index keys for reorderable or mutable lists.
- **`forwardRef`** when parents must measure or focus wrapped components.
- **Controlled vs uncontrolled** inputs — pick explicitly; avoid mixing incorrectly.

Details: [references/components-and-jsx.md](references/components-and-jsx.md)

### Tips and tricks (summary)

- **Dependency arrays** — exhaustive and honest; ESLint `react-hooks/exhaustive-deps` as aid, not oracle.
- **Memoization** — `useMemo` for expensive pure computation; `useCallback` when passing callbacks to memoized children; profile first.
- **Code splitting** — `React.lazy` + `Suspense` for route-level chunks; error boundaries around lazy trees.
- **Data fetching** — prefer libraries with caching/deduping (TanStack Query) over raw `useEffect` + `fetch` for server state.
- **Forms** — controlled fields + validation library when forms are non-trivial.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **Strict Mode** — development double-invocation of certain lifecycles/effects; cleanup must be idempotent.
- **Hydration** — server HTML must match client first render; watch for `Date`, `random`, locale, or browser-only APIs during SSR.
- **Concurrent rendering** — interruptible rendering; avoid relying on synchronous flush except where documented (`flushSync` sparingly).
- **Stale closures** — functional updates `setState(s => …)` and correct effect deps.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Bug, feature, or review ask.
2. **Recommendation** — Hook/component pattern and framework constraint.
3. **Code** — TSX snippets or diff-style blocks.
4. **Residual risks** — SSR, tests, or migration notes.

## Resources in this skill

- `references/` — topic deep-dives; do not paste entire reference docs into SKILL.md.

| Topic | File |
|-------|------|
| **Components and JSX** | [references/components-and-jsx.md](references/components-and-jsx.md) |
| UI / UX and semantics | [references/ui-ux-design.md](references/ui-ux-design.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Hydration mismatch warning when rendering `new Date().toLocaleString()` in a server-rendered page.  
**Expected output:** Explain client vs server output; use `useEffect` + state, or `suppressHydrationWarning` with a justified reason, plus a snippet.

## Checklist before calling the skill done

- [ ] Effects have correct dependencies and cleanup (subscriptions, timers, abort controllers).
- [ ] Lists use stable keys; no index keys for dynamic lists when identity matters.
- [ ] Interactive elements are keyboard-accessible; modals trap focus where required.
- [ ] No hydration warnings in SSR apps; client-only APIs behind `useEffect` or dynamic import.
- [ ] Loading and error states for async UI.
