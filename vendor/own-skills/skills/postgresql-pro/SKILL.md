---
name: postgresql-pro
description: |
  Professional PostgreSQL: schema design, SQL performance, migrations, operational edge cases, and Row Level Security (RLS).

  Use this skill when the user works on PostgreSQL, SQL, migrations (Flyway, Prisma, TypeORM, knex, raw SQL), indexing, EXPLAIN ANALYZE, transactions, isolation levels, replication, vacuum, connection pooling, partitioning, full-text search, JSONB, LISTEN/NOTIFY, or asks for DB review, slow query tuning, or deadlock investigation.

  RLS-focused: row-level security, policies (USING / WITH CHECK), ENABLE ROW LEVEL SECURITY, FORCE ROW LEVEL SECURITY, BYPASSRLS, multi-tenant isolation, tenant_id policies, Supabase RLS, JWT claims in policies, session variables for tenant context, restrictive policies, or debugging "no rows" / wrong visibility after enabling RLS.

  Triggers: "PostgreSQL", "Postgres", "SQL", "migration", "EXPLAIN", "index", "VACUUM", "MVCC", "transaction", "isolation", "deadlock", "lock", "replication", "read replica", "JSONB", "CTE", "partition", "pg_stat", "autovacuum", "connection pool", "RLS", "row level security", "policy", "USING", "WITH CHECK", "BYPASSRLS", "tenant", "multi-tenant", "Supabase RLS", "listen notify".

metadata:
  short-description: PostgreSQL — schema, queries, RLS, ops, edge cases
---

# PostgreSQL (professional)

