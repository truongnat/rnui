import React, { useMemo, useState } from "react";
import { TextInput as RNTextInput, View, Text, type TextInputProps as RNTextInputProps } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<RNTextInputProps, "style"> {
  /** Field label shown above input */
  label?: string;
  /** Error message shown below input */
  error?: string;
  /** Helper text shown below input (overridden by error) */
  helperText?: string;
  /** Size preset */
  size?: InputSize;
  /** Slot for leading icon/element inside input */
  leadingElement?: React.ReactNode;
  /** Slot for trailing icon/element inside input */
  trailingElement?: React.ReactNode;
  /** Disable input */
  disabled?: boolean;
}

// ─── Component ────────────────────────────────────────────────────

export function Input({
  label,
  error,
  helperText,
  size = "md",
  leadingElement,
  trailingElement,
  disabled = false,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const { input } = useComponentTokens();
  const tokens = useTokens();
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = useMemo(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled,
  ], [input, size, isFocused, error, disabled]);

  return (
    <View>
      {label && (
        <Text style={input.label}>{label}</Text>
      )}

      <View style={containerStyle}>
        {leadingElement}
        <RNTextInput
          style={{ flex: 1, color: input.text.color, fontSize: input.size[size].fontSize }}
          placeholderTextColor={input.text.placeholderColor}
          editable={!disabled}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {trailingElement}
      </View>

      {error ? (
        <Text style={input.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={input.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}