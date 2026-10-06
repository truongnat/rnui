import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const from = side === 'left' ? -drawerWidth : drawerWidth;
  const translate = useRef(new Animated.Value(from)).current;

  useEffect(() => {
    Animated.timing(translate, {
      toValue: open ? 0 : from,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [open, from, translate]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <View className="flex-1 flex-row bg-black/50">
        {side === 'right' && (
          <Pressable className="flex-1" onPress={() => onOpenChange?.(false)} />
        )}
        <Animated.View
          style={{
            width: drawerWidth,
            transform: [{ translateX: translate }],
          }}
        >
          <View className="h-full border-l border-border bg-background">
            <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
          </View>
        </Animated.View>
        {side === 'left' && (
          <Pressable className="flex-1" onPress={() => onOpenChange?.(false)} />
        )}
      </View>
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
