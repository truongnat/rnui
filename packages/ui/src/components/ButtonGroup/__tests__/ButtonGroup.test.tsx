import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Button } from '../../Button';
import { ButtonGroup } from '../ButtonGroup';

test('ButtonGroup renders children', () => {
  const { getByText } = render(
    <ThemeProvider>
      <ButtonGroup>
        <Button label="One" />
        <Button label="Two" />
      </ButtonGroup>
    </ThemeProvider>
  );
  expect(getByText('One')).toBeTruthy();
  expect(getByText('Two')).toBeTruthy();
});
