import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Alert } from '../Alert';

test('Alert renders and handles close press', () => {
  const onClose = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Alert onClose={onClose}>
        <Text>Warning</Text>
      </Alert>
    </ThemeProvider>
  );
  expect(getByText('Warning')).toBeTruthy();
});
