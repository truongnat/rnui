import React from "react";
export interface AutocompleteProps<T = string> {
    options: T[];
    value?: T | T[];
    defaultValue?: T | T[];
    multiple?: boolean;
    getOptionLabel?: (option: T) => string;
    renderOption?: (option: T, selected: boolean) => React.ReactNode;
    onChange?: (value: T | T[] | undefined) => void;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
}
export declare function Autocomplete<T = string>({ options, value, defaultValue, multiple, getOptionLabel, renderOption, onChange, inputValue, onInputChange, placeholder, label, disabled, }: AutocompleteProps<T>): React.JSX.Element;
//# sourceMappingURL=Autocomplete.d.ts.map