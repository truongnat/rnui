# SQLite with Python (`sqlite3` stdlib)

## When to use SQLite

- **Local** / **embedded** DB: `.db`, `.sqlite` files, mobile/desktop apps, tests.
- **Not** a replacement for **PostgreSQL** at **multi-writer** server scale — use **`postgresql-pro`** for server tuning, RLS, replication.

## Basics

```python
import sqlite3
conn = sqlite3.connect("path/to/file.db")
conn.row_factory = sqlite3.Row
cur = conn.execute("SELECT name FROM sqlite_master WHERE type='table'")
```

- **Parameterized** queries: `conn.execute("SELECT * FROM t WHERE id = ?", (id,))` — **never** `f"… {id}"` for untrusted input.

## Schema discovery

- `sqlite_master` for tables/indexes; **`PRAGMA table_info(your_table)`** for columns.
- **Foreign keys** — `PRAGMA foreign_keys = ON` per connection if you rely on FK enforcement.

## Export

- **`sqlite3` CLI** `.dump` or pandas `read_sql` → CSV for handoff to **`data-analysis-pro`**.
