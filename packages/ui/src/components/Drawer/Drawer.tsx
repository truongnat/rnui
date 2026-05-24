import { useReduceMotionEnabled } from '@truongdq01/headless';
import React, { useEffect } from 'react';
import { Modal, useWindowDimensions, type ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { overlaySlideIn, overlaySlideOut } from '../../motion/overlayTiming';
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
 * Supports left / right / top / bottom anchors with timing animation
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
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const isVertical = anchor === 'top' || anchor === 'bottom';
  const size = isVertical
    ? windowHeight * 0.4
    : Math.min(Math.round(windowWidth * 0.86), 320);

  const progress = useSharedValue(0);
  const [mounted, setMounted] = React.useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      if (reduceMotion) {
        progress.value = 1;
      } else {
        progress.value = withTiming(1, overlaySlideIn);
      }
    } else if (reduceMotion) {
      progress.value = 0;
      setMounted(false);
    } else {
      progress.value = withTiming(0, overlaySlideOut, (finished) => {
        if (finished) scheduleOnRN(setMounted, false);
      });
    }
  }, [open, reduceMotion, progress]);

  const animatedPanelStyle = useAnimatedStyle(() => {
    const translate = (1 - progress.value) * size;

    if (anchor === 'left') return { transform: [{ translateX: -translate }] };
    if (anchor === 'right') return { transform: [{ translateX: translate }] };
    if (anchor === 'top') return { transform: [{ translateY: -translate }] };
    return { transform: [{ translateY: translate }] };
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
