import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Switch } from '../Switch';
import { ThemeProvider } from '@truongdq01/headless';

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
