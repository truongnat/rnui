import type { ReactNode } from 'react';
import {
  Pressable as RNPressable,
  type PressableProps as RNPressableProps,
  type PressableStateCallbackType,
} from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const pressableVariants = tv({
  variants: {
    variant: {
      /** No pressed feedback. */
      plain: '',
      /** Dimmed while pressed. */
      opacity: 'active:opacity-70',
      /** Accent background while pressed (row/card taps). */
      highlight: 'active:bg-accent',
    },
  },
  defaultVariants: { variant: 'plain' },
});

export type PressableVariant = 'plain' | 'opacity' | 'highlight';

export interface PressableProps extends Omit<RNPressableProps, 'children'> {
  variant?: PressableVariant;
  className?: string;
  children?: ReactNode | ((state: PressableStateCallbackType) => ReactNode);
}

/**
 * RN Pressable with a `variant` for pressed feedback and
 * render-prop children receiving the pressed state.
 */
export function Pressable({
  variant = 'plain',
  className,
  children,
  ...props
}: PressableProps) {
  return (
    <RNPressable
      className={cn(pressableVariants({ variant }), className)}
      {...props}
    >
      {children}
    </RNPressable>
  );
}
