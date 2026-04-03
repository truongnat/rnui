import React, { useState, useCallback } from "react";
import { View, Text, Pressable, Modal, useWindowDimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useTokens, useComponentTokens } from "@truongdq01/headless";

export type TooltipPlacement =
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end";

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
  const { tooltip } = useComponentTokens();
  const tokens = useTokens();
  const [internalOpen, setInternalOpen] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [triggerRect, setTriggerRect] = useState<TriggerRect | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const triggerRef = React.useRef<View>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  // Simple fade animation
  const opacity = useSharedValue(0);

  const animateIn = useCallback(() => {
    opacity.value = withTiming(1, { duration: 150 });
  }, []);

  const animateOut = useCallback((onDone: () => void) => {
    opacity.value = withTiming(0, { duration: 100 }, () => {
      runOnJS(onDone)();
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

  // Compute position
  const GAP = 8;
  const PADDING = 12;
  const tx = triggerRect?.pageX ?? 0;
  const ty = triggerRect?.pageY ?? 0;
  const tw = triggerRect?.width ?? 0;
  const th = triggerRect?.height ?? 0;
  const tlw = tooltipSize.width || 200;
  const tlh = tooltipSize.height || 40;
  
  let top = ty - tlh - GAP;
  let left = tx + tw / 2 - tlw / 2;

  // Simple placement logic
  if (placement.includes("bottom")) {
    top = ty + th + GAP;
  }
  if (placement.includes("left")) {
    left = tx - tlw - GAP;
  }
  if (placement.includes("right")) {
    left = tx + tw + GAP;
  }
  if (placement.includes("top-left") || placement.includes("bottom-left")) {
    left = tx;
  }
  if (placement.includes("top-right") || placement.includes("bottom-right")) {
    left = tx + tw - tlw;
  }

  // Clamp to screen bounds
  const safeTop = Math.max(PADDING, Math.min(top, windowHeight - tlh - PADDING));
  const safeLeft = Math.max(PADDING, Math.min(left, windowWidth - tlw - PADDING));

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

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
        <Pressable
          style={{ flex: 1, backgroundColor: "transparent" }}
          onPress={handleClose}
        >
          <Animated.View
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              setTooltipSize({ width, height });
            }}
            onStartShouldSetResponder={() => true}
            style={[
              tooltip.container,
              {
                position: "absolute",
                top: safeTop,
                left: safeLeft,
              },
              animStyle,
            ] as any}
          >
            {typeof title === "string" ? (
              <Text style={tooltip.text as any}>
                {title}
              </Text>
            ) : title}
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}
