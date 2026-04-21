import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text, View } from 'react-native';
import { Popover } from '../Popover';

test('Popover renders children', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Popover open={true}>
        <Text>Popover Content</Text>
      </Popover>
    </ThemeProvider>
  );
  expect(getByText('Popover Content')).toBeTruthy();
});
