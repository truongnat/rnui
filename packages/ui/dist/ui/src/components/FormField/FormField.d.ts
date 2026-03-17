import React from "react";
export interface FormFieldProps {
    label?: string;
    /** Required indicator (*) */
    required?: boolean;
    error?: string;
    helperText?: string;
    /** Optional trailing slot next to label — e.g. "Forgot password?" link */
    labelTrailing?: React.ReactNode;
    /** The actual input component */
    children: React.ReactNode;
}
export declare function FormField({ label, required, error, helperText, labelTrailing, children, }: FormFieldProps): React.JSX.Element;
export interface FormGroupProps {
    children: React.ReactNode;
    gap?: "sm" | "md" | "lg";
}
export declare function FormGroup({ children, gap }: FormGroupProps): React.JSX.Element;
//# sourceMappingURL=FormField.d.ts.map