# Microservices edge cases

## Boundary mistakes

- Over-splitting early can create chatty services and fragile orchestration.
- Shared utility services can become hidden monolith bottlenecks.

## Cascading failures

- Slow downstream dependency can exhaust thread/connection pools upstream.
- Global retries during partial outage can trigger retry storms.

## Data and consistency pitfalls

- Shared database access bypasses service contracts and breaks autonomy.
- Eventual consistency windows can violate user expectations without explicit UX handling.
- Event duplication/reordering can corrupt state if handlers are not idempotent.

## Deployment and version skew

- Independent deployment can still break flows if contract compatibility is weak.
- Mixed-version rollouts may expose edge behavior in serialization/validation rules.

## Observability blind spots

- Missing trace propagation hides root cause across service chains.
- High-cardinality labels can make metrics expensive and less actionable.

## Organizational constraints

- Team boundaries that do not match service boundaries create ownership ambiguity.
- On-call maturity gaps can turn manageable incidents into prolonged outages.
