import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { Grid } from '../Grid';

test('Grid renders children', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Grid container>
        <Grid item>
          <Text>Grid Item</Text>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
  expect(getByText('Grid Item')).toBeTruthy();
});
