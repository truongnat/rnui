# Consumer setup — RNUI registry

> Manual setup for adding RNUI registry components to an Expo app.
> `npx @rnui/cli init` automates all of this — this file is the reference for
> what it does and the manual fallback.

## Variant A — NativeWind

```bash
npx expo install nativewind tailwindcss@^3 react-native-reanimated react-native-worklets
```

`babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
  };
};
```

`metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

## Variant B — Uniwind

```bash
npx expo install uniwind tailwindcss
```

`metro.config.js` (no babel plugin needed):

```js
const { getDefaultConfig } = require('expo/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withUniwindConfig(config, { cssEntryFile: './global.css' });
```

## Both variants

1. `tsconfig.json` — add the `@/*` alias:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

2. Copy `components.json` from this folder into the app root (it declares the
   `@/components`, `@/lib`, `@/hooks` aliases and the css file the CLI manages).

3. Import the theme at the app entry (e.g. `App.tsx`):

```tsx
import './global.css';
```

4. For system dark mode, set `"userInterfaceStyle": "automatic"` in
   `app.json` (the default Expo template pins it to `"light"`).

5. Add components:

```bash
npx shadcn add <registry-base>/r/<variant>/button.json
# first add also installs the theme + utils registryDependencies
```

Files land at `components/ui/*.tsx`, `lib/utils.ts`, `global.css`,
`tailwind.config.ts` + `nativewind-env.d.ts` (nativewind) or
`uniwind-env.d.ts` (uniwind).
