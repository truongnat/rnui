import { useCallback, useState } from "react";

export interface UseTabsOptions<T = string> {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
}

export interface UseTabsReturn<T = string> {
  value: T | undefined;
  setValue: (value: T) => void;
  isSelected: (value: T) => boolean;
  getTabProps: (value: T, disabled?: boolean) => {
    onPress: () => void;
    accessibilityRole: "tab";
    accessibilityState: { selected: boolean; disabled: boolean };
  };
}

export function useTabs<T = string>({
  defaultValue,
  value: controlledValue,
  onChange,
}: UseTabsOptions<T> = {}): UseTabsReturn<T> {
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );

  const isSelected = useCallback(
    (v: T) => value === v,
    [value]
  );

  const getTabProps = useCallback(
    (v: T, disabled = false) => ({
      onPress: () => {
        if (disabled) return;
        setValue(v);
      },
      accessibilityRole: "tab" as const,
      accessibilityState: { selected: value === v, disabled },
    }),
    [setValue, value]
  );

  return { value, setValue, isSelected, getTabProps };
}
