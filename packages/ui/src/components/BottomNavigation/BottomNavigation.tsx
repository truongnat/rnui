import React, { createContext, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { useTokens } from "@rnui/headless";

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
  setValue: (value: T) => void;
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
  const [internalValue, setInternalValue] = React.useState<T | undefined>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = (next: T) => {
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  return (
    <BottomNavContext.Provider value={{ value, setValue, showLabels }}>
      <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: 8 }}>
        {children}
      </View>
    </BottomNavContext.Provider>
  );
}

export function BottomNavigationAction<T = string>({ value, label, icon }: BottomNavigationActionProps<T>) {
  const tokens = useTokens();
  const ctx = useContext(BottomNavContext as React.Context<BottomNavContextValue<T> | null>);
  if (!ctx) return null;

  const selected = ctx.value === value;

  return (
    <Pressable onPress={() => ctx.setValue(value)} style={{ alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 6 }}>
      {icon}
      {(ctx.showLabels || selected) && label && (
        <Text style={{ fontSize: tokens.fontSize.xs, color: selected ? tokens.color.brand.default : tokens.color.text.secondary }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}
