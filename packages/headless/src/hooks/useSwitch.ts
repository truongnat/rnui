import { useCallback, useState } from 'react';
import { useId } from './useId';

export interface UseSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

export interface UseSwitchReturn {
  checked: boolean;
  disabled: boolean;
  toggle: () => void;
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: 'switch';
    accessibilityState: { checked: boolean; disabled: boolean };
    nativeID: string;
  };
}

export function useSwitch({
  defaultChecked = false,
  checked: controlledChecked,
  onChange,
  disabled = false,
  id: idProp,
}: UseSwitchProps = {}): UseSwitchReturn {
  const id = useId(idProp, 'switch');
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !checked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onChange?.(next);
  }, [disabled, checked, controlledChecked, onChange]);

  return {
    checked,
    disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: 'switch',
      accessibilityState: { checked, disabled },
      nativeID: id,
    },
  };
}
