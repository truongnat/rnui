import React, { useState, useRef, useCallback } from "react";
import { View, Text, Pressable, Modal, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { useTokens } from "@rnui/headless";

export type TooltipPlacement =
  | "top" | "top-left" | "top-right"
  | "bottom" | "bottom-left" | "bottom-right"
  | "left" | "left-top" | "left-bottom"
  | "right" | "right-top" | "right-bottom";

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  placement?: TooltipPlacement;
}

interface TriggerRect {
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}

export function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top",
}: TooltipProps) {
  const tokens = useTokens();
  const [internalOpen, setInternalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [triggerRect, setTriggerRect] = useState<TriggerRect>({ pageX: 0, pageY: 0, width: 0, height: 0 });
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  // For controlled mode
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  // Reanimated values for smooth entry/exit
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);
  const translateY = useSharedValue(placement.startsWith("bottom") ? -6 : 6);

  const animateIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 180, easing: Easing.out(Easing.cubic) });
    scale.value = withSpring(1, { damping: 16, stiffness: 280 });
    translateY.value = withSpring(0, { damping: 16, stiffness: 280 });
  }, [placement]);

  const animateOut = useCallback((onDone: () => void) => {
    opacity.value = withTiming(0, { duration: 130, easing: Easing.in(Easing.cubic) });
    scale.value = withTiming(0.88, { duration: 130 });
    translateY.value = withTiming(
      placement.startsWith("bottom") ? -4 : 4,
      { duration: 130 },
      (finished) => {
        if (finished) runOnJS(onDone)();
      }
    );
  }, [placement]);

  const handleOpen = () => {
    triggerRef.current?.measure((_x, _y, w, h, pageX, pageY) => {
      setTriggerRect({ pageX, pageY, width: w, height: h });
      // Reset animation state
      opacity.value = 0;
      scale.value = 0.85;
      translateY.value = placement.startsWith("bottom") ? -6 : 6;
      setMounted(true);
      setInternalOpen(true);
      onOpen?.();
      requestAnimationFrame(() => animateIn());
    });
  };

  const handleClose = () => {
    animateOut(() => {
      setInternalOpen(false);
      setMounted(false);
      onClose?.();
    });
  };

  // Compute position
  const GAP = 8;
  const { pageX: tx, pageY: ty, width: tw, height: th } = triggerRect;
  const { width: tlw, height: tlh } = tooltipSize;

  let top = 0;
  let left = 0;

  switch (placement) {
    case "top": top = ty - tlh - GAP; left = tx + tw / 2 - tlw / 2; break;
    case "top-left": top = ty - tlh - GAP; left = tx; break;
    case "top-right": top = ty - tlh - GAP; left = tx + tw - tlw; break;
    case "bottom": top = ty + th + GAP; left = tx + tw / 2 - tlw / 2; break;
    case "bottom-left": top = ty + th + GAP; left = tx; break;
    case "bottom-right": top = ty + th + GAP; left = tx + tw - tlw; break;
    case "left": top = ty + th / 2 - tlh / 2; left = tx - tlw - GAP; break;
    case "left-top": top = ty; left = tx - tlw - GAP; break;
    case "left-bottom": top = ty + th - tlh; left = tx - tlw - GAP; break;
    case "right": top = ty + th / 2 - tlh / 2; left = tx + tw + GAP; break;
    case "right-top": top = ty; left = tx + tw + GAP; break;
    case "right-bottom": top = ty + th - tlh; left = tx + tw + GAP; break;
  }

  const safeTop = Math.max(GAP, Math.min(top, windowHeight - tlh - GAP));
  const safeLeft = Math.max(GAP, Math.min(left, windowWidth - tlw - GAP));

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <>
      <Pressable
        ref={triggerRef as any}
        onPress={handleOpen}
        onLongPress={handleOpen}
        delayLongPress={300}
      >
        {children}
      </Pressable>

      <Modal
        visible={mounted}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <Pressable
          style={{ flex: 1, backgroundColor: "transparent" }}
          onPress={handleClose}
        >
          <Animated.View
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              // Only update if meaningfully changed to avoid re-renders
              if (Math.abs(width - tooltipSize.width) > 1 || Math.abs(height - tooltipSize.height) > 1) {
                setTooltipSize({ width, height });
              }
            }}
            style={[
              {
                position: "absolute",
                top: safeTop,
                left: safeLeft,
                maxWidth: 240,
                backgroundColor: tokens.color.bg.inverse,
                paddingHorizontal: tokens.spacing[3],
                paddingVertical: tokens.spacing[2],
                borderRadius: tokens.radius.md,
                ...tokens.shadow.lg,
              },
              animStyle,
            ]}
          >
            {typeof title === "string" ? (
              <Text style={{ color: tokens.color.text.inverse, fontSize: tokens.fontSize.sm }}>
                {title}
              </Text>
            ) : title}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}
