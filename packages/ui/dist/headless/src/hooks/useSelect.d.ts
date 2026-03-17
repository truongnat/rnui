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
        accessibilityState: {
            expanded: boolean;
            disabled: boolean;
        };
    };
}
export declare function useSelect<T = string>({ options, defaultValue, value: controlledValue, onChange, multiple, disabled, placeholder, }: UseSelectOptions<T>): UseSelectReturn<T>;
//# sourceMappingURL=useSelect.d.ts.map