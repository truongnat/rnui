import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { AnimatedList } from '../AnimatedList';

test('AnimatedList renders without crashing', () => {
  render(
    <ThemeProvider>
      <AnimatedList
        data={[]}
        estimatedItemSize={50}
        renderItem={({ item }) => null}
      />
    </ThemeProvider>
  );
  // If we get here without error, the test passes
  expect(true).toBe(true);
});
