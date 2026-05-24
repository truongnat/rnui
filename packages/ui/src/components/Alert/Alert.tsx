import { useAlert, useTheme } from '@truongdq01/headless';
import { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { AlertCloseButton } from './AlertCloseButton';
import { AlertContent } from './AlertContent';
import { AlertTextColorProvider } from './AlertContext';
import { AlertIcon } from './AlertIcon';
import type { AlertProps } from './types';

/**
 * Alert component provides contextual feedback messages for user actions with various intensities.
 * Includes support for icons, actions, close buttons, and multiple visual variants.
 */
export function Alert({
  id,
  severity = 'info',
  variant = 'standard',
  icon,
  action,
  onClose,
  children,
  style,
}: AlertProps) {
  const {
    components: { alert },
    tokens,
  } = useTheme();

  const severityTokens = alert.variant[severity];

  const { isOpen, getAlertProps, getCloseButtonProps } = useAlert({
    onClose,
    id,
  });

  const containerStyle = useMemo(() => {
    const base: ViewStyle[] = [alert.container];

    if (variant === 'filled') {
      base.push({
        backgroundColor: severityTokens.icon,
        borderColor: 'transparent',
        borderWidth: 0,
      });
    } else if (variant === 'outlined') {
      base.push({
        backgroundColor: 'transparent',
        borderColor: severityTokens.border,
        borderWidth: 1,
      });
    } else {
      base.push({
        backgroundColor: severityTokens.bg,
        borderColor: severityTokens.border,
        borderWidth: 1,
      });
    }
    return base;
  }, [alert.container, severityTokens, variant]);

  if (!isOpen) return null;

  const inverseText = tokens.color.text.inverse;
  const textColor = variant === 'filled' ? inverseText : severityTokens.text;
  const iconColor = variant === 'filled' ? inverseText : severityTokens.icon;

  return (
    <AlertTextColorProvider textColor={textColor}>
      <View style={[containerStyle, style]} {...getAlertProps()}>
        <AlertIcon severity={severity} icon={icon} color={iconColor} />

        <AlertContent textColor={textColor}>{children}</AlertContent>

        {action}

        <AlertCloseButton
          onClose={onClose}
          getCloseButtonProps={getCloseButtonProps}
          textColor={textColor}
        />
      </View>
    </AlertTextColorProvider>
  );
}
