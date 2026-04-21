import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { PasswordInput } from '../../Input/PasswordInput';

test('PasswordInput renders', () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <PasswordInput placeholder="Password" />
    </ThemeProvider>
  );
  expect(getByPlaceholderText('Password')).toBeTruthy();
});
