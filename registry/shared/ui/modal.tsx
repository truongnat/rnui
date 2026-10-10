import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AnimatedOverlay,
  type OverlayAnimationType,
} from '@/components/ui/animated-overlay';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export type ModalPosition = 'center' | 'bottom';

const ModalContext = createContext<{ position: ModalPosition }>({
  position: 'center',
});

export interface ModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  /** `center` (default) scales in; `bottom` slides up and docks to the edge. */
  position?: ModalPosition;
  /** Render the dimmed backdrop. Tapping outside still closes when hidden. */
  showOverlay?: boolean;
  /** Keep the modal mounted after close (skips exit animation). */
  keepMounted?: boolean;
  /** Tapping the backdrop requests close. Default true. */
  dismissable?: boolean;
  children?: ReactNode;
}

/**
 * Modal — generic overlay dialog, distinct from Sheet (bottom-anchored
 * drag surface). Backdrop press + Android back request close; exit
 * animation plays before unmount.
 */
export function Modal({
  open,
  onOpenChange,
  position = 'center',
  showOverlay = true,
  keepMounted = false,
  dismissable = true,
  children,
}: ModalProps) {
  const [mounted, setMounted] = useState(open);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const animationType: OverlayAnimationType =
    position === 'bottom' ? 'slideUp' : 'scale';

  return (
    <RNModal
      visible={mounted || keepMounted}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <ModalContext.Provider value={{ position }}>
        <AnimatedOverlay
          visible={open}
          animationType={animationType}
          showBackdrop={showOverlay}
          onBackdropPress={
            dismissable ? () => onOpenChange?.(false) : undefined
          }
          onAnimationEnd={(entering) => {
            if (!entering && !keepMounted) setMounted(false);
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            pointerEvents="box-none"
            style={[styles.host, position === 'bottom' && styles.hostBottom]}
          >
            {children}
          </KeyboardAvoidingView>
        </AnimatedOverlay>
      </ModalContext.Provider>
    </RNModal>
  );
}

export interface ModalContentProps extends ViewProps {
  className?: string;
}

export function ModalContent({
  className,
  children,
  ...props
}: ModalContentProps) {
  const { position } = useContext(ModalContext);
  const insets = useSafeAreaInsets();
  return (
    <Pressable>
      <View
        accessibilityViewIsModal
        className={cn(
          'border border-border bg-background p-6 shadow-lg',
          position === 'center'
            ? 'mx-6 w-full max-w-md rounded-2xl'
            : 'w-full rounded-t-2xl border-b-0',
          className
        )}
        style={
          position === 'bottom'
            ? { paddingBottom: insets.bottom + 24 }
            : undefined
        }
        {...props}
      >
        {position === 'bottom' && (
          <View className="mx-auto mb-4 h-1.5 w-9 rounded-full bg-muted" />
        )}
        {children}
      </View>
    </Pressable>
  );
}

export function ModalHeader({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('mb-4 flex-col gap-1.5', className)} {...props} />;
}

export function ModalTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function ModalDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function ModalFooter({
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

const styles = StyleSheet.create({
  host: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostBottom: {
    justifyContent: 'flex-end',
  },
});
