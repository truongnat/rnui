import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  Modal,
  Pressable,
  View,
  type ViewProps,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useAnimatedOverlay } from '@/components/ui/animated-overlay';
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
  bounds: { left: number; top: number; right: number; bottom: number }
) {
  switch (side) {
    case 'top':
      return pos.top < bounds.top;
    case 'bottom':
      return pos.top + content.height > bounds.bottom;
    case 'left':
      return pos.left < bounds.left;
    case 'right':
      return pos.left + content.width > bounds.right;
  }
}

export interface PopperProps extends ViewProps {
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
export function Popper(props: PopperProps) {
  const shouldPresent = props.open && !!props.anchor;
  const [mounted, setMounted] = useState(shouldPresent);
  useEffect(() => {
    if (shouldPresent) setMounted(true);
  }, [shouldPresent]);
  return (
    <Modal
      visible={mounted || shouldPresent}
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="none"
      onRequestClose={props.onClose}
    >
      <SafeAreaProvider>
        <PopperFrame {...props} onClosed={() => setMounted(false)} />
      </SafeAreaProvider>
    </Modal>
  );
}

function PopperFrame({
  open,
  anchor: windowAnchor,
  placement = 'bottom',
  sideOffset = 6,
  showArrow = false,
  flip = true,
  dismissable = true,
  onClose,
  children,
  className,
  onClosed,
  style,
  ...surfaceProps
}: PopperProps & { onClosed: () => void }) {
  const frame = useSafeAreaFrame();
  const { width: screenW, height: screenH } = frame;
  const anchor = useMemo(
    () =>
      windowAnchor && {
        ...windowAnchor,
        x: windowAnchor.x - frame.x,
        y: windowAnchor.y - frame.y,
      },
    [windowAnchor, frame.x, frame.y]
  );
  const [size, setSize] = useState({ width: 0, height: 0 });
  const insets = useSafeAreaInsets();
  const shouldPresent = open && !!anchor;
  const openRef = useRef(shouldPresent);
  openRef.current = shouldPresent;
  const { setVisible, contentStyle } = useAnimatedOverlay({
    animationType: 'scale',
    onAnimationEnd: (entering) => {
      if (!entering && !openRef.current) onClosed();
    },
  });
  useEffect(() => {
    setVisible(shouldPresent && size.width > 0);
  }, [shouldPresent, size.width, setVisible]);

  const { pos, resolvedSide, arrow } = useMemo(() => {
    if (!anchor || size.width === 0) {
      return {
        pos: { left: EDGE_MARGIN, top: insets.top + EDGE_MARGIN },
        resolvedSide: parsePlacement(placement)[0],
        arrow: { left: 0, top: 0 },
      };
    }
    const bounds = {
      left: insets.left + EDGE_MARGIN,
      top: insets.top + EDGE_MARGIN,
      right: screenW - insets.right - EDGE_MARGIN,
      bottom: screenH - insets.bottom - EDGE_MARGIN,
    };
    let [side, align] = parsePlacement(placement);
    let p = resolve(side, align, anchor, size, sideOffset);

    if (flip && overflows(side, p, size, bounds)) {
      const flipped = flipSide(side);
      const fp = resolve(flipped, align, anchor, size, sideOffset);
      if (!overflows(flipped, fp, size, bounds)) {
        side = flipped;
        p = fp;
      }
    }

    // Clamp inside the window.
    const left = Math.max(
      bounds.left,
      Math.min(p.left, bounds.right - size.width)
    );
    const top = Math.max(
      bounds.top,
      Math.min(p.top, bounds.bottom - size.height)
    );

    // Arrow sits on the edge facing the anchor, centered on its cross-axis.
    const arrowPos =
      side === 'top' || side === 'bottom'
        ? {
            left: Math.max(
              12,
              Math.min(
                anchor.x + anchor.width / 2 - left - ARROW_SIZE / 2,
                size.width - ARROW_SIZE - 12
              )
            ),
            top:
              side === 'top' ? size.height - ARROW_SIZE / 2 : -ARROW_SIZE / 2,
          }
        : {
            left:
              side === 'left' ? size.width - ARROW_SIZE / 2 : -ARROW_SIZE / 2,
            top: Math.max(
              12,
              Math.min(
                anchor.y + anchor.height / 2 - top - ARROW_SIZE / 2,
                size.height - ARROW_SIZE - 12
              )
            ),
          };

    return { pos: { left, top }, resolvedSide: side, arrow: arrowPos };
  }, [
    anchor,
    size,
    placement,
    sideOffset,
    flip,
    screenW,
    screenH,
    insets.top,
    insets.bottom,
    insets.left,
    insets.right,
  ]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (width !== size.width || height !== size.height) {
      setSize({ width, height });
    }
  };

  return (
    <View
      pointerEvents={open ? 'auto' : 'none'}
      accessibilityElementsHidden={!open}
      importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
      style={{ flex: 1 }}
    >
      <Pressable
        style={{ position: 'absolute', inset: 0 }}
        disabled={!dismissable}
        accessibilityRole="button"
        accessibilityLabel="Close popup"
        onPress={onClose}
      />
      {anchor && (
        <Animated.View
          accessibilityViewIsModal
          pointerEvents={open && size.width > 0 ? 'auto' : 'none'}
          onLayout={handleLayout}
          style={[
            {
              position: 'absolute',
              left: pos.left,
              top: pos.top,
              maxWidth: screenW - insets.left - insets.right - EDGE_MARGIN * 2,
              maxHeight: screenH - insets.top - insets.bottom - EDGE_MARGIN * 2,
            },
            contentStyle,
          ]}
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
          <View
            {...surfaceProps}
            className={cn(
              'rounded-lg border border-border bg-popover p-2',
              className
            )}
            style={[
              { borderCurve: 'continuous' },
              style,
              {
                maxWidth:
                  screenW - insets.left - insets.right - EDGE_MARGIN * 2,
                maxHeight:
                  screenH - insets.top - insets.bottom - EDGE_MARGIN * 2,
              },
            ]}
          >
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const ARROW_SIZE = 10;
