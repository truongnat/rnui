import { createContext, type ReactNode, useContext } from 'react';
import { Pressable, View, type ViewProps } from 'react-native';
import { Modal, ModalContent } from '@/components/ui/modal';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const AlertDialogContext = createContext<((open: boolean) => void) | null>(
  null
);

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
    <Modal open={open} onOpenChange={onOpenChange} dismissable={false}>
      <ModalContent className="max-w-sm">
        <AlertDialogContext.Provider value={onOpenChange ?? null}>
          {children}
        </AlertDialogContext.Provider>
      </ModalContent>
    </Modal>
  );
}

export function AlertDialogTitle({ className, ...props }: TextProps) {
  return (
    <Text
      accessibilityRole="header"
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
  return <View className={cn('mt-6 flex-col gap-2', className)} {...props} />;
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
  const onOpenChange = useContext(AlertDialogContext);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onPress?.();
        onOpenChange?.(false);
      }}
      className={cn(
        'min-h-11 items-center justify-center rounded-md bg-primary px-4 py-3 active:opacity-80',
        className
      )}
    >
      {typeof children === 'string' ? (
        <Text className="text-center text-sm font-medium text-primary-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function AlertDialogCancel({
  onPress,
  children,
  className,
}: AlertDialogActionProps) {
  const onOpenChange = useContext(AlertDialogContext);
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => {
        onPress?.();
        onOpenChange?.(false);
      }}
      className={cn(
        'min-h-11 items-center justify-center rounded-md border border-border bg-background px-4 py-3 active:opacity-80',
        className
      )}
    >
      {typeof children === 'string' ? (
        <Text className="text-center text-sm font-medium text-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
