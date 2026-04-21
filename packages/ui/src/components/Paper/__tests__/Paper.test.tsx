import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Paper } from '../Paper';

test('Paper renders visual surface', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Paper>
        <Text>Elevated Content</Text>
      </Paper>
    </ThemeProvider>
  );
  expect(getByText('Elevated Content')).toBeTruthy();
});
