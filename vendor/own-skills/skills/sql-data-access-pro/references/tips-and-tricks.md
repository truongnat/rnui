# Tips and tricks

- **`EXPLAIN QUERY PLAN`** in SQLite — cheap way to sanity-check indexes before porting.
- **WAL mode** — often better concurrency for read-heavy local apps; know **backup** implications.
- **Attach** — multiple DB files in one connection — powerful but easy to confuse; document **paths**.
