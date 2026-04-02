import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  TextInput as RNTextInput,
  View,
  Text,
  Animated,
  type TextInputProps as RNTextInputProps,
  type NativeSyntheticEvent,
  type TextInputChangeEventData,
} from "react-native";
import { useComponentTokens, useTokens, useIconStyle } from "@truongdq01/headless";

/** Focus ring color transition duration (ms) — keeps focus feeling snappy vs ~200ms+ */
const FOCUS_BORDER_DURATION_MS = 120;

// ─── Types ────────────────────────────────────────────────────────

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<RNTextInputProps, "style" | "onChange"> {
  /** Callback for when the text changes */
  onChange?: (text: string) => void;
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

  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (error || disabled) return;
    Animated.timing(focusAnim, {
      toValue: isFocused ? 1 : 0,
      duration: FOCUS_BORDER_DURATION_MS,
      useNativeDriver: false,
    }).start();
  }, [isFocused, error, disabled, focusAnim]);

  // Clear error when user starts typing
  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;
    if (!hasTyped && text.length > 0) {
      setHasTyped(true);
      onClearError?.();
    }
    onChange?.(text);
  };

  const defaultBorder = tokens.color.border.input;
  const focusBorder = tokens.color.border.focus;

  const animatedBorderStyle =
    error || disabled
      ? null
      : {
          borderColor: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [defaultBorder, focusBorder],
          }),
          borderWidth: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
          }),
        };

  const staticContainerStyle = useMemo(
    () => [
      input.container,
      input.size[size],
      error && input.state.error,
      disabled && input.state.disabled,
    ],
    [input, size, error, disabled]
  );

  const renderIcon = (icon: React.ReactNode) => {
    if (!icon) return null;
    if (React.isValidElement<{ size?: number | string; color?: string }>(icon)) {
      return React.cloneElement(icon, {
        size: icon.props.size ?? (size === "sm" ? tokens.fontSize.md : iconSize),
        color: icon.props.color ?? iconColor,
      });
    }
    return icon;
  };

  const inner = (
    <>
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
        onChange={handleChange}
        {...rest}
      />
      {renderIcon(trailingElement)}
    </>
  );

  return (
    <View>
      {label && <Text style={input.label}>{label}</Text>}

      {animatedBorderStyle && !error && !disabled ? (
        <Animated.View style={[staticContainerStyle, animatedBorderStyle]}>{inner}</Animated.View>
      ) : (
        <View
          style={[
            staticContainerStyle,
            isFocused && !error && !disabled && input.state.focused,
          ]}
        >
          {inner}
        </View>
      )}

      {error ? (
        <Text style={input.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={input.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
}
