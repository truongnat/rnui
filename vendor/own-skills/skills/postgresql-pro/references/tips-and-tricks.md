# Tips and tricks (PostgreSQL)

## Contents

1. [Indexes in production](#indexes-in-production)
2. [Statistics and planner](#statistics-and-planner)
3. [Common SQL patterns](#common-sql-patterns)
4. [Connection pooling](#connection-pooling)
5. [Extensions](#extensions)
6. [Migrations and DDL](#migrations-and-ddl)
7. [Row Level Security (pointer)](#row-level-security-pointer)

---

## Indexes in production

- **`CREATE INDEX CONCURRENTLY`** avoids long blocking writes on large tables — cannot run inside a transaction block in older versions; monitor failures (`INVALID` index) and retry `REINDEX` or drop/recreate.
- **`INCLUDE` columns** — build covering indexes for frequent `SELECT` lists without bloating the btree key.
- **Partial indexes** — `WHERE status = 'active'` reduces size and speeds targeted queries.

## Statistics and planner

- Run **`ANALYZE`** after large bulk loads; autovacuum may lag; consider manual `ANALYZE` on affected tables.
- **`pg_stat_statements`** — find top total time, mean time, and rows; correlate with application routes.
- **Bloat** — index-only scans help only when indexes stay healthy; monitor heap/index bloat under heavy updates.

## Common SQL patterns

- **`INSERT ... ON CONFLICT`** — upsert semantics; understand which unique index is targeted.
- **`FOR UPDATE SKIP LOCKED`** — job queues and fair work stealing.
- **Window functions** — avoid duplicate subqueries; prefer `ROW_NUMBER()` over correlated subqueries when appropriate.

## Connection pooling

- **PgBouncer** (transaction vs session pooling) — prepared statements and `SET` session state differ by mode; align ORM settings.
- **Pool size** — too many connections → context switching; size pools to CPU and `max_connections`.

## Extensions

- **`uuid-ossp` / `pgcrypto`** — UUID helpers; **citext** — case-insensitive text; enable only when needed and approved.

## Migrations and DDL

- Prefer **additive** migrations first (new column nullable → backfill → set NOT NULL with check).
- **Lock timeouts** — set `lock_timeout` for migrations to fail fast instead of blocking traffic indefinitely.

## Row Level Security (pointer)

- Policies, `USING` / `WITH CHECK`, bypass, pooling, and performance: see **[row-level-security.md](row-level-security.md)**.

---

*Verify behavior with your PostgreSQL major version — minor releases still fix planner bugs.*
