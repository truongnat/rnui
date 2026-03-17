import { useCallback, useState } from "react";

export interface UseSwitchOptions {
  defaultOn?: boolean;
  on?: boolean;
  onChange?: (on: boolean) => void;
  disabled?: boolean;
}

export interface UseSwitchReturn {
  isOn: boolean;
  isDisabled: boolean;
  toggle: () => void;
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: "switch";
    accessibilityState: { checked: boolean; disabled: boolean };
  };
}

export function useSwitch({
  defaultOn = false,
  on: controlledOn,
  onChange,
  disabled = false,
}: UseSwitchOptions = {}): UseSwitchReturn {
  const [internalOn, setInternalOn] = useState(defaultOn);
  const isOn = controlledOn !== undefined ? controlledOn : internalOn;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isOn;
    if (controlledOn === undefined) setInternalOn(next);
    onChange?.(next);
  }, [disabled, isOn, controlledOn, onChange]);

  return {
    isOn,
    isDisabled: disabled,
    toggle,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "switch",
      accessibilityState: { checked: isOn, disabled },
    },
  };
}