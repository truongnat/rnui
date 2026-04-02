# Edge cases (NestJS)

## Contents

1. [Circular dependencies](#circular-dependencies)
2. [Lifecycle and shutdown](#lifecycle-and-shutdown)
3. [Request scope and memory](#request-scope-and-memory)
4. [Transactions and concurrency](#transactions-and-concurrency)
5. [Microservices and messaging](#microservices-and-messaging)
6. [WebSockets and scale-out](#websockets-and-scale-out)
7. [Raw body and webhooks](#raw-body-and-webhooks)
8. [Multi-tenant and CLS](#multi-tenant-and-cls)

---

## Circular dependencies

- Nest resolves modules as a graph — **mutual imports** need **`forwardRef(() => OtherModule)`** on both sides when unavoidable.
- Prefer **extracting shared interfaces or a third module** to break cycles; `forwardRef` is a last resort.
- **Provider-level** circularity also uses `forwardRef` in `@Inject` / `@Inject(forwardRef(() => Service))`.

## Lifecycle and shutdown

- Implement **`OnModuleInit` / `OnApplicationBootstrap`** for startup ordering; **`onModuleDestroy`** for cleanup.
- Call **`app.enableShutdownHooks()`** and listen to signals so `beforeApplicationShutdown` runs — important for **draining queues** and closing DB pools.
- **Kubernetes** — respect `SIGTERM`; finish in-flight requests within grace period.

## Request scope and memory

- **`Scope.REQUEST`** providers are instantiated **per request** — expensive for heavy objects; prefer passing context explicitly or **AsyncLocalStorage** patterns.
- Avoid storing large objects on `req` without need; watch **memory leaks** in long-lived subscriptions attached to wrong scope.

## Transactions and concurrency

- Keep transactions **short**; do not hold DB transactions across HTTP calls to external APIs.
- Use **optimistic locking** (`version` column) or DB constraints for concurrent updates when needed.
- **Isolation levels** — understand defaults for your DB; explicit for financial operations.

## Microservices and messaging

- **At-least-once delivery** — handlers must be **idempotent** or dedupe with message IDs.
- **Timeouts and retries** — configure on client; avoid infinite retry loops on poison messages.
- **Hybrid apps** — HTTP + microservice in same process: clear separation of entrypoints and shared code.

## WebSockets and scale-out

- Default adapter is **single-node** — for multiple instances use **Redis adapter** or sticky sessions.
- Authenticate socket connections **once** at handshake; re-verify subscription topics if sensitive.

## Raw body and webhooks

- Stripe/Svix and similar need **raw body** for signature verification — configure body parser **before** global JSON parser for that route, or use Nest route-specific middleware.
- **Content-Type** edge cases — reject unexpected types early.

## Multi-tenant and CLS

- **Tenant id** from subdomain, JWT, or header — validate early in guard/middleware and scope DB queries.
- **AsyncLocalStorage** (`nestjs-cls` or custom) helps pass tenant context without prop-drilling — ensure cleanup on request end.

---

*Production behavior differs from `nest start --watch` — always validate under load and with real infra.*
