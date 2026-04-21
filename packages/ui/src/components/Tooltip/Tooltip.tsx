import React, { useCallback, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  type View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { TooltipContent } from './TooltipContent';
import type { TooltipProps, TriggerRect } from './types';

const GAP = 8;
const PADDING = 12;

/**
 * Tooltip — wraps the trigger element, manages visibility state,
 * measures the trigger position, and computes the tooltip placement.
 */
export function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = 'top',
}: TooltipProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [triggerRect, setTriggerRect] = useState<TriggerRect | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const triggerRef = React.useRef<View>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const opacity = useSharedValue(0);

  const animateIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 150 });
  }, []);

  const animateOut = useCallback((onDone: () => void) => {
    opacity.value = withTiming(0, { duration: 100 }, () => {
      if (onDone) scheduleOnRN(onDone);
    });
  }, []);

  const handleOpen = () => {
    triggerRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
      setTriggerRect({ pageX, pageY, width: w, height: h });
      setInternalOpen(true);
      onOpen?.();
      requestAnimationFrame(() => animateIn());
    });
  };

  const handleClose = () => {
    animateOut(() => {
      setInternalOpen(false);
      setTriggerRect(null);
      onClose?.();
    });
  };

  const tx = triggerRect?.pageX ?? 0;
  const ty = triggerRect?.pageY ?? 0;
  const tw = triggerRect?.width ?? 0;
  const th = triggerRect?.height ?? 0;
  const tlw = tooltipSize.width || 200;
  const tlh = tooltipSize.height || 40;

  let top = ty - tlh - GAP;
  let left = tx + tw / 2 - tlw / 2;

  if (placement.includes('bottom')) top = ty + th + GAP;
  if (placement.includes('left')) left = tx - tlw - GAP;
  if (placement.includes('right')) left = tx + tw + GAP;
  if (placement.includes('top-left') || placement.includes('bottom-left'))
    left = tx;
  if (placement.includes('top-right') || placement.includes('bottom-right'))
    left = tx + tw - tlw;

  const safeTop = Math.max(PADDING, Math.min(top, windowHeight - tlh - PADDING));
  const safeLeft = Math.max(PADDING, Math.min(left, windowWidth - tlw - PADDING));

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <>
      <Pressable
        ref={triggerRef}
        onPress={handleOpen}
        onLongPress={handleOpen}
        delayLongPress={400}
        accessibilityRole="button"
        accessibilityHint="Shows tooltip"
      >
        {children}
      </Pressable>

      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <Pressable style={styles.backdrop} onPress={handleClose}>
          <TooltipContent
            title={title}
            top={safeTop}
            left={safeLeft}
            animStyle={animStyle}
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              setTooltipSize({ width, height });
            }}
          />
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
