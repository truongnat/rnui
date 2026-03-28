module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/react-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-gesture-handler)/)",
  ],
  moduleNameMapper: {
    "^@truongdq01/tokens$": "<rootDir>/../tokens/src",
  },
  // Fix for Bun + React Native Jest compatibility
  setupFiles: ["<rootDir>/jest.setup.cjs"],
};
