# RNUI

RNUI is a **shadcn-compatible component registry for React Native**. Components are copied into your project — you own the code, styled with Tailwind classes via [NativeWind](https://nativewind.dev) or [Uniwind](https://uniwind.dev).

- **83 components** — inputs, navigation, feedback, data-display, overlays, layout
- **2 engine variants** — `nativewind` (Tailwind v3) and `uniwind` (Tailwind v4, CSS-first)
- **7 brand themes** — neutral, stone, butter, chocolate, matcha, gothic, y2k
- **AI-native** — component schema + screen renderer for coding agents

Repository: [github.com/truongnat/rnui](https://github.com/truongnat/rnui)

## Quick start

Install components with the shadcn CLI:

```bash
npx shadcn add https://raw.githubusercontent.com/truongnat/rnui/main/registry/dist/nativewind/theme.json
npx shadcn add https://raw.githubusercontent.com/truongnat/rnui/main/registry/dist/nativewind/button.json
```

Swap `nativewind` → `uniwind` for the Tailwind v4 variant. One-time setup (deps, babel/metro, theme): [`registry/templates/setup.md`](registry/templates/setup.md). Brand themes are `theme-<brand>` items, e.g. `theme-matcha`.

Or use the RNUI CLI (runs from git, no npm publish):

```bash
npx github:truongnat/rnui#cli init
npx github:truongnat/rnui#cli add button
```

Usage in your app:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
```

## Requirements

| Requirement | Version |
| ----------- | ------- |
| React Native | ≥ 0.83 |
| React | ≥ 19 |
| Styling | NativeWind v4 **or** Uniwind |

**Peer dependencies** (install in your app as needed by components you add):

- `react-native-safe-area-context` — sheet, modal, tab-bar, select
- `react-native-svg` + `lucide-react-native` — icon, circular-progress
- `tailwind-variants` + `clsx` — variant styling, `cn()`

**Optional peers** (auto-fallback when absent): `@shopify/flash-list` (animated-list, select), `expo-blur` (glass-card), `expo-linear-gradient` (gradient), `expo-clipboard` (code-block).

## Repo layout

```
registry/
  registry.json          # item catalog — the single source of truth
  shared/                # code shared by all variants
    ui/<name>.tsx        #   components (kebab-case files, PascalCase exports)
    lib/utils.ts         #   cn(), contexts, useThemeColor, openSafeUrl
  variants/
    nativewind/          # global.css, tailwind.config.ts, env.d.ts
    uniwind/             # global.css (@theme), env.d.ts
  themes/<brand>.json    # brand presets → theme-<brand> items
  blocks/                # full screen examples (login, onboarding…)
  dist/                  # build output served via GitHub raw on main
packages/
  component-schema       # machine-readable component contracts + ScreenSchema
  renderer               # ScreenSchema → React tree / TSX export
  cli                    # rnui init/add/list
apps/
  example                # Expo showcase app (registry consumer)
  web                    # Next.js screen builder (schema → preview → TSX)
```

## Development

Requires [Bun](https://bun.sh).

```bash
git clone https://github.com/truongnat/rnui.git
cd rnui
bun install
bun run build
bun run typecheck && bun run lint && bun run test
bun run registry:build   # rebuild registry/dist
```

### Example app

```bash
bun run demo          # Expo dev client
bun run demo:go       # Expo Go
```

## AI-native usage

RNUI ships machine-readable metadata so coding agents generate screens with the design system — not one-off custom UI.

| Resource | Purpose |
| -------- | ------- |
| [`.ai/rnui.manifest.json`](.ai/rnui.manifest.json) | Top-level AI entrypoint |
| [`.ai/component-registry.json`](.ai/component-registry.json) | Machine-readable component catalog |
| [`.ai/design-rules.md`](.ai/design-rules.md) | Layout, tokens, anti-patterns |
| [`.ai/screen-generation.md`](.ai/screen-generation.md) | Screen workflow and templates |
| [`.ai/examples/`](.ai/examples/) | Reference screen implementations |

Validate AI files: `bun run ai:check`

## Scripts

| Script | Description |
| ------ | ----------- |
| `bun run registry:build` | Build `registry/dist` from catalog |
| `bun run test` / `lint` / `typecheck` | Turbo pipeline |
| `bun run web:dev` | Next.js builder dev server |
| `bun run demo` | Expo example app |

## License

MIT © 2026 RNUI Project
