import React, { useMemo, useState } from "react";
import { TextInput as RNTextInput, View, Text, type TextInputProps as RNTextInputProps } from "react-native";
import { useComponentTokens, useTokens, useIconStyle } from "@rnui/headless";

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
  /** Callback when error should be cleared (called on first keystroke) */
  onClearError?: () => void;
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
  onClearError,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: InputProps) {
  const { input } = useComponentTokens();
  const tokens = useTokens();
  const { size: iconSize, color: iconColor } = useIconStyle("input");
  const [isFocused, setIsFocused] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  // Clear error when user starts typing
  const handleChange = (e: any) => {
    const text = e.nativeEvent.text;
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };

  const containerStyle = useMemo(() => [
    input.container,
    input.size[size],
    isFocused && input.state.focused,
    error && input.state.error,
    disabled && input.state.disabled,
  ], [input, size, isFocused, error, disabled]);

  // Helper to clone icon with standardized props
  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement, {
        size: (icon.props as any)?.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: (icon.props as any)?.color ?? iconColor,
      } as any);
    }
    return icon;
  };

  return (
    <View>
      {label && (
        <Text style={input.label}>{label}</Text>
      )}

      <View style={containerStyle}>
        {renderIcon(leadingElement)}
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
          onChange={(e) => {
            handleChange(e.nativeEvent.text);
          }}
          {...rest}
        />
        {renderIcon(trailingElement)}
      </View>

      {error ? (
        <Text style={input.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={input.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}