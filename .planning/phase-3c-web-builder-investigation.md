# Phase 3C — Web Builder Investigation

Date: 2026-05-24  
Branch: `develop`

## Current state before this phase

| Item | Status |
| ---- | ------ |
| `@truongdq01/component-schema` | ✅ validation, lazy plan, examples |
| `@truongdq01/renderer` | ✅ RNUISchemaRenderer, WebPreviewHost, exportSchemaToTsx |
| `apps/web/builder` (Vite) | ✅ Phase 3C prototype — chat, preview, schema tabs |
| `apps/web` Next.js app | ❌ not present |

## Decision

**Migrate to `apps/web` Next.js app** (`@truongdq01/web`) per product direction (future SEO + builder at `/` and `/builder`).

Legacy Vite app at `apps/web/builder` removed after porting mocks, state, and panels.

## Renderer APIs used

- `WebPreviewHost` — ThemeProvider + RNUISchemaRenderer
- `exportSchemaToTsx` — TSX panel
- `getLazyLoadPlan` (via builder-state) — lazy-load tab
- `validateScreenSchema` — validation tab

## React Native Web config

Next.js `webpack` config ( `--webpack` flag in dev/build):

- Alias `react-native` → `react-native-web`
- Native module mocks (reanimated, gesture-handler, worklets, safe-area, svg, flash-list, expo-blur)
- `lucide-react-native` → `lucide-react`
- `transpilePackages` for workspace RNUI packages
- `__DEV__` DefinePlugin for RNUI dev branches

## Files added/changed

**Added**

- `apps/web/package.json`, `next.config.ts`, `tsconfig.json`
- `apps/web/src/app/` — `/`, `/builder`
- `apps/web/src/components/builder/*`
- `apps/web/src/lib/ai/*` — AIProvider interface + mock
- `apps/web/src/lib/builder-state.ts`, `clipboard.ts`, etc.
- `apps/web/src/mocks/*` (ported from Vite builder)
- `apps/web/src/__tests__/builder.test.ts`

**Removed**

- `apps/web/builder/` (Vite prototype)

**Updated**

- Root `package.json` — `web:dev`, `web:build`; workspace `apps/web`
- `turbo.json` — `.next/**` outputs
- `docs/.../web-builder.md`

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Next.js + RN Web bundling | webpack aliases + mocks; `--webpack` mode |
| Full UI barrel size | Slim preview component map |
| TextField native deps | Web stub wrapping Input |
| Invalid JSON crash | try/catch in validate; applyInvalidJson |
| SSR hydration | Builder pages are client components |
