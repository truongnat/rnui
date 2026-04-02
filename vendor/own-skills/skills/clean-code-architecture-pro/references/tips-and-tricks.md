# Clean code and architecture tips and tricks

## 1) Keep business rules independent

- Put business logic in core modules that do not import transport/UI/database frameworks.
- Represent external systems via ports/interfaces; implement adapters at boundaries.

## 2) Prefer explicit module contracts

- Define clear input/output contracts for each module/service.
- Keep DTO mapping at boundaries to avoid leaking persistence or API shapes inward.

## 3) Reduce coupling with small seams

- Introduce seams before heavy refactors (interface extraction, wrapper modules).
- Replace direct cross-layer calls with application services/use-cases where needed.

## 4) Improve readability first

- Rename ambiguous symbols before structural refactors.
- Split large functions by intent (validation, orchestration, policy, I/O).
- Keep error messages and logs domain-oriented and actionable.

## 5) Refactor safely

- Use "characterization tests" for legacy behavior before changing internals.
- Change one axis at a time: naming, extraction, dependency direction, then organization.
- Keep PRs small and reversible; avoid mixing feature work with large architecture shifts.

## 6) Enforce boundaries continuously

- Add lint/import rules to prevent forbidden layer dependencies.
- Include architecture checks in review templates for ongoing consistency.
