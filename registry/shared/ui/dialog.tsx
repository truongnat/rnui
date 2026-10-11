import { X } from 'lucide-react-native';
import { createContext, type ReactNode, useContext } from 'react';
import {
  Pressable,
  View,
  type PressableProps,
  type ViewProps,
} from 'react-native';
import { Modal, ModalContent } from '@/components/ui/modal';
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
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="max-w-sm">
        <DialogContext.Provider value={onOpenChange ?? null}>
          {showClose && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close dialog"
              onPress={() => onOpenChange?.(false)}
              className="absolute right-2 top-2 z-10 h-11 w-11 items-center justify-center rounded-md active:opacity-70"
            >
              <X size={20} color={iconColor} />
            </Pressable>
          )}
          {children}
        </DialogContext.Provider>
      </ModalContent>
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
      accessibilityRole="header"
      className={cn('pr-8 text-lg font-semibold text-foreground', className)}
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
      className={cn('mt-6 flex-row flex-wrap justify-end gap-2', className)}
      {...props}
    />
  );
}
