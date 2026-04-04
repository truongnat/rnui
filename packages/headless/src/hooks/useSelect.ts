import { useCallback, useMemo, useState } from 'react';
import { useDisclosure } from './useDisclosure';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface UseSelectOptions<T = string> {
  options: SelectOption<T>[];
  defaultValue?: T | T[];
  value?: T | T[];
  onChange?: (value: T | T[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export interface UseSelectReturn<T = string> {
  selected: T | T[] | undefined;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  selectOption: (value: T) => void;
  clearSelection: () => void;
  isSelected: (value: T) => boolean;
  displayLabel: string;
  triggerProps: {
    onPress: () => void;
    accessibilityState: { expanded: boolean; disabled: boolean };
  };
}

export function useSelect<T = string>({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  multiple = false,
  disabled = false,
  placeholder = 'Select…',
}: UseSelectOptions<T>): UseSelectReturn<T> {
  const [internalValue, setInternalValue] = useState<T | T[] | undefined>(
    defaultValue
  );
  const disclosure = useDisclosure();

  const selected =
    controlledValue !== undefined ? controlledValue : internalValue;

  const selectOption = useCallback(
    (val: T) => {
      if (disabled) return;
      let next: T | T[];
      if (multiple) {
        const arr = Array.isArray(selected) ? selected : [];
        next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
      } else {
        next = val;
        disclosure.close();
      }
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [disabled, multiple, selected, controlledValue, onChange, disclosure]
  );

  const clearSelection = useCallback(() => {
    const next = multiple ? [] : undefined;
    if (controlledValue === undefined)
      setInternalValue(next as T | T[] | undefined);
    if (next !== undefined) onChange?.(next as T | T[]);
  }, [multiple, controlledValue, onChange]);

  const isSelected = useCallback(
    (val: T) => {
      if (!selected) return false;
      if (Array.isArray(selected)) return selected.includes(val);
      return selected === val;
    },
    [selected]
  );

  const displayLabel = useMemo(() => {
    if (!selected || (Array.isArray(selected) && selected.length === 0))
      return placeholder;
    if (Array.isArray(selected)) {
      const optionsMap = new Map();
      for (let i = 0; i < options.length; i++) {
        optionsMap.set(options[i].value, options[i].label);
      }
      const labels = selected.map((v) => optionsMap.get(v)).filter(Boolean);
      return labels.join(', ');
    }
    return options.find((o) => o.value === selected)?.label ?? placeholder;
  }, [selected, options, placeholder]);

  return {
    selected,
    isOpen: disclosure.isOpen,
    open: disclosure.open,
    close: disclosure.close,
    toggle: disclosure.toggle,
    selectOption,
    clearSelection,
    isSelected,
    displayLabel,
    triggerProps: {
      onPress: disabled ? () => {} : disclosure.toggle,
      accessibilityState: { expanded: disclosure.isOpen, disabled },
    },
  };
}
