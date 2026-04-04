import React from 'react';
import { render } from '@testing-library/react-native';
import { TextArea } from '../TextArea';
import { ThemeProvider } from '@truongdq01/headless';

test('TextArea renders placeholder', () => {
  const { getByPlaceholderText } = render(
    <ThemeProvider>
      <TextArea placeholder="Tell us more" />
    </ThemeProvider>
  );
  expect(getByPlaceholderText('Tell us more')).toBeTruthy();
});
