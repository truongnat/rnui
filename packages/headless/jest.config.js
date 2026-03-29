const path = require("path");

module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "!**/dist/**", "!**/node_modules/**"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/dist-types/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { configFile: path.resolve(__dirname, "../../babel.config.js") },
    ],
  },
  transformIgnorePatterns: [
    "node_modules/(?!.*((jest-)?react-native|@react-native|@react-native-community|@react-native/js-polyfills|lucide-react-native|@truongdq01/|@shopify/flash-list))",
  ],
  moduleNameMapper: {
    "^react-native$": "<rootDir>/../../jest/react-native-mock.js",
    "^@truongdq01/tokens$": "<rootDir>/../tokens/src/index.ts",
  },
  globals: {
    __DEV__: true,
  },
};
