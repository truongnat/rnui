---
name: microservices-pro
description: |
  Professional microservices guidance for designing service boundaries, inter-service communication, resilience, and operational reliability at scale.

  Use this skill when designing or reviewing microservices architecture, service decomposition, data ownership, integration patterns, and production operations.

  Triggers: "microservices", "service boundary", "distributed system", "saga", "event-driven", "service mesh", "api gateway", "resilience", "observability", "edge case".

  Combine with `api-design-pro` for service contracts and `performance-tuning-pro` for distributed latency/throughput optimization.
metadata:
  short-description: Microservices — boundaries, communication, resilience, operations, edge cases
---

# Microservices (professional)

Use official [Martin Fowler microservices articles](https://martinfowler.com/microservices/), [Domain-Driven Design references](https://domainlanguage.com/ddd/), and [CNCF cloud native guidance](https://www.cncf.io/) for conceptual truth; this skill encodes **boundary-first decomposition**, **resilient service interaction patterns**, and **operationally safe distributed architecture defaults**. Confirm **system scale**, **team topology**, and **operational maturity** from the project.

## Related skills (this repo)

| Skill | When to combine |
|-------|------------------|
| `api-design-pro` | Define stable service contracts and backward-compatible evolution. |
| `performance-tuning-pro` | Diagnose cross-service latency chains and optimize bottlenecks. |

## When to use

- Splitting monolith domains into services with clear ownership boundaries.
- Designing synchronous/asynchronous communication among services.
- Handling distributed consistency, retries, partial failures, and resilience patterns.
- Improving observability, incident isolation, and operational readiness in production.
- Trigger keywords: `microservices`, `service boundary`, `distributed system`, `saga`, `event-driven`, `service mesh`, `api gateway`, `resilience`, `observability`, `edge case`

## Workflow

1. **Confirm** versions / environment / stack (deployment platform, messaging stack, data stores, traffic profile, reliability target/SLO).
2. **Apply the principles and topic summaries below; open `references/` when you need depth.**
3. **Respond using **Suggested response format**;** note the main risks (chatty calls, cascading failure, data inconsistency, operational complexity).

### Operating principles

1. **Boundaries follow domain ownership** - each service owns data and behavior for a cohesive capability.
2. **Minimize synchronous dependency chains** - reduce tail-latency amplification and cascading failure risk.
3. **Design for partial failure** - retries, timeouts, circuit breakers, and fallback behavior are explicit.
4. **Prefer eventual consistency with clear business semantics** - avoid distributed transactions by default.
5. **Observability is mandatory** - traceability, metrics, and logs must support cross-service debugging.

### Microservices tips and tricks (summary)

- Start with clear bounded contexts before creating many services; split by business volatility and ownership.
- Use contract tests and schema governance to prevent accidental consumer breakage.
- Adopt outbox/inbox or idempotency patterns for reliable event-driven integration.
- Keep platform standards (auth, telemetry, retries, error format) consistent across services.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Microservices edge cases (summary)

- Service decomposition done too early can increase coupling through network calls.
- Retry storms during incidents can worsen outages without coordinated backoff/circuit controls.
- Shared database shortcuts create hidden coupling and block independent evolution.
- Event reordering/duplication can break business invariants without idempotent handlers.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** - define architecture/problem scope and success criteria.
2. **Recommendation** - prioritize boundary, interaction, and reliability decisions with rationale.
3. **Code** - provide API/event contract, topology, resilience checklist, or migration steps.
4. **Residual risks** - list operational, consistency, and rollout trade-offs.

## Resources in this skill

Use these files for deeper detail when concise guidance in this file is not enough.

| Topic | File |
|-------|------|
| Practical microservices patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Distributed-system failure modes and edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** "Refactor core platform into microservices with safe migration from monolith."  
**Expected output:** Boundary and migration strategy with contracts, resilience controls, and operational risk handling.

## Checklist before calling the skill done

- [ ] Service boundaries and ownership are explicit and domain-driven.
- [ ] Sync/async interaction model and failure handling are clearly defined.
- [ ] At least one consistency edge case and one resilience edge case are addressed.
- [ ] Code section includes concrete contract/topology/checklist guidance.
- [ ] Residual risks include migration and operational readiness concerns.
