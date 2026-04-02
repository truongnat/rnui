# API design tips and tricks

## 1) Contract-first workflow

- Define request/response/error schemas before coding handlers.
- Keep examples realistic and cover happy path plus common validation failures.
- Treat API docs/spec as source of truth, not an afterthought.

## 2) Consistent resource and action modeling

- Prefer stable resource identifiers and predictable path patterns.
- Keep action endpoints explicit when state transitions are domain-specific.
- Avoid overloaded endpoints that change behavior based on many optional flags.

## 3) Error model that helps clients recover

- Standardize one error envelope across services.
- Use machine-readable `code` values; keep `message` human-readable.
- Include correlation/request IDs for debugging and support workflows.

## 4) Pagination/filter/sort defaults

- Use cursor pagination for large, changing datasets.
- Document sorting guarantees and tie-breaker rules.
- Bound page sizes and filter complexity to protect service stability.

## 5) Versioning and evolution

- Prefer additive changes (new optional fields/endpoints) over breaking modifications.
- Mark deprecations early with timeline and migration notes.
- Keep compatibility tests for top client versions.

## 6) Idempotency and retries

- Make create/update side effects retry-safe where clients may retry.
- Support idempotency keys on critical write endpoints.
- Document which operations are safe to retry and under what conditions.
