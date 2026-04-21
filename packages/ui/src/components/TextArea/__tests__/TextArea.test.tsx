import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { TextArea } from '../TextArea';

test('TextArea renders placeholder', () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <TextArea placeholder="Tell us more" />
    </ThemeProvider>
  );
  expect(getByPlaceholderText('Tell us more')).toBeTruthy();
});
