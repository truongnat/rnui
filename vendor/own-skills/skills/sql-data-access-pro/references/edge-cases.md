# Edge cases

- **Concurrent writes** — SQLite serializes writes; **high** write concurrency → PostgreSQL or other server DB.
- **Network filesystems** — SQLite on **NFS** / some cloud mounts can corrupt; check docs.
- **Corrupt** DB — `PRAGMA integrity_check`; restore from backup if failed.
- **Time** in SQL — store **UTC**; document **timezone** in app layer.
