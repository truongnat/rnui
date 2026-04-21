import { createContext, useContext } from 'react';
import type { StepperContextValue } from './types';

/**
 * Context providing activeStep, orientation, and completed map
 * from the Stepper root to every Step descendant.
 */
export const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepperContext(): StepperContextValue | null {
  return useContext(StepperContext);
}
