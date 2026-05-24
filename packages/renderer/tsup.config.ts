import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  tsconfig: 'tsconfig.json',
  external: [
    'react',
    'react-native',
    'react-native-web',
    '@truongdq01/ui',
    '@truongdq01/headless',
    '@truongdq01/component-schema',
  ],
});
