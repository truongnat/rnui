# App Router and layouts (Next.js)

## Contents

1. [File conventions](#file-conventions)
2. [Layouts and templates](#layouts-and-templates)
3. [Loading and error UI](#loading-and-error-ui)
4. [Routing helpers](#routing-helpers)
5. [Metadata](#metadata)

---

## File conventions

- **`app/`** directory: **`page.tsx`** defines a route segment; **`layout.tsx`** wraps nested segments.
- **`route.ts`** — Route Handlers (HTTP) colocated with UI routes under same path rules — avoid conflicting `page` and `route` at same segment if ambiguous for your Next version.
- **`default.tsx`** — fallback for parallel routes when slot has no active child.

---

## Layouts and templates

- **`layout.tsx`** — persists across navigations; ideal for shell chrome (nav, providers that do not remount).
- **`template.tsx`** — remounts on navigation; use when enter/exit animations or key-based reset per navigation matters.
- **Nested layouts** — compose URL segments; shared UI moves to parent layout.

---

## Loading and error UI

- **`loading.tsx`** — Suspense boundary for segment; streaming-friendly.
- **`error.tsx`** — client boundary (must reset via `reset()`); log errors to observability.
- **`not-found.tsx`** — 404 for unknown segments when thrown via `notFound()`.

---

## Routing helpers

- **`next/navigation`**: `useRouter`, `usePathname`, `useSearchParams` (client); **`redirect`** in Server Components.
- Prefer **`Link`** from `next/link` for internal navigation to enable prefetch (default in production for static routes).

---

## Metadata

- **`generateMetadata`** — async data-driven SEO; avoid slow IO on every request without cache.
- **Open Graph / Twitter** — colocate with route for share previews.

---

*Follow the Next.js version in your repo — App Router APIs evolved quickly across majors.*
