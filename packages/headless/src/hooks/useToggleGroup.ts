import { useCallback, useState } from 'react';

export interface UseToggleGroupOptions<T = string> {
  value?: T | T[];
  defaultValue?: T | T[];
  onChange?: (value: T | T[] | undefined) => void;
  exclusive?: boolean;
  disabled?: boolean;
}

export interface UseToggleGroupReturn<T = string> {
  value: T | T[] | undefined;
  isSelected: (value: T) => boolean;
  toggle: (value: T) => void;
}

export function useToggleGroup<T = string>({
  value: controlledValue,
  defaultValue,
  onChange,
  exclusive = false,
  disabled = false,
}: UseToggleGroupOptions<T> = {}): UseToggleGroupReturn<T> {
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(
    defaultValue
  );
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const isSelected = useCallback(
    (v: T) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );

  const toggle = useCallback(
    (v: T) => {
      if (disabled) return;

      let next: T | T[] | undefined;
      if (exclusive) {
        next = value === v ? undefined : v;
      } else {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      }

      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, exclusive, value, controlledValue, onChange]
  );

  return { value, isSelected, toggle };
}
