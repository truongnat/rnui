import { useAlert, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import type { AlertProps } from './types';
import { AlertIcon } from './AlertIcon';
import { AlertContent } from './AlertContent';
import { AlertCloseButton } from './AlertCloseButton';

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
  } = useTheme();

  // Retrieve theme tokens for the specific severity level
  const severityTokens = alert.variant[severity];
  
  // Manage alert open/close state logic
  const { isOpen, getAlertProps, getCloseButtonProps } = useAlert({ onClose, id });

  /**
   * Calculate dynamic container styles based on variant and severity.
   */
  const containerStyle = useMemo(() => {
    const base = [alert.container];
    
    if (variant === 'filled') {
      base.push({
        backgroundColor: severityTokens.icon,
        borderColor: 'transparent',
        borderWidth: 0,
      } as any);
    } else if (variant === 'outlined') {
      base.push({
        backgroundColor: 'transparent',
        borderColor: severityTokens.border,
        borderWidth: 1,
      } as any);
    } else {
      base.push({
        backgroundColor: severityTokens.bg,
        borderColor: 'transparent',
        borderWidth: 0,
      } as any);
    }
    return base;
  }, [alert, severityTokens, variant]);

  // Early return if alert is closed (all hooks called above)
  if (!isOpen) return null;

  // Resolve colors for icons and text
  const textColor = variant === 'filled' ? '#FFFFFF' : severityTokens.text;
  const iconColor = variant === 'filled' ? '#FFFFFF' : severityTokens.icon;

  return (
    <View style={[containerStyle, style]} {...getAlertProps()}>
      {/* Icon Section */}
      <AlertIcon 
        severity={severity} 
        icon={icon} 
        color={iconColor} 
      />

      {/* Message Content Section */}
      <AlertContent>
        {children}
      </AlertContent>

      {/* Custom Action Section */}
      {action}

      {/* Close Button Section */}
      <AlertCloseButton 
        onClose={onClose}
        getCloseButtonProps={getCloseButtonProps}
        textColor={textColor}
      />
    </View>
  );
}
