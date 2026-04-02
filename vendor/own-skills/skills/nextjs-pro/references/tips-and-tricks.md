# Tips and tricks (Next.js)

## Contents

1. [Fetching and caching](#fetching-and-caching)
2. [Revalidation](#revalidation)
3. [next/image](#nextimage)
4. [next/font](#nextfont)
5. [Middleware](#middleware)
6. [Environment variables](#environment-variables)
7. [Internationalization](#internationalization)

---

## Fetching and caching

- **RSC `fetch`** — cached by default in many setups; use **`cache: 'no-store'`** or **`next: { revalidate: 0 }`** when freshness matters.
- **Deduplication** — identical `fetch` in the same request may dedupe — understand for counts and side effects.

---

## Revalidation

- **`revalidatePath` / `revalidateTag`** — after mutations; tag `fetch` with `next: { tags: ['x'] }` for coarse invalidation.
- **Time-based** — `revalidate` seconds on `fetch` or segment config for ISR-style behavior.

---

## next/image

- Configure **`images.remotePatterns`** (modern) or legacy `domains` in **`next.config`** for remote URLs.
- **`priority`** for LCP hero images; **`sizes`** for responsive srcset accuracy.

---

## next/font

- **Google** and **local** fonts with automatic self-hosting — prefer `next/font` over raw `<link>` for performance and privacy.

---

## Middleware

- **`middleware.ts`** at project root (or `src/`); **`matcher`** to limit work — exclude `_next/static`, images, favicon.
- **Edge runtime** — cold starts faster but limited APIs; heavy auth crypto may need Node runtime strategies.

---

## Environment variables

- **`NEXT_PUBLIC_*`** exposed to browser — never for secrets.
- Server-only vars for DB URLs, API keys to third parties, signing secrets.

---

## Internationalization

- **App Router i18n** — locale prefix in `app/[lang]/...` or middleware-driven rewrites; keep `Link` locale-aware.

---

*Prefer official Next.js examples for your version when scaffolding auth and CMS patterns.*