Use official [PostgreSQL documentation](https://www.postgresql.org/docs/) for version-specific behavior; this skill encodes **design discipline**, **query and index patterns**, and **operational awareness**. Confirm **server major version** (`SELECT version();`) when behavior differs across releases.

## Related skills (this repo)

| Skill | When to combine with `postgresql-pro` |
|-------|----------------------------------------|
| **`sql-data-access-pro`** | **SQLite** file scripts, **local** `.db` — **not** server Postgres |
| **`nestjs-pro`** / **`nextjs-pro`** | ORM and app-layer SQL **integration** |
| **`data-analysis-pro`** | **Export** → **pandas**; **not** DDL/RLS design |

**Boundary:** **`postgresql-pro`** = **PostgreSQL server** product; **`sql-data-access-pro`** = **embedded SQLite** and portable SQL habits.

## When to use

- Designing or evolving schemas, constraints, indexes, and migrations.
- Tuning queries, interpreting `EXPLAIN (ANALYZE, BUFFERS)`, or reducing lock contention.
- Planning zero-downtime or low-risk migrations (backfills, `CONCURRENTLY` indexes).
- Debugging vacuum bloat, replication lag, connection exhaustion, or deadlocks.
- **`ALTER TABLE … ENABLE ROW LEVEL SECURITY`**, writing or reviewing **policies**, tenant isolation, Supabase-style JWT policies, or **RLS performance** (indexes on policy predicates).
- Trigger keywords: `PostgreSQL`, `EXPLAIN`, `RLS`, `migration`, `index`, `VACUUM`, …

## Workflow

1. Confirm server version; check docs when behavior differs between releases.
2. Apply the principles and topic summaries below; open `references/` when you need depth; for RLS test with the real application role.
3. Respond using **Suggested response format**; note downtime and locking risks.

### Operating principles

1. **Explicit types and constraints** — Prefer `NOT NULL` + defaults where domain implies; document intentional nullable columns.
2. **Indexes with a reason** — Every index costs write amplification; match access patterns; verify with `EXPLAIN`.
3. **Migrations are contracts** — Reversible steps when possible; avoid long exclusive locks on hot tables; batch large backfills.
4. **Least privilege** — App roles: minimal `GRANT`; separate migration role from runtime role when feasible.
5. **RLS is not optional magic** — Test every policy as the **real app role**; superuser bypass hides bugs; index columns used in `USING` / `WITH CHECK`.
6. **Observability** — Correlate slow queries with `pg_stat_statements` (when enabled) and application logs.

### Schema and query design (summary)

- Normalize until it hurts for correctness; denormalize selectively for read paths with clear tradeoffs.
- **Primary keys**: prefer `bigint`/`uuid` strategies consistent across the system; document `uuid` generation (v4 vs v7).
- **Foreign keys** with appropriate `ON DELETE` semantics — avoid silent cascades that surprise operators.
- **JSONB**: use for flexible payloads; index with **GIN** expressions when query patterns are stable.

Details: [references/schema-and-query-design.md](references/schema-and-query-design.md)

### Tips and tricks (summary)

- **`CREATE INDEX CONCURRENTLY`** for large tables in production; handle failures (invalid index) and retry patterns.
- **Partial indexes** — smaller and faster when predicates match a hot subset.
- **Covering indexes** (`INCLUDE`) — reduce heap lookups when the pattern repeats.
- **CTEs**: readability and optimization boundaries vary by version — materialization hints differ; verify with `EXPLAIN`.
- **Connection pooling** — PgBouncer transaction vs session mode affects prepared statements and `SET` session state.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **MVCC** — long transactions block vacuum; table bloat; monitor `xmin` horizons.
- **Serialization / deadlocks** — retry idempotent transactions; consistent lock ordering across app layers.
- **Sequence gaps** — normal after rollback or crash; do not assume consecutive IDs for business logic.
- **Replication lag** — read-your-writes may fail on replicas; routing or session stickiness.
- **`SERIALIZABLE`** — phantom anomalies vs overhead; often `READ COMMITTED` + explicit constraints suffice.

Details: [references/edge-cases.md](references/edge-cases.md)

### Row Level Security (summary)

- Enable with **`ALTER TABLE … ENABLE ROW LEVEL SECURITY`**; define explicit **`CREATE POLICY`** for each command + role that needs access; without policies, non-owner roles often see **no rows** for `SELECT`.
- **`USING`** filters existing rows; **`WITH CHECK`** constrains inserts/updates — both must match your tenant model.
- **Superuser** and **`BYPASSRLS`** skip RLS; **table owner** skips unless **`FORCE ROW LEVEL SECURITY`** — design migration and app roles accordingly.
- **Connection pooling** (`PgBouncer`, serverless pools): session variables / JWT context must be set **per connection or transaction** as required.
- Prefer **restrictive** policies (PostgreSQL 15+) when you need AND semantics across multiple policies.

Details: [references/row-level-security.md](references/row-level-security.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Schema change, slow query, or incident context.
2. **Recommendation** — SQL or migration steps; locking and rollback notes.
3. **Code** — SQL snippets, `EXPLAIN` interpretation, or migration ordering.
4. **Residual risks** — Downtime window, data backfill duration, or monitoring to add.

## Resources in this skill

- `references/` — schema, tips, ops, detailed RLS.

| Topic | File |
|-------|------|
| Schema and query design | [references/schema-and-query-design.md](references/schema-and-query-design.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases and ops | [references/edge-cases.md](references/edge-cases.md) |
| **Row Level Security (RLS)** | [references/row-level-security.md](references/row-level-security.md) |

## Quick example

**Input:** After enabling RLS, the app role cannot `SELECT` any rows — missing policy or `FORCE` issue?  
**Expected output:** Check `CREATE POLICY` per command/role, owner vs BYPASSRLS, and a minimal `USING`/`WITH CHECK` example.

## Checklist before calling the skill done

- [ ] Migration tested on a copy of production-like volume; rollback or feature flag documented.
- [ ] Indexes justified; `EXPLAIN` for critical paths; no accidental sequential scans at scale.
- [ ] Constraints and FKs match application expectations; no silent data loss on delete.
- [ ] Privileges for app role reviewed; no superuser in app code.
- [ ] **RLS**: policies tested as app role; `WITH CHECK` on writes; tenant context documented for poolers; indexes on policy predicates where needed.
- [ ] Long-running DDL or DML batched; lock timeouts or `lock_timeout` considered where appropriate.
