import React, { useState } from "react";
import { Input, type InputProps } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import { Select, type SelectProps } from "../Select/Select";
import { Pressable, View } from "react-native";
import { useTokens } from "@rnui/headless";

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
  type?: "text" | "password" | "email" | "number";
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
  type = "text",
  label,
  ...rest
}: TextFieldProps) {
  const tokens = useTokens();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  
  const labelText = required && label ? `${label} *` : label;
  const errorText = typeof error === "string" ? error : error ? helperText : undefined;

  const trailingElement = isPassword ? (
    <Pressable 
      onPress={() => setShowPassword(!showPassword)}
      style={{ padding: 4 }}
    >
      <View style={{ 
        width: 20, 
        height: 20, 
        borderRadius: 10, 
        backgroundColor: tokens.color.bg.muted,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <View style={{
          width: showPassword ? 12 : 8,
          height: 2,
          backgroundColor: tokens.color.text.secondary,
          borderRadius: 1,
        }} />
      </View>
    </Pressable>
  ) : rest.trailingElement;

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
      trailingElement={trailingElement}
      secureTextEntry={isPassword && !showPassword}
      {...rest}
    />
  );
}
