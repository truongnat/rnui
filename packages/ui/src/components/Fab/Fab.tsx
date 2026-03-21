import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable, useComponentTokens } from "@rnui/headless";
import { Icon } from "../Icon";

export interface FabProps {
  icon?: React.ReactNode;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning";
  size?: "sm" | "md" | "lg";
  variant?: "circular" | "extended";
  accessibilityLabel?: string;
}

export function Fab({
  icon,
  label,
  onPress,
  disabled = false,
  color = "primary",
  size = "md",
  variant = "circular",
  accessibilityLabel,
}: FabProps) {
  const { fab } = useComponentTokens();
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    disabled,
    feedbackMode: "scale",
    accessibilityLabel: accessibilityLabel ?? label ?? (typeof icon === "string" ? icon : "FAB"),
    accessibilityRole: "button",
  });

  const isExtended = variant === "extended" && !!label;
  
  // Base color from tokens
  const baseColor = (fab as any).variant[color]?.backgroundColor ?? (fab as any).variant.primary.backgroundColor;
  const textColor = "#FFFFFF";

  const sizeMap = {
    sm: { size: 40, iconSize: 20 },
    md: { size: 56, iconSize: 24 },
    lg: { size: 72, iconSize: 28 },
  };

  const s = sizeMap[size];

  const containerStyle = [
    fab.container,
    {
      backgroundColor: baseColor,
      height: s.size,
      minWidth: s.size,
      borderRadius: s.size / 2,
      paddingHorizontal: isExtended ? 20 : 0,
    },
    disabled && { opacity: 0.5 },
    animatedStyle,
  ];

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={containerStyle as any} {...accessibilityProps}>
        <View style={styles.content}>
          {icon && (
            <Icon size={s.iconSize} color={textColor}>
              {icon}
            </Icon>
          )}
          {isExtended && (
            <Text style={[styles.label, { marginLeft: icon ? 8 : 0 }]}>
              {label}
            </Text>
          )}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    textTransform: "uppercase",
  },
});
