import type { ReactNode } from 'react';
import { Text, View, type ViewProps } from 'react-native';
import { tv } from 'tailwind-variants';
import { cn } from '@/lib/utils';

const badgeVariants = tv({
  slots: {
    base: 'flex-row items-center self-start rounded-full border px-2.5 py-0.5',
    label: 'text-xs font-semibold',
  },
  variants: {
    variant: {
      default: {
        base: 'border-transparent bg-primary',
        label: 'text-primary-foreground',
      },
      secondary: {
        base: 'border-transparent bg-secondary',
        label: 'text-secondary-foreground',
      },
      destructive: {
        base: 'border-transparent bg-destructive',
        label: 'text-destructive-foreground',
      },
      outline: {
        base: 'border-border',
        label: 'text-foreground',
      },
    },
  },
  defaultVariants: { variant: 'default' },
});

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

export interface BadgeProps extends Omit<ViewProps, 'children'> {
  variant?: BadgeVariant;
  className?: string;
  labelClassName?: string;
  children?: ReactNode;
}

export function Badge({
  variant = 'default',
  className,
  labelClassName,
  children,
  ...props
}: BadgeProps) {
  const { base, label } = badgeVariants({ variant });

  return (
    <View className={cn(base(), className)} {...props}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text className={cn(label(), labelClassName)}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
