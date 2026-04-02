# Performance and observability

Core metrics:

- Hit ratio and miss ratio by endpoint and key namespace.
- Cache latency (`p50`, `p95`, `p99`) vs origin latency.
- Eviction rate and memory pressure (used/max memory).
- Error rate for cache operations (timeout, connection, serialization).
- Stale-serve rate and refresh success rate.

Operational practices:

1. Track top hot keys and request amplification.
2. Alert on sudden miss spikes and latency regressions.
3. Correlate cache failures with DB/API load increases.
4. Define SLOs and error budgets for cache-backed paths.
