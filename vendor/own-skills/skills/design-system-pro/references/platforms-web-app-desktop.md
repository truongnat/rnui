# Platforms: web, app, and desktop

## Web (browser)

- **Responsive** — Breakpoints tied to **content**, not only device names; touch vs mouse (hover affordances).
- **URL + state** — Deep links, shareable filters; **back button** behavior for modals vs pages.
- **Performance** — Perceived speed (skeletons, optimistic UI); **Core Web Vitals** alignment with **`seo-pro`** / **`deployment-pro`**.
- **Keyboard** — Full path without mouse; skip links for main content.

## Mobile native (iOS / Android)

- **Platform patterns** — Tabs, sheets, **back** affordance; respect safe areas and **dynamic type** (where applicable).
- **Gestures** — Discoverability vs hidden gestures; undo for destructive actions.
- **Offline / sync** — States for stale data; conflict messaging.

**Mobile UX depth (touch, thumb zone, HIG vs Material):** skill **`mobile-design-pro`**. **Implementation:** **`react-native-pro`**, **`flutter-pro`**.

## Desktop (Electron, Tauri, native shells)

- **Window chrome** — Menu bar, **keyboard shortcuts** (accelerators), multi-window vs single-window.
- **Density** — Mouse precision allows **denser** layouts than touch-first mobile; still respect legibility.
- **System integration** — Tray, notifications, file drag-drop — platform HIG.

**Implementation:** **`electron-pro`**, **`tauri-pro`**.

## Cross-platform products

- **Shared logic, adapted UI** — Same brand/tokens; **platform-appropriate** navigation (tabs vs sidebar).
- **Web + desktop** — Often shared component library (React); test **both** input models.

## Web app hybrid

- **PWA** — Install prompt UX; offline shell; **not** identical to native — set expectations.
