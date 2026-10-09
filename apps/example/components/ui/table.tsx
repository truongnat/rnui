import {
  Pressable,
  ScrollView,
  View,
  type ScrollViewProps,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export function Table({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('w-full', className)} {...props} />;
}

export function TableScroll({
  className,
  ...props
}: ScrollViewProps & { className?: string }) {
  return <ScrollView horizontal className={className} {...props} />;
}

export function TableHeader({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View className={cn('border-b border-border', className)} {...props} />
  );
}

export function TableBody({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={className} {...props} />;
}

export interface TableRowProps extends ViewProps {
  className?: string;
  onPress?: () => void;
}

export function TableRow({ className, onPress, ...props }: TableRowProps) {
  const row = (
    <View
      className={cn('flex-row border-b border-border', className)}
      {...props}
    />
  );
  if (!onPress) return row;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className="active:bg-accent"
    >
      {row}
    </Pressable>
  );
}

export interface TableCellProps extends ViewProps {
  className?: string;
  /** Flex grow factor for the column. */
  flex?: number;
}

export function TableHead({
  className,
  flex = 1,
  children,
  ...props
}: TableCellProps) {
  return (
    <View
      className={cn('justify-center px-2 py-3', className)}
      style={{ flex }}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm font-medium text-muted-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

export function TableCell({
  className,
  flex = 1,
  children,
  ...props
}: TableCellProps) {
  return (
    <View
      className={cn('justify-center px-2 py-3', className)}
      style={{ flex }}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className="text-sm text-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}

export function TableCaption({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
