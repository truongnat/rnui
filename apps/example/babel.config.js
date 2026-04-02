module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    // Reanimated 4 + react-native-worklets: babel-preset-expo injects
    // `react-native-worklets/plugin` when `react-native-worklets` is installed.
    // Do not add reanimated/worklets plugins here — duplicates break Metro.
  };
};
