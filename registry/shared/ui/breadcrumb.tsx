import { ChevronRight } from 'lucide-react-native';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export function Breadcrumb({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      accessibilityRole="toolbar"
      className={cn('flex-row flex-wrap items-center', className)}
      {...props}
    />
  );
}

export interface BreadcrumbItemProps extends Omit<PressableProps, 'children'> {
  className?: string;
  children?: React.ReactNode;
}

export function BreadcrumbItem({
  className,
  children,
  ...props
}: BreadcrumbItemProps) {
  return (
    <Pressable
      accessibilityRole="link"
      className={cn('active:opacity-60', className)}
      {...props}
    >
      <Text className="text-sm text-muted-foreground">{children}</Text>
    </Pressable>
  );
}

export function BreadcrumbPage({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({ className }: { className?: string }) {
  return (
    <View className={cn('mx-1.5', className)}>
      <ChevronRight size={14} color={useIconColor()} />
    </View>
  );
}
