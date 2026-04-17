# Edge cases and flakiness

## Flaky tests

**Symptoms**: pass locally, fail in CI, or random order failures.

**Common causes**

- **Race conditions**: assertion before async completes.
- **Real time**: `setTimeout`, `Date.now()` without control.
- **Shared state**: global singletons, leaked mocks, DB not reset.
- **Network**: real HTTP without mock or without waiting for server.
- **Parallel collisions**: two tests using same user id / email.

**Mitigations**

- `await` / `waitFor` for UI; use framework’s async helpers.
- **Fake timers** (Jest/Vitest) or inject clock abstraction.
- **Per-test isolation**: rollback DB, unique IDs, fresh containers.
- **Quarantine** flaky tests with ticket; fix or delete; do not ignore.

## Async testing

- Assert on **final state**, not intermediate callbacks without synchronization.
- Use `expect` + `resolves` / `rejects` (Jest) or equivalent.

## E2E stability

- **Stable selectors**: roles, labels, `data-testid`; avoid CSS that changes with design.
- **No arbitrary sleeps** — use `expect` to wait for condition.
- **Test data**: seed via API or DB; avoid relying on UI to create long chains unless that is the scenario.

## CI-specific

- **Headless** browser differences; GPU/fonts; increase timeout slightly.
- **Resource limits**: OOM kills; reduce workers or split suite.

## Security in tests

- Do not use **production** credentials; use test accounts and secrets from CI vault.
