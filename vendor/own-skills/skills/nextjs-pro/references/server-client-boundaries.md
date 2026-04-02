# Server and client boundaries (Next.js)

## Contents

1. [Default server components](#default-server-components)
2. [use client](#use-client)
3. [Passing props across the boundary](#passing-props-across-the-boundary)
4. [Dynamic rendering APIs](#dynamic-rendering-apis)
5. [Data mutations](#data-mutations)

---

## Default server components

- **`page.tsx`**, **`layout.tsx`** (without `"use client"`) run on the server — no browser APIs, no React client hooks.
- **Benefits**: direct DB/API access without exposing secrets; smaller JS to client.

---

## use client

- Add **`"use client"`** at top of modules that use **`useState`**, **`useEffect`**, browser APIs, or event handlers in that module’s component tree.
- **Boundary cost**: everything imported into a client module tends to ship to the client — keep client leaves small; compose server wrappers around client islands when possible.

---

## Passing props across the boundary

- Props must be **serializable** (JSON-like): plain objects, arrays, strings, numbers, booleans, `null`.
- **Do not** pass functions from Server → Client except patterns documented for **Server Actions** (compiled references).
- **Dates** — pass ISO strings and parse on client if needed.

---

## Dynamic rendering APIs

- **`cookies()`**, **`headers()`**, **`searchParams`** (some usages) — mark route as **dynamic**; may disable static optimization for that segment.
- **`export const dynamic = 'force-static' | 'force-dynamic' | 'auto'`** — explicit escape hatches; use deliberately.

---

## Data mutations

- **Server Actions** — server functions invoked from forms or typed calls; validate input server-side.
- **Route Handlers** — REST-style endpoints; good for webhooks, mobile clients, or non-HTML consumers.

---

*Cross-check with your Next.js major release notes — RSC rules tightened over time.*
