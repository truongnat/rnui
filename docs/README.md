# RNUI documentation site

This directory contains the public documentation for [RNUI](https://github.com/truongnat/rnui), built with [Astro Starlight](https://starlight.astro.build/).

## Run locally

From the docs directory:

```bash
cd docs
bun install
bun start
```

From the repository root:

```bash
bun run docs
```

Dev server: [http://localhost:4321](http://localhost:4321)

Production build:

```bash
bun run docs:build
# or
cd docs && bun run build
```

Output is written to `docs/dist/`.

## Content layout

Documentation lives under `src/content/docs/`:

| Area | Path | Contents |
| ---- | ---- | -------- |
| Guides | `getting-started.md`, `theming.md`, `headless.md`, `component-tree.md` | Setup, theming, hooks overview |
| Components | `components/*.md` | One page per UI component |
| Reference | `reference/` | Example app and integration notes |

Starlight autogenerates the **Components** sidebar from `src/content/docs/components/`. Site config: `astro.config.mjs`.

## Adding a component doc

1. Create `src/content/docs/components/your-component.md` with frontmatter:

   ```md
   ---
   title: YourComponent
   ---

   # YourComponent
   ```

2. Include:
   - **Import** — `import { YourComponent } from '@truongdq01/ui';`
   - **Usage** — minimal example inside `<ThemeProvider>`
   - **Props** — table or list of main props
   - **Dependencies** — required peers (`react-native-reanimated`, etc.) and optional peers (`expo-blur`, `@shopify/flash-list`, …)
   - **Status** — link to or mirror [components/status.md](src/content/docs/components/status.md)

3. Run `bun run docs` and verify the page appears under Components.

4. If the component needs new optional native modules, document install commands (e.g. `npx expo install expo-blur`).

## Tech stack

- [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/)
- React islands where needed (`@astrojs/react`)
- Bun for scripts (matches monorepo)

## Related packages

Docs describe packages published from the monorepo root:

- `@truongdq01/tokens`
- `@truongdq01/headless`
- `@truongdq01/ui`
- `@truongdq01/themes`
