# RNUI Registry

Shadcn-compatible component registry for React Native. Components are **copied into the consumer's project** via `npx shadcn add <url>` — the consumer owns the code.

Two styling-engine variants are served:

| Variant | Engine | Tailwind | Setup |
|---|---|---|---|
| `nativewind` | [NativeWind](https://nativewind.dev) v4 | v3 (`tailwind.config`) | babel preset + `withNativeWind` metro |
| `uniwind` | [Uniwind](https://uniwind.dev) | v4 (`@theme`, CSS-first) | `withUniwindConfig` metro only |

## Layout

```text
registry/
  registry.json              # item catalog (the only file that lists items)
  shared/                    # source used by ALL variants
    ui/button.tsx …          #   className + tv() components
    lib/utils.ts             #   cn()
  variants/
    nativewind/              # nativewind-only files (theme/setup + optional overrides)
      global.css             #   @tailwind + :root/.dark:root CSS vars
      tailwind.config.ts     #   semantic colors -> hsl(var(--x))
      nativewind-env.d.ts
    uniwind/
      global.css             #   @import tailwindcss + uniwind + @theme
      uniwind-env.d.ts
  templates/
    components.json          # consumer-side shadcn config template
    setup.md                 # manual setup steps (what `rnui init` will automate)
scripts/build-registry.mjs   # catalog -> docs/public/r/<variant>/<item>.json
```

## Resolution rules (builder)

- Catalog item `files[].src` points into `registry/`.
- `variants: [...]` on a file restricts it to those variants.
- For `shared/...` srcs, a same-named file under `variants/<variant>/` overrides it
  (drop-in escape hatch when an engine needs different code).
- `registryDependencies` bare names are rewritten to
  `<RNUI_REGISTRY_BASE_URL>/<variant>/<name>.json` when the env var is set.
  Without it they stay bare names (default-registry resolution — almost never what you want).

## Commands

```bash
bun run registry:build                              # emit docs/public/r/{nativewind,uniwind}/*.json
RNUI_REGISTRY_BASE_URL=http://localhost:4999/r \
  node scripts/build-registry.mjs                    # rebuild with resolvable dep URLs
python3 -m http.server 4999 -d docs/public           # serve locally for e2e
```

`docs:build` runs the builder automatically so the Vercel docs deploy serves `/r/`.

## Authoring rules

- **Literal class strings only.** Tailwind scans source at build time — no
  `clsx('bg-' + color)` style interpolation. Use `tv()` (tailwind-variants)
  slots/variants with full class names.
- **Semantic tokens only** for colors/radius (`bg-primary`, `text-muted-foreground`,
  `border-border`, `rounded-md`). Raw palette classes (`bg-zinc-900`) belong in
  theme files, not components — that is what makes multi-brand themes possible later.
- **No imports from `@truongdq01/*`.** Registry code is self-contained; shared
  helpers live in `shared/lib/` and ride along as `registryDependencies`.
- **`@/` alias imports** (`@/lib/utils`, `@/components/ui/text`) — consumers are
  expected to have `@/*` in tsconfig paths + the `components.json` aliases.
- Cross-component imports are allowed (`card` uses `text`) — declare the dep in
  `registryDependencies` so the CLI installs both.
- Runtime deps go in item `dependencies` (npm-installed by the CLI, e.g.
  `tailwind-variants`). **Never** list engine/native packages there
  (`nativewind`, `uniwind`, `tailwindcss`, `reanimated`) — they are setup-time
  deps installed via `npx expo install` so versions match the Expo SDK.
  Exception: packages that ship inside Expo Go with a pinned native version
  (e.g. `@shopify/react-native-skia`) must declare an exact version pin —
  npm latest mismatches the bundled native module and crashes at runtime.
- **Engine prop-name divergence.** nativewind and uniwind expose the same
  `className` API but differ on a few platform prop names (e.g. TextInput
  placeholder: `placeholderClassName` vs `placeholderTextColorClassName`).
  Pass both via a `Partial<Props>` spread — each engine reads its own.
- `accessibilityState` fields want `boolean | undefined`; Pressable `disabled`
  is `boolean | null | undefined` — coerce with `!!`.

## Items

- **Core**: `theme`, `utils`
- **UI**: `text`, `button`, `card`, `input`, `label`, `textarea`, `checkbox`,
  `switch`, `radio-group`, `select`, `separator`, `skeleton`, `badge`,
  `avatar`, `alert`, `dialog`, `progress`, `accordion`, `tabs`, `toggle`,
  `toggle-group`, `collapsible`, `sheet`, `popover`, `dropdown-menu`, `toast`,
  `slider`, `table`, `breadcrumb`, `pagination`, `command`, `alert-dialog`,
  `aspect-ratio`, `scroll-area`, `tooltip`, `context-menu`, `drawer`,
  `carousel`, `calendar`, `input-otp`, `form`, `app-bar`, `chip`, `fab`,
  `segmented-control`, `stepper`, `rating`, `timeline`, `marquee`,
  `empty-state`, `circular-progress`, `date-picker`, `snackbar`,
  `autocomplete`, `bottom-navigation`, `icon-button`, `speed-dial`,
  `list-item`, `settings-menu`, `chat-list-item`, `message-input`, `chart`,
  `data-table`
- **Blocks**: `login-screen`, `settings-screen`, `profile-screen`,
  `onboarding-screen`
- **Brand themes** (generated from `packages/themes`, `bun run registry:themes`):
  `theme-butter`, `theme-chocolate`, `theme-gothic`, `theme-matcha`,
  `theme-neutral`, `theme-stone`, `theme-y2k` — each overwrites `global.css`
  with the brand's semantic variables.

`rnui add` applies `theme-*` items in a second pass so the brand theme wins
over the default `theme` dependency every UI item carries.

## Adding a component

1. Write `registry/shared/ui/<name>.tsx` (and any lib files).
2. Add an item to `registry/registry.json` — name (kebab-case), type, files,
   `registryDependencies` (bare names), `dependencies` (npm pkgs).
3. If an engine needs a different implementation, put the override at
   `variants/<variant>/ui/<name>.tsx` (same relative path under `variants/`).
4. `bun run registry:build` and verify the JSON contains the override content
   for that variant only.
5. e2e: serve `docs/public` and `npx shadcn add <url>` in a test app.

## Consumer flow

With the CLI (`packages/cli`, not yet published):

```bash
npx @rnui/cli init        # picks variant, installs engine deps, writes configs
npx @rnui/cli add button  # wraps `npx shadcn add <base>/r/<variant>/button.json`
npx @rnui/cli list        # shows catalog index
```

Or manually, equivalent steps: [`templates/setup.md`](templates/setup.md) +
`npx shadcn add <registry-base>/r/<variant>/<item>.json`.
