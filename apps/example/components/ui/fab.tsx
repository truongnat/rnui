import type { ReactNode } from 'react';
import { Pressable, type PressableProps, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { tv } from 'tailwind-variants';

const fab = tv({
  base: 'items-center justify-center self-end rounded-full bg-primary shadow-lg active:opacity-90',
  variants: {
    size: {
      sm: 'h-10 w-10',
      md: 'h-14 w-14',
      extended: 'h-14 flex-row gap-2 px-5',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface FabProps extends Omit<PressableProps, 'children'> {
  /** Icon node (e.g. a lucide icon). */
  icon?: ReactNode;
  /** Extended FAB label. */
  label?: string;
  size?: 'sm' | 'md' | 'extended';
  className?: string;
}

export function Fab({
  icon,
  label,
  size = 'md',
  className,
  disabled,
  ...props
}: FabProps) {
  const resolved = label ? 'extended' : size;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      className={cn(
        fab({ size: resolved }),
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {icon}
      {label && (
        <Text className="text-sm font-medium text-primary-foreground">
          {label}
        </Text>
      )}
      {resolved === 'extended' && !label && !icon && <View />}
    </Pressable>
  );
}
