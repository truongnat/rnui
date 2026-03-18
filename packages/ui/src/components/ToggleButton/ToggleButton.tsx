import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable, useTokens, useToggleGroup } from "@rnui/headless";

export interface ToggleButtonGroupProps<T = string> {
  value?: T | T[];
  defaultValue?: T | T[];
  exclusive?: boolean;
  onChange?: (value: T | T[] | undefined) => void;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface ToggleButtonProps<T = string> {
  value: T;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface ToggleContextValue<T = string> {
  isSelected: (value: T) => boolean;
  toggle: (value: T) => void;
  size: "sm" | "md" | "lg";
  disabled: boolean;
}

const ToggleContext = createContext<ToggleContextValue<any> | null>(null);

export function ToggleButtonGroup<T = string>({
  value,
  defaultValue,
  exclusive = false,
  onChange,
  orientation = "horizontal",
  size = "md",
  disabled = false,
  children,
}: ToggleButtonGroupProps<T>) {
  const { isSelected, toggle } = useToggleGroup<T>({
    value,
    defaultValue,
    exclusive,
    disabled,
    onChange,
  });

  return (
    <ToggleContext.Provider value={{ isSelected, toggle, size, disabled }}>
      <View style={{ flexDirection: orientation === "horizontal" ? "row" : "column", gap: 8 }}>
        {children}
      </View>
    </ToggleContext.Provider>
  );
}

export function ToggleButton<T = string>({ value, disabled = false, children }: ToggleButtonProps<T>) {
  const tokens = useTokens();
  const ctx = useContext(ToggleContext as React.Context<ToggleContextValue<T> | null>);

  const selected = ctx?.isSelected(value) ?? false;
  const isDisabled = disabled || ctx?.disabled;

  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress: () => ctx?.toggle(value),
    disabled: isDisabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "button",
  });

  const sizeMap = {
    sm: { height: 32, paddingHorizontal: 12, fontSize: tokens.fontSize.sm },
    md: { height: 40, paddingHorizontal: 16, fontSize: tokens.fontSize.md },
    lg: { height: 48, paddingHorizontal: 20, fontSize: tokens.fontSize.lg },
  };

  const s = sizeMap[ctx?.size ?? "md"];

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height: s.height,
            paddingHorizontal: s.paddingHorizontal,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: selected ? tokens.color.brand.default : tokens.color.border.default,
            backgroundColor: selected ? tokens.color.brand.subtle : tokens.color.surface.default,
            alignItems: "center",
            justifyContent: "center",
            opacity: isDisabled ? 0.5 : 1,
          },
          animatedStyle,
        ]}
        {...accessibilityProps}
      >
        <Text style={{ fontSize: s.fontSize, fontWeight: tokens.fontWeight.medium, color: selected ? tokens.color.brand.text : tokens.color.text.primary }}>
          {children}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
}
