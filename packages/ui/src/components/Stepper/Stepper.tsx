import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { StepperContext } from './context';
import type { StepperProps } from './types';

/**
 * Root Stepper component. Provides orientation + active step context and
 * lays out Step children in a row (horizontal) or column (vertical).
 */
export function Stepper({
  activeStep = 0,
  orientation = 'horizontal',
  completed,
  children,
}: StepperProps) {
  const {
    components: { stepper },
  } = useTheme();

  const ctx = useMemo(
    () => ({ activeStep, orientation, completed }),
    [activeStep, orientation, completed]
  );

  const containerStyle = useMemo(
    () => [
      stepper.container,
      { flexDirection: orientation === 'horizontal' ? ('row' as const) : ('column' as const) },
    ],
    [stepper.container, orientation]
  );

  return (
    <StepperContext.Provider value={ctx}>
      <View style={containerStyle}>{children}</View>
    </StepperContext.Provider>
  );
}
