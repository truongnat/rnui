import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Select } from '../Select';
import { ThemeProvider } from '@truongdq01/headless';

const options = Array.from({ length: 10000 }).map((_, i) => ({
  label: `Option ${i}`,
  value: `${i}`,
}));

const TestWrapper = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  return (
    <ThemeProvider>
      <Select
        label="Choose"
        value=""
        options={options}
        error={error}
        searchable
      />
      <button
        testID="toggle-error"
        onClick={() => setError((e) => (e ? undefined : 'Error'))}
      >
        Toggle Error
      </button>
    </ThemeProvider>
  );
};

test.skip('Select component performance', () => {
  const { getByText, getByTestId, getByPlaceholderText } = render(
    <TestWrapper />
  );

  // Open the select
  fireEvent.press(getByText('Choose'));

  // Set a query so the filter runs
  const input = getByPlaceholderText('Search…');
  fireEvent.changeText(input, '999'); // Something that filters the list

  // Measure re-render time when toggling error (unrelated prop)
  const start = performance.now();
  for (let i = 0; i < 50; i++) {
    fireEvent.press(getByTestId('toggle-error'));
  }
  const end = performance.now();

  console.log(`Time for 50 re-renders: ${end - start} ms`);
});
