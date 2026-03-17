import { useCallback, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────

export type FieldValidator<T> = (value: T) => string | undefined | Promise<string | undefined>;

export interface UseFieldOptions<T> {
  /** Initial value */
  defaultValue: T;
  /** Sync or async validator — return error string or undefined */
  validate?: FieldValidator<T>;
  /** Run validation on every change (default: only on blur) */
  validateOnChange?: boolean;
}

export interface UseFieldReturn<T> {
  value: T;
  error: string | undefined;
  touched: boolean;
  isValidating: boolean;
  /** Call on input change */
  onChange: (value: T) => void;
  /** Call on input blur */
  onBlur: () => void;
  /** Reset to defaultValue, clear error and touched */
  reset: () => void;
  /** Programmatically set error */
  setError: (error: string | undefined) => void;
  /** Spread onto native TextInput */
  inputProps: {
    value: string;
    onChangeText: (text: string) => void;
    onBlur: () => void;
  };
}

// ─── Hook ─────────────────────────────────────────────────────────

export function useField<T = string>({
  defaultValue,
  validate,
  validateOnChange = false,
}: UseFieldOptions<T>): UseFieldReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState<string | undefined>(undefined);
  const [touched, setTouched] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const runValidation = useCallback(
    async (val: T) => {
      if (!validate) return;
      setIsValidating(true);
      try {
        const result = await validate(val);
        setError(result);
      } catch {
        setError("Validation failed");
      } finally {
        setIsValidating(false);
      }
    },
    [validate]
  );

  const onChange = useCallback(
    (val: T) => {
      setValue(val);
      if (validateOnChange && touched) {
        runValidation(val);
      } else if (error) {
        // Clear error optimistically while typing
        setError(undefined);
      }
    },
    [validateOnChange, touched, error, runValidation]
  );

  const onBlur = useCallback(() => {
    setTouched(true);
    runValidation(value);
  }, [value, runValidation]);

  const reset = useCallback(() => {
    setValue(defaultValue);
    setError(undefined);
    setTouched(false);
    setIsValidating(false);
  }, [defaultValue]);

  return {
    value,
    error,
    touched,
    isValidating,
    onChange,
    onBlur,
    reset,
    setError,
    inputProps: {
      value: String(value),
      onChangeText: (text: string) => onChange(text as unknown as T),
      onBlur,
    },
  };
}