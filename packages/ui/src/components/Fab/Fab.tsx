import { usePressable, useTheme } from '@truongdq01/headless';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

export interface FabProps {
  icon?: React.ReactNode;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circular' | 'extended' | 'outline' | 'ghost';
  accessibilityLabel?: string;
}

function renderFabIcon(
  icon: React.ReactNode,
  iconSize: number,
  iconColor: string
): React.ReactNode {
  if (!icon) return null;
  if (React.isValidElement<{ size?: number; color?: string }>(icon)) {
    return React.cloneElement(icon, {
      size: icon.props.size ?? iconSize,
      color: icon.props.color ?? iconColor,
    });
  }
  return icon;
}

export function Fab({
  icon,
  label,
  onPress,
  disabled = false,
  color = 'primary',
  size = 'md',
  variant = 'circular',
  accessibilityLabel,
}: FabProps) {
  const {
    components: { fab },
    tokens,
  } = useTheme();

  const isExtended = variant === 'extended' && !!label;
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  const palette = color === 'primary' ? fab.color.primary : fab.color.secondary;
  const baseColor = palette.bg;
  const onColor = palette.text;

  const getBackgroundColor = () => {
    if (isOutline || isGhost) return 'transparent';
    return baseColor;
  };

  const getBorderColor = () => {
    if (isOutline) return baseColor;
    return 'transparent';
  };

  const getIconColor = () => {
    if (isOutline || isGhost) return baseColor;
    return onColor;
  };

  const sizeMap = useMemo(
    () => ({
      sm: { size: fab.size.sm.height, iconSize: 20 },
      md: { size: fab.size.md.height, iconSize: 24 },
      lg: { size: fab.size.lg.height, iconSize: 28 },
    }),
    [fab.size]
  );

  const s = sizeMap[size];

  const hitSlop = useMemo(() => {
    const padding = Math.max(0, (44 - s.size) / 2);
    return {
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
    };
  }, [s.size]);

  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    disabled,
    feedbackMode: 'scale',
    hitSlop,
    accessibilityLabel:
      accessibilityLabel ?? label ?? (typeof icon === 'string' ? icon : 'FAB'),
    accessibilityRole: 'button',
  });

  const containerStyle = [
    fab.container,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: isOutline ? 1 : 0,
      height: s.size,
      minWidth: s.size,
      borderRadius: s.size / 2,
      borderCurve: 'continuous' as const,
      paddingHorizontal: isExtended ? tokens.spacing[5] : 0,
    },
    disabled && { opacity: 0.5 },
    animatedStyle,
  ];

  const iconColor = getIconColor();

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={containerStyle as ViewStyle[]}
        {...accessibilityProps}
      >
        <View style={styles.content}>
          {icon ? renderFabIcon(icon, s.iconSize, iconColor) : null}
          {isExtended ? (
            <Text
              style={[
                styles.label,
                {
                  marginLeft: icon ? tokens.spacing[2] : 0,
                  color: iconColor,
                  fontSize: tokens.fontSize.sm,
                },
              ]}
            >
              {label}
            </Text>
          ) : null}
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
