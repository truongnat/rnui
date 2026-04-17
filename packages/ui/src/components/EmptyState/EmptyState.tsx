import React from 'react';
import { View, Text } from 'react-native';
import { useComponentTokens, useTokens } from '@truongdq01/headless';
import type { SemanticTokens } from '@truongdq01/tokens';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

export type EmptyStateSize = 'sm' | 'md' | 'lg';

export type EmptyStateVariant =
  | 'default'
  | 'search'
  | 'error'
  | 'offline'
  | 'permission'
  | 'empty';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  size?: EmptyStateSize;
  variant?: EmptyStateVariant;
  illustration?: React.ReactNode;
}

function variantSemantics(
  variant: EmptyStateVariant,
  tokens: SemanticTokens
): { iconColor: string; wrapBg: string } {
  switch (variant) {
    case 'error':
    case 'permission':
      return {
        iconColor: tokens.color.error.icon,
        wrapBg: tokens.color.error.bg,
      };
    case 'offline':
      return {
        iconColor: tokens.color.warning.icon,
        wrapBg: tokens.color.warning.bg,
      };
    case 'search':
      return {
        iconColor: tokens.color.text.tertiary,
        wrapBg: tokens.color.bg.muted,
      };
    case 'empty':
      return {
        iconColor: tokens.color.brand.text,
        wrapBg: tokens.color.brand.subtle,
      };
    default:
      return {
        iconColor: tokens.color.brand.text,
        wrapBg: tokens.color.brand.subtle,
      };
  }
}

const VARIANT_DEFAULTS: Record<
  Exclude<EmptyStateVariant, 'default'>,
  { title: string; description: string; iconName: IconName }
> = {
  search: {
    title: 'No results found',
    description: 'Try different keywords or filters.',
    iconName: 'search',
  },
  error: {
    title: 'Something went wrong',
    description: "We couldn't load this content. Try again.",
    iconName: 'error',
  },
  offline: {
    title: "You're offline",
    description: 'Check your connection and try again.',
    iconName: 'warning',
  },
  permission: {
    title: 'Access denied',
    description: "You don't have permission to view this.",
    iconName: 'lock',
  },
  empty: {
    title: 'Nothing here yet',
    description: 'When there is content, it will show up here.',
    iconName: 'package',
  },
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  size = 'md',
  variant = 'default',
  illustration,
}: EmptyStateProps) {
  const { emptyState } = useComponentTokens();
  const tokens = useTokens();

  const meta = variant !== 'default' ? VARIANT_DEFAULTS[variant] : null;
  const resolvedTitle = title ?? meta?.title;
  const resolvedDescription = description ?? meta?.description;

  const { iconColor, wrapBg } = variantSemantics(variant, tokens);

  const iconSize = Math.round(emptyState.icon.size / 2);
  const resolvedIcon =
    icon ??
    (meta ? (
      <Icon name={meta.iconName} size={iconSize} color={iconColor} />
    ) : null);

  const sizePad = emptyState.containerSize[size];
  const titleSize = emptyState.titleSize[size];
  const descSize = emptyState.descriptionSize[size];

  return (
    <View
      accessibilityRole="none"
      style={[
        emptyState.container as any,
        { padding: sizePad.padding, gap: sizePad.gap },
      ]}
    >
      {illustration && (
        <View style={{ marginBottom: tokens.spacing[2] }}>{illustration}</View>
      )}

      {resolvedIcon && (
        <View style={[emptyState.iconWrap as any, { backgroundColor: wrapBg }]}>
          {React.isValidElement<{ size?: number | string; color?: string }>(
            resolvedIcon
          )
            ? React.cloneElement(resolvedIcon, {
                size: resolvedIcon.props.size ?? iconSize,
                color: resolvedIcon.props.color ?? iconColor,
              })
            : resolvedIcon}
        </View>
      )}

      {resolvedTitle && (
        <Text style={[emptyState.title as any, titleSize]}>
          {resolvedTitle}
        </Text>
      )}

      {resolvedDescription && (
        <Text style={[emptyState.description as any, descSize]}>
          {resolvedDescription}
        </Text>
      )}

      {action && <View style={{ marginTop: tokens.spacing[4] }}>{action}</View>}
    </View>
  );
}
