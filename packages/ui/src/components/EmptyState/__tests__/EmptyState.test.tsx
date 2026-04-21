import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { EmptyState } from '../EmptyState';

test('EmptyState renders title and description', () => {
  const { getByText } = render(
    <ThemeProvider>
      <EmptyState title="No Data" description="Check back later" />
    </ThemeProvider>
  );
  expect(getByText('No Data')).toBeTruthy();
  expect(getByText('Check back later')).toBeTruthy();
});
