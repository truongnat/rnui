import type React from 'react';

/**
 * Internal context value provided by the Stepper root to all Step descendants.
 */
export interface StepperContextValue {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  /** Map of step index to completed override (undefined = derive from activeStep) */
  completed?: Record<number, boolean>;
}

export interface StepperProps {
  activeStep?: number;
  orientation?: 'horizontal' | 'vertical';
  /** Optional map of explicitly completed steps */
  completed?: Record<number, boolean>;
  children?: React.ReactNode;
}

export interface StepProps {
  index: number;
  label?: string;
  children?: React.ReactNode;
}

/**
 * @internal Props injected by Stepper via React.cloneElement
 */
export interface StepInternalProps extends StepProps {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
}

export interface StepIconProps {
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  activeColor: string;
  completedColor: string;
  pendingColor: string;
}

export interface StepLabelProps {
  children?: React.ReactNode;
  subtitle?: string;
  style?: object;
}

export interface StepContentProps {
  children?: React.ReactNode;
}

export interface StepConnectorProps {
  orientation?: 'horizontal' | 'vertical';
  completed?: boolean;
  active?: boolean;
}
