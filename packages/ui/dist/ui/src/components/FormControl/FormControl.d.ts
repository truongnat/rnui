import React from "react";
export type FormControlVariant = "filled" | "outlined" | "standard";
export type FormControlMargin = "dense" | "none" | "normal";
interface FormControlContextValue {
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
    focused?: boolean;
    fullWidth?: boolean;
    variant?: FormControlVariant;
}
export declare function useFormControl(): FormControlContextValue | null;
export interface FormControlProps {
    children?: React.ReactNode;
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
    focused?: boolean;
    fullWidth?: boolean;
    variant?: FormControlVariant;
    margin?: FormControlMargin;
    style?: object;
}
export declare function FormControl({ children, error, required, disabled, focused, fullWidth, variant, margin, style, }: FormControlProps): React.JSX.Element;
export interface FormLabelProps {
    children?: React.ReactNode;
    style?: object;
}
export declare function FormLabel({ children, style }: FormLabelProps): React.JSX.Element;
export interface FormHelperTextProps {
    children?: React.ReactNode;
    style?: object;
}
export declare function FormHelperText({ children, style }: FormHelperTextProps): React.JSX.Element;
export interface FormControlLabelProps {
    control: React.ReactElement;
    label?: React.ReactNode;
    labelPlacement?: "end" | "start" | "top" | "bottom";
    disabled?: boolean;
    onPress?: () => void;
    style?: object;
}
export declare function FormControlLabel({ control, label, labelPlacement, disabled, onPress, style, }: FormControlLabelProps): React.JSX.Element;
export {};
//# sourceMappingURL=FormControl.d.ts.map