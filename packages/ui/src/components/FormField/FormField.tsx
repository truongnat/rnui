import React from "react";
import { View, Text } from "react-native";
import { useTokens } from "@rnui/headless";

// ─── FormField ────────────────────────────────────────────────────
// Wraps any input component with consistent label/error/helper layout.
// Use when you need to compose custom inputs with the design system's
// typography and error handling.

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

export function FormField({
  label,
  required = false,
  error,
  helperText,
  labelTrailing,
  children,
}: FormFieldProps) {
  const tokens = useTokens();

  return (
    <View style={{ gap: tokens.spacing[1] }}>
      {/* Label row */}
      {(label || labelTrailing) && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {label && (
            <View style={{ flexDirection: "row", gap: 3 }}>
              <Text
                style={{
                  fontSize: tokens.fontSize.sm,
                  fontWeight: tokens.fontWeight.medium,
                  color: tokens.color.text.secondary,
                }}
              >
                {label}
              </Text>
              {required && (
                <Text
                  style={{
                    fontSize: tokens.fontSize.sm,
                    color: tokens.color.error.text,
                    fontWeight: tokens.fontWeight.medium,
                  }}
                >
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
          style={{
            fontSize: tokens.fontSize.xs,
            color: tokens.color.error.text,
          }}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {error}
        </Text>
      ) : helperText ? (
        <Text
          style={{
            fontSize: tokens.fontSize.xs,
            color: tokens.color.text.tertiary,
          }}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

// ─── FormGroup ────────────────────────────────────────────────────
// Groups multiple FormFields with consistent spacing.

export interface FormGroupProps {
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
}

export function FormGroup({ children, gap = "md" }: FormGroupProps) {
  const tokens = useTokens();
  const gapSize = { sm: tokens.spacing[3], md: tokens.spacing[5], lg: tokens.spacing[7] }[gap];
  return <View style={{ gap: gapSize }}>{children}</View>;
}