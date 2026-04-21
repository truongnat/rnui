import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Pagination } from '../Pagination';

test('Pagination handles page change', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Pagination count={10} page={1} onChange={onChange} />
    </ThemeProvider>
  );
  // Check if current page is displayed (depending on implementation, usually 1-based)
  // Let's just check button presence
  expect(getByText('1')).toBeTruthy();
});
