import { useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Typography } from '../Typography';
import { useAppBarTone } from './context';
import type { AppBarTitleProps } from './types';

export function AppBarTitle({ children, subtitle, style }: AppBarTitleProps) {
  const { tokens } = useTheme();
  const tone = useAppBarTone();
  const isInverse = tone === 'inverse';

  const titleColor = isInverse ? 'inverse' : 'primary';
  const subtitleColor = isInverse ? 'inverse' : 'secondary';

  const subtitleStyle = useMemo(
    () => ({
      opacity: isInverse ? 0.85 : 1,
    }),
    [isInverse]
  );

  return (
    <View style={[styles.container, style]}>
      {typeof children === 'string' ? (
        <Typography
          variant="h6"
          numberOfLines={1}
          color={titleColor}
          style={{ fontWeight: tokens.fontWeight.bold }}
        >
          {children}
        </Typography>
      ) : (
        children
      )}
      {subtitle ? (
        <Typography
          variant="caption"
          numberOfLines={1}
          color={subtitleColor}
          style={subtitleStyle}
        >
          {subtitle}
        </Typography>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
