import type { Preview } from "@storybook/react-native";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Disable storage to avoid AsyncStorage errors in Expo Go
    storybookStorage: undefined,
  },
};

export default preview;
