import React, { useCallback } from "react";
import { Modal, View, Pressable, Text, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

export interface MenuProps {
  open: boolean;
  onClose?: () => void;
  anchorEl?: { pageX: number; pageY: number; width: number; height: number } | null;
  children?: React.ReactNode;
}

export interface MenuItemProps {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function Menu({ open, onClose, anchorEl, children }: MenuProps) {
  const tokens = useTokens();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [menuSize, setMenuSize] = React.useState({ width: 0, height: 0 });
  const [mounted, setMounted] = React.useState(false);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  // Animate in when open changes to true
  React.useEffect(() => {
    if (open) {
      setMounted(true);
      opacity.value = 0;
      scale.value = 0.9;
      requestAnimationFrame(() => {
        opacity.value = withTiming(1, { duration: 180, easing: Easing.out(Easing.cubic) });
        scale.value = withSpring(1, { damping: 18, stiffness: 320 });
      });
    } else if (mounted) {
      opacity.value = withTiming(0, { duration: 130 });
      scale.value = withTiming(0.92, { duration: 130 }, (done) => {
        if (done) runOnJS(setMounted)(false);
      });
    }
  }, [open]);

  const MENU_MIN_WIDTH = 180;
  const GAP = 4;

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
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={{ flex: 1 }} onPress={onClose} />
      <Animated.View
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;
          setMenuSize({ width, height });
        }}
        style={[
          {
            position: "absolute",
            top,
            left,
            minWidth: MENU_MIN_WIDTH,
            backgroundColor: tokens.color.surface.default,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: tokens.color.border.default,
            overflow: "hidden",
            ...tokens.shadow.md,
          },
          animStyle,
        ]}
      >
        {children}
      </Animated.View>
    </Modal>
  );
}

export function MenuItem({ children, onPress, disabled = false, selected = false }: MenuItemProps) {
  const tokens = useTokens();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => ({
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        backgroundColor: pressed
          ? tokens.color.bg.subtle
          : selected
            ? tokens.color.brand.subtle
            : "transparent",
        opacity: disabled ? 0.5 : 1,
      })}
    >
      <Text style={{
        color: selected ? tokens.color.brand.text : tokens.color.text.primary,
        fontWeight: selected ? tokens.fontWeight.medium : tokens.fontWeight.regular,
      }}>
        {children}
      </Text>
    </Pressable>
  );
}
