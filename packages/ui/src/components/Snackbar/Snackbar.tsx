import React, { useEffect, useMemo } from "react";
import { View, Text, Pressable, Modal, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useTokens, useComponentTokens } from "@rnui/headless";
import { Icon } from "../Icon";

export interface SnackbarProps {
  /** If true, the snackbar is shown */
  open: boolean;
  /** The message to display */
  message: React.ReactNode;
  /** Duration in ms before auto-hiding. Use null to disable. */
  autoHideDuration?: number | null;
  /** Callback on close */
  onClose?: () => void;
  /** Action element (e.g. Button) */
  action?: React.ReactNode;
  /** Position on screen */
  anchorOrigin?: { vertical: "top" | "bottom"; horizontal: "left" | "center" | "right" };
}

export function Snackbar({
  open,
  message,
  autoHideDuration = 4000,
  onClose,
  action,
  anchorOrigin = { vertical: "bottom", horizontal: "center" },
}: SnackbarProps) {
  const { snackbar } = useComponentTokens();
  const tokens = useTokens();
  const [mounted, setMounted] = React.useState(open);

  const isBottom = anchorOrigin.vertical === "bottom";
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
      if (done) runOnJS(onDone)();
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

  const verticalStyle = isBottom ? { bottom: 32 } : { top: 48 };
  const horizontalStyle = useMemo(() => {
    if (anchorOrigin.horizontal === "center") return { alignSelf: "center" as const };
    if (anchorOrigin.horizontal === "left") return { left: 16 };
    return { right: 16 };
  }, [anchorOrigin.horizontal]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }] as any,
  }));

  if (!mounted && !open) return null;

  return (
    <Modal visible={mounted || open} transparent animationType="none" onRequestClose={onClose}>
      <View pointerEvents="box-none" style={styles.overlay}>
        <Animated.View
          style={[
            snackbar.container,
            verticalStyle,
            horizontalStyle,
            animStyle as any,
            { position: "absolute" },
          ]}
        >
          <Text style={[snackbar.text, { flex: 1 }]}>{message}</Text>
          {action}
          {onClose && (
            <Pressable onPress={onClose} hitSlop={8} style={{ marginLeft: 8 }}>
              <Icon size={18} color={snackbar.text.color} name={"close" as any} />
            </Pressable>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
});
