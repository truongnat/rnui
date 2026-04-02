# GraphQL tips and tricks

## 1) Schema design discipline

- Model schema from domain language, not database table shape.
- Keep mutations task-oriented and explicit about side effects.
- Document nullability intent carefully for each field.

## 2) Resolver architecture

- Keep resolvers thin: orchestration + policy; move heavy logic into service layer.
- Use request-scoped context for auth, tracing, and shared loaders.
- Standardize error mapping to avoid leaking internals.

## 3) Performance defaults

- Use DataLoader for batched relation fetching.
- Add caching at correct level (request, resolver, or backend service) with invalidation strategy.
- Set query depth/complexity limits and enforce timeouts on expensive operations.

## 4) Evolution and compatibility

- Use `@deprecated` with clear migration guidance before removing fields.
- Prefer additive field introduction over type-breaking edits.
- Maintain compatibility checks for key client queries.

## 5) Observability and operations

- Track per-field latency hotspots and resolver error rates.
- Include request IDs and operation names in logs/metrics.
- Separate user-facing error messages from internal diagnostic details.
