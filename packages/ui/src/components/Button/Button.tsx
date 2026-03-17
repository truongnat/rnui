import React, { useMemo } from "react";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { usePressable, useComponentTokens } from "@rnui/headless";
import type { PressFeedbackMode } from "@rnui/headless";

// ─── Types ────────────────────────────────────────────────────────

export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Size preset */
  size?: ButtonSize;
  /** Button label */
  label: string;
  /** Called on press */
  onPress?: () => void;
  /** Called on long press */
  onLongPress?: () => void;
  /** Disable all interaction and apply disabled styles */
  disabled?: boolean;
  /** Show loading spinner, disable interaction */
  loading?: boolean;
  /** Slot for leading icon */
  leadingIcon?: React.ReactNode;
  /** Slot for trailing icon */
  trailingIcon?: React.ReactNode;
  /** Override press feedback mode */
  feedbackMode?: PressFeedbackMode;
  /** Fill container width */
  fullWidth?: boolean;
  /** Accessibility label override (defaults to label) */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
}

// ─── Component ────────────────────────────────────────────────────

export function Button({
  variant = "solid",
  size = "md",
  label,
  onPress,
  onLongPress,
  disabled = false,
  loading = false,
  leadingIcon,
  trailingIcon,
  feedbackMode = "scale",
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  const { button } = useComponentTokens();
  const isDisabled = disabled || loading;

  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress,
    onLongPress,
    disabled: isDisabled,
    feedbackMode,
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityHint,
    accessibilityRole: "button",
    haptic: true,
  });

  // Resolve styles from component tokens — only recomputes on theme change
  const containerStyle = useMemo(() => [
    button.variant[variant].container,
    button.size[size].container,
    fullWidth && { alignSelf: "stretch" as const },
    isDisabled && button.disabled.container,
  ], [button, variant, size, fullWidth, isDisabled]);

  const textStyle = useMemo(() => [
    button.variant[variant].text,
    button.size[size].text,
  ], [button, variant, size]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[containerStyle, animatedStyle, { position: "relative" }]}
        {...accessibilityProps}
      >
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: button.variant[variant].container.gap,
          opacity: loading ? 0 : 1
        }}>
          {leadingIcon}
          <Text style={textStyle}>{label}</Text>
          {trailingIcon}
        </View>

        {loading && (
          <View style={[StyleSheet.absoluteFill, { alignItems: "center", justifyContent: "center" }]}>
            <ActivityIndicator
              size="small"
              color={String(button.variant[variant].text.color)}
            />
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
}