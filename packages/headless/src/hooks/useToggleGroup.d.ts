export interface UseToggleGroupOptions<T = string> {
    value?: T | T[];
    defaultValue?: T | T[];
    onChange?: (value: T | T[] | undefined) => void;
    exclusive?: boolean;
    disabled?: boolean;
}
export interface UseToggleGroupReturn<T = string> {
    value: T | T[] | undefined;
    isSelected: (value: T) => boolean;
    toggle: (value: T) => void;
}
export declare function useToggleGroup<T = string>({ value: controlledValue, defaultValue, onChange, exclusive, disabled, }?: UseToggleGroupOptions<T>): UseToggleGroupReturn<T>;
//# sourceMappingURL=useToggleGroup.d.ts.map