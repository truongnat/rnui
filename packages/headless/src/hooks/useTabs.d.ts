export interface UseTabsOptions<T = string> {
  defaultValue?: T;
  value?: T;
  onChange?: (value: T) => void;
}
export interface UseTabsReturn<T = string> {
  value: T | undefined;
  setValue: (value: T) => void;
  isSelected: (value: T) => boolean;
  getTabProps: (
    value: T,
    disabled?: boolean
  ) => {
    onPress: () => void;
    accessibilityRole: 'tab';
    accessibilityState: {
      selected: boolean;
      disabled: boolean;
    };
  };
}
export declare function useTabs<T = string>({
  defaultValue,
  value: controlledValue,
  onChange,
}?: UseTabsOptions<T>): UseTabsReturn<T>;
//# sourceMappingURL=useTabs.d.ts.map
