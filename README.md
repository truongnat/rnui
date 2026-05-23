# RNUI

RNUI is a React Native UI kit built as a layered monorepo: design tokens, headless hooks, and styled components with multi-brand theming.

- **Design tokens** — primitive → semantic → component recipes
- **Headless hooks** — reusable logic, accessibility, and gesture state
- **Styled components** — 70+ pre-built, themeable UI primitives
- **Motion presets** — shared animation configuration
- **Multi-brand support** — runtime brand and color-scheme switching

Published packages: [`@truongdq01/tokens`](https://www.npmjs.com/package/@truongdq01/tokens), [`@truongdq01/headless`](https://www.npmjs.com/package/@truongdq01/headless), [`@truongdq01/ui`](https://www.npmjs.com/package/@truongdq01/ui), [`@truongdq01/themes`](https://www.npmjs.com/package/@truongdq01/themes).

Repository: [github.com/truongnat/rnui](https://github.com/truongnat/rnui)

## Package status

| Package | Version | Description |
| ------- | ------- | ----------- |
| `@truongdq01/tokens` | 1.0.3 | Design tokens (primitive, semantic, component, motion) |
| `@truongdq01/headless` | 1.0.3 | `ThemeProvider`, theme hooks, and headless behavior hooks |
| `@truongdq01/ui` | 1.0.3 | Styled React Native components |
| `@truongdq01/themes` | 1.0.3 | Multi-brand color presets |
| `@truongdq01/example` | 0.0.2 | Expo example app (not published) |

CI on `develop` runs build, lint, typecheck (library packages + example app shell), and tests. See [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

Example `typecheck` covers routing and kitchen-sink entry points; per-component showcase screens are checked separately via `bun run typecheck:showcases` in `apps/example` (known API drift — see checklist).

## Target environment

RNUI currently targets **modern React Native apps**:

| Requirement | Version |
| ----------- | ------- |
| React Native | ≥ 0.83 |
| React | ≥ 19 |
| New Architecture | Recommended (project development assumes New Architecture) |

> RNUI currently targets modern React Native apps. If you need wider React Native version support, check compatibility before adopting.

**Required peer dependencies** (install in your app):

- `react-native-reanimated` ≥ 4.2.0
- `react-native-gesture-handler` ≥ 2.30.0
- `react-native-worklets` ≥ 0.7.0
- `react-native-safe-area-context` ≥ 5.6.0 (used by layout/navigation-related components)
- `react-native-svg` (required when using `Icon` and SVG-based components such as `CircularProgress`)
- `lucide-react-native` (required when using the `Icon` component)

**Optional peer dependencies:**

| Package | Used by |
| ------- | ------- |
| `@shopify/flash-list` | Virtualized lists in `Select` (falls back to `FlatList`) |
| `expo-blur` | Native blur in `GlassCard` (falls back to translucent `View`) |
| `expo-linear-gradient` | Native gradients in `Gradient` (falls back when absent) |

## Installation

### npm / bun (consumers)

```bash
npm install @truongdq01/ui @truongdq01/headless @truongdq01/tokens
# optional brand presets
npm install @truongdq01/themes
```

Install peer dependencies in your **app** (not only in a shared library package):

```bash
npm install react-native-reanimated react-native-gesture-handler react-native-worklets react-native-safe-area-context react-native-svg lucide-react-native
```

### Expo

```bash
npx expo install @truongdq01/ui @truongdq01/headless @truongdq01/tokens
npx expo install react-native-reanimated react-native-gesture-handler react-native-worklets react-native-safe-area-context react-native-svg lucide-react-native
npx expo install expo-blur expo-linear-gradient
```

Optional FlashList for better list performance in `Select`:

```bash
npx expo install @shopify/flash-list
```

## Usage

Wrap your app with `ThemeProvider`. By default it includes `GestureHandlerRootView`; if your app already provides one at the root, pass `withGestureRoot={false}`.

```tsx
import { Button, Card, Input } from '@truongdq01/ui';
import { ThemeProvider } from '@truongdq01/headless';

export default function App() {
  return (
    <ThemeProvider colorScheme="system">
      <Card padding="md">
        <Input label="Email" placeholder="you@example.com" />
        <Button label="Submit" variant="solid" onPress={() => {}} />
      </Card>
    </ThemeProvider>
  );
}
```

If you already wrap the app with `GestureHandlerRootView`:

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

<GestureHandlerRootView style={{ flex: 1 }}>
  <ThemeProvider withGestureRoot={false}>
    <App />
  </ThemeProvider>
</GestureHandlerRootView>
```

### Headless hooks

Use hooks directly for custom UI while keeping RNUI behavior and accessibility:

```tsx
import { usePressable } from '@truongdq01/headless';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

function PressableSurface({ onPress, children }) {
  const { gesture, animatedStyle, accessibilityProps } = usePressable({ onPress });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle} {...accessibilityProps}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
}
```

## Development

Requires [Bun](https://bun.sh).

```bash
git clone https://github.com/truongnat/rnui.git
cd rnui
bun install
bun run build
bun run typecheck
bun run lint
bun run test
bun run docs
```

### Example app

```bash
cd apps/example
bun run start
# or
bun run ios
bun run android
```

### Documentation site

```bash
bun run docs          # dev server at http://localhost:4321
bun run docs:build    # production build
```

See [`docs/README.md`](docs/README.md) for docs site structure.

## Architecture

```
@truongdq01/tokens     primitive → semantic → component tokens
        ↓
@truongdq01/headless   ThemeProvider, useTheme, behavior hooks
        ↓
@truongdq01/ui         styled components
        ↓
@truongdq01/themes     optional brand presets
```

Component inventory and maturity notes: [Component status](docs/src/content/docs/components/status.md) (also on the docs site when built).

## Scripts

| Script | Description |
| ------ | ----------- |
| `bun run build` | Build all packages |
| `bun run dev` | Watch mode (Turbo) |
| `bun run typecheck` | TypeScript check (all packages with a `typecheck` script) |
| `bun run lint` | Biome lint + format check |
| `bun run test` | Unit tests |
| `bun run docs` | Start docs dev server |
| `bun run docs:build` | Build docs site |
| `bun run changeset` | Create a changeset for release |
| `bun run release` | Build and publish (maintainers) |

## License

MIT © 2026 RNUI Project
