import type { ReactNode } from 'react';
import { Modal, Pressable, View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface SheetProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="slide"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <Pressable
        className="flex-1 justify-end bg-black/50"
        onPress={() => onOpenChange?.(false)}
      >
        {children}
      </Pressable>
    </Modal>
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <Pressable onPress={(e) => e.stopPropagation()}>
      <View
        className={cn(
          'rounded-t-2xl border-t border-border bg-background p-6 pt-3',
          className
        )}
        {...props}
      >
        <View className="mx-auto mb-4 h-1.5 w-9 rounded-full bg-muted" />
        {children}
      </View>
    </Pressable>
  );
}

export function SheetHeader({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('mb-4 flex-col gap-1.5', className)} {...props} />;
}

export function SheetTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function SheetFooter({
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
