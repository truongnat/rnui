#!/usr/bin/env bash
# Prefer a real Node on PATH (Turbo/Bun may put a `node` shim first). Jest path comes from
# run-jest.cjs via require.resolve so Bun’s .bun store layout still works on CI.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HEADLESS_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:${PATH:-}"
exec node "$HEADLESS_DIR/scripts/run-jest.cjs" "$@"
