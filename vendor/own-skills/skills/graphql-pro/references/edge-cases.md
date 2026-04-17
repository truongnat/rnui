# GraphQL edge cases

## Nullability and breaking changes

- Changing nullable to non-null can break existing clients unexpectedly.
- Returning `null` for non-null field causes parent/object null propagation behavior.

## N+1 and hidden cost growth

- Nested queries can trigger exponential backend calls without batching.
- One "small" field can become expensive if requested repeatedly across large lists.

## Authorization leaks

- Field-level auth gaps may expose sensitive attributes even when root query is protected.
- Fragment reuse across clients can accidentally request privileged fields.

## Query abuse and denial risks

- Deeply nested queries and alias abuse can exhaust resources.
- Introspection in production may reveal schema details useful for attackers if not controlled.

## Federation and ownership drift

- Multiple subgraphs claiming similar entities can create inconsistent resolution semantics.
- Version skew between gateway and subgraphs can break composed schema behavior.

## Subscriptions and realtime pressure

- High fan-out subscriptions can overload brokers/workers without filtering/backpressure.
- Unbounded subscription lifetimes can leak memory and connection resources.
