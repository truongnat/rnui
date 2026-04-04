import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Checkbox } from '../Checkbox';
import { ThemeProvider } from '@truongdq01/headless';

test('Checkbox handles press', () => {
  const onPress = jest.fn();
  const { getByRole } = render(
    <ThemeProvider>
      <Checkbox label="Accept" checked={false} onChange={onPress} />
    </ThemeProvider>
  );
  fireEvent.press(getByRole('checkbox'));
  expect(onPress).toHaveBeenCalled();
});
