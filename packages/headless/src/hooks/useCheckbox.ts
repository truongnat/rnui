import { useCallback, useState } from 'react';
import { useId } from './useId';

export interface UseCheckboxOptions {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  id?: string;
}

export interface UseCheckboxReturn {
  isChecked: boolean;
  isIndeterminate: boolean;
  isDisabled: boolean;
  toggle: () => void;
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: 'checkbox';
    accessibilityState: { checked: boolean | 'mixed'; disabled: boolean };
    nativeID: string;
  };
}

export function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false,
  id: idProp,
}: UseCheckboxOptions = {}): UseCheckboxReturn {
  const id = useId(idProp, 'checkbox');
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked =
    controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, isChecked, controlledChecked, onChange]);

  return {
    isChecked,
    isIndeterminate: indeterminate,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: 'checkbox',
      accessibilityState: {
        checked: indeterminate ? 'mixed' : isChecked,
        disabled,
      },
      nativeID: id,
    },
  };
}
