const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

const config = getDefaultConfig(__dirname);
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
