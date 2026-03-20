export type FieldValidator<T> = (value: T) => string | undefined | Promise<string | undefined>;
export interface UseFieldOptions<T> {
    /** Initial value */
    defaultValue: T;
    /** Sync or async validator — return error string or undefined */
    validate?: FieldValidator<T>;
    /** Run validation on every change (default: only on blur) */
    validateOnChange?: boolean;
}
export interface UseFieldReturn<T> {
    value: T;
    error: string | undefined;
    touched: boolean;
    isValidating: boolean;
    /** Call on input change */
    onChange: (value: T) => void;
    /** Call on input blur */
    onBlur: () => void;
    /** Reset to defaultValue, clear error and touched */
    reset: () => void;
    /** Programmatically set error */
    setError: (error: string | undefined) => void;
    /** Run validation manually */
    validate: () => Promise<string | undefined>;
    /** Spread onto native TextInput */
    inputProps: {
        value: string;
        onChangeText: (text: string) => void;
        onBlur: () => void;
    };
}
export declare function useField<T = string>({ defaultValue, validate, validateOnChange, }: UseFieldOptions<T>): UseFieldReturn<T>;
//# sourceMappingURL=useField.d.ts.map