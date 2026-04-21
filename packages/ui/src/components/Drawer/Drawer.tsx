import { useReduceMotionEnabled } from '@truongdq01/headless';
import { spring } from '@truongdq01/tokens';
import React, { useEffect } from 'react';
import { Modal, useWindowDimensions, type ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { DrawerBackdrop } from './DrawerBackdrop';
import { DrawerContent } from './DrawerContent';
import type { DrawerProps } from './types';

export { DrawerBackdrop } from './DrawerBackdrop';
export { DrawerContent } from './DrawerContent';
export { DrawerFooter } from './DrawerFooter';
export { DrawerHeader } from './DrawerHeader';

/**
 * Drawer — slide-in modal panel anchored to any screen edge.
 *
 * Supports left / right / top / bottom anchors with spring animation
 * and a pressable backdrop that calls onClose.
 */
export function Drawer({
  open,
  onClose,
  anchor = 'left',
  children,
  accessibilityLabel = 'Drawer',
  backdropAccessibilityLabel = 'Dismiss drawer',
}: DrawerProps) {
  const reduceMotion = useReduceMotionEnabled();
  const { height: windowHeight } = useWindowDimensions();

  const isVertical = anchor === 'top' || anchor === 'bottom';
  const size = isVertical ? windowHeight * 0.4 : 280;

  const progress = useSharedValue(0);
  const [mounted, setMounted] = React.useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      if (reduceMotion) {
        progress.value = 1;
      } else {
        progress.value = withSpring(1, spring.snappy);
      }
    } else {
      if (reduceMotion) {
        progress.value = 0;
        setMounted(false);
      } else {
        progress.value = withSpring(0, spring.snappy, (finished) => {
          if (finished) scheduleOnRN(setMounted, false);
        });
      }
    }
  }, [open, reduceMotion]);

  const animatedPanelStyle = useAnimatedStyle(() => {
    const translate = (1 - progress.value) * size;
    let transform: any[] = [];

    if (anchor === 'left') transform = [{ translateX: -translate }];
    else if (anchor === 'right') transform = [{ translateX: translate }];
    else if (anchor === 'top') transform = [{ translateY: -translate }];
    else if (anchor === 'bottom') transform = [{ translateY: translate }];

    return { transform };
  });

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const containerStyle: ViewStyle = {
    position: 'absolute',
    ...(anchor === 'left' ? { left: 0, top: 0, bottom: 0, width: size } : {}),
    ...(anchor === 'right' ? { right: 0, top: 0, bottom: 0, width: size } : {}),
    ...(anchor === 'top' ? { top: 0, left: 0, right: 0, height: size } : {}),
    ...(anchor === 'bottom'
      ? { bottom: 0, left: 0, right: 0, height: size }
      : {}),
  };

  if (!mounted) return null;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <DrawerBackdrop
        animatedStyle={backdropAnimatedStyle}
        onPress={onClose}
        accessibilityLabel={backdropAccessibilityLabel}
      />
      <DrawerContent
        animatedStyle={animatedPanelStyle}
        containerStyle={containerStyle}
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </DrawerContent>
    </Modal>
  );
}

