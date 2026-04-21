// Do not import the real react-native entry (Flow/TS hybrid breaks babel-jest).
// `jest.config.js` maps `react-native` to `../headless/jest/react-native-mock.js`.
global.__fbBatchedBridgeConfig = {};

// Ensure Touchable is available on the react-native mock for react-native-svg
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
  const result = originalRequire.apply(this, arguments);
  if (id === 'react-native' && result && !result.Touchable) {
    result.Touchable = { Mixin: {} };
  }
  return result;
};
