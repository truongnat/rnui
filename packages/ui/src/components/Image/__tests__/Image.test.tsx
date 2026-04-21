import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { RnImage } from '../Image';

test('RnImage renders', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <RnImage
        source={{ uri: 'https://picsum.photos/200' }}
        style={{ width: 100, height: 100 }}
      />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
