# RNUI Registry

Shadcn-compatible component registry for React Native. Components are **copied into the consumer's project** via `npx shadcn add <url>` — the consumer owns the code.

Two styling-engine variants are served:

| Variant      | Engine                                  | Tailwind                 | Setup                                 |
| ------------ | --------------------------------------- | ------------------------ | ------------------------------------- |
| `nativewind` | [NativeWind](https://nativewind.dev) v4 | v3 (`tailwind.config`)   | babel preset + `withNativeWind` metro |
| `uniwind`    | [Uniwind](https://uniwind.dev)          | v4 (`@theme`, CSS-first) | `withUniwindConfig` metro only        |

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
scripts/build-registry.mjs   # catalog -> registry/dist/<variant>/<item>.json
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
bun run registry:build                              # emit registry/dist/{nativewind,uniwind}/*.json
RNUI_REGISTRY_BASE_URL=http://localhost:4999/r \
  node scripts/build-registry.mjs                    # rebuild with resolvable dep URLs
python3 -m http.server 4999 -d registry/dist          # serve locally for e2e
```

`registry/dist/` is committed on `main` and served from:
`https://raw.githubusercontent.com/truongnat/rnui/main/registry/dist/<variant>/<item>.json`.

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
- **Never toggle var-classes dynamically.** Conditional `className` that
  introduces or removes a CSS-variable-backed class (`bg-primary`, `shadow-*`,
  `text-destructive`…) after mount triggers a react-native-css-interop
  "variables upgrade" warning which stringifies props — huge element trees have
  OOM-killed Hermes before. Instead:
  - Put dynamic state colours in the `style` prop via `useThemeColor()`
    (`registry/shared/lib/utils.ts`), e.g. `style={checked && { backgroundColor: colors.primary }}`.
  - Or mount/unmount a separate `<View>` for state indicators
    (segmented-control, tabs do this for the active pill).
  - Literal conditional classes for non-var utilities (`opacity-50`,
    `active:bg-accent` on press feedback) are fine — the trap is var-backed
    classes toggling after mount.
- **`asChild` triggers.** `PopoverTrigger`, `DropdownMenuTrigger`,
  `ContextMenuTrigger`, `TooltipTrigger` accept `asChild` to clone the child
  instead of wrapping it in a Pressable — a nested Pressable swallows the
  press. The clone merges `ref` (via `composeRefs`), `onPress`/`onLongPress`,
  `className` and sets `collapsable={false}` for `measureInWindow`.
- **Anchored content flips.** Popover/dropdown/context-menu/tooltip content
  measures itself via `onLayout` and flips above the trigger when it would
  overflow the bottom edge; render at `opacity: 0` until measured.
- **Popover surfaces.** `PopoverContent` forwards its `ViewProps` (including
  `style`, `onLayout` and accessibility props) to the measured panel, not an
  inner body. Width/padding overrides therefore participate in positioning;
  safe-window maximum dimensions still constrain the surface. Outside taps
  dismiss without activating the underlying screen. Use working controls in
  rich-content demos; account preferences update immediately and survive
  closing/reopening the panel.
- **Calendar grid.** Render explicit seven-column rows with equal flex cells,
  not percentage-width wrapped cells: Yoga rounding can move Saturday to a new
  row. Weekday headings and hidden outside-date placeholders share those columns.
  The default calendar fills its container; callers can constrain width with
  `style`/`className`. Range bands terminate at each visible week boundary.
- **Code source.** `CodeBlock` applies light/dark lexical syntax colors to
  JS/TS/JSX/TSX, JSON and CSS without rewriting source. Indentation, newlines,
  selection and clipboard contents retain the supplied text; unsupported
  languages remain plain. This is highlighting, not an automatic formatter
  or a complete language parser.
- **Mobile context menus.** `ContextMenu` is a custom anchored panel, not a
  system-native preview/menu. Long-press an object for secondary actions; keep
  its primary tap action intact and expose the same choices through a visible
  overflow button (`DropdownMenu`). Use an independent context for each object.
  Hide unavailable context actions and omit keyboard shortcut hints on mobile.
  Default accessibility uses the separate `showActions` action, not `activate`;
  accessibility escape dismisses the panel. Caller `ViewProps` reach the measured
  surface, and callback trigger styles receive pressed/hovered state.
  See [Apple context menus](https://developer.apple.com/design/human-interface-guidelines/context-menus)
  and [Android contextual menus](https://developer.android.com/develop/ui/views/components/menus).
- **Form context.** `FormFieldContext` and `TextClassContext` live in
  `lib/utils` (not `ui/form`) so controls consume them without a registry dep.
  Inputs auto-wire `nativeID` + `invalid` from the enclosing `FormField`.
- **Dialog/alert-dialog context.** `onOpenChange` is provided via context so
  `DialogClose`, `AlertDialogAction`, `AlertDialogCancel` self-dismiss —
  callers' `onPress` still runs first.
- **Native-only differences.** `TextInput` has no `disabled` prop — map
  `disabled` to `editable={false}` and apply opacity yourself (`disabled:`
  class never fires). Keep `h-10` touch targets where web uses `h-9`.

## Catalog

[`registry.json`](registry.json) is the source of truth for item names, files,
dependencies, and variants. `registry/dist/` is generated from this catalog by
`bun run registry:build`.

## Adding a component

Follow the [component authoring contract](../COMPONENT-PORT.md) for source and
variant rules, and [CONTRIBUTING.md](../CONTRIBUTING.md) for the repository
workflow.

## Consumer flow

The private CLI package is served from the `cli` branch; it is not installed
from npm. That branch contains the bundled `cli.js`, rebuilt from
`packages/cli`:

```bash
npx github:truongnat/rnui#cli init        # picks variant, installs engine deps, writes configs
npx github:truongnat/rnui#cli add button  # wraps `npx shadcn add <base>/r/<variant>/button.json`
npx github:truongnat/rnui#cli list        # shows catalog index
```

Or manually, equivalent steps: [`templates/setup.md`](templates/setup.md) +
`npx shadcn add <registry-base>/r/<variant>/<item>.json`.

### Updating the `cli` branch

The `cli` branch is a dist-only mirror consumed via `npx github:...#cli`:

```bash
bun --cwd packages/cli run build                    # -> packages/cli/dist/cli.js
git worktree add /tmp/rnui-cli-dist cli
cp packages/cli/dist/cli.js /tmp/rnui-cli-dist/cli.js
cd /tmp/rnui-cli-dist && git commit -am "cli: rebuild" && git push origin cli
```
