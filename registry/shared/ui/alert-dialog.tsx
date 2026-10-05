import type { ReactNode } from 'react';
import { Modal, Pressable, View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface AlertDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function AlertDialog({
  open,
  onOpenChange,
  children,
}: AlertDialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <View className="flex-1 items-center justify-center bg-black/50 p-6">
        <View className="w-full max-w-sm rounded-2xl border border-border bg-background p-6">
          {children}
        </View>
      </View>
    </Modal>
  );
}

export function AlertDialogTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function AlertDialogDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('mt-1.5 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function AlertDialogFooter({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('mt-6 flex-row justify-end gap-2', className)}
      {...props}
    />
  );
}

export interface AlertDialogActionProps {
  onPress?: () => void;
  children?: ReactNode;
  className?: string;
}

export function AlertDialogAction({
  onPress,
  children,
  className,
}: AlertDialogActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn(
        'rounded-md bg-primary px-4 py-2 active:opacity-80',
        className
      )}
    >
      <Text className="text-sm font-medium text-primary-foreground">
        {children}
      </Text>
    </Pressable>
  );
}

export function AlertDialogCancel({
  onPress,
  children,
  className,
}: AlertDialogActionProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      className={cn(
        'rounded-md border border-border bg-background px-4 py-2 active:opacity-80',
        className
      )}
    >
      <Text className="text-sm font-medium text-foreground">{children}</Text>
    </Pressable>
  );
}
