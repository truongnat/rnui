import React, { useMemo } from "react";
import { Text, StyleProp, TextStyle } from "react-native";
import { useTokens } from "@truongdq01/headless";

/**
 * Props for the Label component
 */
export interface LabelProps {
  /** Label text content */
  children: React.ReactNode;
  /** @deprecated No-op in React Native. Use nativeID + accessibilityLabelledBy instead. */
  htmlFor?: string;
  /** Sets nativeID for native label association via accessibilityLabelledBy */
  nativeID?: string;
  /** Whether this label is required (shows asterisk) */
  required?: boolean;
  /** Custom styles */
  style?: StyleProp<TextStyle>;
  /** Test ID for testing */
  testID?: string;
}

/**
 * Label component for form inputs and other form controls.
 * Provides accessibility support and visual indication of required fields.
 *
 * @param props - Label configuration props
 * @returns React label component
 *
 * @example
 * ```tsx
 * <Label htmlFor="email-input" required>
 *   Email Address
 * </Label>
 * <Input id="email-input" />
 * ```
 */
export function Label({
  children,
  nativeID,
  required = false,
  style,
  testID = "label",
}: LabelProps) {
  const tokens = useTokens();

  const labelStyle = useMemo(
    () => [{ color: tokens.color.text.primary, fontSize: tokens.fontSize.sm }, style],
    [tokens.color.text.primary, tokens.fontSize.sm, style]
  );

  const asteriskStyle = useMemo(
    () => ({ color: tokens.color.error.text }),
    [tokens.color.error.text]
  );

  return (
    <Text
      nativeID={nativeID}
      style={labelStyle}
      accessible
      accessibilityLabel={typeof children === "string" ? children : undefined}
      testID={testID}
    >
      {children}
      {required && (
        <Text style={asteriskStyle}> *</Text>
      )}
    </Text>
  );
}