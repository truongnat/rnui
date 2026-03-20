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
export declare function useAutocomplete<T = string>({ options, value: controlledValue, defaultValue, multiple, inputValue: controlledInput, defaultInputValue, onInputChange, onChange, getOptionLabel, filterOptions, open: controlledOpen, onOpen, onClose, }: UseAutocompleteOptions<T>): UseAutocompleteReturn<T>;
//# sourceMappingURL=useAutocomplete.d.ts.map