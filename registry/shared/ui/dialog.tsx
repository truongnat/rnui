import type { ReactNode } from 'react';
import { Modal, Pressable, View, type ViewProps } from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 p-6"
        onPress={() => onOpenChange?.(false)}
      >
        <Pressable
          className="w-full max-w-sm rounded-2xl border border-border bg-background p-6"
          onPress={(e) => e.stopPropagation()}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function DialogDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('mt-1.5 text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function DialogFooter({
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
