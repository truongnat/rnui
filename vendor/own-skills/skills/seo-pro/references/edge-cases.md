# SEO edge cases

## JavaScript SPAs

- **Empty shell** on first HTML — crawlers may see little content until JS runs; **SSR/SSG** or **pre-rendering** for key landing pages.
- **Client-only navigation** — Ensure **unique URLs** and **shareable** states; hash-only routes often poorly indexed.

## Duplicate and near-duplicate

- **Filter/sort** query strings — Same category with `?sort=` — use **canonical** to main category or **noindex** faceted noise.
- **HTTP vs HTTPS**, **www vs non-www** — **One** canonical host; **301** the rest.
- **Syndication** — Partner republishers need **canonical** back to source or syndication agreement.

## Pagination and infinite scroll

- **Traditional pagination** — Unique page URLs with crawlable **next** links; avoid “load more” as **only** discovery path for archives.
- **Rel=prev/next** — No longer used by Google for consolidation; rely on **clear internal linking** and **canonical** strategy.

## International and multilingual

- **Wrong hreflang** — Returns **404** or wrong language version; validate all pairs.
- **Auto geo-redirect** — Risk blocking Googlebot from seeing other locales; prefer **locale switcher** + `hreflang`.

## Staging and auth

- **Staging indexed** — `noindex` + **IP allowlist** / auth; **robots.txt** alone is insufficient for secrecy.
- **Paywalls** — `structured data` for **paywalled** content where applicable; follow Google’s **flexible sampling** guidance.

## Core Web Vitals gotchas

- **CLS** — Ads/embeds/fonts shifting layout; reserve space.
- **INP** — Heavy main-thread JS on mobile; third-party scripts.
- **Field vs lab** — CrUX is **URL**-level rolling 28-day; fixes take time to reflect.

## Algorithm and quality

- **Core updates** — Site-wide quality reassessment; fix **content** and **trust**, not only technical toggles.
- **Manual actions** — GSC notification; **reconsideration** after substantive fixes.

## Edge delivery

- **Geo-blocking** — Blocking Google’s crawler country can cause **partial** visibility issues; use **hreflang** and allowlist verification.
