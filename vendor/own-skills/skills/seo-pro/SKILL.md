---
name: seo-pro
description: |
  Professional SEO: full lifecycle (audit, strategy, implementation, measurement), technical crawlability (indexing, canonicals, sitemaps, structured data, Core Web Vitals), on-page patterns, and search-quality edge cases.

  Use this skill when the user asks about organic search visibility, Google Search Console, Bing Webmaster, robots.txt, XML sitemaps, canonical and hreflang, meta titles/descriptions, structured data (JSON-LD), E-E-A-T, internal linking, JavaScript SEO, duplicate content, pagination, international SEO, or Core Web Vitals vs SEO.

  Use **with** **`nextjs-pro`** (Metadata API, `sitemap.ts`, `robots.ts`, RSC/SSR for crawlable HTML), **`react-pro`** (SPA rendering constraints, document head), **`deployment-pro`** (CDN, caching, TTFB). This skill (`seo-pro`) owns **search strategy and SEO mechanics**; framework skills own **framework-specific implementation**.

  Triggers: "SEO", "organic search", "Google Search Console", "GSC", "sitemap", "robots.txt", "canonical", "hreflang", "meta title", "meta description", "structured data", "schema", "JSON-LD", "Core Web Vitals", "LCP", "CLS", "INP", "indexing", "crawl", "noindex", "duplicate content", "international SEO", "E-E-A-T", "rich results", "Bing Webmaster".

metadata:
  short-description: SEO — lifecycle, technical crawl, on-page, CWV, edge cases
---

# SEO (professional)

Use [Google Search Central](https://developers.google.com/search/docs) and [Bing Webmaster guidelines](https://www.bing.com/webmasters/help/webmasters-guidelines-30fba23a) for platform rules; rankings are **not guaranteed**. This skill encodes **lifecycle discipline**, **technical discoverability**, and **intent-aligned** content patterns. Confirm **market** (locales, domains), **CMS/framework**, and whether **search** is a primary channel.

## Related skills (this repo)

| Skill | When to combine with `seo-pro` |
|-------|--------------------------------|
| **`nextjs-pro`** | `generateMetadata`, `sitemap.ts` / `robots.ts`, App Router SSR/SSG, URL structure |
| **`react-pro`** | Client-heavy apps; head management; hydration and crawlable output |
| **`deployment-pro`** | CDN, edge caching, headers affecting TTFB and global crawl |
| **`testing-pro`** | Contract or smoke tests for critical meta/HTTP status in CI (optional) |

Do **not** duplicate framework API tutorials; state **SEO requirement** here and **implementation hook** in the sibling skill.

## When to use

- Running or reviewing the **full SEO flow**: baseline → audit → strategy → ship → measure → iterate.
- **Technical SEO**: indexing, robots, sitemaps, canonical, `hreflang`, structured data, CWV.
- **On-page** templates: titles, headings, internal links, snippet-oriented copy.
- **Edge cases**: SPAs, faceted nav, staging leaks, international, algorithm quality.
- Trigger keywords: `SEO`, `GSC`, `sitemap`, `canonical`, `CWV`, `structured data`, `indexing`, …

## Workflow

1. Confirm search goals, locales, tech stack, and **which framework skill** implements HTML/routing.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer **Next.js/React wiring** to **`nextjs-pro`** / **`react-pro`** when the task is code-specific.
3. Respond using **Suggested response format**; note measurement lag, algorithm uncertainty, and **residual** technical/content risks.

### Operating principles

1. **Intent first** — Match page type to **query intent**; avoid thin doorway pages.
2. **One canonical URL per piece of content** — Consolidate duplicates with redirects and canonicals.
3. **Crawl budget is real** — Fix **404** chains, soft 404s, and infinite parameterized URLs.
4. **Technical + quality** — Fast, crawlable sites still need **trustworthy** content for competitive queries.
5. **Measure before and after** — Attribute changes to **deploy/content** dates; avoid ten changes at once.
6. **Guidelines compliance** — Structured data and snippets must reflect **visible** content.

### SEO flow and lifecycle (summary)

- Phases: **baseline → audit → strategy → implement → measure → iterate**; roles and KPIs; GSC as primary diagnostic surface.

Details: [references/seo-flow-and-lifecycle.md](references/seo-flow-and-lifecycle.md)

### Technical SEO and crawl (summary)

- **robots**, **sitemaps**, **canonical**, **hreflang**, rendering considerations, **CWV**, **mobile-first**, structured data basics.

Details: [references/technical-seo-and-crawl.md](references/technical-seo-and-crawl.md)

### Tips and tricks (summary)

- Template-level **titles/H1**, internal linking, **E-E-A-T** orientation, image/alt discipline, GSC segmentation.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **SPA/JS** indexing, duplicate faceted URLs, pagination/infinite scroll, staging **noindex**, paywalls, core updates.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Query/market, URL scope, or metric (impressions, CWV, coverage).
2. **Recommendation** — Lifecycle step + technical vs content lever; **handoff** to **`nextjs-pro`** / **`react-pro`** / **`deployment-pro`** when implementation-heavy.
3. **Code** — Meta/sitemap/robots **sketch**, checklist, or GSC action list — not a full framework course.
4. **Residual risks** — Ranking unpredictability, **28-day** CWV field lag, duplicate or manual-action exposure.

## Resources in this skill

- `references/` — lifecycle, technical SEO, tips, edge cases.

| Topic | File |
|-------|------|
| Flow & lifecycle | [references/seo-flow-and-lifecycle.md](references/seo-flow-and-lifecycle.md) |
| Technical SEO & crawl | [references/technical-seo-and-crawl.md](references/technical-seo-and-crawl.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Next.js site: `/products?color=red` and `/products?color=blue` both indexed with thin differences.  
**Expected output:** Recommend **canonical** to `/products` or faceted policy; **noindex** low-value params if appropriate; internal link hygiene; **`nextjs-pro`** for `metadata`/route rules implementation.

## Checklist before calling the skill done

- [ ] **Intent** and URL scope clear; duplicate/cluster strategy stated.
- [ ] **Technical** basics: indexability, canonical, sitemap/robots where relevant.
- [ ] **Measurement** plan (GSC segments, before/after) — not only keyword positions.
- [ ] Framework-specific work **delegated** to **`nextjs-pro`** / **`react-pro`** when applicable.
- [ ] **Residual** uncertainty (algorithm, competition) acknowledged honestly.
