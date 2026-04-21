import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { LinearProgress } from '../LinearProgress';

test('LinearProgress renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <LinearProgress value={50} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
