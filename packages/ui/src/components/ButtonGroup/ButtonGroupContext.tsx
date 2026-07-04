import { createContext, useContext } from 'react';
import type { ButtonGroupOrientation } from './buttonGroupStyles';

export interface ButtonGroupContextValue {
  orientation: ButtonGroupOrientation;
  isDisabled: boolean;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(
  null
);

export function useButtonGroup(): ButtonGroupContextValue | null {
  return useContext(ButtonGroupContext);
}
