import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTabsContext } from './context';
import type { TabProps } from './types';

/**
 * Individual tab button with an active border indicator.
 * Must be rendered inside a Tabs (or TabList) tree.
 */
export function Tab<T = string>({
  id: idProp,
  value,
  label,
  icon,
  disabled = false,
}: TabProps<T>) {
  const id = useId(idProp, 'tab');
  const {
    components: { tabs },
    tokens,
  } = useTheme();
  const ctx = useTabsContext<T>();

  // Derive values that feed into useMemo — safe to call with nullish ctx because
  // all hooks must run unconditionally (Rules of Hooks).
  const selected = ctx ? ctx.isSelected(value) : false;
  const orientation = ctx?.orientation ?? 'horizontal';
  const variant = ctx?.variant ?? 'standard';
  const indicatorHeight = tabs.indicator.height;
  const indicatorColor = tabs.indicator.bg;

  const tabProps = ctx ? ctx.getTabProps(value, disabled) : null;

  const baseStyle = useMemo(
    () => ({
      paddingVertical: tokens.spacing[3],
      paddingHorizontal: tokens.spacing[4],
      borderBottomWidth: orientation === 'horizontal' ? indicatorHeight : 0,
      borderLeftWidth: orientation === 'vertical' ? indicatorHeight : 0,
      borderColor: selected ? indicatorColor : 'transparent',
      alignItems: 'center' as const,
      flexDirection: 'row' as const,
      gap: tokens.spacing[2],
    }),
    [tokens.spacing, orientation, indicatorHeight, indicatorColor, selected]
  );

  const fullWidthStyle = useMemo(
    () => (variant === 'fullWidth' ? styles.fullWidth : null),
    [variant]
  );

  const labelStyle = useMemo(
    () => [
      selected ? tabs.tab.active : tabs.tab.inactive,
      { fontSize: tokens.fontSize.md },
    ],
    [selected, tabs.tab, tokens.fontSize.md]
  );

  if (!ctx || !tabProps) return null;

  const { onPress, accessibilityState } = tabProps;

  return (
    <Pressable
      nativeID={id}
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={accessibilityState}
      style={({ pressed }) => [
        baseStyle,
        fullWidthStyle,
        { opacity: disabled ? 0.5 : pressed ? 0.92 : 1 },
      ]}
    >
      {icon}
      {label ? <Text style={labelStyle}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
    justifyContent: 'center',
  },
});
