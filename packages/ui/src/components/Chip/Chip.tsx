import { useIconStyle, useId, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ChipAvatar } from './ChipAvatar';
import { ChipDeleteButton } from './ChipDeleteButton';
import { ChipIcon } from './ChipIcon';
import { ChipLabel } from './ChipLabel';
import type { ChipColorTokens, ChipProps } from './types';

/**
 * Chip — pressable container that manages selected/disabled state
 * and composes the label, avatar, icon, and delete sub-components.
 */
export function Chip({
  id: idProp,
  label,
  variant = 'solid',
  color = 'default',
  size = 'md',
  avatar,
  icon,
  deleteIcon,
  onDelete,
  onClick,
  disabled = false,
  clickable = false,
}: ChipProps) {
  const id = useId(idProp, 'chip');
  const {
    components: { chip },
    tokens,
  } = useTheme();
  const { color: iconColor } = useIconStyle('list');

  const palette: Record<string, ChipColorTokens> = useMemo(
    () => ({
      default: {
        bg: tokens.color.bg.muted,
        text: tokens.color.text.primary,
        border: tokens.color.border.default,
      },
      primary: {
        bg: tokens.color.brand.subtle,
        text: tokens.color.brand.text,
        border: tokens.color.brand.default,
      },
      secondary: {
        bg: tokens.color.brand.muted,
        text: tokens.color.brand.text,
        border: tokens.color.brand.default,
      },
      success: {
        bg: tokens.color.success.bg,
        text: tokens.color.success.text,
        border: tokens.color.success.border,
      },
      error: {
        bg: tokens.color.error.bg,
        text: tokens.color.error.text,
        border: tokens.color.error.border,
      },
      info: {
        bg: tokens.color.info.bg,
        text: tokens.color.info.text,
        border: tokens.color.info.border,
      },
      warning: {
        bg: tokens.color.warning.bg,
        text: tokens.color.warning.text,
        border: tokens.color.warning.border,
      },
    }),
    [tokens]
  );

  const colors = palette[color];
  const vStyle = chip.variant[variant];
  const sizeStyle = chip.size[size] || chip.size.md;

  const customBg =
    variant === 'solid' && color !== 'default' ? colors.bg : vStyle.bg;
  const customBorder =
    variant === 'outlined' && color !== 'default' ? colors.border : vStyle.border;
  const customText = color !== 'default' ? colors.text : vStyle.text;

  const iconSize = size === 'sm' ? 14 : 16;

  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        gap: tokens.spacing[2],
        paddingHorizontal: sizeStyle.paddingHorizontal,
        paddingVertical: tokens.spacing[1],
        height: sizeStyle.height,
        borderRadius: chip.container.borderRadius,
        backgroundColor: customBg,
        borderWidth: variant === 'outlined' ? 1 : 0,
        borderColor: customBorder,
        opacity: disabled ? tokens.opacity[60] : 1,
        minHeight: size === 'sm' ? 24 : size === 'lg' ? 40 : 32,
      },
    ],
    [tokens, sizeStyle, chip, customBg, customBorder, variant, disabled, size]
  );

  const content = (
    <View nativeID={id} style={containerStyle}>
      {avatar && (
        <ChipAvatar size={size} spacing={tokens.spacing[1]}>
          {avatar}
        </ChipAvatar>
      )}
      <ChipIcon iconSize={iconSize} iconColor={iconColor}>
        {icon}
      </ChipIcon>
      <ChipLabel
        color={customText}
        fontSize={sizeStyle.fontSize}
        fontWeight={tokens.fontWeight.medium}
      >
        {label}
      </ChipLabel>
      {onDelete && (
        <ChipDeleteButton
          deleteIcon={deleteIcon}
          onDelete={onDelete}
          textColor={customText}
          spacing={tokens.spacing[1]}
          radius={tokens.radius.full}
        />
      )}
    </View>
  );

  if (onClick || clickable) {
    return (
      <Pressable
        nativeID={id}
        onPress={onClick}
        disabled={disabled}
        style={disabled ? styles.disabledPressable : undefined}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledPressable: {
    opacity: 0.5,
  },
});
