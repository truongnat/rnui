import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  format: ['esm'],
  dts: false,
  sourcemap: false,
  clean: true,
  target: 'node18',
  // Bundle runtime deps so dist/cli.js is self-contained — the `cli` git
  // branch ships only this file for `npx github:truongnat/rnui#cli`.
  noExternal: ['@clack/prompts'],
  banner: { js: '#!/usr/bin/env node' },
});
