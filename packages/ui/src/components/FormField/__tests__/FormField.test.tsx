import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Input } from '../../Input';
import { FormField } from '../FormField';

test('FormField renders label', () => {
  const { getByText } = render(
    <ThemeProvider>
      <FormField label="Email">
        <Input />
      </FormField>
    </ThemeProvider>
  );
  expect(getByText('Email')).toBeTruthy();
});
