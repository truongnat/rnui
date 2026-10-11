import { useState } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { Check, X } from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ReduceMotion,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { cn, useIconColor, useThemeColor } from '@/lib/utils';
import { tv } from 'tailwind-variants';

const chip = tv({
  base: 'min-h-11 min-w-11 flex-row items-center gap-2 self-start rounded-full border px-3 py-2',
  variants: {
    variant: {
      filled: 'border-border bg-secondary',
      outlined: 'border-border bg-transparent',
    },
  },
  defaultVariants: { variant: 'filled' },
});

export interface ChipProps extends Omit<PressableProps, 'children'> {
  label: string;
  variant?: 'filled' | 'outlined';
  selected?: boolean;
  /** Show a trailing remove (x) affordance. */
  onRemove?: () => void;
  className?: string;
}

export function Chip({
  label,
  variant = 'filled',
  selected = false,
  onRemove,
  className,
  disabled,
  style,
  onPress,
  accessibilityState,
  onLongPress,
  onPressIn,
  onPressOut,
  ...props
}: ChipProps) {
  const iconColor = useIconColor();
  const colors = useThemeColor();
  const interactive = !!(onPress || onLongPress);
  const [pressed, setPressed] = useState(false);
  const handlePressIn: NonNullable<PressableProps['onPressIn']> = (event) => {
    setPressed(true);
    onPressIn?.(event);
  };
  const handlePressOut: NonNullable<PressableProps['onPressOut']> = (event) => {
    setPressed(false);
    onPressOut?.(event);
  };
  const content = (
    <>
      {selected ? (
        <Animated.View
          entering={FadeIn.duration(140).reduceMotion(ReduceMotion.System)}
          exiting={FadeOut.duration(100).reduceMotion(ReduceMotion.System)}
          pointerEvents="none"
        >
          <Check
            size={14}
            color={
              variant === 'filled'
                ? colors.primaryForeground
                : colors.foreground
            }
          />
        </Animated.View>
      ) : null}
      <Text
        className="shrink text-sm font-medium text-secondary-foreground"
        style={
          selected && variant === 'filled'
            ? { color: colors.primaryForeground }
            : variant === 'outlined'
              ? { color: colors.foreground }
              : undefined
        }
      >
        {label}
      </Text>
    </>
  );

  return (
    <Pressable
      accessibilityRole={interactive ? 'button' : undefined}
      accessible={onRemove ? false : interactive ? undefined : false}
      accessibilityState={{
        ...accessibilityState,
        selected,
        disabled: !!disabled,
      }}
      disabled={disabled}
      onPress={onRemove ? undefined : onPress}
      onLongPress={onRemove ? undefined : onLongPress}
      onPressIn={onRemove ? undefined : handlePressIn}
      onPressOut={onRemove ? undefined : handlePressOut}
      className={cn(chip({ variant }), className)}
      style={[
        { borderCurve: 'continuous' },
        { opacity: disabled ? 0.5 : pressed && interactive ? 0.75 : 1 },
        selected &&
          variant === 'filled' && {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
          },
        selected && variant === 'outlined' && { borderColor: colors.primary },
        typeof style === 'function' ? style({ pressed, hovered: false }) : style,
      ]}
      {...props}
    >
      {onRemove ? (
        <Pressable
          accessible={interactive}
          accessibilityRole={
            props.accessibilityRole ?? (interactive ? 'button' : undefined)
          }
          accessibilityLabel={props.accessibilityLabel ?? label}
          accessibilityHint={props.accessibilityHint}
          accessibilityState={{
            ...accessibilityState,
            selected,
            disabled: !!disabled,
          }}
          disabled={disabled || !interactive}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          delayLongPress={props.delayLongPress}
          onLongPress={onLongPress}
          className="min-h-11 min-w-11 shrink flex-row items-center gap-2 -my-2"
        >
          {content}
        </Pressable>
      ) : (
        content
      )}
      {onRemove && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          accessibilityState={{ disabled: !!disabled }}
          disabled={disabled}
          onPress={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="h-11 w-11 -my-2 -mr-2 items-center justify-center rounded-full"
        >
          <X
            size={14}
            color={
              selected && variant === 'filled'
                ? colors.primaryForeground
                : iconColor
            }
          />
        </Pressable>
      )}
    </Pressable>
  );
}
