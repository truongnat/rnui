import { useEffect } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface SnackbarProps extends ViewProps {
  open: boolean;
  onDismiss?: () => void;
  /** Auto-dismiss after ms — 0 disables. */
  duration?: number;
  /** Trailing action — e.g. <SnackbarAction label="Undo" onPress={...}/>. */
  action?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function Snackbar({
  open,
  onDismiss,
  duration = 4000,
  action,
  className,
  children,
  ...props
}: SnackbarProps) {
  useEffect(() => {
    if (!open || duration <= 0) return;
    const t = setTimeout(() => onDismiss?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onDismiss]);

  if (!open) return null;

  return (
    <View
      accessibilityLiveRegion="polite"
      className={cn(
        'absolute bottom-6 left-4 right-4 flex-row items-center rounded-md bg-foreground px-4 py-3 shadow-lg',
        className
      )}
      {...props}
    >
      <View className="flex-1">
        {typeof children === 'string' ? (
          <Text className="text-sm text-background">{children}</Text>
        ) : (
          children
        )}
      </View>
      {action}
    </View>
  );
}

export function SnackbarAction({
  label,
  onPress,
  className,
}: {
  label: string;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn('ml-3 px-1 py-1', className)}
    >
      <Text className="text-sm font-medium text-primary-foreground">
        {label}
      </Text>
    </Pressable>
  );
}
