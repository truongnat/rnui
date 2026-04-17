# Performance tuning tips and tricks

## 1) Build a reliable baseline

- Measure under repeatable conditions: same dataset shape, warmup policy, and concurrency level.
- Track p50/p95/p99 latency plus throughput, error rate, CPU, and memory together.
- Compare against last known good baseline, not only absolute numbers.

## 2) Find bottlenecks fast

- Use flame graphs/profilers first; do not guess hot functions.
- Split time by category: CPU compute, database I/O, network I/O, serialization, rendering.
- Confirm top hotspot remains top after each optimization iteration.

## 3) High-leverage backend wins

- Reduce round trips: batch requests/queries and co-locate dependent data fetches.
- Add targeted indexes for frequent filters/sorts; verify query plan changes.
- Cache expensive read paths with clear TTL + invalidation policy.
- Use connection pooling and reasonable backpressure limits.

## 4) High-leverage frontend wins

- Defer non-critical JS/CSS and keep critical rendering path small.
- Memoize expensive computations only when profiling shows rerender cost is significant.
- Virtualize large lists and avoid re-render storms from broad state updates.
- Compress and right-size assets; serve modern formats where available.

## 5) Rollout safely

- Ship behind feature flags when risk is medium/high.
- Monitor latency/error/resource dashboards in staged rollout windows.
- Keep rollback simple and pre-defined before enabling globally.
