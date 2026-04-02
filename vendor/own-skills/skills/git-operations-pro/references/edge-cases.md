# Edge cases

- **Rewriting public history** — `force push` breaks collaborators; prefer **revert** commits on `main` unless policy allows.
- **Large files** — Git is not a CDN; use **Git LFS** or artifact storage for binaries.
- **Line endings** — `.gitattributes` for `eol=lf` on teams with Windows + Unix.
- **Case-only renames** on case-insensitive FS — extra care on macOS default disks.
