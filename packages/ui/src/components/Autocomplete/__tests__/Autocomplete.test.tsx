import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Autocomplete } from '../Autocomplete';

test('Autocomplete renders', () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <Autocomplete
        options={[{ label: 'Apple', value: 'apple' }]}
        placeholder="Search fruit"
      />
    </ThemeProvider>
  );
  expect(getByPlaceholderText('Search fruit')).toBeTruthy();
});
