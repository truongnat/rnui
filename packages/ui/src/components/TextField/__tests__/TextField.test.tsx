import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { TextField } from '../TextField';

test('TextField renders label', () => {
  const { getByText } = render(
    <ThemeProvider>
      <TextField label="Full Name" />
    </ThemeProvider>
  );
  expect(getByText('Full Name')).toBeTruthy();
});
