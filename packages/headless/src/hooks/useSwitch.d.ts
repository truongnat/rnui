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
    accessibilityRole: 'switch';
    accessibilityState: {
      checked: boolean;
      disabled: boolean;
    };
  };
}
export declare function useSwitch({
  defaultOn,
  on: controlledOn,
  onChange,
  disabled,
}?: UseSwitchOptions): UseSwitchReturn;
//# sourceMappingURL=useSwitch.d.ts.map
