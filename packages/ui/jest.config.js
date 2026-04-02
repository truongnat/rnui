module.exports = {
  testEnvironment: "node",
  setupFiles: ["./jest.setup.js"],
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)", "!**/dist/**", "!**/node_modules/**"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/dist-types/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./babel.config.js" }],
  },
  // Bun hoists into node_modules/.bun/.../node_modules/ — need .* so react-native is transformed.
  transformIgnorePatterns: [
    "node_modules/(?!.*((jest-)?react-native|@react-native|@react-native-community|@react-native/js-polyfills|lucide-react-native|@truongdq01/|@shopify/flash-list))",
  ],
  moduleNameMapper: {
    "^react-native$": "<rootDir>/../headless/jest/react-native-mock.js",
    "^@truongdq01/headless$": "<rootDir>/../headless/src",
    "^@truongdq01/tokens$": "<rootDir>/../tokens/src",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  globals: {
    __DEV__: true,
  },
};
