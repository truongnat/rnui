import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  type PanResponderGestureState,
  Pressable,
  useWindowDimensions,
  View,
  type ViewProps,
} from 'react-native';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

/** Snap point: fraction (0–1), px number, or percent string like '50%'. */
export type SnapPoint = number | `${number}%`;

interface SheetContextValue {
  /** Current translateY (bottom-anchored sheet). */
  translateY?: Animated.Value;
  /** Pan handlers attached to the drag-handle area. */
  panHandlers?: ViewProps;
  /** Effective sheet height in px when snapPoints are used. */
  sheetHeight?: number;
}

const SheetContext = createContext<SheetContextValue>({});

export interface SheetProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Render the dimmed backdrop. Tapping outside still closes when hidden. */
  showOverlay?: boolean;
  /**
   * Detent heights the sheet snaps to, e.g. ['30%', '60%'] or [240, 480].
   * When provided, the sheet drag-snaps between them; dragging past the
   * lowest point dismisses. Omit for auto-height (no drag).
   */
  snapPoints?: SnapPoint[];
  /** Index into snapPoints the sheet opens at. Default last. */
  initialSnapIndex?: number;
  /** Called when the resting snap point changes. */
  onSnapChange?: (index: number) => void;
  children?: ReactNode;
}

function resolveSnapPoints(
  snapPoints: SnapPoint[],
  windowHeight: number
): number[] {
  return snapPoints
    .map((p) =>
      typeof p === 'string'
        ? (parseFloat(p) / 100) * windowHeight
        : p <= 1
          ? p * windowHeight
          : p
    )
    .filter((h) => h > 0 && h <= windowHeight)
    .sort((a, b) => a - b);
}

export function Sheet({
  open,
  onOpenChange,
  showOverlay = true,
  snapPoints,
  initialSnapIndex,
  onSnapChange,
  children,
}: SheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const heights = useMemo(
    () =>
      snapPoints?.length ? resolveSnapPoints(snapPoints, windowHeight) : null,
    [snapPoints, windowHeight]
  );

  const [mounted, setMounted] = useState(open);
  const [snapIndex, setSnapIndex] = useState(
    initialSnapIndex ?? (heights ? heights.length - 1 : 0)
  );
  const translateY = useRef(new Animated.Value(windowHeight)).current;
  const gestureStartY = useRef(0);

  const setOpenRef = useRef(onOpenChange);
  setOpenRef.current = onOpenChange;

  const animateTo = useCallback(
    (toValue: number, onDone?: () => void) => {
      Animated.spring(translateY, {
        toValue,
        useNativeDriver: true,
        damping: 30,
        stiffness: 300,
        mass: 0.8,
      }).start(({ finished }) => {
        if (finished) onDone?.();
      });
    },
    [translateY]
  );

  const restY = useCallback(
    (index: number) =>
      heights
        ? windowHeight -
          heights[Math.max(0, Math.min(index, heights.length - 1))]
        : 0,
    [heights, windowHeight]
  );

  // Enter / exit.
  useEffect(() => {
    if (open) {
      setMounted(true);
      animateTo(restY(snapIndex));
    } else if (mounted) {
      animateTo(windowHeight, () => setMounted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const panHandlers = useMemo(
    () =>
      heights
        ? PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_e, g) => Math.abs(g.dy) > 4,
            onPanResponderGrant: () => {
              translateY.stopAnimation((v) => {
                gestureStartY.current = v;
              });
            },
            onPanResponderMove: (_e, g: PanResponderGestureState) => {
              const next = Math.max(0, gestureStartY.current + g.dy);
              translateY.setValue(next);
            },
            onPanResponderRelease: (_e, g) => {
              const y = Math.max(0, gestureStartY.current + g.dy);
              const sheetTop = y;
              const heightAtY = windowHeight - sheetTop;
              const lowest = heights[0];
              // Dismiss when dragged below ~2/3 of the lowest detent
              // or flicked down hard.
              if (heightAtY < lowest * 0.66 || g.vy > 1.2) {
                setOpenRef.current?.(false);
                return;
              }
              // Snap to nearest detent; upward flick prefers next higher.
              let best = 0;
              let bestDist = Infinity;
              heights.forEach((h, i) => {
                const d =
                  Math.abs(heightAtY - h) -
                  (g.vy < -0.5 && h > heightAtY ? h * 0.15 : 0);
                if (d < bestDist) {
                  bestDist = d;
                  best = i;
                }
              });
              setSnapIndex(best);
              onSnapChange?.(best);
              animateTo(windowHeight - heights[best]);
            },
            onPanResponderTerminate: () => {
              animateTo(restY(snapIndex));
            },
          }).panHandlers
        : undefined,
    [
      heights,
      windowHeight,
      translateY,
      animateTo,
      onSnapChange,
      restY,
      snapIndex,
    ]
  );

  const ctx = useMemo<SheetContextValue>(
    () =>
      heights
        ? {
            translateY,
            panHandlers,
            sheetHeight:
              heights[Math.max(0, Math.min(snapIndex, heights.length - 1))],
          }
        : {},
    [heights, translateY, panHandlers, snapIndex]
  );

  // Legacy path: no snapPoints → plain slide-in sheet (unchanged behavior).
  if (!heights) {
    return (
      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => onOpenChange?.(false)}
      >
        <SheetContext.Provider value={ctx}>
          <Pressable
            className={cn('flex-1 justify-end', showOverlay && 'bg-black/50')}
            onPress={() => onOpenChange?.(false)}
          >
            {children}
          </Pressable>
        </SheetContext.Provider>
      </Modal>
    );
  }

  const sheetTop = heights ? windowHeight - heights[snapIndex] : 0;

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange?.(false)}
    >
      <SheetContext.Provider value={ctx}>
        <View className="flex-1">
          <Pressable
            className="flex-1"
            style={
              showOverlay ? { backgroundColor: 'rgba(0,0,0,0.5)' } : undefined
            }
            onPress={() => onOpenChange?.(false)}
          />
          <Animated.View
            className="absolute inset-x-0 bottom-0"
            style={{
              // Sheet is full-height; content area is bottom-anchored.
              height: windowHeight,
              transform: [{ translateY }],
            }}
          >
            <View
              className="absolute inset-x-0 bottom-0"
              style={{ height: windowHeight - sheetTop }}
            >
              {children}
            </View>
          </Animated.View>
        </View>
      </SheetContext.Provider>
    </Modal>
  );
}

export function SheetContent({
  className,
  children,
  ...props
}: ViewProps & { className?: string }) {
  const { panHandlers, sheetHeight } = useContext(SheetContext);
  return (
    <Pressable onPress={(e) => e.stopPropagation()}>
      <View
        className={cn(
          'rounded-t-2xl border-t border-border bg-background p-6 pt-3',
          className
        )}
        style={sheetHeight ? { height: sheetHeight } : undefined}
        {...props}
      >
        <View {...panHandlers} collapsable={false}>
          <View className="mx-auto mb-4 h-1.5 w-9 rounded-full bg-muted" />
        </View>
        {children}
      </View>
    </Pressable>
  );
}

export function SheetHeader({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return <View className={cn('mb-4 flex-col gap-1.5', className)} {...props} />;
}

export function SheetTitle({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  );
}

export function SheetDescription({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

export function SheetFooter({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn('mt-6 flex-row justify-end gap-2', className)}
      {...props}
    />
  );
}
