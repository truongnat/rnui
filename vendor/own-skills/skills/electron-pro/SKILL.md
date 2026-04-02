---
name: electron-pro
description: |
  Professional Electron desktop apps: main vs renderer, preload and contextBridge, secure IPC, packaging, auto-update, and cross-platform edge cases.

  Use this skill when the user works on Electron (`BrowserWindow`, `ipcMain`/`ipcRenderer`, preload scripts, `contextIsolation`, `electron-builder`/`electron-forge`), desktop packaging, code signing, native Node addons in Electron, or asks about security boundaries between UI and Node.

  Use **with** **`react-pro`** (or Vue/Svelte docs) for renderer UI patterns, **`security-pro`** for threat modeling and desktop-specific abuse cases, **`testing-pro`** for E2E (Playwright Electron) and CI. This skill (`electron-pro`) owns **Electron process model and IPC**; web-framework skills own **component-level UI**.

  Triggers: "Electron", "electron", "BrowserWindow", "ipcMain", "ipcRenderer", "preload", "contextBridge", "contextIsolation", "electron-builder", "electron-forge", "electron-updater", "Chromium", "desktop app", "main process", "renderer".

metadata:
  short-description: Electron — main/preload/renderer, IPC, packaging, updates, security
---

# Electron (professional)

Use official [Electron documentation](https://www.electronjs.org/docs) for version-specific APIs; this skill encodes **process isolation**, **preload design**, and **production desktop** concerns. Confirm **Electron major**, **bundler** (Vite/Webpack), and **target OS** (macOS signing/notarization, Windows SmartScreen).

Renderer UI patterns (React hooks, a11y): skill **`react-pro`**.

## Related skills (this repo)

| Skill | When to combine with `electron-pro` |
|-------|-------------------------------------|
| **`react-pro`** | Renderer components, hooks, state — typical React + Electron stack |
| **`security-pro`** | Threat model, IPC as attack surface, secure defaults checklist |
| **`testing-pro`** | Playwright Electron, integration tests for main/preload |

**`tauri-pro`** — alternative desktop stack (Rust core + system webview); use that skill when the codebase is Tauri, not Electron.

## When to use

- Designing **main / preload / renderer** boundaries and **IPC** contracts.
- Hardening **security** defaults (`contextIsolation`, no `nodeIntegration` in renderer, narrow `contextBridge`).
- **Packaging**, **code signing**, and **auto-update** behavior.
- **Native modules** and Electron ABI rebuilds; **multi-window** and performance.
- Trigger keywords: `Electron`, `preload`, `ipcMain`, `contextBridge`, `electron-builder`, `auto-update`, …

## Workflow

1. Confirm Electron version, bundler, and OS targets; use official docs for deprecated APIs (e.g. remote module removal).
2. Apply the principles and topic summaries below; open `references/` when you need depth; defer React/Vue patterns to **`react-pro`** when the question is UI-only.
3. Respond using **Suggested response format**; note IPC/security and packaging/signing risks.

### Operating principles

1. **Least privilege in renderer** — No Node in web pages; expose minimal APIs through preload.
2. **IPC is a trust boundary** — Validate and authorize in main; never trust renderer for security decisions alone.
3. **Ship secure defaults** — `contextIsolation`, `nodeIntegration: false`, sensible `webPreferences`.
4. **Production differs from dev** — Disable unsafe shortcuts; control DevTools and remote debugging.
5. **Sign and update responsibly** — Updates are part of your supply chain; test failure modes.

### Main process, preload, and IPC (summary)

- **Three contexts**: main (Node), preload (bridge), renderer (Chromium).
- **`contextBridge`** exposes a **small** typed surface; **`ipcMain.handle`** for async RPC-style calls.

Details: [references/main-preload-and-ipc.md](references/main-preload-and-ipc.md)

### Tips and tricks (summary)

- **electron-builder** / Forge pipelines; **auto-update** and signing requirements per OS.
- **Native addons** — rebuild for Electron’s Node version; CI matrix.

Details: [references/tips-and-tricks.md](references/tips-and-tricks.md)

### Edge cases (summary)

- **Remote content** and `webSecurity: false` — high risk; navigation and protocol handlers need allowlists.
- **Path traversal** via IPC; **platform** differences (notarization, single-instance lock).

Details: [references/edge-cases.md](references/edge-cases.md)

### Suggested response format (implement / review)

1. **Issue or goal** — Window lifecycle, IPC design, packaging, or security concern.
2. **Recommendation** — Electron-specific pattern; cite main vs preload vs renderer.
3. **Code** — `main`/`preload` snippets, `webPreferences`, or IPC handler sketch — not generic React tutorials.
4. **Residual risks** — IPC abuse, update trust, OS-specific signing or sandbox limits.

## Resources in this skill

- `references/` — main/preload/IPC, tips, edge cases.

| Topic | File |
|-------|------|
| Main, preload, IPC | [references/main-preload-and-ipc.md](references/main-preload-and-ipc.md) |
| Tips and patterns | [references/tips-and-tricks.md](references/tips-and-tricks.md) |
| Edge cases | [references/edge-cases.md](references/edge-cases.md) |

## Quick example

**Input:** Renderer needs to read a project file — team used `nodeIntegration: true`.  
**Expected output:** Reject enabling Node in renderer; use preload + `ipcMain.handle` with path validation and jail to project root; list `webPreferences` checklist.

## Checklist before calling the skill done

- [ ] `contextIsolation` and `nodeIntegration: false` (renderer) unless exceptional and documented.
- [ ] IPC surface is minimal; main validates inputs; no arbitrary channel names from user input.
- [ ] Production build does not expose unnecessary DevTools or unsafe `webPreferences`.
- [ ] Packaging/signing/update story acknowledged for target OS.
- [ ] UI-only guidance deferred to **`react-pro`** when appropriate.
