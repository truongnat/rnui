import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Snackbar } from '../Snackbar';

test('Snackbar renders message', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Snackbar open={true} message="Saved successfully" />
    </ThemeProvider>
  );
  expect(getByText('Saved successfully')).toBeTruthy();
});
