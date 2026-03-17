import type { Config } from "jest";

const config: Config = {
  displayName: "@rnui/headless",
  preset: "react-native",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      { presets: ["module:metro-react-native-babel-preset"] },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-gesture-handler|@rnui)/)",
  ],
  moduleNameMapper: {
    "^@rnui/tokens$": "<rootDir>/../tokens/src/index.ts",
    "^@rnui/headless$": "<rootDir>/src/index.ts",
  },
};

export default config;