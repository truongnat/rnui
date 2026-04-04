import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { useComponentTokens } from '@truongdq01/headless';

// ─── Types ────────────────────────────────────────────────────────

export type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  label?: string;
  count?: number | string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  style?: any;
}

// ─── Component ────────────────────────────────────────────────────

const BADGE_ROW_GAP: Record<BadgeSize, number> = { sm: 3, md: 4, lg: 6 };

export const Badge = React.memo(
  ({
    label,
    count,
    variant = 'default',
    size = 'md',
    icon,
    dot = false,
  }: BadgeProps) => {
    const { badge } = useComponentTokens();

    const { fontSize, sizeBox } = useMemo(() => {
      const { fontSize: fs, ...rest } = badge.size[size];
      return { fontSize: fs, sizeBox: rest };
    }, [badge.size, size]);

    const iconPx = Math.round(fontSize * 0.85);

    const containerStyle = useMemo(
      () => [
        badge.base,
        sizeBox,
        {
          backgroundColor: badge.variant[variant].bg,
          flexDirection: 'row' as const,
          alignItems: 'center' as const,
          gap: BADGE_ROW_GAP[size],
        },
      ],
      [badge.base, badge.variant, sizeBox, variant, size]
    );

    const textStyle = useMemo(
      () => [badge.text, { color: badge.variant[variant].text, fontSize }],
      [badge.text, badge.variant, variant, fontSize]
    );

    const iconColor = String(badge.variant[variant].text);

    // Helper to clone icon with standardized props
    const renderIcon = (el: React.ReactNode) => {
      if (!el) return null;
      if (
        React.isValidElement<{ size?: number | string; color?: string }>(el)
      ) {
        return React.cloneElement(el, {
          size: el.props.size ?? iconPx,
          color: el.props.color ?? iconColor,
        });
      }
      return el;
    };

    const textPart =
      label !== undefined ? label : count !== undefined ? String(count) : null;

    const dotDim =
      size === 'sm'
        ? Math.max(6, Math.round(badge.dot.size * 0.875))
        : size === 'lg'
          ? Math.round(badge.dot.size * 1.25)
          : badge.dot.size;

    return (
      <View
        style={[
          containerStyle,
          dot && {
            padding: 0,
            width: dotDim,
            height: dotDim,
            borderRadius: dotDim / 2,
            justifyContent: 'center',
          },
        ]}
      >
        {!dot && renderIcon(icon)}
        {!dot && textPart !== null && <Text style={textStyle}>{textPart}</Text>}
      </View>
    );
  }
);
