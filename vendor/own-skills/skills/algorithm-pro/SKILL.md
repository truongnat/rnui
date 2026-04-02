---
name: algorithm-pro
description: |
  Professional algorithm engineering guidance for deep problem solving: formal problem modeling, strategy selection (greedy/DP/graph/search), correctness reasoning, complexity analysis, and performance-aware implementation trade-offs.

  Use this skill when the user asks to design or optimize algorithms, solve hard coding interview style problems, compare multiple algorithmic approaches, prove correctness, or reduce time/memory complexity under strict constraints.

  Use **with** **`testing-pro`** to design adversarial and property-based test coverage, **`data-analysis-pro`** when benchmark datasets or profiling outputs need interpretation, and stack/framework `*-pro` skills when integrating algorithms into production systems.

  Triggers: "algorithm", "data structure", "dynamic programming", "graph", "greedy", "complexity", "Big-O", "optimize", "time complexity", "space complexity", "proof", "LeetCode", "competitive programming".

metadata:
  short-description: Algorithm - deep modeling, correctness, complexity, optimization
---

# Algorithm design and analysis (professional)

Use canonical references such as [CLRS](https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/) and [CP-Algorithms](https://cp-algorithms.com/) for formal methods and patterns; this skill encodes **constraint-first modeling**, **correctness-first reasoning**, and **measured optimization discipline**. Confirm **input constraints**, **correctness requirements**, **latency/memory limits**, and **integration context** before proposing a solution.

## Related skills (this repo)

| Skill | When to combine with `algorithm-pro` |
|-------|--------------------------------------|
| **`testing-pro`** | Build edge/adversarial/property-based tests for algorithm reliability |
| **`data-analysis-pro`** | Interpret benchmark data, distributions, and performance regressions |
| **Stack `*-pro` skills** | Integrate algorithmic solution into app/backend/mobile/runtime contexts |

**Boundary:** **`algorithm-pro`** owns problem modeling, algorithm choice, complexity/correctness depth; paired skills own system integration and broader engineering workflow.

## When to use

- Solving difficult algorithmic tasks under strict constraints.
- Choosing among multiple approaches with clear complexity trade-offs.
- Refactoring brute-force code to near-optimal complexity.
- Verifying correctness via invariants, exchange arguments, or induction.
- Tuning memory usage and constant factors for real workloads.
- Trigger keywords: `algorithm`, `DP`, `graph`, `greedy`, `Big-O`, `complexity`, `optimize`, `proof`

## Workflow

1. Confirm formal problem statement, constraints, objective function, and resource limits (time, memory, precision).
2. Apply the principles and topic summaries below; open `references/` when you need depth; keep correctness argument and complexity derivation explicit.
3. Respond using **Suggested response format**; note residual risks such as edge-case failures, hidden constants, or assumption mismatch.

### Operating principles

1. **Model before coding** - define states, transitions, and constraints explicitly.
2. **Pick strategy by structure** - map problem signals to known families (DP, graph, greedy, divide-and-conquer, search).
3. **Prove correctness early** - invariants and proof sketch prevent fast-but-wrong code.
4. **Optimize complexity in stages** - baseline, improved asymptotic, then constant-factor tuning.
5. **Respect data shape** - distribution and sparsity often dominate practical performance.
6. **Test adversarially** - worst-case and boundary inputs are first-class.

### Problem modeling and strategy selection (summary)

- Convert narrative requirements into formal model, constraints, and candidate algorithm families.

Details: [references/modeling-and-strategy-selection.md](references/modeling-and-strategy-selection.md)

### Correctness and complexity analysis (summary)

- Derive invariants, proof sketch, and asymptotic bounds with assumptions and caveats.

Details: [references/correctness-and-complexity.md](references/correctness-and-complexity.md)

### Optimization and implementation trade-offs (summary)

- Balance asymptotic gains, memory pressure, and practical constants under runtime limits.

Details: [references/optimization-and-trade-offs.md](references/optimization-and-trade-offs.md)

### Tips and tricks (summary)

- Apply reusable patterns for pruning, preprocessing, monotonic structures, and caching.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- Handle overflow, degenerate inputs, pathological graphs, and recursion depth limits.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - Problem, constraints, and optimization target.
2. **Recommendation** - Chosen algorithm strategy and why alternatives are weaker.
3. **Code** - Pseudocode/snippet, complexity table, and proof sketch - still labeled **Code**.
4. **Residual risks** - Edge cases, assumption gaps, benchmark uncertainty, and maintainability cost.

## Resources in this skill

- `references/` - deep notes for modeling, correctness, complexity, and optimization.

| Topic | File |
|-------|------|
| Modeling and strategy selection | [references/modeling-and-strategy-selection.md](references/modeling-and-strategy-selection.md) |
| Correctness and complexity | [references/correctness-and-complexity.md](references/correctness-and-complexity.md) |
| Optimization and trade-offs | [references/optimization-and-trade-offs.md](references/optimization-and-trade-offs.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Given up to 2e5 nodes and weighted edges, find minimum cost path with one discounted edge."  
**Expected output:** Formalize state-space extension, compare Dijkstra variants, provide complexity/proof sketch, and list edge cases plus stress-test plan.

## Checklist before calling the skill done

- [ ] Problem model and constraints are explicit.
- [ ] Strategy choice is justified against alternatives.
- [ ] Correctness argument and complexity bounds are stated.
- [ ] Implementation notes include key optimizations and limits.
- [ ] Edge-case and adversarial test ideas are included.
