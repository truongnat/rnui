# CLI — tips and tricks

## Help and discoverability

- **`--help`** should print usage and exit `0` quickly (no network, no config file read that can fail).
- Put **examples** in help or a `EXAMPLES` section; copy-paste commands beat prose.
- **`--version`** should be cheap; include build/commit only if useful for support.

## Naming

- Prefer **`--long-option`** in scripts; **`-x`** for frequent interactive use.
- Use **consistent verbs** across subcommands (`list`, `get`, `delete` vs mixing `remove`/`rm` without reason).
- **Environment variables** mirror long flags: `MYTOOL_API_URL` ↔ `--api-url` when applicable.

## Precedence

Document order: **CLI flags** > **environment** > **config file** > **defaults**. Tests should cover overrides.

## Verbosity

- **Default**: human-readable, moderate noise.
- **`-q` / `--quiet`**: errors only.
- **`-v` / `--verbose` / `-vv`**: structured levels; avoid dumping secrets at any level.

## Machine-readable output

- **`--json`**: one JSON document per invocation for “data” commands; errors as JSON object on stderr or structured field — **pick one** and document.
- **Stable keys**; avoid renaming without a major version bump for published CLIs.

## Subcommands

- **`tool <noun> <verb>`** or **`tool <verb> <noun>`** — pick a scheme and keep it consistent (e.g. `git remote add` vs `docker image ls`).
- **`tool help <subcommand>`** optional mirror of `tool <subcommand> --help`.

## Deprecation

- Print **deprecation warning to stderr** once per run; remove in next major or after a stated timeline.
