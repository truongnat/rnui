import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { FormControl, FormHelperText, FormLabel } from '../FormControl';

test('FormControl renders label and helper', () => {
  const { getByText } = render(
    <ThemeProvider>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <FormHelperText>Required field</FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
  expect(getByText('Username')).toBeTruthy();
  expect(getByText('Required field')).toBeTruthy();
});
