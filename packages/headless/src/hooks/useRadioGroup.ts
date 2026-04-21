import { useCallback, useState } from 'react';
import { useId } from './useId';

export interface UseRadioGroupOptions<T = string> {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  id?: string;
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
    nativeID: string;
  };
}

export function useRadioGroup<T = string>({
  defaultValue,
  value: controlledValue,
  onChange,
  disabled = false,
  id: idProp,
}: UseRadioGroupOptions<T> = {}): UseRadioGroupReturn<T> {
  const id = useId(idProp, 'radio-group');
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
      nativeID: `${id}-${String(val)}`,
    }),
    [select, isSelected, disabled, id]
  );

  return {
    selectedValue,
    select,
    isSelected,
    isDisabled: disabled,
    getItemProps,
  };
}
