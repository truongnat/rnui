import { StyleSheet, Text, type TextStyle } from 'react-native';
import type { ChipLabelProps } from './types';

/**
 * Text label for the Chip with overflow ellipsis.
 */
export function ChipLabel({
  children,
  color,
  fontSize,
  fontWeight,
}: ChipLabelProps) {
  return (
    <Text
      numberOfLines={1}
      ellipsizeMode="tail"
      style={[
        styles.label,
        { color, fontSize, fontWeight: fontWeight as TextStyle['fontWeight'] },
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    lineHeight: undefined,
    flexShrink: 1,
  },
});
