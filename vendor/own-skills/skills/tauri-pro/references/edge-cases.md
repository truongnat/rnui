# Tauri edge cases

## Security

- **Open external URLs** — validate schemes (`https` vs `javascript:`); use **allowlists** for `shell.open`.
- **Path APIs** — `fs` from commands: resolve paths inside **allowed roots**; block `..` traversal.
- **CSP** — tighten for `tauri:` and inline scripts; avoid `unsafe-inline` unless required and justified.

## Webview differences

- **Windows** — WebView2 runtime availability (Evergreen); corporate **offline** installs.
- **macOS** — WKWebKit behavior vs Chrome; **file** protocol and local asset quirks.
- **Linux** — WebKitGTK versions across distros; test **Wayland**.

## IPC and performance

- **Large payloads** over `invoke` — prefer streaming, chunking, or file handoff in Rust for big data.
- **Blocking** Rust commands — use `async` commands or offload to threads so the **webview** stays responsive.

## Mobile (Tauri 2 ecosystem)

- **iOS/Android** — separate mobile guides; permissions (camera, FS) are **OS dialogs** — align UX and capability JSON.

## Mixed stacks

- Teams mixing **Rust** skill levels — centralize **unsafe** and **FFI** behind small modules; document MSRV.
