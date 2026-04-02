# Rust core, commands, and capabilities

Tauri uses a **Rust** binary (`src-tauri`) hosting a **webview** for your front end (often built with Vite). The boundary is **`invoke`** / **commands** plus the **capability** system (Tauri 2) or **allowlist** (older configs).

## Mental model

| Layer | Role |
|-------|------|
| **Front end** | Web tech in webview; **no** direct filesystem/ shell unless exposed via Rust command with explicit permission |
| **`src-tauri`** | Commands (`#[tauri::command]`), state, plugins, tray, menus, windows |
| **OS** | Webview (WebView2 / WKWebView / WebKitGTK) — platform-specific quirks |

## Commands

- **`invoke('command_name', payload)`** from front end → Rust handler.
- **Validate** arguments in Rust (types, bounds, paths); same discipline as Electron IPC — **untrusted input** from the webview.
- **Serialize** errors to safe messages for UI; avoid leaking stack traces to users in production.

## Permissions (Tauri 2+)

- **Capabilities** define which **windows**/**plugins**/**commands** are allowed — prefer **deny-by-default** and narrow scopes.
- Review **remote URLs** if any — custom protocols and **CSP** still matter.

## Plugins

- Official plugins (shell, dialog, fs, http) each have **permission** entries — enable only what you need.

## Official references

- [Tauri documentation](https://tauri.app/start/)
- [Calling Rust from the frontend](https://tauri.app/develop/calling-rust/)
- [Capabilities](https://tauri.app/reference/acl/capability/) (Tauri 2)
