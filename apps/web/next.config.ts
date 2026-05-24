import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import webpack from 'webpack';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const reactNativeWebRoot = path.dirname(
  require.resolve('react-native-web/package.json')
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@truongdq01/ui',
    '@truongdq01/headless',
    '@truongdq01/tokens',
    '@truongdq01/renderer',
    '@truongdq01/component-schema',
    'react-native-web',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': reactNativeWebRoot,
      'react-native-web': reactNativeWebRoot,
      'react-native-reanimated': path.resolve(
        rootDir,
        'src/mocks/reanimated.ts'
      ),
      'react-native-gesture-handler': path.resolve(
        rootDir,
        'src/mocks/gesture-handler.tsx'
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
      'lucide-react-native': require.resolve('lucide-react'),
      '@react-native-community/datetimepicker': path.resolve(
        rootDir,
        'src/mocks/datetimepicker.tsx'
      ),
      '@shopify/flash-list': path.resolve(
        rootDir,
        'src/mocks/flash-list.tsx'
      ),
      'expo-blur': path.resolve(rootDir, 'src/mocks/expo-blur.tsx'),
      'expo-linear-gradient': path.resolve(rootDir, 'src/mocks/expo-blur.tsx'),
    };

    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      '.tsx',
      '.ts',
      '.js',
      ...(config.resolve.extensions ?? []),
    ];

    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
      })
    );

    return config;
  },
};

export default nextConfig;
