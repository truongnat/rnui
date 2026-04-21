import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useListContext } from './context';
import { ListItemContent } from './ListItemContent';
import type { ListItemProps } from './types';

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

  const dynamicStyle = useMemo(
    () => ({
      paddingVertical: isDense ? tokens.spacing[2] : tokens.spacing[3],
      backgroundColor: selected ? tokens.color.brand.subtle : 'transparent',
      borderBottomWidth: divider ? 1 : 0,
      borderBottomColor: tokens.color.border.subtle,
      opacity: disabled ? 0.5 : 1,
    }),
    [isDense, selected, divider, disabled, tokens]
  );

  const trailingStyle = useMemo(
    () => ({ marginLeft: tokens.spacing[2] }),
    [tokens]
  );

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
      <View style={styles.row}>
        {label ? <ListItemContent primary={label} /> : children}
      </View>
      {secondaryAction != null && (
        <View style={trailingStyle}>{secondaryAction}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const ListItem = React.memo(ListItemInner);
