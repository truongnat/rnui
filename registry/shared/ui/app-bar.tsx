import type { ReactNode } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

export interface AppBarProps extends ViewProps {
  /** Rendered on the leading edge (overrides `onBack`). */
  leading?: ReactNode;
  /** Shows a back chevron when provided. */
  onBack?: () => void;
  trailing?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function AppBar({
  leading,
  onBack,
  trailing,
  className,
  children,
  ...props
}: AppBarProps) {
  const iconColor = useIconColor('foreground');
  return (
    <View
      className={cn(
        'min-h-14 flex-row items-center border-b border-border bg-background px-2 py-2',
        className
      )}
      {...props}
    >
      <View className="min-w-10 flex-row items-center">
        {leading ??
          (onBack && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={onBack}
              className="rounded-full p-2 active:bg-accent"
            >
              <ChevronLeft size={22} color={iconColor} />
            </Pressable>
          ))}
      </View>
      <View className="flex-1 justify-center px-1">{children}</View>
      <View className="min-w-10 flex-row items-center justify-end">
        {trailing}
      </View>
    </View>
  );
}

export function AppBarTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function AppBarSubtitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

export function AppBarAction({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      className={cn('rounded-full p-2 active:bg-accent', className)}
      {...props}
    >
      {children}
    </Pressable>
  );
}
