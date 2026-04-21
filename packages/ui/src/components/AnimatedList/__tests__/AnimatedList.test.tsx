import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Text } from 'react-native';
import { AnimatedList } from '../AnimatedList';

test('AnimatedList renders items', () => {
  const data = ['Item 1', 'Item 2'];
  const { getByText } = render(
    <ThemeProvider>
      <AnimatedList
        data={data}
        estimatedItemSize={50}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </ThemeProvider>
  );
  expect(getByText('Item 1')).toBeTruthy();
});
