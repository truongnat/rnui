import React, { useEffect } from "react";
import { View, Pressable, type ViewStyle, Dimensions, Modal } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface DrawerProps {
  open: boolean;
  onClose?: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  variant?: "temporary" | "persistent" | "permanent";
  width?: number;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export function Drawer({
  open,
  onClose,
  anchor = "left",
  variant = "temporary",
  width = Math.min(320, SCREEN_WIDTH * 0.8),
  children,
  style,
}: DrawerProps) {
  const tokens = useTokens();

  // Track mount state to allow exit animation
  const [mounted, setMounted] = React.useState(open);

  const translateX = useSharedValue(anchor === "left" ? -width : anchor === "right" ? width : 0);
  const translateY = useSharedValue(anchor === "top" ? -SCREEN_HEIGHT : anchor === "bottom" ? SCREEN_HEIGHT : 0);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (open) {
      setMounted(true);
      requestAnimationFrame(() => {
        translateX.value = withTiming(0, { duration: 280 });
        translateY.value = withTiming(0, { duration: 280 });
        backdropOpacity.value = withTiming(0.4, { duration: 280 });
      });
    } else {
      const offX = anchor === "left" ? -width : anchor === "right" ? width : 0;
      const offY = anchor === "top" ? -SCREEN_HEIGHT : anchor === "bottom" ? SCREEN_HEIGHT : 0;
      translateX.value = withTiming(offX, { duration: 220 });
      translateY.value = withTiming(offY, { duration: 220 });
      backdropOpacity.value = withTiming(0, { duration: 220 });
      setTimeout(() => setMounted(false), 230);
    }
  }, [open]);

  const drawerStyle = useAnimatedStyle(() => {
    if (anchor === "left" || anchor === "right") {
      return { transform: [{ translateX: translateX.value }] };
    }
    return { transform: [{ translateY: translateY.value }] };
  });

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (variant === "permanent") {
    return (
      <View
        style={[
          {
            width,
            backgroundColor: tokens.color.surface.default,
            borderRightWidth: anchor === "left" ? 1 : 0,
            borderLeftWidth: anchor === "right" ? 1 : 0,
            borderColor: tokens.color.border.default,
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  if (!mounted) return null;

  const isVertical = anchor === "top" || anchor === "bottom";
  const drawerWidth = isVertical ? "100%" : width;
  const drawerHeight = isVertical ? SCREEN_HEIGHT * 0.5 : "100%";

  const positionStyle: ViewStyle = {
    position: "absolute",
    ...(anchor === "left" && { left: 0, top: 0, bottom: 0 }),
    ...(anchor === "right" && { right: 0, top: 0, bottom: 0 }),
    ...(anchor === "top" && { top: 0, left: 0, right: 0 }),
    ...(anchor === "bottom" && { bottom: 0, left: 0, right: 0 }),
  };

  return (
    <Modal visible={mounted} transparent animationType="none" onRequestClose={onClose}>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        {/* Backdrop */}
        <Animated.View
          style={[
            { ...positionStyle, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000" },
            backdropStyle,
          ]}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        {/* Drawer panel */}
        <Animated.View
          style={[
            positionStyle,
            {
              width: drawerWidth as any,
              backgroundColor: tokens.color.surface.default,
              borderRightWidth: anchor === "left" ? 1 : 0,
              borderLeftWidth: anchor === "right" ? 1 : 0,
              borderBottomWidth: anchor === "top" ? 1 : 0,
              borderTopWidth: anchor === "bottom" ? 1 : 0,
              borderColor: tokens.color.border.default,
            },
            style,
            drawerStyle,
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}
