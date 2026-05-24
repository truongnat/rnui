import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import type { ListDividerProps } from './types';

/**
 * Thin horizontal separator between list items.
 * Use `insetLeading` for rows with a leading avatar.
 */
export function ListDivider({
  inset = false,
  insetLeading = false,
}: ListDividerProps) {
  const {
    components: { list },
  } = useTheme();

  const dividerStyle = useMemo(
    () => ({
      borderBottomColor: list.separator.color,
      marginLeft: insetLeading
        ? list.separator.insetLeading
        : inset
          ? list.separator.insetLeft
          : 0,
    }),
    [list.separator, inset, insetLeading]
  );

  return <View style={[styles.divider, dividerStyle]} />;
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
