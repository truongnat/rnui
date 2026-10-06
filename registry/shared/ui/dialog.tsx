import { X } from 'lucide-react-native';
import { createContext, type ReactNode, useContext } from 'react';
import {
  Modal,
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn, useIconColor } from '@/lib/utils';

const DialogContext = createContext<((open: boolean) => void) | null>(null);

export interface DialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Render the corner close affordance, like shadcn DialogContent. */
  showClose?: boolean;
  children?: ReactNode;
}

export function Dialog({
  open,
  onOpenChange,
  showClose = true,
  children,
}: DialogProps) {
  const iconColor = useIconColor('muted');
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
          <DialogContext.Provider value={onOpenChange ?? null}>
            {showClose && (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={() => onOpenChange?.(false)}
                className="absolute right-4 top-4 rounded-sm p-1 active:opacity-70"
              >
                <X size={16} color={iconColor} />
              </Pressable>
            )}
            {children}
          </DialogContext.Provider>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function DialogClose({
  onPress,
  children,
  className,
  ...props
}: PressableProps & { className?: string }) {
  const onOpenChange = useContext(DialogContext);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={(e) => {
        onPress?.(e);
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </Pressable>
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
