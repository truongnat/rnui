module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["@testing-library/react-native/extend-expect"],
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-gesture-handler)/)",
  ],
  moduleNameMapper: {
    "^@rnui/tokens$": "<rootDir>/../tokens/src",
  },
};
