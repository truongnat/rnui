# JavaScript tips and tricks

## 1) Data boundaries first

- Normalize external input once (API payloads, query params, env vars) and pass typed values internally.
- Keep conversion close to boundary code to avoid repeated parsing and inconsistent defaults.

## 2) Safer object handling

- Use `Object.hasOwn(obj, key)` for own-property checks.
- Avoid mutating objects shared across async paths; clone or create new objects when passing across layers.
- Prefer `Map` when keys are dynamic or not naturally string-only.

## 3) Async discipline

- Return Promises from async APIs consistently; do not hide async work inside fire-and-forget helpers.
- Use `Promise.allSettled` for partial-failure tolerant batches; use `Promise.all` when any failure must fail the operation.
- Add timeout/abort support (`AbortController`) for network and long I/O operations.

## 4) Error handling defaults

- Throw rich errors with context (`code`, `operation`, `inputId`) so logs are actionable.
- Avoid swallowing errors in `.catch(() => {})` unless explicitly documented and measured.

## 5) Performance without guesswork

- Measure before optimizing; target hot paths with profiling data.
- Cache expensive pure computations with bounded lifetime/key space.
- Avoid repeated JSON serialize/parse round trips as a cloning strategy on large objects.

## 6) Code readability and maintenance

- Name booleans by intent (`isReady`, `hasAccess`) and functions by side effects (`fetchUser`, `persistOrder`).
- Keep one responsibility per function; split transformation from I/O for easier testing.
- Prefer early returns to reduce deeply nested conditionals.
