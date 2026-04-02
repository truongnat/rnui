---
name: javascript-pro
description: |
  Professional JavaScript guidance for architecture-level decisions, runtime behavior, async flows, performance, and maintainability.

  Use this skill when implementing or reviewing JavaScript/TypeScript application logic, debugging tricky runtime behavior, or handling language-level edge cases in browser/Node.js projects.

  Triggers: "javascript", "js", "event loop", "promise", "closure", "this", "prototype", "hoisting", "microtask", "edge case", "tip", "trick".

  Combine with `testing-pro` for coverage strategy and `security-pro` for threat-focused hardening.
metadata:
  short-description: JavaScript — architecture, async behavior, performance, edge cases
---

# JavaScript (professional)

Use official [MDN JavaScript docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript), [ECMAScript specification](https://tc39.es/ecma262/), and [Node.js docs](https://nodejs.org/docs/latest/api/) for API truth; this skill encodes **high-value defaults**, **production tips and tricks**, and **failure-prone edge-case patterns**. Confirm **runtime targets** (browser versions, Node.js version) and **module mode** (ESM/CJS) from the project.

## Related skills (this repo)

| Skill | When to combine |
|-------|------------------|
| `testing-pro` | Turn edge cases into deterministic unit/integration coverage. |
| `security-pro` | Evaluate prototype pollution, unsafe eval/dynamic code, and input sanitization risks. |

## When to use

- Designing JavaScript logic at module/service level instead of only syntax fixes.
- Reviewing JS code for runtime correctness, readability, and production safety.
- Diagnosing hard bugs involving async ordering, object mutation, or scope capture.
- Hardening browser/Node code against non-obvious language and runtime traps.
- Trigger keywords: `javascript`, `js`, `event loop`, `promise`, `closure`, `this`, `prototype`, `hoisting`, `microtask`, `tip`, `trick`, `edge case`

## Workflow

1. **Confirm** versions / environment / stack (browser support matrix, Node.js version, bundler/transpiler settings, ESM vs CJS).
2. **Apply the principles and topic summaries below; open `references/` when you need depth.**
3. **Respond using Suggested response format;** note the main risks (runtime regressions, ordering bugs, silent coercion, compatibility gaps).

### Operating principles

1. **Reason about runtime behavior first** - treat execution order, mutability, and async scheduling as primary design constraints.
2. **Prefer explicitness over cleverness** - remove surprising coercion, hidden side effects, and ambiguous control flow.
3. **Constrain shared mutable state** - favor pure helpers, narrow mutation boundaries, and immutable update patterns when practical.
4. **Fail fast at boundaries** - validate inputs/output contracts early, especially around JSON, dates, numbers, and external I/O.
5. **Lock in behavior with tests** - every discovered edge case should become a regression test.

### High-level tips and tricks (summary)

- Normalize data at module boundaries (`string`/`number`/`Date`) to prevent coercion drift deeper in the call chain.
- Use `Object.hasOwn()` (or `Object.prototype.hasOwnProperty.call`) for own-key checks instead of relying on inherited properties.
- Keep async operations observable: return Promises consistently and avoid mixing callback style with `async/await` in the same flow.
- Prefer stable, named helpers over inline "smart" expressions to make error handling and profiling easier.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### JavaScript edge cases (summary)

- `Promise` microtasks run before timers; perceived ordering often differs from intuitive "top-to-bottom" expectations.
- `this` depends on call-site, not function declaration; arrow functions capture lexical `this` and cannot be rebound.
- Numeric pitfalls (`NaN`, floating precision, `-0`) can silently break equality and formatting logic.
- ESM/CJS interop and top-level await behavior can change import timing and initialization semantics.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - clarify the target behavior or defect.
2. **Recommendation** - propose the simplest robust approach and explain why.
3. **Code** - provide concrete JS/TS snippets, tests, or a review checklist.
4. **Residual risks** - list remaining trade-offs, compatibility caveats, and follow-up tests.

## Resources in this skill

Use these files for deeper detail when concise guidance in this file is not enough.

| Topic | File |
|-------|------|
| High-level JavaScript tips/tricks | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Runtime and language edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Review this JS service for hidden async bugs and edge cases before release."  
**Expected output:** A focused review using the four response labels, with concrete fixes for ordering/coercion issues plus test cases for discovered edge paths.

## Checklist before calling the skill done

- [ ] Runtime targets and module mode (ESM/CJS) were confirmed.
- [ ] Recommendations prioritize predictable runtime behavior over clever syntax.
- [ ] At least one relevant tip/trick and one edge case were checked.
- [ ] Proposed fix includes concrete code or test guidance.
- [ ] Residual compatibility and regression risks are explicitly stated.
