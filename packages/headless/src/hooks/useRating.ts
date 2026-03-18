import { useCallback, useState } from "react";

export interface UseRatingOptions {
  value?: number;
  defaultValue?: number;
  max?: number;
  precision?: number;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

export interface UseRatingReturn {
  value: number;
  setValue: (value: number) => void;
  max: number;
  precision: number;
  disabled: boolean;
  readOnly: boolean;
}

export function useRating({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  precision = 1,
  disabled = false,
  readOnly = false,
  onChange,
}: UseRatingOptions = {}): UseRatingReturn {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: number) => {
      if (disabled || readOnly) return;
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, readOnly, controlledValue, onChange]
  );

  return { value, setValue, max, precision, disabled, readOnly };
}
