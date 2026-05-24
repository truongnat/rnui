import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const reactNativeWebRoot = path.dirname(
  require.resolve('react-native-web/package.json')
);
const lucideReactRoot = path.dirname(
  require.resolve('lucide-react/package.json')
);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': reactNativeWebRoot,
      'react-native-web': reactNativeWebRoot,
      'react-native-reanimated': path.resolve(
        rootDir,
        'src/mocks/reanimated.ts'
      ),
      'react-native-gesture-handler': path.resolve(
        rootDir,
        'src/mocks/gesture-handler.ts'
      ),
      'react-native-worklets': path.resolve(
        rootDir,
        'src/mocks/worklets.ts'
      ),
      'react-native-safe-area-context': path.resolve(
        rootDir,
        'src/mocks/safe-area-context.tsx'
      ),
      'react-native-svg': path.resolve(rootDir, 'src/mocks/svg.tsx'),
      'lucide-react-native': lucideReactRoot,
      '@react-native-community/datetimepicker': path.resolve(
        rootDir,
        'src/mocks/datetimepicker.tsx'
      ),
      '@shopify/flash-list': path.resolve(rootDir, 'src/mocks/flash-list.tsx'),
      'expo-blur': path.resolve(rootDir, 'src/mocks/expo-blur.tsx'),
      'expo-linear-gradient': path.resolve(rootDir, 'src/mocks/expo-blur.tsx'),
      '@truongdq01/component-schema': path.resolve(
        rootDir,
        '../../../packages/component-schema/src/index.ts'
      ),
      '@truongdq01/headless': path.resolve(
        rootDir,
        '../../../packages/headless/dist/index.mjs'
      ),
      '@truongdq01/tokens': path.resolve(
        rootDir,
        '../../../packages/tokens/dist/index.mjs'
      ),
    },
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.jsx',
      '.js',
    ],
  },
  define: {
    global: 'window',
    __DEV__: JSON.stringify(true),
  },
  optimizeDeps: {
    include: ['react-native-web'],
  },
});
