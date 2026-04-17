import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTokens, useComponentTokens } from '@truongdq01/headless';

export type PopperPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

export interface PopperProps {
  open: boolean;
  anchorEl?: { x: number; y: number; width?: number; height?: number } | null;
  placement?: PopperPlacement;
  disablePortal?: boolean;
  transition?: boolean;
  keepMounted?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

function resolvePlacement(
  placement: PopperPlacement,
  anchor: { x: number; y: number; width: number; height: number },
  content: { width: number; height: number }
) {
  const baseX = anchor.x;
  const baseY = anchor.y;

  const centerX = baseX + anchor.width / 2 - content.width / 2;
  const centerY = baseY + anchor.height / 2 - content.height / 2;
  const leftX = baseX;
  const rightX = baseX + anchor.width - content.width;
  const topY = baseY - content.height;
  const bottomY = baseY + anchor.height;

  switch (placement) {
    case 'top':
      return { left: centerX, top: topY };
    case 'top-start':
      return { left: leftX, top: topY };
    case 'top-end':
      return { left: rightX, top: topY };
    case 'bottom':
      return { left: centerX, top: bottomY };
    case 'bottom-start':
      return { left: leftX, top: bottomY };
    case 'bottom-end':
      return { left: rightX, top: bottomY };
    case 'left':
      return { left: baseX - content.width, top: centerY };
    case 'left-start':
      return { left: baseX - content.width, top: baseY };
    case 'left-end':
      return {
        left: baseX - content.width,
        top: baseY + anchor.height - content.height,
      };
    case 'right':
      return { left: baseX + anchor.width, top: centerY };
    case 'right-start':
      return { left: baseX + anchor.width, top: baseY };
    case 'right-end':
      return {
        left: baseX + anchor.width,
        top: baseY + anchor.height - content.height,
      };
    default:
      return { left: centerX, top: bottomY };
  }
}

export function Popper({
  open,
  anchorEl,
  placement = 'bottom',
  keepMounted = false,
  onClose,
  children,
}: PopperProps) {
  const { popper } = useComponentTokens();
  const tokens = useTokens();
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  if (!open && !keepMounted) return null;

  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const position = useMemo(() => {
    const pos = resolvePlacement(
      placement,
      {
        x: anchorRect.x,
        y: anchorRect.y,
        width: anchorRect.width ?? 0,
        height: anchorRect.height ?? 0,
      },
      contentSize
    );

    const left = Math.max(
      8,
      Math.min(pos.left, screenWidth - contentSize.width - 8)
    );
    const top = Math.max(
      8,
      Math.min(pos.top, screenHeight - contentSize.height - 8)
    );
    return { left, top };
  }, [placement, anchorRect, contentSize, screenWidth, screenHeight]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== contentSize.width || height !== contentSize.height) {
      setContentSize({ width, height });
    }
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View
        onLayout={handleLayout}
        style={[popper.container, position] as StyleProp<ViewStyle>}
      >
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  popper: {
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
});
