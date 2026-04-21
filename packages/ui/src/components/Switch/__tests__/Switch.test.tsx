import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Switch } from '../Switch';

test('Switch handles toggle', () => {
  const onValueChange = jest.fn();
  const { getByRole } = render(
    <ThemeProvider>
      <Switch on={false} onChange={onValueChange} />
    </ThemeProvider>
  );
  fireEvent.press(getByRole('switch'));
  expect(onValueChange).toHaveBeenCalledWith(true);
});
