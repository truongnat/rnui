---
name: tauri-pro
description: |
  Professional Tauri desktop (and mobile) apps: Rust core, invoke/commands, capabilities/permissions, webview integration, bundling, and cross-platform edge cases.

  Use this skill when the user works on Tauri (`src-tauri`, `#[tauri::command]`, `invoke`, `tauri.conf`, plugins, updater, sidecars), Rust–frontend boundaries, or packaging Tauri for Windows/macOS/Linux.

  Use **with** **`react-pro`** (or Vue/Svelte) for SPA patterns in the webview, **`security-pro`** for capability/CSP/shell hardening, **`testing-pro`** for CI and E2E. This skill (`tauri-pro`) owns **Tauri + Rust integration**; front-end framework skills own **component UI** details.

  Triggers: "Tauri", "tauri", "src-tauri", "tauri.conf", "invoke", "tauri::command", "WebView", "WebView2", "Rust desktop", "Tauri plugin", "Tauri updater".

metadata:
  short-description: Tauri — Rust commands, capabilities, webview, bundle, updates
---

# Tauri (professional)

Use official [Tauri documentation](https://tauri.app/) for your major version (1 vs 2 — capabilities and config differ); this skill encodes **command boundaries**, **permission hygiene**, and **shipping** desktop bundles. Confirm **Tauri major**, **Rust toolchain**, and **front-end** stack (Vite + React/Vue/Svelte).

Webview UI component patterns: skill **`react-pro`** when using React.

## Related skills (this repo)

| Skill | When to combine with `tauri-pro` |
|-------|----------------------------------|
| **`react-pro`** | React (or solid) in webview — hooks, state, a11y |
| **`security-pro`** | Threat modeling, CSP, path/shell abuse cases |
| **`testing-pro`** | Rust tests, web E2E against built app, CI matrices |

**`electron-pro`** — Node/Chromium desktop stack; use when the project is Electron, not Tauri.

## When to use

- Designing **Rust commands** and **`invoke`** contracts; error handling to the UI.
- Configuring **capabilities** / permissions (Tauri 2) or legacy allowlists — least privilege.
- **Bundling**, **updater**, **sidecars**, and **cross-platform** webview quirks.
- **Performance**: async commands, large payloads, blocking work off the main path.
- Trigger keywords: `Tauri`, `invoke`, `src-tauri`, `tauri.conf`, `command`, `capability`, `plugin`, …

## Workflow

1. Confirm Tauri major, Rust edition/MSRV, and target platforms (desktop vs mobile if applicable).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer pure React questions to **`react-pro`**.
3. Respond using **Suggested response format**; note permission/CSP and platform webview risks.

### Operating principles

1. **Rust owns privilege** — Filesystem, shell, and native APIs only behind reviewed commands.
2. **Capabilities are contracts** — Enable minimum plugins/commands per window; avoid global “allow all”.
3. **Untrusted web content rules** — Treat front-end input as hostile when it reaches commands.
4. **Ship reproducibly** — Pin Rust and Tauri CLI in CI; document cross-compile setup.
5. **Align with platform stores** — Signing, notarization, and updater policies differ by OS.

### Rust core and commands (summary)

- **`#[tauri::command]`** handlers; **`invoke`** from JS/TS; **serialize** errors safely.
- **Tauri 2 capabilities** — map windows to allowed **APIs** explicitly.

Details: [references/rust-core-and-commands.md](references/rust-core-and-commands.md)

### Tips and tricks (summary)

- **Vite** (typical) integration; **CI** caching; **updater** and signing.
- **Shell plugin** — never pass raw user input to shells.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **WebView2 / WKWebView / WebKitGTK** behavioral differences.
- **Path traversal** and **URL** open policies; **async** vs blocking commands.

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Command design, config, bundle, or platform-specific bug.
2. **Recommendation** — Tauri/Rust pattern; reference capabilities or plugin boundaries.
3. **Code** — Rust command sketch, `tauri.conf` snippet, or front-end `invoke` — not generic SPA-only advice unless delegated.
4. **Residual risks** — Permission gaps, webview variance, mobile vs desktop if mixed.

## Resources in this skill

- `references/` — Rust/commands, tips, edge cases.

| Topic | File |
|-------|------|
| Rust core & commands | [references/rust-core-and-commands.md](references/rust-core-and-commands.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Front end calls `invoke('run_script', userPath)` and Rust uses `std::process::Command` with `shell true`.  
**Expected output:** Forbid shell interpolation on user paths; use fixed programs + args list; narrow **capability** to specific use case; cite **`security-pro`** for command injection pattern.

## Checklist before calling the skill done

- [ ] Commands validate inputs; no secret leakage in error strings to UI.
- [ ] Capabilities / plugins match least privilege for each window.
- [ ] Shell, fs, and open-URL flows reviewed for injection and traversal.
- [ ] Platform targets (WebView2, etc.) considered for release issues.
- [ ] Pure React/UI work delegated to **`react-pro`** when that is the whole question.
