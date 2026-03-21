import type { Config } from "jest";

const config: Config = {
  displayName: "@rnui/ui",
  preset: "react-native",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.{test,perf}.{ts,tsx}"],
  setupFilesAfterFramework: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      { presets: ["module:metro-react-native-babel-preset"] },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-gesture-handler|@shopify/flash-list|@rnui)/)",
  ],
  moduleNameMapper: {
    "^@rnui/tokens$": "<rootDir>/../tokens/src/index.ts",
    "^@rnui/headless$": "<rootDir>/../headless/src/index.ts",
    "^@rnui/ui$": "<rootDir>/src/index.ts",
  },
};

export default config;