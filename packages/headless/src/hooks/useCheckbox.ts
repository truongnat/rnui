import { useCallback, useState } from "react";

export interface UseCheckboxOptions {
  defaultChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface UseCheckboxReturn {
  isChecked: boolean;
  isIndeterminate: boolean;
  isDisabled: boolean;
  toggle: () => void;
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: "checkbox";
    accessibilityState: { checked: boolean | "mixed"; disabled: boolean };
  };
}

export function useCheckbox({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  indeterminate = false,
}: UseCheckboxOptions = {}): UseCheckboxReturn {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

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
      accessibilityRole: "checkbox",
      accessibilityState: {
        checked: indeterminate ? "mixed" : isChecked,
        disabled,
      },
    },
  };
}