import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';
import type { DrawerHeaderProps } from './types';

function renderTitle(title: DrawerHeaderProps['title']) {
  if (title == null) return null;
  if (typeof title === 'string') {
    return (
      <Typography variant="h6" numberOfLines={1}>
        {title}
      </Typography>
    );
  }
  return title;
}

/**
 * Optional layout helper that renders a title + trailing slot (e.g. close button)
 * at the top of the drawer. Can also accept arbitrary children instead.
 */
export function DrawerHeader({ title, trailing, children }: DrawerHeaderProps) {
  const {
    components: { drawer },
    tokens,
  } = useTheme();

  const containerStyle = useMemo(
    () => [
      styles.container,
      drawer.header,
      {
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        gap: tokens.spacing[2],
      },
    ],
    [drawer.header, tokens]
  );

  if (children) {
    return <View style={containerStyle}>{children}</View>;
  }

  return (
    <View style={containerStyle}>
      <View style={styles.title}>{renderTitle(title)}</View>
      {trailing != null ? (
        <View style={styles.trailing}>{trailing}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
  trailing: {
    flexShrink: 0,
  },
});
