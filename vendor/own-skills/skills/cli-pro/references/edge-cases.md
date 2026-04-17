# CLI — edge cases

## Broken pipe (SIGPIPE / EPIPE)

- User runs `tool emit-lines | head -n 5`; writer may get **SIGPIPE** or **EPIPE** on stdout.
- **Do not** print a full stack trace for normal pipe closure; exit quietly or with a documented code.
- In Python, broken pipe can surface as **`BrokenPipeError`**; handle and exit without noisy stderr.

## Non-interactive stdin

- **`read -p`** or `input()` in scripts **fails** in CI or `curl | bash`; use **explicit flags** (`--yes`, `--force`) or **fail fast** with a clear message.
- **Password prompts**: never read from stdin without TTY check unless documented for piping secrets (discourage).

## Windows

- Paths, **`\\`**, **CRLF**, **console encoding** — prefer **`pathlib`** (Python) or **`path`** (Node) for joins.
- **ANSI colors**: may need Windows Terminal or explicit **no-color** fallback; support **`NO_COLOR`** / **`FORCE_COLOR`** convention when using color.

## Signals

- **SIGINT** (Ctrl+C): exit with non-zero; clean up temp files; avoid partial writes to stdout without coordination.
- **SIGTERM**: graceful shutdown for long-running CLIs (servers); document behavior.

## Locale and encoding

- Default **UTF-8** for config and stdout; on errors reading files, report **path** and **encoding** clearly.

## Security

- **Secrets**: never log argv containing tokens; prefer **env vars** or **files** with `0600` and `--password-file` patterns over raw `--password` (discourage in docs).
- **Path traversal**: reject `../` in user-supplied paths when mapping to filesystem operations.

## Exit code ambiguity

- Using **`1`** for all failures hurts automation; distinguish **usage** (e.g. `2`), **runtime error** (`1`), **external tool** failure (forward or map), if feasible — and document.
