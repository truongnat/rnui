import React from "react";
import { Input, type InputProps } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import { Select, type SelectProps } from "../Select/Select";

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

export function TextField({
  variant = "outlined",
  multiline = false,
  rows,
  maxRows,
  minRows,
  helperText,
  error,
  required = false,
  select = false,
  selectProps,
  label,
  ...rest
}: TextFieldProps) {
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : undefined;

  if (select) {
    return (
      <Select
        label={labelText}
        error={errorText}
        {...(selectProps as any)}
      />
    );
  }

  if (multiline) {
    return (
      <TextArea
        label={labelText}
        error={errorText}
        helperText={errorText ? undefined : helperText}
        minLines={minRows ?? rows ?? 3}
        maxLines={maxRows ?? 8}
        {...(rest as any)}
      />
    );
  }

  return (
    <Input
      label={labelText}
      error={errorText}
      helperText={errorText ? undefined : helperText}
      {...rest}
    />
  );
}
