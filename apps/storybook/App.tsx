import React from 'react';
import { view } from './.storybook/storybook.requires';

// Mock storage to prevent AsyncStorage errors in Expo Go
const mockStorage = {
  getItem: async () => null,
  setItem: async () => {},
  removeItem: async () => {},
  clear: async () => {},
};

const StorybookUIRoot = view.getStorybookUI({
  shouldPersistSelection: false,
  storage: mockStorage,
});

export default StorybookUIRoot;
