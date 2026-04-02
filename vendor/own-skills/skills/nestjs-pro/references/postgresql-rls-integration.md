# PostgreSQL Row Level Security (RLS) with NestJS

NestJS sits **above** the database: RLS policies still live in PostgreSQL. This file covers **how to set tenant / session context** from Nest so `USING` / `WITH CHECK` policies work, and how to avoid pooling bugs.

**SQL policy design** (policies, `BYPASSRLS`, performance): use skill **`postgresql-pro`** — [row-level-security.md](../../postgresql-pro/references/row-level-security.md).

---

## Contents

1. [Why combine Nest + RLS](#why-combine-nest--rls)
2. [Set session variables per request](#set-session-variables-per-request)
3. [Prisma](#prisma)
4. [TypeORM](#typeorm)
5. [Raw `pg` / Slonik](#raw-pg--slonik)
6. [Connection pooling (PgBouncer)](#connection-pooling-pgbouncer)
7. [Testing](#testing)
8. [Checklist](#checklist)

---

## Why combine Nest + RLS

- **Defense in depth**: guards validate JWT / roles; **RLS** enforces tenant isolation even if a query is wrong or a service bypasses a check.
- **Cost**: every query pays policy evaluation; you must **set context reliably** and **index** policy columns.

---

## Set session variables per request

Typical pattern: after auth, set `app.tenant_id` (or your naming) to match `current_setting` in policies.

**Option A — Middleware / interceptor + transaction-scoped `SET LOCAL`**

- `SET LOCAL` lasts for the **current transaction** — ideal when one request = one transaction.
- Run early in the pipeline **after** user identity is known (guard), **before** DB access.

**Option B — `ClsService` (nestjs-cls)**

- Store `tenantId` in AsyncLocalStorage; a custom DB wrapper or middleware runs `SET LOCAL` or `select set_config(...)` at the start of each DB work unit.

**Never** trust client-sent `tenant_id` without verifying it against the authenticated user’s allowed tenants.

---

## Prisma

- Prisma does not expose `SET LOCAL` in every API; common approaches:
  - **`$executeRaw`** / **`$executeRawUnsafe`** at the **start of** `.$transaction(async (tx) => { ... })` to run `SELECT set_config('app.tenant_id', $1, true)` (session) or use raw SQL that sets `LOCAL` for the transaction.
  - Use **`$transaction`** so `SET` and business queries share one connection and transaction.
- **Prisma + PgBouncer** (transaction mode): session-scoped `set_config` may not survive — prefer **transaction-local** `SET LOCAL` inside the same transaction block as queries.

Verify with your Prisma version docs for **interactive transactions** and connection pooling.

---

## TypeORM

- Use **`QueryRunner`**: `startTransaction()` → `query('SELECT set_config(...)')` or `SET LOCAL` → queries → `commitTransaction()`.
- **Global DataSource** queries without a transaction: setting session variables can **leak** unless you reset or use isolated runners per request.

---

## Raw `pg` / Slonik

- **`pool.connect()`** per request or per transaction: after `BEGIN`, run `SET LOCAL app.tenant_id = '...'` then statements; `COMMIT` clears `SET LOCAL`.

---

## Connection pooling (PgBouncer)

- **Transaction pooling**: session variables are **not** reliable across transactions — set tenant context **inside each transaction** (`SET LOCAL` or `set_config(..., true)` in transaction).
- **Session pooling**: more like a dedicated connection per client — still reset tenant on reuse if the pool reassigns connections.

---

## Testing

- E2E tests should use a role **subject to RLS** (not superuser), or `SET ROLE` in test setup, to catch “works only as postgres” bugs.
- Align with [postgresql-pro RLS testing](../../postgresql-pro/references/row-level-security.md#testing-and-debugging).

---

## Checklist

- [ ] Tenant context set **after** authentication and **before** tenant-scoped queries.
- [ ] Policy predicates documented; indexes exist in PostgreSQL (see `postgresql-pro`).
- [ ] Pooling mode understood; `SET LOCAL` / transaction boundaries correct for Prisma/TypeORM.
- [ ] No superuser / `BYPASSRLS` in app runtime.

---

*For policy SQL and PostgreSQL semantics, always prefer **`postgresql-pro`**; this file is NestJS integration only.*
