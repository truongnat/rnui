import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Divider } from '../Divider';

test('Divider renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Divider />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
