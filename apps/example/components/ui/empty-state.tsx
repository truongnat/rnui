import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends ViewProps {
  /** Icon or illustration node. */
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function EmptyState({
  icon,
  className,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <View className={cn('items-center gap-2 px-6 py-10', className)} {...props}>
      {icon}
      {children}
    </View>
  );
}

export function EmptyStateTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-base font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function EmptyStateDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function EmptyStateAction({
  className,
  children,
  ...props
}: ViewProps & { className?: string; children?: ReactNode }) {
  return (
    <View className={cn('mt-3', className)} {...props}>
      {children}
    </View>
  );
}
