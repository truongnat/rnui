---
name: performance-tuning-pro
description: |
  Professional performance tuning guidance for diagnosing bottlenecks, selecting optimizations, and avoiding premature optimization across frontend, backend, and data flows.

  Use this skill when improving application latency/throughput, reducing resource usage, investigating slow paths, or reviewing performance-sensitive changes.

  Triggers: "performance", "optimize", "bottleneck", "latency", "throughput", "cpu", "memory", "profiling", "slow query", "cache", "edge case".

  Combine with `testing-pro` for repeatable performance checks and `repo-tooling-pro` for script-driven diagnostics.
metadata:
  short-description: Performance tuning — profiling, bottlenecks, optimization, edge cases
---

# Performance tuning (professional)

Use official [MDN Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API), [Node.js diagnostics docs](https://nodejs.org/docs/latest/api/), and [Google Web Performance guides](https://web.dev/explore/fast) for API truth; this skill encodes **measure-first optimization**, **high-leverage tuning patterns**, and **edge-case risk controls**. Confirm **runtime environment** (browser/Node/container), **traffic profile**, and **performance targets** from the project.

## Related skills (this repo)

| Skill | When to combine |
|-------|------------------|
| `testing-pro` | Build regression tests/checks so performance gains are stable over time. |
| `repo-tooling-pro` | Use repo scripts for automated benchmarks, diagnostics, and validation loops. |

## When to use

- Fixing slow endpoints/screens, long startup time, high CPU, memory growth, or unstable p95/p99.
- Reviewing PRs where caching, batching, concurrency, or algorithmic complexity changes behavior.
- Deciding whether to optimize code, queries, I/O, rendering, or infrastructure first.
- Preventing regressions by defining baselines, budgets, and reproducible measurement.
- Trigger keywords: `performance`, `optimize`, `bottleneck`, `latency`, `throughput`, `cpu`, `memory`, `profiling`, `slow query`, `cache`, `edge case`

## Workflow

1. **Confirm** versions / environment / stack (runtime, hardware class, deployment shape, dataset size, load pattern, SLO/SLI target).
2. **Apply the principles and topic summaries below; open `references/` when you need depth.**
3. **Respond using **Suggested response format**;** note the main risks (false positives, benchmark bias, cache invalidation, regression under load spikes).

### Operating principles

1. **Measure before changing** - establish baseline metrics (p50/p95/p99 latency, throughput, error rate, CPU, memory).
2. **Optimize the true bottleneck** - profile first, then focus on the narrowest highest-impact path.
3. **Prefer structural wins** - reduce algorithmic complexity, I/O round trips, over-fetching, and redundant rendering before micro-optimizations.
4. **Trade-offs are explicit** - every optimization should state cost in complexity, consistency, or resource usage.
5. **Guard against regressions** - codify performance checks with repeatable scenarios and stable datasets.

### Performance tuning tips and tricks (summary)

- Start with one end-to-end user flow and one representative backend path; optimize measured hotspots only.
- Batch and cache at the correct boundary (request scope, process scope, distributed cache) based on consistency needs.
- Move expensive work off critical path (lazy loading, background jobs, precompute) when UX/business allows.
- Tune concurrency carefully; more parallelism can degrade p99 due to contention and queue pressure.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Performance edge cases (summary)

- Cold starts, cache warmup, and JIT/VM warmup can hide real steady-state behavior in short tests.
- Small test datasets often miss N-squared behavior that appears in production-scale traffic.
- GC pauses, memory fragmentation, and allocator pressure can mimic random latency spikes.
- Mixed workloads (read-heavy + write-heavy) may invalidate single-scenario benchmark conclusions.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - define metric target and current gap.
2. **Recommendation** - rank top changes by expected impact and implementation cost.
3. **Code** - provide concrete patch ideas, query/index changes, caching policy, or benchmark commands.
4. **Residual risks** - note uncertainty, rollback plan, and what to monitor after rollout.

## Resources in this skill

Use these files for deeper detail when concise guidance in this file is not enough.

| Topic | File |
|-------|------|
| Practical performance tips/tricks | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| High-risk performance edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "API p95 jumped from 180ms to 700ms after recent release; suggest fastest safe fix path."  
**Expected output:** Prioritized diagnosis + fixes with measurable targets, concrete code/query/caching actions, and rollout risk notes.

## Checklist before calling the skill done

- [ ] Baseline metrics and target thresholds are explicit.
- [ ] Recommendation order follows impact-first, cost-aware prioritization.
- [ ] At least one edge-case risk (warmup/data scale/GC/contention) is considered.
- [ ] Code section includes actionable changes or benchmark/check commands.
- [ ] Residual risks include monitoring and rollback guidance.
