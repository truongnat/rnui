import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Tooltip } from '../Tooltip';

test('Tooltip renders title', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Tooltip open={true} title="Hint">
        <Text>Target</Text>
      </Tooltip>
    </ThemeProvider>
  );
  expect(getByText('Hint')).toBeTruthy();
});
