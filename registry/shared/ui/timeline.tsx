import type { ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export function Timeline({
  className,
  children,
  ...props
}: ViewProps & { className?: string; children?: ReactNode }) {
  return (
    <View className={cn('w-full', className)} {...props}>
      {children}
    </View>
  );
}

export interface TimelineItemProps extends ViewProps {
  /** Custom dot node — defaults to a themed bullet. */
  dot?: ReactNode;
  /** Set false on the last item to hide the connector line. */
  line?: boolean;
  className?: string;
  children?: ReactNode;
}

export function TimelineItem({
  dot,
  line = true,
  className,
  children,
  ...props
}: TimelineItemProps) {
  return (
    <View className={cn('flex-row gap-3', className)} {...props}>
      <View className="items-center">
        {dot ?? <View className="mt-1.5 h-2.5 w-2.5 rounded-full bg-primary" />}
        {line && <View className="w-px flex-1 bg-border" />}
      </View>
      <View className={cn('flex-1', line && 'pb-6')}>{children}</View>
    </View>
  );
}

export function TimelineTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  );
}

export function TimelineDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('mt-0.5 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
