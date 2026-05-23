import { defineConfig } from 'tsup';

const external = [
  'react',
  'react-native',
  'react-native-reanimated',
  'react-native-gesture-handler',
  'react-native-worklets',
  'react-native-safe-area-context',
  'react-native-svg',
  'lucide-react-native',
  '@shopify/flash-list',
  'expo-blur',
  'expo-linear-gradient',
  '@react-native-community/datetimepicker',
  '@truongdq01/headless',
  '@truongdq01/tokens',
];

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false,
  sourcemap: true,
  clean: true,
  treeshake: false,
  external,
});
