export interface UseRatingOptions {
    value?: number;
    defaultValue?: number;
    max?: number;
    precision?: number;
    disabled?: boolean;
    readOnly?: boolean;
    onChange?: (value: number) => void;
}
export interface UseRatingReturn {
    value: number;
    setValue: (value: number) => void;
    max: number;
    precision: number;
    disabled: boolean;
    readOnly: boolean;
}
export declare function useRating({ value: controlledValue, defaultValue, max, precision, disabled, readOnly, onChange, }?: UseRatingOptions): UseRatingReturn;
//# sourceMappingURL=useRating.d.ts.map