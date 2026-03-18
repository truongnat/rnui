import React from "react";
import { type InputProps } from "../Input/Input";
import { type SelectProps } from "../Select/Select";
export interface TextFieldProps extends Omit<InputProps, "error"> {
    variant?: "outlined" | "filled" | "standard";
    multiline?: boolean;
    rows?: number;
    maxRows?: number;
    minRows?: number;
    helperText?: string;
    error?: boolean | string;
    required?: boolean;
    select?: boolean;
    selectProps?: SelectProps<any>;
}
export declare function TextField({ variant, multiline, rows, maxRows, minRows, helperText, error, required, select, selectProps, label, ...rest }: TextFieldProps): React.JSX.Element;
//# sourceMappingURL=TextField.d.ts.map