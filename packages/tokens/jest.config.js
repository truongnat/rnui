import type { Config } from "jest";

const config: Config = {
  displayName: "@truongdq01/tokens",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@truongdq01/tokens$": "<rootDir>/src/index.ts",
  },
};

export default config;
