import { useTheme } from '@truongdq01/headless';
import { Text } from 'react-native';
import { useAlertTextColor } from './AlertContext';
import type { AlertTitleProps } from './types';

/**
 * AlertTitle provides a bold header section inside an Alert.
 * Inherits severity text color from the parent Alert when used as a compound child.
 */
export function AlertTitle({ children, style }: AlertTitleProps) {
  const {
    components: { alert },
  } = useTheme();
  const textColor = useAlertTextColor();

  return (
    <Text
      style={[
        alert.title,
        textColor != null ? { color: textColor } : null,
        style,
      ]}
    >
      {children}
    </Text>
  );
}
