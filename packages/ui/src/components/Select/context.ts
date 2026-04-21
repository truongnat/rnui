import type { SelectOption } from '@truongdq01/headless';
import { createContext, useContext } from 'react';

/**
 * Shape of the shared Select state exposed via context.
 */
export interface SelectContextValue<T = string> {
  /** Currently open/closed state of the dropdown */
  isOpen: boolean;
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Select (or toggle) a value */
  selectOption: (value: T) => void;
  /** Whether a given value is currently selected */
  isSelected: (value: T) => boolean;
  /** Resolved display label (selected value label or placeholder) */
  displayLabel: string;
  /** The resolved option list visible to dropdown */
  options: SelectOption<T>[];
  /** Whether multi-select is active */
  multiple?: boolean;
}

export const SelectContext = createContext<SelectContextValue<any> | null>(null);

/**
 * Consume Select state from any child of the Select tree.
 * Throws if used outside a <Select> root.
 */
export function useSelectContext<T = string>(): SelectContextValue<T> {
  const ctx = useContext(SelectContext) as SelectContextValue<T> | null;
  if (!ctx) {
    throw new Error('useSelectContext must be used inside a <Select> component');
  }
  return ctx;
}
