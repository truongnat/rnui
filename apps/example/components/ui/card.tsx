import { StyleSheet, View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export function Card({
  className,
  style,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn(
        'rounded-2xl border border-border bg-card shadow-sm',
        className
      )}
      style={[{ borderCurve: 'continuous' }, style]}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View className={cn('flex-col gap-1.5 p-5 pb-3', className)} {...props} />
  );
}

export function CardTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        'text-lg font-semibold tracking-tight text-card-foreground leading-6',
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground leading-5', className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('p-5 pt-0', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('flex-row items-center p-5 pt-0', className)}
      {...props}
    />
  );
}
