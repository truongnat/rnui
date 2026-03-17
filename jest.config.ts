import type { Config } from "jest";

const config: Config = {
  projects: [
    "<rootDir>/packages/tokens",
    "<rootDir>/packages/headless",
    "<rootDir>/packages/ui",
  ],
};

export default config;