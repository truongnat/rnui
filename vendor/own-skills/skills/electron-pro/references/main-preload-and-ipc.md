# Main process, preload, and IPC

Electron splits **Node** (main) from **Chromium** (renderer). Security and correctness depend on **strict boundaries** and a **thin preload** bridge.

## Processes

| Process | Runs | Typical duties |
|---------|------|----------------|
| **Main** | Node | `BrowserWindow`, app lifecycle, menus, tray, native dialogs, `ipcMain`, auto-update orchestration |
| **Preload** | Isolated world before renderer | Expose **only** whitelisted APIs via `contextBridge` |
| **Renderer** | Chromium | UI (React/Vue/etc.); **no** raw `fs`/`child_process` unless you explicitly broke isolation (avoid) |

## Non-negotiable defaults (modern Electron)

- **`contextIsolation: true`** — preload and page contexts separated.
- **`nodeIntegration: false`** in renderer — use preload + IPC instead.
- **`sandbox: true`** for renderer where compatible with your stack.
- **`contextBridge.exposeInMainWorld`** — narrow surface; no `ipcRenderer.invoke` wildcards for arbitrary channels.

## IPC patterns

- Prefer **`invoke` / `handle`** (promise-based) over fire-and-forget `send` for request/response flows.
- **Validate** every payload in **main** (type, size, auth) — treat IPC as a **public API** to privileged code.
- **Channel names** — allowlist; never concatenate user input into channel names.

## Preload design

- Export **typed** small facades (`window.api.readFile(path)`) that map to one `ipcMain.handle`.
- Avoid exposing raw `ipcRenderer` or huge Node surfaces to the web context.

## Official references

- [Electron security tutorial](https://www.electronjs.org/docs/latest/tutorial/security)
- [Context isolation](https://www.electronjs.org/docs/latest/tutorial/context-isolation)
- [IPC tutorial](https://www.electronjs.org/docs/latest/tutorial/ipc)
