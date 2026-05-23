import { useTheme } from '@truongdq01/headless';
import { StyleSheet, View } from 'react-native';
import type { MenuDividerProps } from './types';

export function MenuDivider({ style }: MenuDividerProps) {
  const { tokens } = useTheme();

  return (
    <View
      style={[
        styles.divider,
        { borderBottomColor: tokens.color.border.default },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
});
