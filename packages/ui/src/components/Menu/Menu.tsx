import { useMenu, useTheme } from '@truongdq01/headless';
import React from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { MenuContext } from './context';
import type { MenuProps } from './types';

const MENU_MIN_WIDTH = 180;
const GAP = 4;

export function Menu({ open, onClose, anchorEl, children }: MenuProps) {
  const {
    components: { menu },
  } = useTheme();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [menuSize, setMenuSize] = React.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React.useState(false);

  const { close, getItemProps } = useMenu({ onClose });

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Animate in/out when open changes
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = withTiming(1, {
          duration: 180,
          easing: Easing.out(Easing.cubic),
        });
        scale.value = withSpring(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = withTiming(0, { duration: 130 });
      scale.value = withTiming(0.92, { duration: 130 }, (done) => {
        if (done) scheduleOnRN(setMounted, false);
      });
    }
  }, [open]);

  // Compute menu position relative to anchor element
  let top: number = 48;
  let left: number = windowWidth - MENU_MIN_WIDTH - 16;

  if (anchorEl) {
    const { pageX, pageY, width, height } = anchorEl;
    top = pageY + height + GAP;
    left = pageX;

    if (left + menuSize.width > windowWidth - 8) {
      left = windowWidth - menuSize.width - 8;
    }
    if (top + menuSize.height > windowHeight - 8) {
      top = pageY - menuSize.height - GAP;
    }
    top = Math.max(8, top);
    left = Math.max(8, left);
  }

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  if (!mounted) return null;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={close}
    >
      <Pressable style={styles.backdrop} onPress={close} />
      <Animated.View
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setMenuSize({ width, height });
        }}
        style={[
          menu.container,
          styles.container,
          { top, left, minWidth: MENU_MIN_WIDTH },
          animStyle,
        ]}
      >
        <MenuContext.Provider value={{ getItemProps }}>
          {children}
        </MenuContext.Provider>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  container: {
    position: 'absolute',
  },
});
