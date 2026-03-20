import React, { useMemo } from "react";
import { View, Text, type ViewStyle } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable, useTokens, useIconStyle } from "@rnui/headless";

export interface FabProps {
  variant?: "circular" | "extended";
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  disabled?: boolean;
  label?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
}

const SIZE = {
  sm: 40,
  md: 56,
  lg: 64,
};

export function Fab({
  variant = "circular",
  size = "md",
  color = "primary",
  disabled = false,
  label,
  icon,
  onPress,
  accessibilityLabel,
}: FabProps) {
  const tokens = useTokens();
  const { size: iconSize } = useIconStyle("button");

  const bgMap: Record<string, string> = {
    default: tokens.color.bg.emphasis,
    primary: tokens.color.brand.default,
    secondary: tokens.color.brand.muted,
    success: tokens.color.success.bg,
    error: tokens.color.error.bg,
    info: tokens.color.info.bg,
    warning: tokens.color.warning.bg,
  };

  const textMap: Record<string, string> = {
    default: tokens.color.text.primary,
    primary: "#fff",
    secondary: tokens.color.brand.text,
    success: tokens.color.success.text,
    error: tokens.color.error.text,
    info: tokens.color.info.text,
    warning: tokens.color.warning.text,
  };

  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress,
    disabled,
    feedbackMode: "scale",
    accessibilityLabel: accessibilityLabel ?? label,
    accessibilityRole: "button",
  });

  const containerStyle = useMemo<ViewStyle>(() => {
    const dim = SIZE[size];
    return {
      height: dim,
      borderRadius: variant === "circular" ? dim / 2 : dim / 2,
      paddingHorizontal: variant === "extended" ? tokens.spacing[5] : 0,
      minWidth: variant === "extended" ? dim + tokens.spacing[6] : dim,
      backgroundColor: bgMap[color],
      alignItems: "center" as const,
      justifyContent: "center" as const,
      flexDirection: "row" as const,
      gap: tokens.spacing[2],
      opacity: disabled ? tokens.opacity[60] : 1,
      ...tokens.shadow.md,
    };
  }, [size, variant, tokens, color, disabled]);

  const renderIcon = (el: React.ReactNode) => {
    if (!el) return null;
    if (React.isValidElement(el)) {
      return React.cloneElement(el as React.ReactElement, {
        size: (el.props as any)?.size ?? iconSize,
        color: (el.props as any)?.color ?? textMap[color],
      } as any);
    }
    return el;
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[containerStyle, animatedStyle] as any} {...accessibilityProps}>
        {renderIcon(icon)}
        {variant === "extended" && label && (
          <Text style={{ color: textMap[color], fontWeight: tokens.fontWeight.semibold }}>
            {label}
          </Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
