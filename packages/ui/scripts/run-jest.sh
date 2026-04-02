#!/usr/bin/env bash
# Run Jest under real Node (Bun breaks Jest + react-native parsing). Jest path via require.resolve in run-jest.cjs.
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
UI_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:${PATH:-}"
exec node "$UI_DIR/scripts/run-jest.cjs" "$@"
