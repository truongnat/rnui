import type { ReactNode } from 'react';
import {
  type GestureResponderEvent,
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  type PressableStateCallbackType,
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
  /** Active opacity when pressed (default: 0.72 for opacity variant). */
  activeOpacity?: number;
  /** Active scale when pressed (default: 0.97 for scale/bounce variant). */
  activeScale?: number;
  /** Trigger tactile haptic vibration on press (iOS / Android). */
  haptic?: boolean | 'light' | 'medium' | 'heavy' | 'selection';
  className?: string;
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
 * Premium RN Pressable with native feedback variants (opacity, scale, bounce, highlight),
 * tactile haptic support, and safe disabled handling.
 */
export function Pressable({
  variant = 'plain',
  activeOpacity = 0.72,
  activeScale = 0.97,
  haptic,
  className,
  disabled = false,
  hitSlop = 6,
  style,
  onPress,
  children,
  ...props
}: PressableProps) {
  const colors = useThemeColor();

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    if (haptic) {
      triggerHaptic(haptic);
    }
    onPress?.(e);
  };

  return (
    <RNPressable
      disabled={disabled}
      hitSlop={hitSlop}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      className={cn(disabled && 'opacity-50', className)}
      style={(state) => {
        const { pressed } = state;
        const variantStyles: ViewStyle = {};

        if (pressed && !disabled) {
          switch (variant) {
            case 'opacity':
              variantStyles.opacity = activeOpacity;
              break;
            case 'highlight':
              variantStyles.backgroundColor = colors.accent;
              break;
            case 'scale':
              variantStyles.transform = [{ scale: activeScale }];
              break;
            case 'bounce':
              variantStyles.opacity = activeOpacity;
              variantStyles.transform = [{ scale: activeScale }];
              break;
            case 'plain':
            default:
              break;
          }
        }

        const userStyle =
          typeof style === 'function' ? style(state) : style;

        return [variantStyles, userStyle];
      }}
      {...props}
    >
      {children}
    </RNPressable>
  );
}
