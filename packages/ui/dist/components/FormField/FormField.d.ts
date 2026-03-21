import React from "react";
export interface FormFieldProps {
    label?: string;
    required?: boolean;
    error?: string;
    helperText?: string;
    labelTrailing?: React.ReactNode;
    children: React.ReactNode;
}
export declare function FormField({ label, required, error, helperText, labelTrailing, children, }: FormFieldProps): React.JSX.Element;
export interface FormGroupProps {
    children: React.ReactNode;
    gap?: "sm" | "md" | "lg";
}
export declare function FormGroup({ children, gap }: FormGroupProps): React.JSX.Element;
//# sourceMappingURL=FormField.d.ts.map