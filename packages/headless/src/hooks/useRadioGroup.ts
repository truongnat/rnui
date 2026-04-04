import { useCallback, useState } from 'react';

export interface UseRadioGroupOptions<T = string> {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

export interface UseRadioGroupReturn<T = string> {
  selectedValue: T | undefined;
  select: (value: T) => void;
  isSelected: (value: T) => boolean;
  isDisabled: boolean;
  getItemProps: (
    value: T,
    itemDisabled?: boolean
  ) => {
    onPress: () => void;
    accessibilityRole: 'radio';
    accessibilityState: { checked: boolean; disabled: boolean };
  };
}

export function useRadioGroup<T = string>({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false,
}: UseRadioGroupOptions<T> = {}): UseRadioGroupReturn<T> {
  const [internalValue, setInternalValue] = useState<T | undefined>(
    defaultValue
  );
  const selectedValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  const select = useCallback(
    (val: T) => {
      if (disabled) return;
      if (controlledValue === undefined) setInternalValue(val);
      onChange?.(val);
    },
    [disabled, controlledValue, onChange]
  );

  const isSelected = useCallback(
    (val: T) => selectedValue === val,
    [selectedValue]
  );

  const getItemProps = useCallback(
    (val: T, itemDisabled = false) => ({
      onPress: () => !itemDisabled && !disabled && select(val),
      accessibilityRole: 'radio' as const,
      accessibilityState: {
        checked: isSelected(val),
        disabled: disabled || itemDisabled,
      },
    }),
    [select, isSelected, disabled]
  );

  return {
    selectedValue,
    select,
    isSelected,
    isDisabled: disabled,
    getItemProps,
  };
}
