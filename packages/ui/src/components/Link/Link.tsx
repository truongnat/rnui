import { useTheme } from '@truongdq01/headless';
import type React from 'react';
import { Linking, Text, type TextStyle } from 'react-native';

export interface LinkProps {
  children?: React.ReactNode;
  href?: string;
  onPress?: () => void;
  color?: string;
  underline?: 'always' | 'hover' | 'none';
  style?: TextStyle | TextStyle[];
}

export function Link({
  children,
  href,
  onPress,
  color,
  underline = 'always',
  style,
}: LinkProps) {
  const {
    components: { link },
  } = useTheme();
  const decoration = underline === 'none' ? 'none' : 'underline';

  return (
    <Text
      onPress={async () => {
        if (onPress) onPress();
        if (href) {
          try {
            await Linking.openURL(href);
          } catch {
            // ignore
          }
        }
      }}
      style={[
        link.text,
        { color: color ?? link.text.color, textDecorationLine: decoration },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
