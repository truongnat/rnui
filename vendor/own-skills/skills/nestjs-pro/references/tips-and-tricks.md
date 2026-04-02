# Tips and tricks (NestJS)

## Contents

1. [Modules and DI](#modules-and-di)
2. [Guards, pipes, interceptors](#guards-pipes-interceptors)
3. [Configuration](#configuration)
4. [Persistence patterns](#persistence-patterns)
5. [Testing](#testing)
6. [Performance notes](#performance-notes)

---

## Modules and DI

- **Feature modules** should export only what other modules need; hide internal providers when possible.
- Use **`forRoot` / `forRootAsync` / `register`** patterns for configurable dynamic modules (config, queues, DB).
- **`@Global()`** sparingly — only for true infrastructure (logger, config) to avoid hidden dependencies.
- Prefer **interfaces + token** (`'UserRepository'`) for swapping implementations in tests.

## Guards, pipes, interceptors

- **Guards** run after middleware, before route handler — use for **authorization** (roles, permissions), not authentication parsing alone if middleware already attaches user.
- **Pipes** for transformation and validation — keep business rules in services when they need DB context.
- **Interceptors** for cross-cutting: timing, logging correlation IDs, mapping `BigInt` serialization, response envelope (if required by API standard).

## Configuration

- **`@nestjs/config`** with validated schema (e.g. **Joi** or **zod** at bootstrap) — fail fast on bad env in production.
- Never commit **`.env`**; document required variables in README.

## Persistence patterns

- **Repository pattern** — thin repositories; transactions at use-case/service level.
- **N+1 queries** — use ORM eager loading / DataLoader pattern for GraphQL when applicable.
- **Migrations** — always reviewed in PR; never `synchronize: true` in production for TypeORM.

## Testing

- **Unit tests**: mock providers with `useValue` / `useFactory`; test services in isolation.
- **E2E**: `TestingModule` + `INestApplication` + `supertest` — test real pipe/guard stack for critical routes.
- **Snapshot tests** sparingly for DTO serialization — prefer explicit assertions.

## Performance notes

- **Async providers** only when necessary; understand cold start vs lazy init.
- **Caching** (`@nestjs/cache-manager` or custom) — define TTL and key naming convention; invalidate on writes.

---

*Check Nest release notes when upgrading — decorators and lifecycle hooks occasionally evolve.*
