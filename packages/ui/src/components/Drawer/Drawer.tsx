import React, { useEffect } from "react";
import { Modal, View, Pressable, StyleSheet, Dimensions, type ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useComponentTokens, useTokens } from "@truongdq01/headless";
import { spring } from "@truongdq01/tokens";

export type DrawerAnchor = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  anchor?: DrawerAnchor;
  children?: React.ReactNode;
}

export function Drawer({
  open,
  onClose,
  anchor = "left",
  children,
}: DrawerProps) {
  const { drawer } = useComponentTokens();
  const tokens = useTokens();
  const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

  const isVertical = anchor === "top" || anchor === "bottom";
  const size = isVertical ? windowHeight * 0.4 : 280;
  
  const progress = useSharedValue(0);
  const [mounted, setMounted] = React.useState(open);

  useEffect(() => {
    if (open) {
      setMounted(true);
      progress.value = withSpring(1, spring.snappy);
    } else {
      progress.value = withSpring(0, spring.snappy, (finished) => {
        if (finished) runOnJS(setMounted)(false);
      });
    }
  }, [open]);

  const animatedStyle = useAnimatedStyle(() => {
    const translate = (1 - progress.value) * size;
    let transform: any[] = [];

    if (anchor === "left") transform = [{ translateX: -translate }];
    else if (anchor === "right") transform = [{ translateX: translate }];
    else if (anchor === "top") transform = [{ translateY: -translate }];
    else if (anchor === "bottom") transform = [{ translateY: translate }];

    return {
      transform,
    };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  if (!mounted) return null;

  const containerStyle: ViewStyle = {
    position: "absolute",
    ...(anchor === "left" ? { left: 0, top: 0, bottom: 0, width: size } : {}),
    ...(anchor === "right" ? { right: 0, top: 0, bottom: 0, width: size } : {}),
    ...(anchor === "top" ? { top: 0, left: 0, right: 0, height: size } : {}),
    ...(anchor === "bottom" ? { bottom: 0, left: 0, right: 0, height: size } : {}),
  };

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        <Animated.View style={[StyleSheet.absoluteFill, drawer.overlay, backdropStyle]}>
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View
          style={[
            drawer.container,
            containerStyle,
            animatedStyle,
          ] as any}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
