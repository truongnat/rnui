import { useEffect, useRef } from 'react';
import { Animated, Pressable, type PressableProps } from 'react-native';
import { cn } from '@/lib/utils';

const THUMB = 20;
const TRACK_W = 44;
const PAD = 3;

export interface SwitchProps extends Omit<PressableProps, 'children'> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  thumbClassName?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  className,
  thumbClassName,
  disabled,
  ...props
}: SwitchProps) {
  const translate = useRef(
    new Animated.Value(checked ? TRACK_W - THUMB - PAD * 2 : 0)
  ).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: checked ? TRACK_W - THUMB - PAD * 2 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [checked, translate]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: !!disabled }}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
      className={cn(
        'justify-center rounded-full',
        checked ? 'bg-primary' : 'bg-input',
        disabled && 'opacity-50',
        className
      )}
      style={{ width: TRACK_W, height: THUMB + PAD * 2, padding: PAD }}
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
