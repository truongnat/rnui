import type { Config } from "jest";

const config: Config = {
  displayName: "@truongnat/tokens",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@truongnat/tokens$": "<rootDir>/src/index.ts",
  },
};

export default config;