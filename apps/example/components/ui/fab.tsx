import { useState, type ReactNode } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { cn, useThemeColor } from '@/lib/utils';

export type FabSize = 'sm' | 'md' | 'lg' | 'extended';
export type FabVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface FabProps extends Omit<PressableProps, 'children'> {
  /** Icon element (e.g. Plus, Camera, Send). */
  icon?: ReactNode;
  /** Label for Extended FAB. */
  label?: string;
  size?: FabSize;
  variant?: FabVariant;
  /** Automatically floats at bottom-right of screen over content. Default: false. */
  floating?: boolean;
  /** Auto-offset bottom padding for device Home Indicator when floating. Default: true. */
  safeArea?: boolean;
  className?: string;
}

const SIZES = {
  sm: { size: 40, iconSize: 18, padHorizontal: 14 },
  md: { size: 56, iconSize: 24, padHorizontal: 20 },
  lg: { size: 64, iconSize: 28, padHorizontal: 24 },
} as const;

/**
 * Floating Action Button (FAB) engineered for primary screen actions.
 * Features solid native background colors, elevation shadows, extended pill mode,
 * and reliable viewport-relative floating placement.
 */
export function Fab({
  icon,
  label,
  size = 'md',
  variant = 'default',
  floating = false,
  safeArea = true,
  className,
  disabled = false,
  style,
  onPressIn,
  onPressOut,
  ...props
}: FabProps) {
  const insets = useSafeAreaInsets();
  const colors = useThemeColor();
  const [isPressed, setIsPressed] = useState(false);

  const isExtended = Boolean(label);
  const sizeConfig = size === 'extended' || isExtended ? SIZES.md : SIZES[size];

  const getVariantColors = (): { bg: string; fg: string; border?: string } => {
    switch (variant) {
      case 'secondary':
        return { bg: colors.muted, fg: colors.foreground };
      case 'destructive':
        return { bg: colors.destructive, fg: '#ffffff' };
      case 'outline':
        return {
          bg: colors.card,
          fg: colors.foreground,
          border: colors.border,
        };
      case 'default':
      default:
        return { bg: colors.primary, fg: colors.primaryForeground };
    }
  };

  const themeColors = getVariantColors();

  const dynamicStyle: ViewStyle = {
    backgroundColor: themeColors.bg,
    borderColor: themeColors.border ?? 'transparent',
    borderWidth: themeColors.border ? 1 : 0,
    opacity: disabled ? 0.5 : isPressed ? 0.85 : 1,
    transform: [{ scale: isPressed && !disabled ? 0.94 : 1 }],
  };

  const buttonContent = (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={8}
      onPressIn={(e: GestureResponderEvent) => {
        setIsPressed(true);
        onPressIn?.(e);
      }}
      onPressOut={(e: GestureResponderEvent) => {
        setIsPressed(false);
        onPressOut?.(e);
      }}
      className={cn(className)}
      style={[
        styles.baseButton,
        isExtended
          ? {
              height: sizeConfig.size,
              borderRadius: sizeConfig.size / 2,
              paddingHorizontal: sizeConfig.padHorizontal,
            }
          : {
              width: sizeConfig.size,
              height: sizeConfig.size,
              borderRadius: sizeConfig.size / 2,
            },
        dynamicStyle,
        styles.elevationShadow,
        style as StyleProp<ViewStyle>,
      ]}
      {...props}
    >
      <View style={styles.contentRow}>
        {icon}
        {label ? (
          <Text
            style={[
              styles.labelText,
              {
                color: themeColors.fg,
                fontSize: size === 'sm' ? 12 : 14,
              },
            ]}
          >
            {label}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );

  if (floating) {
    return (
      <View
        pointerEvents="box-none"
        style={[
          styles.floatingContainer,
          { bottom: safeArea ? insets.bottom + 20 : 24 },
        ]}
      >
        {buttonContent}
      </View>
    );
  }

  return buttonContent;
}

const styles = StyleSheet.create({
  baseButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'continuous',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  labelText: {
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  elevationShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.22,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
      default: {},
    }),
  },
  floatingContainer: {
    position: 'absolute',
    right: 20,
    zIndex: 999,
  },
});
