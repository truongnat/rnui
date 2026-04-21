import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@truongdq01/headless';
import React from 'react';
import { Step, Stepper } from '../Stepper';

test('Stepper renders steps', () => {
  const { getByText } = render(
    <ThemeProvider>
      <Stepper activeStep={0}>
        <Step index={0} label="Step 1" />
        <Step index={1} label="Step 2" />
      </Stepper>
    </ThemeProvider>
  );
  expect(getByText('Step 1')).toBeTruthy();
  expect(getByText('Step 2')).toBeTruthy();
});
