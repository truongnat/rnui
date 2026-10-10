# Contributing to RNUI

RNUI is a **shadcn-compatible registry**, not an npm library. Components live in `registry/shared/ui/` and are copied into consumer apps.

## Setup

```bash
git clone https://github.com/truongnat/rnui
cd rnui
bun install
bun run build
```

## Repo structure

| Path | Role |
| --- | --- |
| `registry/shared/ui/` | Components (kebab file, PascalCase exports) |
| `registry/shared/lib/utils.ts` | `cn()`, contexts, `useThemeColor`, `openSafeUrl`, `spacingScale` |
| `registry/variants/{nativewind,uniwind}/` | Engine setup files + per-variant overrides |
| `registry/themes/*.json` | Brand theme presets (canonical — edit by hand) |
| `registry/registry.json` | Item catalog — every component needs an entry |
| `packages/component-schema` | AI-readable component contracts |
| `packages/renderer` | ScreenSchema renderer + TSX export |
| `packages/cli` | `rnui init/add/list` CLI |
| `apps/example` | Expo showcase — vendors the kit, use it to verify changes |
| `apps/web` | Next.js schema builder + preview |

## Rules

**Registry code is self-contained.** No imports from workspace packages. Only `@/components/ui/*`, `@/lib/utils`, React, RN core, and declared `dependencies`/`registryDependencies`.

**Classes via `cn()`/`tv()`, dynamic colors via `style` + `useThemeColor()`.** Never toggle var-referencing classes at runtime — css-interop stringify can OOM Hermes.

**Every host node accepts `className`** and merges it last so consumers can override.

**Optional peers must degrade.** Use the try/catch `require` pattern (see `glass-card.tsx`, `gradient.tsx`) and add the package to `peerDependenciesMeta`/`optionalPeers` docs.

**Dark mode is mandatory.** Colors come from semantic tokens (global.css vars / `useThemeColor`), never raw hex in component code.

## Adding a new component

1. Create `registry/shared/ui/<name>.tsx` (shadcn conventions, see `COMPONENT-PORT.md`).
2. If it needs variant-specific code, add a same-named file under `registry/variants/<variant>/` (drop-in override).
3. Add a catalog entry in `registry/registry.json` (`registryDependencies`, npm `dependencies`, `target`).
4. If the component should be AI-generatable, add/update its schema in `packages/component-schema/src/registry/`.
5. Add a showcase screen `apps/example/app/components/<Name>.tsx`, link it in `apps/example/app/index.tsx`, and vendor the file into `apps/example/components/ui/`.
6. `bun run registry:build` → commit `registry/dist`.

## Testing

```bash
bun run test            # all workspace tests
bun run typecheck       # all packages + apps
bun run lint            # biome
bun run registry:build  # validates catalog → dist
cd apps/example && bunx tsc --noEmit   # vendored-kit typecheck
```

Registry `shared/` files are templates — they don't typecheck standalone; `apps/example` vendored copy is the real check.

## Distribution

No npm publish for components — consumers use `npx shadcn add <raw-url>` or `npx github:truongnat/rnui#cli <cmd>`. Releases = merging to `main` (dist is served from `main` via GitHub raw). Version bumps/changesets apply only to `@rnui/*` internal packages.
