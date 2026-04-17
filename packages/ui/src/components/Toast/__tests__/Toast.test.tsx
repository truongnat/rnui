import React from 'react';
import { render } from '@testing-library/react-native';
import { ToastContainer } from '../ToastContainer';
import { ThemeProvider } from '@truongdq01/headless';

test('ToastContainer renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <ToastContainer />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
