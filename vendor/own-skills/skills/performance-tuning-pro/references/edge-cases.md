# Performance edge cases

## Measurement traps

- Benchmarking debug builds or local dev mode gives misleading numbers versus production mode.
- Microbenchmarks may optimize the wrong thing when real latency is dominated by I/O or lock contention.
- Noisy neighbors and autoscaling transitions can distort short measurement windows.

## Data and traffic realism

- Small fixtures hide nonlinear complexity and join explosion patterns.
- Uniform synthetic traffic misses burst behavior and tail latency problems.
- Read-mostly tests ignore write amplification and lock contention under mixed workloads.

## Cache and consistency pitfalls

- Cache stampede can worsen latency during key expiry spikes.
- Overly long TTL may improve speed but serve stale/incorrect data.
- Partial invalidation logic often creates hard-to-debug correctness regressions.

## Runtime and memory effects

- GC stop-the-world events can cause intermittent p99 spikes.
- Memory leaks may look like gradual slowdown before eventual OOM.
- High concurrency can increase context switching and queueing delay instead of improving throughput.

## Query and storage surprises

- Missing index is not the only issue; poor selectivity index can still degrade performance.
- Large OFFSET pagination grows slower with dataset size; prefer keyset/cursor pagination when possible.
- Lock escalation and long transactions can serialize concurrent operations unexpectedly.
