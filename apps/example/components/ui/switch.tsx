import { useContext, useEffect, useRef } from 'react';
import { Animated, Pressable, type PressableProps } from 'react-native';
import { cn, FormFieldContext, useThemeColor } from '@/lib/utils';

const PAD = 3;
const SIZES = {
  default: { track: 44, thumb: 20 },
  sm: { track: 34, thumb: 15 },
} as const;

export interface SwitchProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Mirrors shadcn `aria-invalid`. Auto-detected from FormField error. */
  invalid?: boolean;
  size?: keyof typeof SIZES;
  className?: string;
  thumbClassName?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  invalid,
  size = 'default',
  className,
  thumbClassName,
  disabled,
  style,
  ...props
}: SwitchProps) {
  const { track: TRACK_W, thumb: THUMB } = SIZES[size];
  const translate = useRef(
    new Animated.Value(checked ? TRACK_W - THUMB - PAD * 2 : 0)
  ).current;
  const field = useContext(FormFieldContext);
  const colors = useThemeColor();
  const isInvalid = invalid ?? !!field?.error;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: checked ? TRACK_W - THUMB - PAD * 2 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [checked, translate, TRACK_W, THUMB]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'justify-center rounded-full border border-transparent',
        disabled && 'opacity-50',
        className
      )}
      style={(state) => [
        {
          width: TRACK_W,
          height: THUMB + PAD * 2,
          padding: PAD,
          backgroundColor: checked ? colors.primary : colors.input,
          borderCurve: 'continuous',
        },
        isInvalid && { borderColor: colors.destructive },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...props}
    >
      <Animated.View
        className={cn('rounded-full bg-background shadow-sm', thumbClassName)}
        style={{
          width: THUMB,
          height: THUMB,
          transform: [{ translateX: translate }],
        }}
      />
    </Pressable>
  );
}
