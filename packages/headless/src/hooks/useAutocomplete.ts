import { useCallback, useMemo, useState } from 'react';
import { useDisclosure } from './useDisclosure';
import { useDebouncedValue } from './useDebouncedValue';

/** Resolves live input vs debounced value so filtering stays usable (no “full list” flash). */
function resolveFilterInput(
  live: string,
  debounced: string,
  debounceMs: number
): string {
  if (debounceMs <= 0) return live;
  if (live.length === 0) return '';
  if (debounced.length === 0) return live;
  if (live.length > debounced.length) return live;
  if (live.length < debounced.length) return live;
  return debounced;
}

export interface UseAutocompleteOptions<T = string> {
  options: T[];
  value?: T | T[];
  defaultValue?: T | T[];
  multiple?: boolean;
  inputValue?: string;
  defaultInputValue?: string;
  onInputChange?: (value: string) => void;
  onChange?: (value: T | T[] | undefined) => void;
  getOptionLabel?: (option: T) => string;
  filterOptions?: (options: T[], inputValue: string) => T[];
  /** When > 0, option filtering uses a debounced query (reduces work while typing). Default 0. */
  filterDebounceMs?: number;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseAutocompleteReturn<T = string> {
  value: T | T[] | undefined;
  inputValue: string;
  setInputValue: (value: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  isSelected: (value: T) => boolean;
  selectOption: (value: T | undefined) => void;
  clear: () => void;
  filteredOptions: T[];
}

export function useAutocomplete<T = string>({
  options,
  value: controlledValue,
  defaultValue,
  multiple = false,
  inputValue: controlledInput,
  defaultInputValue = '',
  onInputChange,
  onChange,
  getOptionLabel,
  filterOptions,
  filterDebounceMs = 0,
  open: controlledOpen,
  onOpen,
  onClose,
}: UseAutocompleteOptions<T>): UseAutocompleteReturn<T> {
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(
    defaultValue
  );
  const [internalInput, setInternalInput] = useState<string>(defaultInputValue);

  const disclosure = useDisclosure({
    isOpen: controlledOpen,
    onOpen,
    onClose,
  });

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const inputValue =
    controlledInput !== undefined ? controlledInput : internalInput;

  const setInputValue = useCallback(
    (next: string) => {
      if (controlledInput === undefined) setInternalInput(next);
      onInputChange?.(next);
    },
    [controlledInput, onInputChange]
  );

  const isSelected = useCallback(
    (v: T) => {
      if (Array.isArray(value)) return value.includes(v);
      return value === v;
    },
    [value]
  );

  const selectOption = useCallback(
    (v: T | undefined) => {
      let next: T | T[] | undefined;
      if (multiple && v !== undefined) {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      } else {
        next = v;
        if (v !== undefined) disclosure.close();
      }

      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);

      if (!multiple && v !== undefined) {
        const label = getOptionLabel ? getOptionLabel(v) : String(v);
        setInputValue(label);
      }
    },
    [
      multiple,
      value,
      controlledValue,
      onChange,
      disclosure,
      getOptionLabel,
      setInputValue,
    ]
  );

  const clear = useCallback(() => {
    if (controlledValue === undefined)
      setInternalValue(multiple ? [] : undefined);
    onChange?.(multiple ? [] : undefined);
    setInputValue('');
  }, [controlledValue, multiple, onChange, setInputValue]);

  const debouncedForFilter = useDebouncedValue(inputValue, filterDebounceMs);
  const filterInput = useMemo(
    () =>
      resolveFilterInput(inputValue, debouncedForFilter, filterDebounceMs),
    [inputValue, debouncedForFilter, filterDebounceMs]
  );

  const filteredOptions = useMemo(() => {
    const trimmed = filterInput.trim();
    if (!trimmed) {
      return [];
    }
    const base = filterOptions ? filterOptions(options, filterInput) : options;
    const labelOf = getOptionLabel ?? ((o: T) => String(o));
    const q = trimmed.toLowerCase();
    return base.filter((opt) => labelOf(opt).toLowerCase().includes(q));
  }, [options, filterInput, filterOptions, getOptionLabel]);

  return {
    value,
    inputValue,
    setInputValue,
    isOpen: disclosure.isOpen,
    open: disclosure.open,
    close: disclosure.close,
    isSelected,
    selectOption,
    clear,
    filteredOptions,
  };
}
