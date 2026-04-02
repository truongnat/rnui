# Electron tips and tricks

## Packaging and updates

- **`electron-builder`** / **Forge** — align targets (dmg, msi, AppImage) with signing/notarization needs (macOS, Windows).
- **Auto-update** — `electron-updater` or vendor flow; test **delta** vs full; **code signing** required for sensible UX on desktop OSes.

## Performance

- **Lazy** `BrowserWindow` creation; avoid huge synchronous work on startup in main.
- **Multiple windows** — share one app instance; watch **memory** and DevTools in production builds.

## Dev vs prod

- **DevTools** and **remote debugging** — disable or gate in production builds.
- **`ELECTRON_RUN_AS_NODE`** and env leaks — document what CI/scripts set.

## Frontend stack

- React/Vue in renderer follows normal web rules; combine with **`react-pro`** for component patterns.
- **SSR** is uncommon in classic Electron; if using Vite + Electron, clarify build targets (main vs preload vs renderer).

## Native modules

- **Rebuild** native addons for Electron’s Node ABI (`electron-rebuild`); pin Electron major in CI.

## Testing

- **E2E**: Playwright has Electron support; unit-test main logic with Node test runner where possible. See **`testing-pro`**.
