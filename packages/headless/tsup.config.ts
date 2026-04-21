import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    theme: 'src/theme/index.ts',
    motion: 'src/motion.ts',
    'hooks/index': 'src/hooks/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    'react',
    'react-native',
    'react-native-reanimated',
    'react-native-gesture-handler',
    'react-native-worklets',
  ],
  tsconfig: 'tsconfig.json',
});
