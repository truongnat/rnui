import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useListContext } from './context';
import { ListItemContent } from './ListItemContent';
import { ListItemTrailing } from './ListItemTrailing';
import type { ListItemProps } from './types';

function isListItemTrailingElement(child: React.ReactNode): boolean {
  return React.isValidElement(child) && child.type === ListItemTrailing;
}

function partitionChildren(children: React.ReactNode) {
  const items = React.Children.toArray(children);
  const explicitTrailing = items.filter(isListItemTrailingElement);
  if (explicitTrailing.length > 0) {
    return {
      main: items.filter((child) => !isListItemTrailingElement(child)),
      trailing: explicitTrailing,
    };
  }

  if (items.length >= 2) {
    return {
      main: items.slice(0, -1),
      trailing: items.slice(-1),
    };
  }

  return { main: items, trailing: [] as React.ReactNode[] };
}

function ListItemInner({
  id: idProp,
  children,
  label,
  secondaryAction,
  onPress,
  disabled = false,
  selected = false,
  divider = false,
  style,
}: ListItemProps) {
  const id = useId(idProp, 'list-item');
  const {
    components: { list },
    tokens,
  } = useTheme();
  const ctx = useListContext();
  const isDense = ctx?.dense;

  const { main, trailing } = useMemo(
    () => (label ? { main: [], trailing: [] } : partitionChildren(children)),
    [children, label]
  );

  const dynamicStyle = useMemo(
    () => ({
      paddingVertical: isDense ? tokens.spacing[2] : tokens.spacing[3],
      backgroundColor: selected ? tokens.color.brand.subtle : 'transparent',
      borderBottomWidth: divider ? StyleSheet.hairlineWidth : 0,
      borderBottomColor: tokens.color.border.subtle,
      opacity: disabled ? 0.5 : 1,
    }),
    [isDense, selected, divider, disabled, tokens]
  );

  const trailingStyle = useMemo(
    () => ({ marginLeft: tokens.spacing[2] }),
    [tokens]
  );

  const mainContentStyle = useMemo(
    () => ({
      flex: 1,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      gap: list.item.gap,
      minWidth: 0,
    }),
    [list.item.gap]
  );

  const resolvedTrailing =
    secondaryAction ??
    (trailing.length > 0 ? (
      <View style={trailingStyle}>{trailing}</View>
    ) : null);

  return (
    <Pressable
      nativeID={id}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        list.item,
        dynamicStyle,
        pressed && list.item.pressed,
        style,
      ]}
    >
      {label ? (
        <View style={mainContentStyle}>
          <ListItemContent primary={label} />
        </View>
      ) : (
        <View style={mainContentStyle}>{main}</View>
      )}
      {resolvedTrailing}
    </Pressable>
  );
}

export const ListItem = React.memo(ListItemInner);
