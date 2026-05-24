import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useBottomNavContext } from './context';
import type { BottomNavigationActionProps } from './types';

/**
 * Individual action item for BottomNavigation.
 * Renders an icon above a label; the label visibility respects showLabels and
 * the currently active state.  Active/inactive color is token-driven.
 */
export function BottomNavigationAction<T = string>({
  value,
  label,
  icon,
}: BottomNavigationActionProps<T>) {
  const {
    components: { bottomNavigation },
    tokens,
  } = useTheme();
  const ctx = useBottomNavContext<T>();

  const selected = ctx ? ctx.isSelected(value) : false;
  const showLabel = ctx ? ctx.showLabels || selected : false;
  const activeColor = bottomNavigation.item.active.color;
  const inactiveColor = bottomNavigation.item.inactive.color;

  const actionStyle = useMemo(
    () => ({
      flex: bottomNavigation.item.flex,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      minHeight: 44,
      minWidth: 44,
      gap: tokens.spacing[1],
      paddingHorizontal: tokens.spacing[2],
      paddingVertical: tokens.spacing[1.5],
    }),
    [bottomNavigation.item.flex, tokens]
  );

  const labelStyle = useMemo(
    () => [
      styles.label,
      {
        fontSize: tokens.fontSize.xs,
        color: selected ? activeColor : inactiveColor,
      },
    ],
    [selected, tokens.fontSize.xs, activeColor, inactiveColor]
  );

  if (!ctx) return null;

  const itemProps = ctx.getItemProps(value);

  return (
    <Pressable {...itemProps} accessibilityLabel={label} style={actionStyle}>
      {icon}
      {showLabel && label ? <Text style={labelStyle}>{label}</Text> : null}
    </Pressable>
  );
}

BottomNavigationAction.displayName = 'BottomNavigationAction';

const styles = StyleSheet.create({
  label: {},
});
