import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Popper } from '../Popper';

test('Popper renders content', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Popper open={true}>
        <Text>Popper Content</Text>
      </Popper>
    </ThemeProvider>
  );
  expect(getByText('Popper Content')).toBeTruthy();
});
