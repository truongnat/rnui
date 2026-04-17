import React from 'react';
import { render } from '@testing-library/react-native';
import { Stack } from '../Stack';
import { Text } from 'react-native';
import { ThemeProvider } from '@truongdq01/headless';

test('Stack renders children with gap', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Stack gap={2}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Stack>
    </ThemeProvider>
  );
  expect(getByText('Item 1')).toBeTruthy();
  expect(getByText('Item 2')).toBeTruthy();
});
