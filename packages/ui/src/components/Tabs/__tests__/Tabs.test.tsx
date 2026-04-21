import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Tab, Tabs } from '../Tabs';

test('Tabs handles change', () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <ThemeProvider>
      <Tabs value="a" onChange={onChange}>
        <Tab value="a" label="Tab A" />
        <Tab value="b" label="Tab B" />
      </Tabs>
    </ThemeProvider>
  );

  fireEvent.press(getByText('Tab B'));
  expect(onChange).toHaveBeenCalledWith('b');
});
