module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Reanimated plugin - phải đặt TRƯỚC worklets
      'react-native-reanimated/plugin',
      // Reanimated v4: plugin chuyển sang react-native-worklets
      // Phải đặt CUỐI CÙNG trong danh sách plugins
      'react-native-worklets/plugin',
    ],
  };
};
