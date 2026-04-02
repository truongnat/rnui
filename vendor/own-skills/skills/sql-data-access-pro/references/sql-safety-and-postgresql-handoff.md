# SQL safety and PostgreSQL handoff

## Injection

- **Always** bind parameters — SQL injection is still the top risk in ad-hoc scripts.
- **Never** execute **raw** user strings as SQL in agent tools without explicit review.

## Dialect differences (SQLite vs PostgreSQL)

- **Types** — SQLite is flexible; PostgreSQL is strict — migrations must be explicit when moving.
- **UPSERT** — syntax differs (`ON CONFLICT` details); test on target.
- **JSON** — PostgreSQL **JSONB** is richer; SQLite JSON1 extension exists but not identical.

## When to switch skills

| Situation | Skill |
|-----------|--------|
| **File** `.db`, local scripts, quick queries | **`sql-data-access-pro`** |
| **Server** Postgres, migrations, RLS, `EXPLAIN`, vacuum | **`postgresql-pro`** |
| **Analytics** on exported CSV / Parquet | **`data-analysis-pro`** |

## Read-only analysis

- **Open** `.db` **read-only** URI: `sqlite3.connect("file:path?mode=ro", uri=True)` when you must not mutate.
