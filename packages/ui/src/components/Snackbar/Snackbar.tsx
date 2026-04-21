import { useTheme } from '@truongdq01/headless';
import React, { useEffect, useMemo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { SnackbarContent } from './SnackbarContent';
import type { SnackbarProps } from './types';

/**
 * Snackbar — positions the animated container and manages show/hide lifecycle.
 */
export function Snackbar({
  open,
  message,
  autoHideDuration = 4000,
  onClose,
  action,
  anchorOrigin = { vertical: 'bottom', horizontal: 'center' },
}: SnackbarProps) {
  const {
    components: { snackbar },
  } = useTheme();

  const [mounted, setMounted] = React.useState(open);
  const isBottom = anchorOrigin.vertical === 'bottom';

  const translateY = useSharedValue(isBottom ? 100 : -100);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);

  const animateIn = () => {
    translateY.value = withSpring(0, { damping: 25, stiffness: 300, mass: 1 });
    opacity.value = withTiming(1, { duration: 200 });
    scale.value = withSpring(1, { damping: 25, stiffness: 300 });
  };

  const animateOut = (onDone: () => void) => {
    translateY.value = withTiming(isBottom ? 100 : -100, { duration: 200 });
    opacity.value = withTiming(0, { duration: 150 }, (done) => {
      if (done) scheduleOnRN(onDone);
    });
  };

  useEffect(() => {
    if (open) {
      setMounted(true);
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      requestAnimationFrame(animateIn);
    } else if (mounted) {
      animateOut(() => setMounted(false));
    }
  }, [open]);

  useEffect(() => {
    if (!open || autoHideDuration === null) return;
    const t = setTimeout(() => onClose?.(), autoHideDuration);
    return () => clearTimeout(t);
  }, [open, autoHideDuration, onClose]);

  const verticalStyle = useMemo(
    () => (isBottom ? styles.positionBottom : styles.positionTop),
    [isBottom]
  );

  const horizontalStyle = useMemo(() => {
    if (anchorOrigin.horizontal === 'center') return styles.alignCenter;
    if (anchorOrigin.horizontal === 'left') return styles.alignLeft;
    return styles.alignRight;
  }, [anchorOrigin.horizontal]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ] as any,
  }));

  if (!mounted && !open) return null;

  return (
    <Modal
      visible={mounted || open}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View pointerEvents="box-none" style={styles.overlay}>
        <Animated.View
          style={[
            snackbar.container,
            verticalStyle,
            horizontalStyle,
            animStyle,
            styles.absolute,
          ]}
        >
          <SnackbarContent
            message={message}
            action={action}
            onClose={onClose}
            textColor={snackbar.text.color as string}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  absolute: {
    position: 'absolute',
  },
  positionBottom: {
    bottom: 32,
  },
  positionTop: {
    top: 48,
  },
  alignCenter: {
    alignSelf: 'center',
  },
  alignLeft: {
    left: 16,
  },
  alignRight: {
    right: 16,
  },
});
