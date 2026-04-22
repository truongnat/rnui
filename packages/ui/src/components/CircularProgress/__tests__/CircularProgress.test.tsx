import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { CircularProgress } from '../CircularProgress';

test.skip('CircularProgress renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <CircularProgress value={50} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
