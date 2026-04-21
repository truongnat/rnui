import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { RadioGroup } from '../Radio';

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
