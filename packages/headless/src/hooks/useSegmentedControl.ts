import { useState, useCallback } from 'react';

export interface UseSegmentedControlOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export interface UseSegmentedControlReturn<T> {
  value: T;
  setSelectedIndex: (index: number, options: T[]) => void;
  isSelected: (val: T) => boolean;
  getTabProps: (val: T, index: number) => any;
}

export function useSegmentedControl<T>({
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
}: UseSegmentedControlOptions<T>): UseSegmentedControlReturn<T> {
  const [internalValue, setInternalValue] = useState<T>(defaultValue as T);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const isSelected = useCallback((val: T) => value === val, [value]);

  const selectValue = useCallback(
    (val: T) => {
      if (disabled) return;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, isControlled, onChange]
  );

  return {
    value,
    setSelectedIndex: (index: number, options: T[]) =>
      selectValue(options[index]),
    isSelected,
    getTabProps: (val: T, index: number) => ({
      onPress: () => selectValue(val),
      accessibilityRole: 'tab',
      accessibilityState: { selected: isSelected(val), disabled },
    }),
  };
}
