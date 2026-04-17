import React from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  useTokens,
  useIconStyle,
  useComponentTokens,
} from '@truongdq01/headless';

export interface ChipProps {
  label: React.ReactNode;
  variant?: 'solid' | 'outlined' | 'subtle';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  size?: 'sm' | 'md' | 'lg';
  avatar?: React.ReactNode;
  icon?: React.ReactNode;
  deleteIcon?: React.ReactNode;
  onDelete?: () => void;
  onClick?: () => void;
  disabled?: boolean;
  clickable?: boolean;
}

export function Chip({
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
  const tokens = useTokens();
  const { chip } = useComponentTokens();
  const { size: iconSize, color: iconColor } = useIconStyle('list');

  const palette = {
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
  } as const;

  const colors = palette[color];
  const vStyle = chip.variant[variant];

  // Map specific color overrides matching the palette to variant styling
  const customBg =
    variant === 'solid' && color !== 'default' ? colors.bg : vStyle.bg;
  const customBorder =
    variant === 'outlined' && color !== 'default'
      ? colors.border
      : vStyle.border;
  const customText = color !== 'default' ? colors.text : vStyle.text;

  const sizeStyle = chip.size[size] || chip.size.md;

  const container = {
    flexDirection: chip.container.flexDirection,
    alignItems: chip.container.alignItems,
    justifyContent: chip.container.justifyContent,
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
  };

  const renderIcon = (node: React.ReactNode) => {
    if (!node) return null;
    if (
      React.isValidElement<{ size?: number | string; color?: string }>(node)
    ) {
      return React.cloneElement(node, {
        size: node.props.size ?? (size === 'sm' ? 14 : 16),
        color: node.props.color ?? iconColor,
      });
    }
    return node;
  };

  const avatarStyle = {
    width: size === 'sm' ? 20 : size === 'lg' ? 28 : 24,
    height: size === 'sm' ? 20 : size === 'lg' ? 28 : 24,
    borderRadius: 12,
    marginRight: tokens.spacing[1],
  };

  const deleteButtonStyle = {
    padding: tokens.spacing[1],
    marginLeft: tokens.spacing[1],
    borderRadius: tokens.radius.full,
    minWidth: 28,
    minHeight: 28,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const content = (
    <View style={container}>
      {avatar && <View style={avatarStyle}>{avatar}</View>}
      {renderIcon(icon)}
      <Text
        style={{
          color: customText,
          fontSize: sizeStyle.fontSize,
          fontWeight: tokens.fontWeight.medium,
          lineHeight: sizeStyle.fontSize * 1.4,
        }}
      >
        {label}
      </Text>
      {onDelete && (
        <Pressable
          onPress={onDelete}
          hitSlop={8}
          style={deleteButtonStyle}
          accessibilityRole="button"
          accessibilityLabel="Remove"
        >
          {deleteIcon ?? (
            <Text
              style={{
                color: customText,
                fontSize: 14,
                fontWeight: tokens.fontWeight.bold,
                opacity: 0.7,
              }}
            >
              ×
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );

  if (onClick || clickable) {
    return (
      <Pressable
        onPress={onClick}
        disabled={disabled}
        style={{ opacity: disabled ? 0.5 : 1 }}
      >
        {content}
      </Pressable>
    );
  }

  return content;
}
