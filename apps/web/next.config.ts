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
    '@rnui/renderer',
    '@rnui/component-schema',
    'react-native-web',
  ],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // The renderer's fallback placeholders import { Text, View } from
      // 'react-native' — resolve to react-native-web.
      'react-native$': reactNativeWebRoot,
      'react-native-web': reactNativeWebRoot,
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
