import React, { useState, useRef } from "react";
import { View, Text, Pressable, Modal, useWindowDimensions, LayoutChangeEvent } from "react-native";
import { useTokens } from "@rnui/headless";

export interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  arrow?: boolean;
  placement?: "top" | "bottom";
}

export function Tooltip({
  title,
  children,
  open: controlledOpen,
  onOpen,
  onClose,
  placement = "top"
}: TooltipProps) {
  const tokens = useTokens();
  const [internalOpen, setInternalOpen] = useState(false);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const childRef = useRef<View>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpen = () => {
    onOpen?.();
    setInternalOpen(true);
  };

  const handleClose = () => {
    onClose?.();
    setInternalOpen(false);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent.layout;
    setTriggerPosition({
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height,
    });
  };

  // Clone children with layout measurement
  const childWithLayout = React.cloneElement(children, {
    ref: childRef,
    onLayout: handleLayout,
  } as any);

  // Calculate tooltip position based on trigger position
  const tooltipWidth = 200;
  const tooltipHeight = 50;
  const padding = 8;

  let tooltipTop = placement === "top"
    ? triggerPosition.y - tooltipHeight - padding
    : triggerPosition.y + triggerPosition.height + padding;

  // Ensure tooltip stays within screen bounds
  if (tooltipTop < 10) tooltipTop = triggerPosition.y + triggerPosition.height + padding;
  if (tooltipTop + tooltipHeight > windowHeight - 10) tooltipTop = triggerPosition.y - tooltipHeight - padding;

  const tooltipLeft = Math.max(
    padding,
    Math.min(
      triggerPosition.x + triggerPosition.width / 2 - tooltipWidth / 2,
      windowWidth - tooltipWidth - padding
    )
  );

  return (
    <>
      {childWithLayout}

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
          <View
            style={{
              position: "absolute",
              top: tooltipTop,
              left: tooltipLeft,
              width: tooltipWidth,
              backgroundColor: tokens.color.bg.inverse,
              paddingHorizontal: tokens.spacing[4],
              paddingVertical: tokens.spacing[3],
              borderRadius: tokens.radius.md,
              ...tokens.shadow.lg,
            }}
          >
            {typeof title === "string" ? (
              <Text style={{ color: tokens.color.text.inverse, textAlign: "center", fontSize: tokens.fontSize.sm }}>
                {title}
              </Text>
            ) : (
              title
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
