# Test pyramid and strategy

## Pyramid (typical)

1. **Unit** — Fast, isolated; pure functions, small modules, deterministic mocks.
2. **Integration** — Real DB/API/queue in container or test instance; fewer tests, slower.
3. **E2E / UI** — Full stack, critical user journeys; slowest; most brittle if overused.

## When to use which

| Concern | Prefer |
|-----------|--------|
| Business rules | Unit tests close to the code |
| SQL/ORM correctness | Integration with real DB or Testcontainers |
| HTTP contract between services | Contract tests or integration tests |
| User flows, checkout, auth | Targeted e2e; not every variation |

## Risk-based testing

- Prioritize **failure impact** and **change frequency**.
- Regression bugs: add a test at the **lowest** layer that would have caught it.

## Anti-patterns

- **Ice cream cone** — Mostly e2e, few unit tests: slow feedback, high maintenance.
- **100% line coverage** as a goal without asserting behavior.
- **Testing private methods** directly — couples tests to implementation.

## Test data

- Prefer **factories/builders** over huge fixtures; minimal data per test.
- **Isolation**: each test should not depend on order; use transactions or clean DB per test.
