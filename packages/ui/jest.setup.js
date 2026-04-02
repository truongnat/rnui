// Do not import the real react-native entry (Flow/TS hybrid breaks babel-jest).
// `jest.config.js` maps `react-native` to `../headless/jest/react-native-mock.js`.
global.__fbBatchedBridgeConfig = {};
