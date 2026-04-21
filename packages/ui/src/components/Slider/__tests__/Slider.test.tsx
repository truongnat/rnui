import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Slider } from '../Slider';

test('Slider renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Slider value={50} min={0} max={100} />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
