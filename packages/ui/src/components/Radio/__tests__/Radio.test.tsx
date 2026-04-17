import React from 'react';
import { render } from '@testing-library/react-native';
import { RadioGroup } from '../Radio';
import { ThemeProvider } from '@truongdq01/headless';

test('RadioGroup renders options', () => {
  const options = [
    { value: 'a', label: 'Option A' },
    { value: 'b', label: 'Option B' },
  ];

  const { getByText } = render(
    <ThemeProvider>
      <RadioGroup value="a" options={options} />
    </ThemeProvider>
  );

  expect(getByText('Option A')).toBeTruthy();
  expect(getByText('Option B')).toBeTruthy();
});
