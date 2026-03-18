import type { Preview } from "@storybook/react";

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
  // Disable persistence
  shouldPersistSelection: false,
};

export default preview;
