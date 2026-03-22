/** @type {import('jest').Config} */
module.exports = {
  displayName: "@rnui/ui",
  preset: "react-native",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.{test,perf}.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { presets: ["babel-preset-expo"] },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|@react-native-community|react-native-reanimated|react-native-gesture-handler|react-native-worklets|@shopify/flash-list|@rnui|\\.bun)/)",
  ],
  moduleNameMapper: {
    "^@rnui/tokens$": "<rootDir>/../tokens/src/index.ts",
    "^@rnui/headless$": "<rootDir>/../headless/src/index.ts",
    "^@rnui/ui$": "<rootDir>/src/index.ts",
  },
};