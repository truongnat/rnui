# Edge cases

- **Hot-key amplification**: a tiny key set receives most traffic; use sharding/coalescing and tighter monitoring.
- **High-cardinality keys**: unbounded key space can exhaust memory quickly; add admission controls and caps.
- **Multi-region deployments**: replication lag can create cross-region stale reads; define region-local consistency policy.
- **Partial invalidation failure**: one mutation path forgets to invalidate; add mutation contract tests.
- **Thundering herd**: popular keys expire together; jitter TTL and allow single-flight refresh.
- **Tenant isolation**: missing tenant scope in keys can leak data across customers.
