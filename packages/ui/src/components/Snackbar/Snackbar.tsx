import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, Modal } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

export interface SnackbarProps {
  open: boolean;
  message: React.ReactNode;
  autoHideDuration?: number | null;
  onClose?: () => void;
  action?: React.ReactNode;
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
  const tokens = useTokens();
  const [mounted, setMounted] = React.useState(false);

  // Slide direction: bottom → slides up, top → slides down
  const isBottom = anchorOrigin.vertical === "bottom";
  const translateY = useSharedValue(isBottom ? 80 : -80);
  const opacity = useSharedValue(0);

  const animateIn = () => {
    translateY.value = withSpring(0, { damping: 20, stiffness: 260 });
    opacity.value = withTiming(1, { duration: 200, easing: Easing.out(Easing.cubic) });
  };

  const animateOut = (onDone: () => void) => {
    translateY.value = withTiming(isBottom ? 80 : -80, { duration: 220, easing: Easing.in(Easing.cubic) });
    opacity.value = withTiming(0, { duration: 180 }, (done) => {
      if (done) runOnJS(onDone)();
    });
  };

  useEffect(() => {
    if (open) {
      translateY.value = isBottom ? 80 : -80;
      opacity.value = 0;
      setMounted(true);
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
  const horizontalStyle =
    anchorOrigin.horizontal === "center"
      ? { alignSelf: "center" as const }
      : anchorOrigin.horizontal === "left"
        ? { left: 16 }
        : { right: 16 };

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!mounted) return null;

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View pointerEvents="box-none" style={{ flex: 1 }}>
        <Animated.View
          style={[
            {
              position: "absolute",
              maxWidth: 400,
              minWidth: 200,
              backgroundColor: tokens.color.bg.inverse,
              paddingHorizontal: tokens.spacing[4],
              paddingVertical: tokens.spacing[3],
              borderRadius: tokens.radius.md,
              flexDirection: "row",
              alignItems: "center",
              gap: tokens.spacing[3],
              ...tokens.shadow.lg,
            },
            verticalStyle,
            horizontalStyle,
            animStyle,
          ]}
        >
          <Text style={{ color: tokens.color.text.inverse, flex: 1 }}>{message}</Text>
          {action}
          {onClose && (
            <Pressable onPress={onClose} hitSlop={8}>
              <Text style={{ color: tokens.color.text.inverse, fontSize: 16 }}>✕</Text>
            </Pressable>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
