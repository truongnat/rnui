/** @type {import('jest').Config} */
module.exports = {
  displayName: "@truongdq01/ui",
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
    "node_modules/(?!(react-native|@react-native|@react-native-community|react-native-reanimated|react-native-gesture-handler|react-native-worklets|@shopify/flash-list|@truongdq01|\\.bun)/)",
  ],
  moduleNameMapper: {
    "^@truongdq01/tokens$": "<rootDir>/../tokens/src/index.ts",
    "^@truongdq01/headless$": "<rootDir>/../headless/src/index.ts",
    "^@truongdq01/ui$": "<rootDir>/src/index.ts",
  },
};