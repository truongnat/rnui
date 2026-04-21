import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Icon } from '../Icon';

test('Icon renders without crashing', () => {
  const { toJSON } = render(
    <ThemeProvider>
      <Icon name="star" />
    </ThemeProvider>
  );
  expect(toJSON()).toBeTruthy();
});
