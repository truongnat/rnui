import React, { createContext, useContext } from "react";
import { View, Text } from "react-native";
import Animated from "react-native-reanimated";
import { GestureDetector } from "react-native-gesture-handler";
import { usePressable, useTabs, useTokens } from "@rnui/headless";

export interface TabsProps<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  variant?: "standard" | "scrollable" | "fullWidth";
  centered?: boolean;
  orientation?: "horizontal" | "vertical";
  children?: React.ReactNode;
}

export interface TabProps<T = string> {
  value: T;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsContextValue<T = string> {
  getTabProps: (value: T, disabled?: boolean) => {
    onPress: () => void;
    accessibilityRole: "tab";
    accessibilityState: { selected: boolean; disabled: boolean };
  };
  isSelected: (value: T) => boolean;
  orientation: "horizontal" | "vertical";
  variant: "standard" | "scrollable" | "fullWidth";
}

const TabsContext = createContext<TabsContextValue<any> | null>(null);

export function Tabs<T = string>({
  value,
  defaultValue,
  onChange,
  variant = "standard",
  centered = false,
  orientation = "horizontal",
  children,
}: TabsProps<T>) {
  const { getTabProps, isSelected } = useTabs<T>({ value, defaultValue, onChange });

  return (
    <TabsContext.Provider value={{ getTabProps, isSelected, orientation, variant }}>
      <View
        style={{
          flexDirection: orientation === "horizontal" ? "row" : "column",
          justifyContent: centered ? "center" : "flex-start",
          gap: 8,
        }}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export function Tab<T = string>({ value, label, icon, disabled = false }: TabProps<T>) {
  const tokens = useTokens();
  const ctx = useContext(TabsContext as React.Context<TabsContextValue<T> | null>);
  if (!ctx) return null;

  const selected = ctx.isSelected(value);
  const { animatedStyle, gesture, accessibilityProps } = usePressable({
    onPress: () => ctx.getTabProps(value, disabled).onPress(),
    disabled,
    feedbackMode: "scaleSubtle",
    accessibilityRole: "tab",
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            paddingVertical: tokens.spacing[2],
            paddingHorizontal: tokens.spacing[3],
            borderBottomWidth: ctx.orientation === "horizontal" ? 2 : 0,
            borderLeftWidth: ctx.orientation === "vertical" ? 2 : 0,
            borderColor: selected ? tokens.color.brand.default : "transparent",
            opacity: disabled ? 0.5 : 1,
            alignItems: "center",
            flexDirection: "row",
            gap: tokens.spacing[2],
          },
          ctx.variant === "fullWidth" ? { flex: 1 } : null,
          animatedStyle,
        ]}
        {...accessibilityProps}
      >
        {icon}
        {label && (
          <Text style={{ color: selected ? tokens.color.brand.default : tokens.color.text.secondary, fontWeight: tokens.fontWeight.medium }}>
            {label}
          </Text>
        )}
      </Animated.View>
    </GestureDetector>
  );
}
