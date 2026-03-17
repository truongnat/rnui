import type { Config } from "jest";

const config: Config = {
  displayName: "@rnui/tokens",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@rnui/tokens$": "<rootDir>/src/index.ts",
  },
};

export default config;