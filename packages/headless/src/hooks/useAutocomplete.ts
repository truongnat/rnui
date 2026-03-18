import { useCallback, useMemo, useState } from "react";
import { useDisclosure } from "./useDisclosure";

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
  selectOption: (value: T) => void;
  clear: () => void;
  filteredOptions: T[];
}

export function useAutocomplete<T = string>({
  options,
  value: controlledValue,
  defaultValue,
  multiple = false,
  inputValue: controlledInput,
  defaultInputValue = "",
  onInputChange,
  onChange,
  getOptionLabel,
  filterOptions,
  open: controlledOpen,
  onOpen,
  onClose,
}: UseAutocompleteOptions<T>): UseAutocompleteReturn<T> {
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(defaultValue);
  const [internalInput, setInternalInput] = useState<string>(defaultInputValue);

  const disclosure = useDisclosure({
    isOpen: controlledOpen,
    onOpen,
    onClose,
  });

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const inputValue = controlledInput !== undefined ? controlledInput : internalInput;

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
    (v: T) => {
      let next: T | T[] | undefined;
      if (multiple) {
        const arr = Array.isArray(value) ? value : [];
        next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      } else {
        next = v;
        disclosure.close();
      }

      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);

      if (!multiple) {
        const label = getOptionLabel ? getOptionLabel(v) : String(v);
        setInputValue(label);
      }
    },
    [multiple, value, controlledValue, onChange, disclosure, getOptionLabel, setInputValue]
  );

  const clear = useCallback(() => {
    if (controlledValue === undefined) setInternalValue(multiple ? [] : undefined);
    onChange?.(multiple ? [] : undefined);
    setInputValue("");
  }, [controlledValue, multiple, onChange, setInputValue]);

  const filteredOptions = useMemo(() => {
    const base = filterOptions ? filterOptions(options, inputValue) : options;
    if (!inputValue) return base;
    const labelOf = getOptionLabel ?? ((o: T) => String(o));
    return base.filter((opt) => labelOf(opt).toLowerCase().includes(inputValue.toLowerCase()));
  }, [options, inputValue, filterOptions, getOptionLabel]);

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
