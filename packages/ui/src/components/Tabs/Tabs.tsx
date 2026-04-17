import React, { createContext, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useComponentTokens, useTabs, useTokens } from '@truongdq01/headless';

export interface TabsProps<T = string> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  variant?: 'standard' | 'scrollable' | 'fullWidth';
  centered?: boolean;
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

export interface TabProps<T = string> {
  value: T;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsContextValue<T = string> {
  getTabProps: (
    value: T,
    disabled?: boolean
  ) => {
    onPress: () => void;
    accessibilityRole: 'tab';
    accessibilityState: { selected: boolean; disabled: boolean };
  };
  isSelected: (value: T) => boolean;
  orientation: 'horizontal' | 'vertical';
  variant: 'standard' | 'scrollable' | 'fullWidth';
}

const TabsContext = createContext<TabsContextValue<any> | null>(null);

export function Tabs<T = string>({
  value,
  defaultValue,
  onChange,
  variant = 'standard',
  centered = false,
  orientation = 'horizontal',
  children,
}: TabsProps<T>) {
  const { tabs } = useComponentTokens();
  const { getTabProps, isSelected } = useTabs<T>({
    value,
    defaultValue,
    onChange,
  });

  return (
    <TabsContext.Provider
      value={{ getTabProps, isSelected, orientation, variant }}
    >
      <View
        style={[
          tabs.container,
          {
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            justifyContent: centered ? 'center' : 'flex-start',
            borderBottomWidth: orientation === 'horizontal' ? 1 : 0,
            borderLeftWidth: orientation === 'vertical' ? 1 : 0,
          },
        ]}
      >
        {children}
      </View>
    </TabsContext.Provider>
  );
}

export function Tab<T = string>({
  value,
  label,
  icon,
  disabled = false,
}: TabProps<T>) {
  const { tabs } = useComponentTokens();
  const tokens = useTokens();
  const ctx = useContext(
    TabsContext as React.Context<TabsContextValue<T> | null>
  );
  if (!ctx) return null;

  const selected = ctx.isSelected(value);
  const { onPress, accessibilityState } = ctx.getTabProps(value, disabled);

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={accessibilityState}
      style={({ pressed }) => [
        {
          paddingVertical: tokens.spacing[3],
          paddingHorizontal: tokens.spacing[4],
          borderBottomWidth:
            ctx.orientation === 'horizontal' ? tabs.indicator.height : 0,
          borderLeftWidth:
            ctx.orientation === 'vertical' ? tabs.indicator.height : 0,
          borderColor: selected ? tabs.indicator.bg : 'transparent',
          opacity: disabled ? 0.5 : pressed ? 0.92 : 1,
          alignItems: 'center',
          flexDirection: 'row',
          gap: tokens.spacing[2],
        },
        ctx.variant === 'fullWidth'
          ? { flex: 1, justifyContent: 'center' }
          : null,
      ]}
    >
      {icon}
      {label && (
        <Text
          style={[
            selected ? tabs.tab.active : tabs.tab.inactive,
            { fontSize: tokens.fontSize.md },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}
