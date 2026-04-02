---
name: testing-pro
description: |
  Professional software testing and test automation: test design, unit/integration/e2e layers, CI pipelines, flakiness, and quality signals.

  Use this skill when the user writes or reviews tests, sets up automation (CI/CD), uses Jest/Vitest/Mocha, React Testing Library, Playwright, Cypress, pytest, JUnit, TestNG, xUnit, Detox, XCTest, Espresso, k6/Gatling, Pact/contract tests, Testcontainers, or asks about coverage, mocks, stubs, TDD, BDD, test data, parallel runs, selectors, snapshots, visual regression, API testing, load/performance tests, or debugging flaky tests.

  Use **with** the relevant framework skill when tests are product-specific: **`react-pro`** / **`nextjs-pro`** (RTL, SSR/hydration test setup), **`nestjs-pro`** (TestingModule, e2e HTTP), **`flutter-pro`** (widget_test, integration_test), **`react-native-pro`** (Detox/Jest RN), **`postgresql-pro`** (DB fixtures, migration tests). This skill (`testing-pro`) owns **strategy, layers, CI, and flakiness**; framework skills own **APIs and project conventions** for that stack.

  Triggers: "test", "testing", "unit test", "integration test", "e2e", "end-to-end", "automation", "CI", "CD", "GitHub Actions", "Jest", "Vitest", "Playwright", "Cypress", "pytest", "RTL", "React Testing Library", "mock", "stub", "spy", "fixture", "coverage", "flaky", "assertion", "TDD", "BDD", "Gherkin", "snapshot", "visual regression", "contract test", "Pact", "Load test", "k6", "Testcontainers", "MSW", "test harness", "arrange act assert", "given when then".

metadata:
  short-description: Testing — strategy, automation, CI, unit/integration/e2e, flaky tests
---

# Testing (professional)

