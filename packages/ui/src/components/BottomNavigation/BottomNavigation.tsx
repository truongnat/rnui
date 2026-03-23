import React, { createContext, useContext, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens, useComponentTokens, useBottomNavigation } from "@truongnat/headless";

export interface BottomNavigationProps<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  showLabels?: boolean;
  children?: React.ReactNode;
}

export interface BottomNavigationActionProps<T = string> {
  value: T;
  label?: string;
  icon?: React.ReactNode;
}

interface BottomNavContextValue<T = string> {
  value?: T;
  isSelected: (value: T) => boolean;
  getItemProps: (value: T) => any;
  showLabels: boolean;
}

const BottomNavContext = createContext<BottomNavContextValue<any> | null>(null);

export function BottomNavigation<T = string>({
  value: controlledValue,
  defaultValue,
  onChange,
  showLabels = false,
  children,
}: BottomNavigationProps<T>) {
  const { bottomNavigation } = useComponentTokens();
  const { value, isSelected, getItemProps } = useBottomNavigation<T>({
    value: controlledValue,
    defaultValue,
    onChange,
  });

  const ctx = useMemo(() => ({ value, isSelected, getItemProps, showLabels }), [value, isSelected, getItemProps, showLabels]);

  return (
    <BottomNavContext.Provider value={ctx}>
      <View style={[bottomNavigation.container, { flexDirection: "row", justifyContent: "space-around" }]}>
        {children}
      </View>
    </BottomNavContext.Provider>
  );
}

export function BottomNavigationAction<T = string>({ value, label, icon }: BottomNavigationActionProps<T>) {
  const { bottomNavigation } = useComponentTokens();
  const tokens = useTokens();
  const ctx = useContext(BottomNavContext as React.Context<BottomNavContextValue<T> | null>);
  if (!ctx) return null;

  const selected = ctx.isSelected(value);

  return (
    <Pressable {...ctx.getItemProps(value)} style={{ alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 }}>
      {icon}
      {(ctx.showLabels || selected) && label && (
        <Text style={{ fontSize: tokens.fontSize.xs, color: selected ? bottomNavigation.item.active.color : bottomNavigation.item.inactive.color }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
