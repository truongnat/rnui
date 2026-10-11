import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from 'react';
import {
  KeyboardAvoidingView,
  Modal as RNModal,
  Platform,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
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
  /** Keep the React modal host mounted between native presentations. */
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
  const openRef = useRef(open);
  openRef.current = open;

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  const animationType: OverlayAnimationType =
    position === 'bottom' ? 'slideUp' : 'scale';

  if (!mounted && !open && !keepMounted) return null;
  return (
    <RNModal
      visible={mounted || open}
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="none"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <SafeAreaProvider>
        <ModalContext.Provider value={{ position }}>
          <AnimatedOverlay
            visible={open}
            animationType={animationType}
            showBackdrop
            backdropOpacity={showOverlay ? 0.5 : 0}
            onBackdropPress={
              dismissable ? () => onOpenChange?.(false) : undefined
            }
            onAnimationEnd={(entering) => {
              if (!entering && !openRef.current) setMounted(false);
            }}
          >
            <ModalInsetHost position={position}>
              {mounted || open || keepMounted ? children : null}
            </ModalInsetHost>
          </AnimatedOverlay>
        </ModalContext.Provider>
      </SafeAreaProvider>
    </RNModal>
  );
}

function ModalInsetHost({
  position,
  children,
}: {
  position: ModalPosition;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      pointerEvents="box-none"
      style={[
        styles.host,
        {
          paddingTop: insets.top + 24,
          paddingBottom: position === 'center' ? insets.bottom + 24 : 0,
          paddingLeft: position === 'center' ? insets.left + 24 : 0,
          paddingRight: position === 'center' ? insets.right + 24 : 0,
        },
        position === 'bottom' && styles.hostBottom,
      ]}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

export interface ModalContentProps extends ViewProps {
  className?: string;
}

export function ModalContent({
  className,
  children,
  style,
  ...props
}: ModalContentProps) {
  const { position } = useContext(ModalContext);
  const insets = useSafeAreaInsets();
  return (
    <View
      accessible={false}
      pointerEvents="box-none"
      className={
        position === 'center' ? 'w-full max-w-md items-center' : 'w-full'
      }
      style={{ flexShrink: 1, maxHeight: '100%' }}
    >
      <View
        accessibilityViewIsModal
        className={cn(
          'bg-background p-6',
          position === 'center' ? 'w-full rounded-2xl' : 'w-full rounded-t-2xl',
          className
        )}
        style={[
          { flexShrink: 1 },
          position === 'bottom' && {
            paddingBottom: insets.bottom + 24,
            paddingLeft: insets.left + 24,
            paddingRight: insets.right + 24,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </View>
    </View>
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
      accessibilityRole="header"
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
      className={cn('mt-6 flex-row flex-wrap justify-end gap-2', className)}
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
