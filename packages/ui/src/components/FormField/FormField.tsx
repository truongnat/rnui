import React from "react";
import { View, Text } from "react-native";
import { useComponentTokens, useTokens } from "@rnui/headless";

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  labelTrailing?: React.ReactNode;
  children: React.ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children,
}: FormFieldProps) {
  const { formField, formControl } = useComponentTokens();
  const tokens = useTokens();

  return (
    <View style={formField.container as any}>
      {/* Label row */}
      {(label || labelTrailing) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: tokens.spacing[1],
          }}
        >
          {label && (
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Text style={formControl.label as any}>
                {label}
              </Text>
              {required && (
                <Text style={formControl.errorText as any}>
                  *
                </Text>
              )}
            </View>
          )}
          {labelTrailing}
        </View>
      )}

      {/* Input slot */}
      {children}

      {/* Error or helper */}
      {error ? (
        <Text
          style={[formControl.errorText, { marginTop: tokens.spacing[1] }] as any}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : helperText ? (
        <Text
          style={[formControl.helperText, { marginTop: tokens.spacing[1] }] as any}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

export interface FormGroupProps {
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
}

export function FormGroup({ children, gap = "md" }: FormGroupProps) {
  const tokens = useTokens();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return <View style={{ gap: gapSize }}>{children}</View>;
}