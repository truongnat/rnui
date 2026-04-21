import { useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useListContext } from './context';
import type { ListItemContentProps } from './types';

/**
 * Primary + secondary text block for a list item (flex: 1).
 * Reads dense flag from ListContext to adjust font size.
 */
export function ListItemContent({ id: idProp, primary, secondary }: ListItemContentProps) {
  const id = useId(idProp, 'list-item-content');
  const {
    components: { list },
    tokens,
  } = useTheme();
  const ctx = useListContext();

  const primaryTextStyle = useMemo(
    () => [
      list.itemText,
      ctx?.dense ? { fontSize: tokens.fontSize.sm } : null,
    ],
    [list.itemText, ctx?.dense, tokens]
  );

  const secondaryTextStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.xs,
      color: tokens.color.text.secondary,
      marginTop: 2,
    }),
    [tokens]
  );

  return (
    <View nativeID={id} style={styles.container}>
      {typeof primary === 'string' ? (
        <Text style={primaryTextStyle}>{primary}</Text>
      ) : (
        primary
      )}
      {secondary != null &&
        (typeof secondary === 'string' ? (
          <Text style={secondaryTextStyle}>{secondary}</Text>
        ) : (
          secondary
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/**
 * @deprecated Use ListItemContent instead
 */
export { ListItemContent as ListItemText };
