# Microservices tips and tricks

## 1) Service boundary strategy

- Split by business capability and ownership, not by technical layer.
- Keep each service responsible for its own data and lifecycle.
- Use bounded context language consistently in APIs and events.

## 2) Communication patterns

- Reserve synchronous calls for low-latency, strongly-coupled interactions only.
- Prefer async events for decoupled workflows and cross-domain integration.
- Standardize retries, timeout budgets, and error contracts across services.

## 3) Data consistency patterns

- Use saga/process manager for multi-step business transactions.
- Implement outbox/inbox pattern to improve delivery reliability.
- Enforce idempotency keys or dedupe tokens for command/event handlers.

## 4) Resilience defaults

- Apply circuit breakers, bulkheads, and rate limits at service boundaries.
- Use exponential backoff + jitter for all retryable operations.
- Define fail-fast vs graceful-degradation behavior per critical path.

## 5) Observability and operations

- Propagate correlation/trace IDs through all service hops.
- Track SLO-aligned metrics: p95/p99 latency, saturation, error budget burn.
- Maintain clear runbooks for common incidents and dependency failures.

## 6) Evolution and governance

- Maintain API/event schema versioning and deprecation policy.
- Use consumer-driven contract tests for high-impact dependencies.
- Keep platform guardrails (auth, logging, telemetry, policy) centrally enforced.
