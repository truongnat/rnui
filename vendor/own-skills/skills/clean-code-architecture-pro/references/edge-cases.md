# Clean code and architecture edge cases

## Premature abstraction

- Creating extra layers too early can increase cognitive load without reducing complexity.
- Generic "base" abstractions often force poor fit across domains and hide intent.

## Boundary erosion over time

- Quick fixes in deadlines can bypass use-cases and directly call infrastructure from domain paths.
- Shared helper modules can become implicit dependencies across unrelated contexts.

## Cyclic dependencies

- Feature modules that import each other usually signal missing orchestration layer or incorrect ownership.
- Breaking cycles may require extracting domain events or anti-corruption boundaries.

## Legacy migration traps

- Rewrites that skip parity checks can silently break edge-case behavior.
- Partial migrations can duplicate logic in old/new paths if ownership is unclear.

## Testing blind spots

- Integration tests alone may miss domain policy regressions.
- Unit tests with heavy mocks can pass while real wiring violates architecture boundaries.

## Organizational constraints

- Team topology can conflict with intended module ownership.
- Framework conventions may push code toward convenience over clean boundaries unless explicitly guarded.
