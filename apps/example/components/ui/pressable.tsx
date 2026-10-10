import { useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  type GestureResponderEvent,
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  type PressableStateCallbackType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { cn, useThemeColor } from '@/lib/utils';

export type PressableVariant =
  | 'plain'
  | 'opacity'
  | 'highlight'
  | 'scale'
  | 'bounce';

export interface PressableProps extends Omit<RNPressableProps, 'children'> {
  variant?: PressableVariant;
  /** Active opacity when pressed (default: 0.72 for opacity/bounce variant). */
  activeOpacity?: number;
  /** Active scale when pressed (default: 0.96 for scale/bounce variant). */
  activeScale?: number;
  /** Trigger tactile haptic vibration on press (iOS / Android). */
  haptic?: boolean | 'light' | 'medium' | 'heavy' | 'selection';
  className?: string;
  contentStyle?: StyleProp<ViewStyle>;
  children?: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
}

interface HapticsModule {
  impactAsync: (style: number) => Promise<void>;
  selectionAsync: () => Promise<void>;
  ImpactFeedbackStyle?: {
    Light: number;
    Medium: number;
    Heavy: number;
  };
}

let Haptics: HapticsModule | null = null;
try {
  Haptics = require('expo-haptics') as unknown as HapticsModule;
} catch {
  // Graceful fallback when expo-haptics is not installed
}

function triggerHaptic(type: PressableProps['haptic']) {
  if (!Haptics || !type) return;
  try {
    if (type === true || type === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle?.Light ?? 0);
    } else if (type === 'medium') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle?.Medium ?? 1);
    } else if (type === 'heavy') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle?.Heavy ?? 2);
    } else if (type === 'selection') {
      Haptics.selectionAsync();
    }
  } catch {
    // Ignore haptic errors on unsupported devices
  }
}

/**
 * Animated tactile RN Pressable with spring scale, smooth opacity dimming,
 * background highlight, and haptics running directly on the native UI thread.
 */
export function Pressable({
  variant = 'plain',
  activeOpacity = 0.72,
  activeScale = 0.96,
  haptic,
  className,
  disabled = false,
  hitSlop = 6,
  style,
  contentStyle,
  onPress,
  onPressIn,
  onPressOut,
  children,
  ...props
}: PressableProps) {
  const colors = useThemeColor();
  const [isPressed, setIsPressed] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: GestureResponderEvent) => {
    if (disabled) return;
    setIsPressed(true);

    if (haptic) {
      triggerHaptic(haptic);
    }

    if (variant === 'scale' || variant === 'bounce') {
      Animated.spring(scaleAnim, {
        toValue: activeScale,
        damping: 18,
        stiffness: 350,
        mass: 0.6,
        useNativeDriver: true,
      }).start();
    }

    if (variant === 'opacity' || variant === 'bounce') {
      Animated.timing(opacityAnim, {
        toValue: activeOpacity,
        duration: 80,
        useNativeDriver: true,
      }).start();
    }

    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    if (disabled) return;
    setIsPressed(false);

    if (variant === 'scale' || variant === 'bounce') {
      Animated.spring(scaleAnim, {
        toValue: 1,
        damping: 18,
        stiffness: 350,
        mass: 0.6,
        useNativeDriver: true,
      }).start();
    }

    if (variant === 'opacity' || variant === 'bounce') {
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }).start();
    }

    onPressOut?.(e);
  };

  const isAnimated = variant !== 'plain' && variant !== 'highlight';

  return (
    <RNPressable
      disabled={disabled}
      hitSlop={hitSlop}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className={cn(disabled && 'opacity-50', className)}
      style={style}
      {...props}
    >
      <Animated.View
        style={[
          variant === 'highlight' &&
            isPressed && {
              backgroundColor: colors.accent,
            },
          isAnimated && {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
          contentStyle,
        ]}
      >
        {typeof children === 'function'
          ? children({ pressed: isPressed, hovered: false })
          : children}
      </Animated.View>
    </RNPressable>
  );
}
