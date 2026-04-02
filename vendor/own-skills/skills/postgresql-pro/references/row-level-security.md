# Row Level Security (RLS) — PostgreSQL

Deep reference for **Row Level Security**: when to use it, how policies work, and how to avoid common failures in production.

## Contents

1. [Concepts](#concepts)
2. [Enabling RLS on a table](#enabling-rls-on-a-table)
3. [Policies](#policies)
4. [Roles and bypass](#roles-and-bypass)
5. [Patterns for multi-tenant apps](#patterns-for-multi-tenant-apps)
6. [Performance](#performance)
7. [Migrations and ownership](#migrations-and-ownership)
8. [Testing and debugging](#testing-and-debugging)
9. [Pitfalls checklist](#pitfalls-checklist)

---

## Concepts

- **RLS** filters **which rows** a role can see or change. It is **orthogonal** to `GRANT`: you must still grant `SELECT`/`INSERT`/… on the table; RLS then restricts rows.
- Policies are **per-command** (`ALL`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`) and can differ for each role (or `PUBLIC`).
- **`USING`** — expression evaluated against existing rows (read / update / delete).
- **`WITH CHECK`** — expression for **new** row content (insert / update) and must pass for the row to be stored.

If both apply and you omit `WITH CHECK` on `UPDATE`, PostgreSQL often uses the `USING` expression for `WITH CHECK` as well (see docs for your version — be explicit when in doubt).

---

## Enabling RLS on a table

```sql
ALTER TABLE app.orders ENABLE ROW LEVEL SECURITY;
```

- Until **at least one policy** is defined, behavior depends on command: **no policy for SELECT** typically means **no rows visible** for non-owner roles (when RLS is enabled and not bypassed). **Always** test with the application role, not `postgres`.
- **`FORCE ROW LEVEL SECURITY`** — also applies to **table owner** (superuser still bypasses unless `FORCE` is combined with non-superuser context). Use when you want owner to be subject to policies (rare in simple apps; common in strict multi-tenant setups).

---

## Policies

### Example: tenant isolation

```sql
CREATE POLICY tenant_isolation_select ON app.orders
  FOR SELECT
  TO app_user
  USING (tenant_id = current_setting('app.tenant_id')::uuid);
```

Set the session variable **after** connection (or per transaction):

```sql
SELECT set_config('app.tenant_id', '…', false);  -- false = transaction-local
```

Prefer **`set_config(..., true)`** for session-scoped only when you control pool semantics (PgBouncer transaction pooling may reset).

### INSERT / UPDATE

```sql
CREATE POLICY tenant_isolation_insert ON app.orders
  FOR INSERT
  TO app_user
  WITH CHECK (tenant_id = current_setting('app.tenant_id')::uuid);
```

- **`WITH CHECK`** must allow the inserted row; **cross-tenant insert** attempts fail.

### Multiple policies

- For a given command and role, **multiple policies** are OR-combined for permissive policies (default). Use **`RESTRICTIVE`** policies (PostgreSQL 15+) when you need AND semantics.

---

## Roles and bypass

- **Superuser** and roles with **`BYPASSRLS`** **bypass** RLS (unless `FORCE ROW LEVEL SECURITY` is used and the role is not superuser). **Never** use superuser in app connections.
- **Table owner** bypasses RLS by default unless **`FORCE ROW LEVEL SECURITY`** is set.
- **Migration role** often needs to **create data** without tenant context — use a dedicated role with `BYPASSRLS` only for migrations, or `SET ROLE` / `SECURITY DEFINER` functions **only** where reviewed.

---

## Patterns for multi-tenant apps

| Pattern | Idea | Watch out |
|--------|------|-----------|
| Session variable | `set_config('app.tenant_id', …)` | Pooling resets session; set every checkout |
| JWT claim | `current_setting('request.jwt.claims', true)::json` (Supabase-style) | Parse and validate in policy; keep policies fast |
| `tenant_id` column | Every row carries `tenant_id` | Index `(tenant_id, …)` for RLS predicates |
| **SECURITY DEFINER** functions | Centralize logic | Audit carefully; fixed `search_path` |

---

## Performance

- Every RLS policy adds **expression evaluation** per row (or per plan node depending on optimizer). **Index** columns referenced in `USING` / `WITH CHECK` when tables are large.
- **`EXPLAIN (ANALYZE, BUFFERS)`** with the **real application role** — plans differ from superuser.
- Complex policies (joins to other tables) can be expensive — consider **materialized** tenant flags or **denormalized** checks only when measured.
- **`SELECT` policies** on high-traffic tables: treat as hot path code.

---

## Migrations and ownership

- Applying DDL as **superuser** bypasses RLS — **do not** assume “migration succeeded” means app users see data.
- **Seed scripts** that run as owner: verify with `SET ROLE app_user` before go-live.
- **Partitioned tables**: enable RLS on **parent** and/or children per your PostgreSQL version and docs — test inheritance of policies.

---

## Testing and debugging

- As `app_user`: `SET ROLE app_user` then run queries; confirm **0 rows** vs **expected** when tenant unset.
- **`pg_policies`** / **`pg_policy`** — view defined policies.
- **`EXPLAIN`** shows policy filters in some plans; wrong policy often shows **Seq Scan** with **Filter** on RLS expression.

---

## Pitfalls checklist

- [ ] Tested with **application role**, not `postgres`.
- [ ] Pooling: tenant context set on **every** connection or transaction as required.
- [ ] `INSERT`/`UPDATE` have correct **`WITH CHECK`**; no accidental cross-tenant writes.
- [ ] Indexes support RLS predicates.
- [ ] Migration / admin path documented (bypass vs `SECURITY DEFINER`).
- [ ] Superuser and `BYPASSRLS` roles not used by app runtime.

---

## Application servers (NestJS)

To set `set_config` / `SET LOCAL` from HTTP requests, Prisma/TypeORM transactions, and PgBouncer: see **`nestjs-pro`** — [postgresql-rls-integration.md](../../nestjs-pro/references/postgresql-rls-integration.md).

---

*Official reference: [PostgreSQL RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html). Supabase users: align with [RLS docs](https://supabase.com/docs/guides/auth/row-level-security) for JWT helpers.*
