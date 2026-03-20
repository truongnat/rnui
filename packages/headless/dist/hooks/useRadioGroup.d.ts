export interface UseRadioGroupOptions<T = string> {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
    disabled?: boolean;
}
export interface UseRadioGroupReturn<T = string> {
    selectedValue: T | undefined;
    select: (value: T) => void;
    isSelected: (value: T) => boolean;
    isDisabled: boolean;
    getItemProps: (value: T, itemDisabled?: boolean) => {
        onPress: () => void;
        accessibilityRole: "radio";
        accessibilityState: {
            checked: boolean;
            disabled: boolean;
        };
    };
}
export declare function useRadioGroup<T = string>({ defaultValue, value: controlledValue, onChange, disabled, }?: UseRadioGroupOptions<T>): UseRadioGroupReturn<T>;
//# sourceMappingURL=useRadioGroup.d.ts.map