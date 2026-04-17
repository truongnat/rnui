import React from 'react';
import { render } from '@testing-library/react-native';
import { LinearProgress } from '../LinearProgress';
import { ThemeProvider } from '@truongdq01/headless';

test('LinearProgress renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <LinearProgress value={50} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
