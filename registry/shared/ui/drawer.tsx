import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  I18nManager,
  Modal,
  Pressable,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAnimatedOverlay } from '@/components/ui/animated-overlay';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Which edge the drawer slides from. */
  side?: 'left' | 'right';
  children?: ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  side = 'left',
  children,
}: DrawerProps) {
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(width * 0.8, 320);
  const physicalSide = I18nManager.isRTL
    ? side === 'left'
      ? 'right'
      : 'left'
    : side;
  const from = physicalSide === 'left' ? -drawerWidth : drawerWidth;
  const [mounted, setMounted] = useState(open);
  const openRef = useRef(open);
  openRef.current = open;
  const { progress, setVisible, backdropStyle } = useAnimatedOverlay({
    animationType: 'fade',
    onAnimationEnd: (entering) => {
      if (!entering && !openRef.current) setMounted(false);
    },
  });
  const translate = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [from, 0],
  });

  useEffect(() => {
    if (open) setMounted(true);
    setVisible(open);
  }, [open, setVisible]);

  return (
    <Modal
      visible={mounted || open}
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="none"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <SafeAreaProvider>
        <View
          className="flex-1"
          pointerEvents={open ? 'auto' : 'none'}
          accessibilityElementsHidden={!open}
          importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
        >
          <View
            className="flex-1"
            style={{ alignItems: side === 'left' ? 'flex-start' : 'flex-end' }}
          >
            <Animated.View
              className="absolute inset-0 bg-black"
              style={backdropStyle}
              pointerEvents="none"
            />
            <Pressable
              className="absolute inset-0"
              accessibilityRole="button"
              accessibilityLabel="Close drawer"
              onPress={() => onOpenChange?.(false)}
            />
            <Animated.View
              accessibilityViewIsModal
              className="h-full bg-background"
              style={{
                width: drawerWidth,
                transform: [{ translateX: translate }],
              }}
            >
              <SafeAreaView
                edges={['top', 'bottom', physicalSide]}
                style={{ flex: 1 }}
              >
                {children}
              </SafeAreaView>
            </Animated.View>
          </View>
        </View>
      </SafeAreaProvider>
    </Modal>
  );
}

export function DrawerHeader({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('gap-1.5 border-b border-border p-4', className)}
      {...props}
    />
  );
}

export function DrawerTitle({ className, ...props }: TextProps) {
  return (
    <Text
      accessibilityRole="header"
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function DrawerDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function DrawerContent({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('flex-1 p-4', className)} {...props} />;
}

export function DrawerFooter({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('mt-auto gap-2 border-t border-border p-4', className)}
      {...props}
    />
  );
}
