import type { ReactNode } from 'react';
import { Pressable, Text, type PressableProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const buttonVariants = tv({
  slots: {
    base: 'flex-row items-center justify-center gap-2 rounded-md disabled:opacity-50',
    label: 'font-medium',
  },
  variants: {
    variant: {
      default: {
        base: 'bg-primary active:opacity-90',
        label: 'text-primary-foreground',
      },
      destructive: {
        base: 'bg-destructive active:opacity-90',
        label: 'text-destructive-foreground',
      },
      outline: {
        base: 'border border-border bg-background active:bg-accent',
        label: 'text-foreground',
      },
      secondary: {
        base: 'bg-secondary active:opacity-80',
        label: 'text-secondary-foreground',
      },
      ghost: {
        base: 'active:bg-accent',
        label: 'text-foreground',
      },
      link: {
        label: 'text-primary underline',
      },
    },
    size: {
      default: { base: 'h-10 px-4', label: 'text-sm' },
      sm: { base: 'h-9 px-3', label: 'text-sm' },
      lg: { base: 'h-11 px-8', label: 'text-base' },
      icon: { base: 'h-10 w-10' },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

export interface ButtonProps
  extends Omit<PressableProps, 'children' | 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
}

export function Button({
  variant = 'default',
  size = 'default',
  className,
  labelClassName,
  children,
  ...props
}: ButtonProps) {
  const { base, label } = buttonVariants({ variant, size });

  return (
    <Pressable
      accessibilityRole="button"
      className={cn(base(), className)}
      {...props}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text className={cn(label(), labelClassName)}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
