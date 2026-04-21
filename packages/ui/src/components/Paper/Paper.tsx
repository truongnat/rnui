import { useTheme } from '@truongdq01/headless';
import type React from 'react';
import { View, type ViewStyle } from 'react-native';

export interface PaperProps {
  children?: React.ReactNode;
  variant?: 'elevation' | 'outlined' | 'flat';
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  square?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export function Paper({
  children,
  variant = 'elevation',
  elevation = 'sm',
  square = false,
  style,
}: PaperProps) {
  const {
    components: { paper },
    tokens,
  } = useTheme();

  return (
    <View
      style={[
        paper.container,
        square && { borderRadius: tokens.radius.none },
        variant === 'outlined' && paper.variant.outlined,
        variant === 'flat' && paper.variant.flat,
        variant === 'elevation' && paper.elevation[elevation],
        style,
      ]}
    >
      {children}
    </View>
  );
}
