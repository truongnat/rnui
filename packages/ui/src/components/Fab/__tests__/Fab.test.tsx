import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Fab } from '../Fab';

test('Fab renders label in extended variant', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Fab label="Add" variant="extended" />
    </ThemeProvider>
  );
  expect(getByText('Add')).toBeTruthy();
});