Use official docs for each runner (e.g. [Jest](https://jestjs.io/), [Vitest](https://vitest.dev/), [Playwright](https://playwright.dev/), [pytest](https://docs.pytest.org/)) for API truth; this skill encodes **professional test strategy**, **automation hygiene**, and **CI-friendly** patterns shared across stacks. Confirm **language/runner**, **CI environment**, and **which bundled framework skill** applies when the codebase uses this repo’s `*-pro` skills.

## Related skills (this repo)

| Skill | When to combine with `testing-pro` |
|-------|-------------------------------------|
| **`react-pro`** | RTL/Vitest/Jest setup, component tests, hooks |
| **`nextjs-pro`** | App Router, RSC/`"use client"` test boundaries, server vs client |
| **`nestjs-pro`** | `TestingModule`, Supertest e2e, provider mocks |
| **`flutter-pro`** | `widget_test`, `integration_test`, goldens |
| **`react-native-pro`** | Detox/Maestro, RN Jest config |
| **`postgresql-pro`** | Integration tests against real SQL, RLS, migrations |

Do **not** duplicate framework-specific testing advice that belongs in those skills; **link** them and add cross-cutting test design here.

## When to use

- Designing or refactoring a test suite (layers, naming, folder layout).
- **Automation**: CI workflows, parallel jobs, reports, artifacts, retries policy.
- Choosing tools (runner vs e2e vs browser vs API vs load).
- **Debugging** flaky tests, timeouts, async races, or environment drift.
- Reviewing **coverage** and what it does *not* prove.
- Trigger keywords: `test`, `e2e`, `Playwright`, `CI`, `pytest`, `flaky`, `coverage`, `mock`, …

## Workflow

1. Confirm stack and CI; identify the **framework skill** from the Related skills table if this repo’s skills apply.
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer framework API details to **`react-pro`** / **`nextjs-pro`** / **`nestjs-pro`** / … when applicable.
3. Respond using **Suggested response format**; note CI cost, maintenance, and which skill owns follow-up detail.

### Operating principles

1. **Test behavior, not implementation** — Prefer public API / user-visible outcomes; avoid brittle internals unless unit-testing pure logic.
2. **Right layer** — Fast unit tests for logic; integration for DB/API/contracts; e2e for critical journeys — see [references/test-pyramid-and-strategy.md](references/test-pyramid-and-strategy.md).
3. **Determinism** — Control time (`fake timers`), network (mocks/MSW), and data (fixtures); isolate side effects.
4. **CI is the source of truth** — If it only passes locally, fix env parity (timeouts, seeds, ports).
5. **Flakiness is debt** — Quarantine + fix root cause; avoid unlimited retries as policy.
6. **Automation scope** — Automate what runs repeatedly on every change; manual/exploratory for what is expensive to script.

### Test pyramid and strategy (summary)

- Prefer **many fast unit**, **fewer integration**, **minimal e2e** for critical paths.
- **Risk-based** coverage: critical paths and regressions first; not every line for vanity metrics.

Details: [references/test-pyramid-and-strategy.md](references/test-pyramid-and-strategy.md)

### Automation and CI (summary)

- **Pipeline stages**: lint/typecheck → unit → integration → e2e (nightly or main branch if slow).
- **Parallelism**: shard by file or project; balance workers vs DB contention.
- **Artifacts**: reports (JUnit, HTML), traces/screenshots on failure; retain logs.
- **Secrets**: never log tokens; use CI secret stores and ephemeral env.

Details: [references/automation-and-ci.md](references/automation-and-ci.md)

### Tips and tricks (summary)

- **Frontend JS/TS**: Vitest/Jest + RTL; e2e: Playwright/Cypress — align with app router and SSR (**`nextjs-pro`** for Next-specific setup).
- **Backend**: pytest/xUnit/JUnit; Testcontainers for real DB/queue when needed (**`nestjs-pro`** for Nest test module patterns).
- **Contracts**: Pact or OpenAPI-based tests between services.
- **Load**: k6/Gatling for SLAs; separate from functional e2e.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **Async**: await assertions; avoid `setTimeout` without synchronization.
- **Time**: freeze clocks; avoid real sleeps in CI.
- **Selectors**: prefer stable `data-testid` / roles over brittle CSS for e2e.
- **Parallel tests**: isolate data (unique IDs, transactions, containers).

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — What to verify (risk, regression, contract) and which **framework skill** applies if any.
2. **Recommendation** — Test layers, tools, CI stages; **explicit handoff** to `react-pro` / `nextjs-pro` / … when the answer is framework-specific.
3. **Code** — Minimal test sketch, CI YAML snippet, or checklist — not full framework tutorials duplicated from other skills.
4. **Residual risks** — Flakiness, env cost, coverage gaps, maintenance.

## Resources in this skill

- `references/` — strategy, automation, tips, edge cases.

| Topic | File |
|-------|------|
| Pyramid & strategy | [references/test-pyramid-and-strategy.md](references/test-pyramid-and-strategy.md) |
| Automation & CI | [references/automation-and-ci.md](references/automation-and-ci.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases & flakiness | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** E2E suite is slow and flaky; team runs everything on every PR.  
**Expected output:** Suggest split (smoke e2e on PR, full on main), parallel shards, stable selectors, deterministic data, and where to move checks to integration tests; point to **`nextjs-pro`** if failures involve RSC boundaries.

## Checklist before calling the skill done

- [ ] Test level matches risk (not all e2e).
- [ ] **Automation**: CI job order, caching, and failure artifacts defined.
- [ ] Deterministic data/time/network; no hidden sleeps as “fix”.
- [ ] Flaky tests tracked; root cause or quarantine with issue link.
- [ ] Selectors and API surfaces stable for maintenance.
- [ ] Coverage interpreted as signal, not a single number.
- [ ] **Framework-specific** guidance delegated to the right **`react-pro`** / **`nextjs-pro`** / **`nestjs-pro`** / **`flutter-pro`** / **`react-native-pro`** / **`postgresql-pro`** when applicable — no duplicate of those skills’ scope.
