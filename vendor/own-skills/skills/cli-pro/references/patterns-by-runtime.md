# CLI — patterns by runtime

Short patterns only; follow each ecosystem’s current docs for APIs.

## Python

- **`argparse`**: stdlib; subparsers; `add_argument` with `metavar` for help clarity.
- **Click**: composable commands; **`context_settings`**, **`help_option_names`**; good for **completion** generation.
- **Typer**: type hints → CLI; pairs well with **FastAPI**-style thinking.

**Testing:** `CliRunner` (Click/Typer) or subprocess with **`PYTHONUTF8=1`** on Windows when testing Unicode.

## Node.js

- **Commander.js**, **yargs**, **minimist** (lower-level): define **strict** options where possible to catch typos.
- **`package.json` `bin`**: shebang `#!/usr/bin/env node`; **Windows** shim via npm when installed globally.

**Testing:** Run `node cli.mjs` via subprocess; assert exit code and stderr.

## Go

- **`flag`** stdlib for simple tools; **Cobra** / **urfave/cli** for subcommands and completions.
- Single static binary — great for **zero-dep** install; still handle **signals** explicitly for graceful shutdown.

## Rust

- **Clap** (derive or builder): **shell completions** via `clap_complete`; **color** via `clap` features.

## Shell (bash / sh)

- **`getopt` / `getopts`** for portable short flags; document **POSIX** vs **GNU** extensions.
- **`set -euo pipefail`** in bash scripts; explicit **exit** codes after checks.

## Completion generation

Prefer **framework-native** generators (Cobra, Clap, Click) over hand-written compdefs unless you need custom behavior.
