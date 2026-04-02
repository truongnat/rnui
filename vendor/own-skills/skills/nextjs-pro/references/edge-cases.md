# Edge cases (Next.js)

## Contents

1. [Hydration mismatches](#hydration-mismatches)
2. [Static vs dynamic surprises](#static-vs-dynamic-surprises)
3. [Edge vs Node runtime](#edge-vs-node-runtime)
4. [Self-hosting and Docker](#self-hosting-and-docker)
5. [Monorepos and transpilation](#monorepos-and-transpilation)
6. [Pages Router coexistence](#pages-router-coexistence)

---

## Hydration mismatches

- **Server HTML ≠ first client render** — causes React #418-style warnings. Common causes: `Date.now()`, `Math.random()`, locale-only formatting, `window` in initial render.
- **Fix** — compute in `useEffect`, or pass server time as prop, or defer client-only widget with `dynamic(..., { ssr: false })` when acceptable for SEO.

---

## Static vs dynamic surprises

- Importing **`headers()`** / **`cookies()`** in a layout or page can force **dynamic** rendering for that subtree — unexpected if you expected SSG.
- **`export const dynamic`** and **`fetch` options** must align with product SLAs (CDN cache vs fresh data).

---

## Edge vs Node runtime

- **Middleware** and **Edge Route Handlers** — limited Node APIs; **`fs`**, some crypto, native addons unavailable.
- **Prisma** — historically Node; use **Data Proxy**, **edge driver**, or run DB access in Node server actions / separate service.

---

## Self-hosting and Docker

- **`output: 'standalone'`** — minimal server bundle for containers; copy `public` and `.next/static` per docs.
- **Health checks** — hit a route that exercises app, not static files only.

---

## Monorepos and transpilation

- **`transpilePackages`** in `next.config` for workspace packages not pre-built; watch for dual React copies (**invalid hook call**).

---

## Pages Router coexistence

- **`pages/`** and **`app/`** can coexist during migration — routing precedence and duplicate paths are easy to get wrong; document URL ownership.

---

*Vercel-specific: regions, fluid compute, and limits — read platform docs for production SLOs.*
