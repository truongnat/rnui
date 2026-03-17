export interface UseCheckboxOptions {
    defaultChecked?: boolean;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    indeterminate?: boolean;
}
export interface UseCheckboxReturn {
    isChecked: boolean;
    isIndeterminate: boolean;
    isDisabled: boolean;
    toggle: () => void;
    accessibilityProps: {
        accessible: boolean;
        accessibilityRole: "checkbox";
        accessibilityState: {
            checked: boolean | "mixed";
            disabled: boolean;
        };
    };
}
export declare function useCheckbox({ defaultChecked, checked: controlledChecked, onChange, disabled, indeterminate, }?: UseCheckboxOptions): UseCheckboxReturn;
//# sourceMappingURL=useCheckbox.d.ts.map