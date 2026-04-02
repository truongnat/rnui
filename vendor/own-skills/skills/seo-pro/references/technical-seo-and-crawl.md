# Technical SEO and crawlability

Make pages **discoverable**, **crawlable**, and **indexable** without wasting crawl budget on junk.

## Crawling and indexing

- **`robots.txt`** — Allow/disallow **crawlers** (not a security boundary); avoid blocking CSS/JS needed for rendering if you rely on JS-heavy pages.
- **Sitemaps** — XML sitemap(s); **lastmod** honest; submit in GSC/Bing; split large sites.
- **Canonical** — `link rel="canonical"` to consolidate duplicates; **one** preferred URL per piece of content.
- **`noindex`** — Use when page should not appear in search but may be crawled (careful with accidental **noindex** on whole sections).

## URLs and structure

- **Stable, readable URLs** — Avoid unnecessary query params for session IDs; prefer **HTTPS** everywhere.
- **Redirects** — **301** permanent moves; **chains** — flatten; fix **404** on important inbound links.
- **`hreflang`** — Cross-region/language alternate links; **x-default** where applicable; validate in GSC.

## Rendering

- **JavaScript** — Google can render JS but **budget** and **timing** matter; critical content and links should be available **early**; avoid infinite scroll without crawlable pagination fallback where needed.
- **SSR/SSG/ISR** — Often better for SEO-critical pages than pure client-only shell (**`nextjs-pro`**).

## Performance signals (Core Web Vitals)

- **LCP**, **INP** (formerly FID lineage), **CLS** — Field data (CrUX) matters for **page experience** signals; lab + field.
- **TTFB** — Server/CDN/config; oversized HTML or slow origin hurts.

## Structured data

- **JSON-LD** (preferred by many teams) for **Article**, **Product**, **FAQ**, **Breadcrumb**, **Organization** — match **visible** content; test in Rich Results Test.
- Invalid or misleading markup can cause **manual actions** — follow Google’s docs per type.

## Mobile

- **Mobile-first indexing** — Primary Google index uses mobile crawler; parity of content/links between mobile and desktop views.

## International

- **ccTLD vs subfolder vs subdomain** — Tradeoffs for authority consolidation and engineering complexity.
