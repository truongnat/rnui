# Tauri tips and tricks

## Builds and CI

- **Cross-compile** from CI — use established images; Rust target triples per OS (e.g. `x86_64-pc-windows-msvc`, `aarch64-apple-darwin`).
- **Cache** `~/.cargo` and `target/` in CI with care — balance speed vs disk.

## Front end

- Common stacks: **Vite + React/Vue/Svelte** — front end is “just” a SPA; combine with **`react-pro`** for React-specific advice.
- **Asset handling** — `tauri.conf` / `tauri.conf.json` public paths and **base** path for production builds.

## Bundle size and startup

- Tauri aims for **smaller** binaries than full Chromium embedding; still profile **cold start** and **webview** creation.

## Updates

- **Tauri updater** plugin — code signing requirements per platform; test **downgrade** and failure paths.

## Sidecars and shell

- **Sidecar** binaries — ship helpers; verify integrity and **path** controls.
- **`shell` plugin** — never pass **unsanitized** user strings to shell commands; prefer APIs without shell interpretation.

## Debugging

- **Rust** — `tracing` / `log` in commands; structured logs in main, not secrets.
- **Webview** — platform devtools availability differs; gate in release builds.
