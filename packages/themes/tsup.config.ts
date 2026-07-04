import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'brands/neutral': 'src/brands/neutral.ts',
    'brands/stone': 'src/brands/stone.ts',
    'brands/butter': 'src/brands/butter.ts',
    'brands/chocolate': 'src/brands/chocolate.ts',
    'brands/matcha': 'src/brands/matcha.ts',
    'brands/gothic': 'src/brands/gothic.ts',
    'brands/y2k': 'src/brands/y2k.ts',
  },
  format: ['cjs', 'esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  outDir: 'dist',
});
