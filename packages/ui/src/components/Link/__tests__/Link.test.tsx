import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Link } from '../Link';

test('Link renders and shows text', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Link href="https://example.com">Click Me</Link>
    </ThemeProvider>
  );
  expect(getByText('Click Me')).toBeTruthy();
});
