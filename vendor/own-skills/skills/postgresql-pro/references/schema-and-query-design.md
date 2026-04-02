# Schema and query design (PostgreSQL)

## Contents

1. [Naming and conventions](#naming-and-conventions)
2. [Keys and identifiers](#keys-and-identifiers)
3. [Constraints](#constraints)
4. [Indexing strategy](#indexing-strategy)
5. [Query patterns](#query-patterns)
6. [JSONB](#jsonb)

---

## Naming and conventions

- Use **snake_case** for tables and columns unless the ecosystem (e.g. Prisma) generates otherwise — stay consistent project-wide.
- **Plural vs singular** table names — pick one convention; plural (`users`) is common in SQL-first teams.
- **Timestamps**: `timestamptz` for wall-clock events; store UTC; avoid `timestamp without time zone` for new work unless you truly mean local-only.

## Keys and identifiers

- **Surrogate keys** (`bigint`, `uuid`) for stable references; avoid natural keys as PK when they can change.
- `uuid` generation: prefer **uuidv7** (time-ordered) when supported for index locality; otherwise document `uuidv4` randomness tradeoffs.
- **Composite PKs** for pure join tables are fine; avoid wide composite FKs across many tables.

## Constraints

- **`NOT NULL`** where the domain requires it; nullable columns need explicit handling in queries and UI.
- **`CHECK`** constraints for invariants (ranges, enums) — fail fast at DB layer for critical rules.
- **Foreign keys** — choose `ON DELETE` / `ON UPDATE` explicitly (`RESTRICT`, `CASCADE`, `SET NULL`); no implicit defaults.

## Indexing strategy

- Index **equality and range** columns that appear in `WHERE` / `JOIN` on hot paths.
- **Multi-column indexes** — column order matches filter selectivity (leftmost prefix rule).
- **Unique indexes** enforce uniqueness and speed lookups; partial unique indexes for soft-delete patterns (`WHERE deleted_at IS NULL`).
- Revisit indexes after **data distribution** changes; stale stats → bad plans (`ANALYZE`).

## Query patterns

- Prefer **`EXPLAIN (ANALYZE, BUFFERS)`** on realistic data; avoid tuning on empty tables.
- Watch **nested loop** vs **hash** vs **merge** joins; row count estimates matter — fix `ANALYZE` / `stats` first.
- **Pagination**: `offset` pagination is fine for small offsets; **keyset** (`WHERE id > $1 ORDER BY id LIMIT`) scales for deep pages.

## JSONB

- Use **JSONB** (not `json`) for stored documents; index with **GIN** on full column or **expression** indexes for known keys.
- Avoid huge JSON blobs in hot rows; consider separate side tables or TOAST behavior awareness.

---

*Match index and constraint design to your workload — OLTP vs OLAP patterns differ.*
