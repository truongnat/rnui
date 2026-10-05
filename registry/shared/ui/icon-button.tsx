import type { ReactNode } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { cn } from '@/lib/utils';
import { tv } from 'tailwind-variants';

const iconButton = tv({
  base: 'items-center justify-center rounded-md active:opacity-80',
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      outline: 'border border-border bg-background',
      ghost: 'bg-transparent',
    },
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    },
  },
  defaultVariants: { variant: 'default', size: 'md' },
});

export interface IconButtonProps extends Omit<PressableProps, 'children'> {
  icon: ReactNode;
  accessibilityLabel: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function IconButton({
  icon,
  accessibilityLabel,
  variant,
  size,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      className={cn(
        iconButton({ variant, size }),
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {icon}
    </Pressable>
  );
}
