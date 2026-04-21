import { useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Icon } from '../Icon';
import type { SelectTriggerProps } from './types';

export function SelectTrigger({
  id,
  displayLabel,
  placeholder,
  isOpen,
  error,
  label,
  onPress,
  accessibilityLabel,
}: SelectTriggerProps) {
  const {
    components: { select },
    tokens,
  } = useTheme();

  const hasSelection = displayLabel !== placeholder;

  const labelTextStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.sm,
      fontWeight: tokens.fontWeight.medium as any,
      color: tokens.color.text.secondary,
      marginBottom: tokens.spacing[1],
    }),
    [tokens.fontSize.sm, tokens.fontWeight.medium, tokens.color.text.secondary, tokens.spacing]
  );

  const triggerStyle = useMemo(
    () => ({
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      height: 48,
      paddingHorizontal: select.trigger.padding.x,
      paddingVertical: select.trigger.padding.y,
      borderWidth: 1,
      borderColor: error
        ? tokens.color.border.error
        : isOpen
          ? select.trigger.focusBorderColor
          : select.trigger.borderColor,
      borderRadius: select.trigger.borderRadius,
      backgroundColor: select.trigger.bg,
    }),
    [
      error,
      isOpen,
      select.trigger.padding.x,
      select.trigger.padding.y,
      select.trigger.focusBorderColor,
      select.trigger.borderColor,
      select.trigger.borderRadius,
      select.trigger.bg,
      tokens.color.border.error,
    ]
  );

  const valueTextStyle = useMemo(
    () => ({
      flex: 1,
      fontSize: tokens.fontSize.md,
      color: hasSelection
        ? tokens.color.text.primary
        : tokens.color.text.tertiary,
    }),
    [hasSelection, tokens.fontSize.md, tokens.color.text.primary, tokens.color.text.tertiary]
  );

  const errorTextStyle = useMemo(
    () => ({
      fontSize: tokens.fontSize.xs,
      color: tokens.color.error.text,
      marginTop: tokens.spacing[1],
    }),
    [tokens.fontSize.xs, tokens.color.error.text, tokens.spacing]
  );

  return (
    <>
      {label && <Text style={labelTextStyle}>{label}</Text>}
      <Pressable
        nativeID={`${id}-trigger`}
        onPress={onPress}
        style={triggerStyle}
        accessibilityRole="combobox"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ expanded: isOpen }}
      >
        <Text style={valueTextStyle} numberOfLines={1}>
          {displayLabel}
        </Text>
        <Icon size={16} color={tokens.color.text.tertiary}>
          {isOpen ? 'chevronUp' : 'chevronDown'}
        </Icon>
      </Pressable>
      {error && <Text style={errorTextStyle}>{error}</Text>}
    </>
  );
}
