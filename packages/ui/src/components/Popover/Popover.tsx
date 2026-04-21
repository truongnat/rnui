import React, { useMemo, useState } from 'react';
import {
  type LayoutChangeEvent,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { PopoverContent } from './PopoverContent';
import type { PopoverOriginHorizontal, PopoverOriginVertical, PopoverProps } from './types';

const defaultOrigin = { vertical: 'bottom' as const, horizontal: 'left' as const };
const defaultTransform = { vertical: 'top' as const, horizontal: 'left' as const };

function resolveOrigin(
  value: PopoverOriginVertical | PopoverOriginHorizontal,
  size: number
): number {
  if (typeof value === 'number') return value;
  if (value === 'center') return size / 2;
  if (value === 'bottom' || value === 'right') return size;
  return 0;
}

/**
 * Popover — calculates anchor position, applies transform offsets,
 * clamps to screen bounds, and delegates rendering to PopoverContent.
 */
export function Popover({
  open,
  anchorEl,
  anchorPosition,
  onClose,
  anchorOrigin = defaultOrigin,
  transformOrigin = defaultTransform,
  PaperProps,
  marginThreshold = 12,
  children,
}: PopoverProps) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });

  const anchorRect = anchorEl ?? { x: 0, y: 0, width: 0, height: 0 };
  const anchorX = anchorPosition?.left ?? anchorRect.x;
  const anchorY = anchorPosition?.top ?? anchorRect.y;
  const anchorWidth = anchorRect.width ?? 0;
  const anchorHeight = anchorRect.height ?? 0;

  const anchorOffsetX = resolveOrigin(anchorOrigin.horizontal, anchorWidth);
  const anchorOffsetY = resolveOrigin(anchorOrigin.vertical, anchorHeight);
  const transformOffsetX = resolveOrigin(transformOrigin.horizontal, contentSize.width);
  const transformOffsetY = resolveOrigin(transformOrigin.vertical, contentSize.height);

  const position = useMemo(() => {
    let left = anchorX + anchorOffsetX - transformOffsetX;
    let top = anchorY + anchorOffsetY - transformOffsetY;

    left = Math.max(
      marginThreshold,
      Math.min(left, screenWidth - contentSize.width - marginThreshold)
    );
    top = Math.max(
      marginThreshold,
      Math.min(top, screenHeight - contentSize.height - marginThreshold)
    );

    return { left, top };
  }, [
    anchorX,
    anchorY,
    anchorOffsetX,
    anchorOffsetY,
    transformOffsetX,
    transformOffsetY,
    contentSize,
    screenWidth,
    screenHeight,
    marginThreshold,
  ]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    if (width !== contentSize.width || height !== contentSize.height) {
      setContentSize({ width, height });
    }
  };

  if (!open) return null;

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <PopoverContent
        top={position.top}
        left={position.left}
        visible={contentSize.width !== 0}
        paperStyle={PaperProps?.style}
        onLayout={handleLayout}
      >
        {children}
      </PopoverContent>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
