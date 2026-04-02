# Invalidation and consistency

- Treat origin DB/service as the **source of truth** and cache as a derived view.
- Define invalidation triggers per mutation path (create/update/delete/bulk import).
- Use key namespacing and versioning (for example: `product:v3:{id}`) to support safe schema changes.
- Choose freshness model per endpoint: strong (sync invalidate) vs bounded-stale (TTL + async refresh).
- Set both **hard TTL** (absolute expiry) and optional **soft TTL** (background refresh window).

Guardrails:

1. Document exact staleness budget per use case.
2. Add jitter to TTL to avoid synchronized expiration storms.
3. On cache failure, degrade gracefully to origin with rate limits/backoff.
4. For multi-key objects, define atomic invalidation strategy or consistency warning.
