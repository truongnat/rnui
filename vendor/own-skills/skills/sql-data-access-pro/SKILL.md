---
name: sql-data-access-pro
description: |
  Professional SQL data access for local and embedded workflows: SQLite (`sqlite3` stdlib), parameterized queries, schema discovery, safe read-only opens, export to CSV, and clear handoff to PostgreSQL for server-grade features.

  Use this skill when the user works with **`.db` / `.sqlite`** files, writes **ad-hoc SQL** in scripts, **explores** schemas, or **exports** query results — not when tuning **PostgreSQL** servers, **RLS**, replication, or **migrations** at scale (use **`postgresql-pro`**).

  Use **with** **`postgresql-pro`** when the task **outgrows** SQLite (multi-tenant server, RLS, `EXPLAIN`, ops); **`data-analysis-pro`** for **pandas**-heavy profiling on **exports**; **`content-analysis-pro`** only for **narrative** “what’s in this file” framing, not SQL tuning.

  Triggers: "SQLite", ".db", "sqlite3", "SQL injection", "parameterized query", "SELECT", "schema", "export CSV", "read-only database", "embedded database", "local SQL".

metadata:
  short-description: SQL data access — SQLite, safety, export, PG handoff
---

# SQL data access (professional)

Use [SQLite](https://www.sqlite.org/docs.html) and [Python sqlite3](https://docs.python.org/3/library/sqlite3.html) for **embedded** truth; this skill encodes **safe** access patterns and **clear boundaries** to **PostgreSQL**. Confirm **read-only** intent, **path** trust, and **no** production **secrets** in connection strings.

## Related skills (this repo)

| Skill | When to combine with `sql-data-access-pro` |
|-------|---------------------------------------------|
| **`postgresql-pro`** | **Server** Postgres, **migrations**, **RLS**, performance, **vacuum** |
| **`data-analysis-pro`** | **Pandas** / **Parquet** analytics after **SQL** export |
| **`security-pro`** | **SQL injection** in apps, **least privilege**, **credentials** |
| **`content-analysis-pro`** | User **attached** a `.db` **without** SQL context — clarify **goal** (schema vs narrative) |

**Boundary:** **`sql-data-access-pro`** = **SQLite** + **portable** SQL habits; **`postgresql-pro`** = **PostgreSQL** **production** concerns.

## When to use

- **Open** and **query** `.db` / `.sqlite` files (stdlib or CLI).
- **Discover** tables/columns; **sample** rows; **aggregate** safely.
- **Export** results for **CSV** / **analysis**.
- **Explain** **parameterized** queries vs string interpolation.
- Trigger keywords: `SQLite`, `sqlite3`, `.db`, `SQL`, `schema`, `export`, …

## Workflow

1. Confirm **path** (trusted?), **read-only** vs **write**, and whether **PostgreSQL** is the real **target** system.
2. Apply the principles and topic summaries below; open `references/` when you need depth; escalate **server** design to **`postgresql-pro`**.
3. Respond using **Suggested response format**; note **injection** and **filesystem** risks.

### Operating principles

1. **Parameterized queries** — Default for any user-influenced value.
2. **Least privilege** — `read-only` mode when analysis is **inspect-only**.
3. **Dialect awareness** — SQLite ≠ PostgreSQL; **hand off** before **RLS** / **JSONB** / **replication**.
4. **No secrets** in **URLs** or **shell history** — **`security-pro`**.
5. **Export** for **heavy** stats — **pandas** in **`data-analysis-pro`**.
6. **Integrity** — **Corrupt** file → **backup**, not silent repair.

### SQLite and stdlib (summary)

- **connect**, **row_factory**, **`sqlite_master`**, **PRAGMA**, **parameterized** SQL.

Details: [references/sqlite-and-stdlib.md](references/sqlite-and-stdlib.md)

### SQL safety and PostgreSQL handoff (summary)

- **Injection**, **dialect** notes, **when** to use **`postgresql-pro`**.

Details: [references/sql-safety-and-postgresql-handoff.md](references/sql-safety-and-postgresql-handoff.md)

### Tips and tricks (summary)

- **EXPLAIN QUERY PLAN**, **WAL**, **ATTACH**.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **Concurrency**, **network** FS, **corruption**, **timezones**.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Local **DB** path, **query** intent, or **export** need.
2. **Recommendation** — **Safe** SQL + **stdlib** usage; **handoff** if Postgres is required.
3. **Code** — **Python** `sqlite3` or **CLI** snippets — still labeled **Code**.
4. **Residual risks** — **Injection**, **locking**, **wrong** dialect assumptions.

## Resources in this skill

- `references/` — SQLite, safety, tips, edge cases.

| Topic | File |
|-------|------|
| SQLite & stdlib | [references/sqlite-and-stdlib.md](references/sqlite-and-stdlib.md) |
| Safety & PG handoff | [references/sql-safety-and-postgresql-handoff.md](references/sql-safety-and-postgresql-handoff.md) |
| Tips | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** “Read `app.db` and list tables with row counts.”  
**Expected output:** Query **`sqlite_master`**, **parameterized** `COUNT(*)` per table (or single query with **group by**); **read-only** URI if no writes; warn on **large** tables.

## Checklist before calling the skill done

- [ ] **Parameters** bound for **any** external input.
- [ ] **PostgreSQL** topics (**RLS**, **migration**, **EXPLAIN** server-side) **delegated** when applicable.
- [ ] **Export** path for **analytics** is **explicit** and **PII**-aware (**`security-pro`**).
