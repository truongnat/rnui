import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Chip } from '../Chip';

test('Chip renders label', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Chip label="React Native" />
    </ThemeProvider>
  );
  expect(getByText('React Native')).toBeTruthy();
});
