import { usePressable, useTheme } from '@truongdq01/headless';
import type React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { Icon } from '../Icon';

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
  } = useTheme();
  const { gesture, animatedStyle, accessibilityProps } = usePressable({
    onPress,
    disabled,
    feedbackMode: 'scale',
    accessibilityLabel:
      accessibilityLabel ?? label ?? (typeof icon === 'string' ? icon : 'FAB'),
    accessibilityRole: 'button',
  });

  const isExtended = variant === 'extended' && !!label;
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  // Base color from component tokens - Fab only has primary/secondary in tokens
  const baseColor =
    color === 'primary' ? fab.color.primary.bg : fab.color.secondary.bg;

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
    return '#FFFFFF';
  };

  const sizeMap = {
    sm: { size: 40, iconSize: 20 },
    md: { size: 56, iconSize: 24 },
    lg: { size: 72, iconSize: 28 },
  };

  const s = sizeMap[size];

  const containerStyle = [
    fab.container,
    {
      backgroundColor: getBackgroundColor(),
      borderColor: getBorderColor(),
      borderWidth: isOutline ? 1 : 0,
      height: s.size,
      minWidth: s.size,
      borderRadius: s.size / 2,
      paddingHorizontal: isExtended ? 20 : 0,
    },
    disabled && { opacity: 0.5 },
    animatedStyle,
  ];

  const iconColor = getIconColor();

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={containerStyle as any} {...accessibilityProps}>
        <View style={styles.content}>
          {icon && (
            <Icon size={s.iconSize} color={iconColor}>
              {icon}
            </Icon>
          )}
          {isExtended && (
            <Text
              style={[
                styles.label,
                { marginLeft: icon ? 8 : 0, color: iconColor },
              ]}
            >
              {label}
            </Text>
          )}
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
    fontSize: 14,
    textTransform: 'uppercase',
  },
});
