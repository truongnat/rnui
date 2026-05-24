# Public readiness checklist

Use this before opening the repo publicly or cutting a major release.

## Documentation

- [x] Root `README.md` — install, peers, clone URL, dev workflow
- [x] `docs/README.md` — docs site contributor guide
- [x] Astro Starlight site builds (`bun run docs:build`)
- [x] Component status page (`docs/src/content/docs/components/status.md`)
- [x] AI-native metadata (`.ai/`, `AGENTS.md`, `bun run ai:check`)
- [x] AI usage docs (`docs/src/content/docs/guides/ai-usage.md`)
- [ ] Every exported component has a docs page (many still stubbed)
- [ ] API props tables complete for complex components (Select, DatePicker, …)

## Package publishing

- [x] Packages published under `@truongdq01/*` on npm
- [x] Changesets configured (`bun run changeset`, `bun run release`)
- [x] `files` field limits publish to `dist/` outputs
- [ ] README on npm package pages (consider `README` field per package)
- [ ] Changelog entries for each release

## Build / typecheck / lint / test

- [x] `bun run build` — Turbo builds all packages
- [x] `bun run lint` — Biome check on package `src/`
- [x] `bun run test` — UI (Bun) + headless (Jest) + themes
- [x] CI workflow on `develop` / `master`
- [x] Example app `typecheck` clean for shell routes (`tsconfig.typecheck.json`)
- [ ] Example showcase screens typecheck clean (`bun run typecheck:showcases` — ~88 known errors from API drift)
- [ ] Visual regression / Storybook CI (deferred)

## Peer dependency compatibility

- [x] Required peers documented in root README
- [x] Optional peers marked in `@truongdq01/ui` `peerDependenciesMeta`
- [x] UI `tsup` externalizes native and optional deps
- [ ] Compatibility matrix tested on RN 0.83 + New Architecture only
- [ ] Wider RN version support explicitly out of scope until tested

## Example app verification

- [x] Example app runs via Expo (`apps/example`)
- [x] Component catalog + per-component showcase screens
- [ ] Detox E2E run in CI (scripts exist, not in default CI job)
- [ ] Example pins workspace packages consistently

## Optional native modules

- [x] `GlassCard` — `expo-blur` optional, documented
- [x] `Gradient` — `expo-linear-gradient` optional
- [x] `Select` — FlashList optional, FlatList fallback
- [x] Test mocks for optional deps in `packages/ui/test-setup.ts`

## Release process

1. Create changeset: `bun run changeset`
2. Version: `bun run version-packages`
3. Verify: `bun run build && bun run test && bun run typecheck && bun run lint`
4. Merge to `master` — CI publishes to npm when version is new
5. Tag created by CI (`v*`)

## Known limitations

- Targets **React Native ≥ 0.83** and **React ≥ 19**; older versions unsupported.
- **New Architecture** recommended; legacy architecture not validated.
- Example app showcase files are demos, not type-safe reference implementations.
- Some component docs are placeholders (“coming soon”).
- `ThemeProvider` wraps `GestureHandlerRootView` by default; use `withGestureRoot={false}` if the app already provides it.
- Icon/SVG stack requires `react-native-svg` + `lucide-react-native` in the consumer app.

## Before announcing publicly

- [ ] Run full CI on `develop` and confirm green
- [ ] Review npm package descriptions and keywords
- [ ] Add GitHub repo description, topics, and license badge
- [ ] Link docs site URL in README (when deployed)
