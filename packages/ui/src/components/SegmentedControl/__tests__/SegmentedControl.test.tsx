import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { SegmentedControl } from '../SegmentedControl';

test('SegmentedControl renders options', () => {
  const { getByText } = render(
    <ThemeProvider>
      <SegmentedControl
        options={['Daily', 'Weekly']}
        selectedIndex={0}
        onChange={() => {}}
      />
    </ThemeProvider>
  );
  expect(getByText('Daily')).toBeTruthy();
  expect(getByText('Weekly')).toBeTruthy();
});
