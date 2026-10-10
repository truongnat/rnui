import { useContext, useEffect, useRef, useState } from 'react';
import {
  Animated,
  type GestureResponderEvent,
  Platform,
  Pressable,
  type PressableProps,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

const SIZES = {
  default: { trackWidth: 46, trackHeight: 26, thumbSize: 22, pad: 2 },
  sm: { trackWidth: 36, trackHeight: 20, thumbSize: 16, pad: 2 },
} as const;

export interface SwitchProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Mirrors shadcn `aria-invalid`. Auto-detected from FormField error. */
  invalid?: boolean;
  size?: keyof typeof SIZES;
  className?: string;
  thumbClassName?: string;
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  invalid,
  size = 'default',
  className,
  thumbClassName,
  disabled = false,
  style,
  onPress,
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;

  const { trackWidth, trackHeight, thumbSize, pad } = SIZES[size];
  const maxTranslate = trackWidth - thumbSize - pad * 2;

  const translateAnim = useRef(
    new Animated.Value(checked ? maxTranslate : 0)
  ).current;

  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const isInvalid = invalid ?? !!field?.error;

  useEffect(() => {
    Animated.timing(translateAnim, {
      toValue: checked ? maxTranslate : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [checked, maxTranslate, translateAnim]);

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    const next = !checked;
    if (!isControlled) {
      setUncontrolledChecked(next);
    }
    onCheckedChange?.(next);
    onPress?.(e);
  };

  const trackBg = isInvalid
    ? colors.destructive
    : checked
      ? colors.primary
      : colors.input || colors.border;

  const dynamicTrackStyle: ViewStyle = {
    width: trackWidth,
    height: trackHeight,
    borderRadius: trackHeight / 2,
    padding: pad,
    backgroundColor: trackBg,
    borderColor: isInvalid ? colors.destructive : 'transparent',
    borderWidth: isInvalid ? 1 : 0,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <Pressable
      hitSlop={8}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={handlePress}
      className={cn('justify-center', className)}
      style={[styles.trackBase, dynamicTrackStyle, style as ViewStyle]}
      {...props}
    >
      <Animated.View
        className={cn('rounded-full', thumbClassName)}
        style={[
          styles.thumbBase,
          {
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: '#ffffff',
            transform: [{ translateX: translateAnim }],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  trackBase: {
    justifyContent: 'center',
  },
  thumbBase: {
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  },
});
