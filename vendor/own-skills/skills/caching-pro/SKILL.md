---
name: caching-pro
description: |
  Professional caching guidance for application, API, and data workloads: strategy selection, key design, TTL policy, invalidation, consistency trade-offs, and observability.

  Use this skill when the user asks to speed up reads, reduce DB/API load, design Redis or in-memory caching, troubleshoot stale data, or review cache safety before rollout.

  Use **with** **`nextjs-pro`** for framework-level cache behavior, **`postgresql-pro`** and **`sql-data-access-pro`** for query-layer boundaries, and **`deployment-pro`** for production rollout/rollback controls.

  Triggers: "caching", "cache strategy", "Redis", "TTL", "invalidation", "stale data", "cache miss", "cache-aside", "write-through", "ETag", "CDN cache", "performance bottleneck".

metadata:
  short-description: Caching - strategy, invalidation, consistency, observability
---

# Caching strategy (professional)

Use official [Redis docs](https://redis.io/docs/latest/) and [HTTP caching docs (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) for protocol/API truth; this skill encodes **safe caching defaults**, **invalidation-first design**, and **operational observability**. Confirm **stack**, **traffic profile**, **read/write ratio**, and **consistency requirements** from the project before proposing implementation.

## Related skills (this repo)

| Skill | When to combine with `caching-pro` |
|-------|------------------------------------|
| **`nextjs-pro`** | App Router, ISR, and framework-level cache controls |
| **`postgresql-pro`** | Query shape and DB consistency boundaries |
| **`sql-data-access-pro`** | Data-access safety and SQL-level optimization before caching |
| **`deployment-pro`** | Rollout, canary, and rollback plan for cache changes |

**Boundary:** **`caching-pro`** defines cache architecture and risk controls; paired skills own framework/database/deployment specifics.

## When to use

- Choosing between cache-aside, read-through, write-through, write-behind, or HTTP/CDN caching.
- Designing cache key schema, TTL policy, and stampede protection.
- Investigating stale data, high miss ratio, or poor p95/p99 latency.
- Reducing database or third-party API load while preserving correctness.
- Reviewing cache changes for consistency, invalidation, and failure modes.
- Trigger keywords: `caching`, `Redis`, `TTL`, `invalidation`, `cache miss`, `stale data`, `ETag`, `CDN cache`

## Workflow

1. Confirm consistency target, freshness SLA, data ownership, and workload profile (hot keys, read/write ratio, latency budget).
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep invalidation and fallback behavior explicit.
3. Respond using **Suggested response format**; note risks around stale reads, invalidation drift, and operational failure modes.

### Operating principles

1. **Do not cache by default** - first remove obvious query/API inefficiencies.
2. **Design invalidation before storage** - stale-data risk is usually harder than misses.
3. **Prefer deterministic keys** - stable namespacing and versioning reduce collisions.
4. **Choose consistency intentionally** - define acceptable staleness per endpoint/use case.
5. **Protect origin systems** - use request coalescing, jittered TTL, and backpressure.
6. **Instrument outcomes** - hit ratio, latency, evictions, and stale-serve rates must be measurable.

### Cache pattern selection (summary)

- Match strategy to write/read shape: cache-aside (common), read-through (centralized), write-through/behind (write-heavy trade-offs), HTTP/CDN for public idempotent content.

Details: [references/pattern-selection.md](references/pattern-selection.md)

### Invalidation and consistency (summary)

- Define authoritative source, invalidation triggers, soft/hard TTL, and fallback on cache outage.

Details: [references/invalidation-and-consistency.md](references/invalidation-and-consistency.md)

### Performance and observability (summary)

- Track hit/miss by key space, p95 latency by endpoint, hot-key amplification, and cache error budgets.

Details: [references/performance-and-observability.md](references/performance-and-observability.md)

### Tips and tricks (summary)

- Use practical defaults for key format, TTL jitter, warming, and safe progressive rollout.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle high-cardinality keys, multi-region lag, partial invalidation failures, and cache stampedes.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Performance/correctness objective and affected workloads.
2. **Recommendation** - Proposed cache strategy, key/TTL/invalidation design, and why.
3. **Code** - Pseudocode, config, endpoint policy table, or rollout checklist - still labeled **Code**.
4. **Residual risks** - Staleness windows, outage fallback, data drift, and monitoring gaps.

## Resources in this skill

- `references/` - deeper guides for strategy, invalidation, observability, and operational guardrails.

| Topic | File |
|-------|------|
| Pattern selection | [references/pattern-selection.md](references/pattern-selection.md) |
| Invalidation and consistency | [references/invalidation-and-consistency.md](references/invalidation-and-consistency.md) |
| Performance and observability | [references/performance-and-observability.md](references/performance-and-observability.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Our product list API is slow and DB CPU spikes at peak. Should we use Redis?"  
**Expected output:** Pick cache-aside with namespaced keys, TTL + jitter, explicit invalidation on product updates, stampede protection, and dashboard metrics with rollback criteria.

## Checklist before calling the skill done

- [ ] Strategy choice matches workload and consistency requirements.
- [ ] Key format, TTL, and invalidation triggers are explicit.
- [ ] Fallback behavior for cache outage is defined.
- [ ] Observability metrics and alert thresholds are included.
- [ ] Rollout/rollback plan is clear for production changes.
