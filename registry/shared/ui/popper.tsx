import { useMemo, useRef, useState, type ReactNode, type RefObject } from 'react';
import {
  type LayoutChangeEvent,
  Modal,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { cn } from '@/lib/utils';

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

export interface AnchorRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const EDGE_MARGIN = 8;

/**
 * Measures a trigger view in window coordinates via `measureInWindow`.
 * Attach `ref` to the anchor element, call `measure()` before opening.
 */
export function usePopperAnchor() {
  const ref = useRef<View>(null);
  const [anchor, setAnchor] = useState<AnchorRect | null>(null);

  const measure = () => {
    ref.current?.measureInWindow((x, y, width, height) => {
      setAnchor({ x, y, width, height });
    });
  };

  return { ref: ref as RefObject<View>, anchor, measure };
}

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

function parsePlacement(placement: PopperPlacement): [Side, Align] {
  const [side, align] = placement.split('-') as [Side, Align?];
  return [side, align ?? 'center'];
}

function flipSide(side: Side): Side {
  return side === 'top'
    ? 'bottom'
    : side === 'bottom'
      ? 'top'
      : side === 'left'
        ? 'right'
        : 'left';
}

function resolve(
  side: Side,
  align: Align,
  anchor: AnchorRect,
  content: { width: number; height: number },
  offset: number
) {
  let left: number;
  let top: number;

  switch (side) {
    case 'top':
      top = anchor.y - content.height - offset;
      left =
        align === 'start'
          ? anchor.x
          : align === 'end'
            ? anchor.x + anchor.width - content.width
            : anchor.x + anchor.width / 2 - content.width / 2;
      break;
    case 'bottom':
      top = anchor.y + anchor.height + offset;
      left =
        align === 'start'
          ? anchor.x
          : align === 'end'
            ? anchor.x + anchor.width - content.width
            : anchor.x + anchor.width / 2 - content.width / 2;
      break;
    case 'left':
      left = anchor.x - content.width - offset;
      top =
        align === 'start'
          ? anchor.y
          : align === 'end'
            ? anchor.y + anchor.height - content.height
            : anchor.y + anchor.height / 2 - content.height / 2;
      break;
    case 'right':
      left = anchor.x + anchor.width + offset;
      top =
        align === 'start'
          ? anchor.y
          : align === 'end'
            ? anchor.y + anchor.height - content.height
            : anchor.y + anchor.height / 2 - content.height / 2;
      break;
  }
  return { left, top };
}

/** True when the resolved rect overflows the screen on the placement side. */
function overflows(
  side: Side,
  pos: { left: number; top: number },
  content: { width: number; height: number },
  screen: { width: number; height: number }
) {
  switch (side) {
    case 'top':
      return pos.top < EDGE_MARGIN;
    case 'bottom':
      return pos.top + content.height > screen.height - EDGE_MARGIN;
    case 'left':
      return pos.left < EDGE_MARGIN;
    case 'right':
      return pos.left + content.width > screen.width - EDGE_MARGIN;
  }
}

export interface PopperProps {
  open: boolean;
  /** Window rect of the anchor element (see `usePopperAnchor`). */
  anchor?: AnchorRect | null;
  placement?: PopperPlacement;
  /** Gap between anchor and content in px. Default 6. */
  sideOffset?: number;
  /** Render a small rotated-square arrow pointing at the anchor. */
  showArrow?: boolean;
  /** Flip to the opposite side when content would overflow. Default true. */
  flip?: boolean;
  /** Tapping outside requests close. Default true. */
  dismissable?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
}

/**
 * Popper — positioning primitive anchored to a measured rect.
 * Renders inside a transparent RN `Modal`; clamps to screen edges and
 * flips on overflow. Compose inside: menu items, tooltips, etc.
 */
export function Popper({
  open,
  anchor,
  placement = 'bottom',
  sideOffset = 6,
  showArrow = false,
  flip = true,
  dismissable = true,
  onClose,
  children,
  className,
}: PopperProps) {
  const { width: screenW, height: screenH } = useWindowDimensions();
  const [size, setSize] = useState({ width: 0, height: 0 });

  const { pos, resolvedSide, arrow } = useMemo(() => {
    if (!anchor || size.width === 0) {
      return {
        pos: { left: -9999, top: 0 },
        resolvedSide: parsePlacement(placement)[0],
        arrow: { left: 0, top: 0 },
      };
    }
    const screen = { width: screenW, height: screenH };
    let [side, align] = parsePlacement(placement);
    let p = resolve(side, align, anchor, size, sideOffset);

    if (flip && overflows(side, p, size, screen)) {
      const flipped = flipSide(side);
      const fp = resolve(flipped, align, anchor, size, sideOffset);
      if (!overflows(flipped, fp, size, screen)) {
        side = flipped;
        p = fp;
      }
    }

    // Clamp inside the window.
    const left = Math.max(
      EDGE_MARGIN,
      Math.min(p.left, screenW - size.width - EDGE_MARGIN)
    );
    const top = Math.max(
      EDGE_MARGIN,
      Math.min(p.top, screenH - size.height - EDGE_MARGIN)
    );

    // Arrow sits on the edge facing the anchor, centered on its cross-axis.
    const arrowPos =
      side === 'top' || side === 'bottom'
        ? {
            left:
              anchor.x + anchor.width / 2 - left - ARROW_SIZE / 2,
            top:
              side === 'top'
                ? size.height - ARROW_SIZE / 2
                : -ARROW_SIZE / 2,
          }
        : {
            left:
              side === 'left'
                ? size.width - ARROW_SIZE / 2
                : -ARROW_SIZE / 2,
            top: anchor.y + anchor.height / 2 - top - ARROW_SIZE / 2,
          };

    return { pos: { left, top }, resolvedSide: side, arrow: arrowPos };
  }, [anchor, size, placement, sideOffset, flip, screenW, screenH]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.width || height !== size.height) {
      setSize({ width, height });
    }
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={{ flex: 1 }}
        onPress={dismissable ? onClose : undefined}
      >
        {anchor && (
          <View
            onLayout={handleLayout}
            style={{
              position: 'absolute',
              left: pos.left,
              top: pos.top,
              opacity: size.width ? 1 : 0,
            }}
          >
            {showArrow && (
              <View
                className={cn(
                  'border-border bg-popover',
                  resolvedSide === 'top' && 'border-b border-r',
                  resolvedSide === 'bottom' && 'border-l border-t',
                  resolvedSide === 'left' && 'border-r border-t',
                  resolvedSide === 'right' && 'border-b border-l'
                )}
                style={{
                  position: 'absolute',
                  left: arrow.left,
                  top: arrow.top,
                  width: ARROW_SIZE,
                  height: ARROW_SIZE,
                  transform: [{ rotate: '45deg' }],
                  zIndex: -1,
                }}
              />
            )}
            <Pressable onPress={(e) => e.stopPropagation()}>
              <View
                className={cn(
                  'rounded-md border border-border bg-popover p-2 shadow-md',
                  className
                )}
              >
                {children}
              </View>
            </Pressable>
          </View>
        )}
      </Pressable>
    </Modal>
  );
}

const ARROW_SIZE = 10;
