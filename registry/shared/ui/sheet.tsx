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
  AccessibilityInfo,
  Animated,
  Easing,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  View,
  type ViewProps,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Text, type TextProps } from '@/components/ui/text';
import { cn } from '@/lib/utils';

/** Snap point: fraction (0–1), px number, or percent string like '50%'. */
export type SnapPoint = number | `${number}%`;

interface SheetContextValue {
  panHandlers?: ViewProps;
  sheetHeight?: number;
}

const SheetContext = createContext<SheetContextValue>({});

export interface SheetProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  showOverlay?: boolean;
  /** Detent heights; drag the handle to snap or dismiss. */
  snapPoints?: SnapPoint[];
  /** Index into sorted snapPoints. Defaults to the highest detent. */
  initialSnapIndex?: number;
  onSnapChange?: (index: number) => void;
  children?: ReactNode;
}

function resolveSnapPoints(points: SnapPoint[], height: number): number[] {
  return points
    .map((point) =>
      typeof point === 'string'
        ? (parseFloat(point) / 100) * height
        : point <= 1
          ? point * height
          : point
    )
    .filter((value) => Number.isFinite(value) && value > 0 && value <= height)
    .sort((a, b) => a - b);
}

export function Sheet(props: SheetProps) {
  const [mounted, setMounted] = useState(props.open);
  useEffect(() => {
    if (props.open) setMounted(true);
  }, [props.open]);
  return (
    <Modal
      visible={mounted || props.open}
      transparent
      statusBarTranslucent
      navigationBarTranslucent
      animationType="none"
      onRequestClose={() => props.onOpenChange?.(false)}
    >
      <SafeAreaProvider>
        <SheetFrame {...props} onClosed={() => setMounted(false)} />
      </SafeAreaProvider>
    </Modal>
  );
}

function SheetFrame({
  open,
  onOpenChange,
  showOverlay = true,
  snapPoints,
  initialSnapIndex,
  onSnapChange,
  children,
  onClosed,
}: SheetProps & { onClosed: () => void }) {
  const { height: windowHeight } = useSafeAreaFrame();
  const insets = useSafeAreaInsets();
  const heights = useMemo(
    () => resolveSnapPoints(snapPoints ?? [], windowHeight - insets.top),
    [snapPoints, windowHeight, insets.top]
  );
  const [snapIndex, setSnapIndex] = useState(
    initialSnapIndex ?? heights.length - 1
  );
  const [reduceMotion, setReduceMotion] = useState(false);
  const translateY = useRef(new Animated.Value(windowHeight)).current;
  const startY = useRef(0);
  const openRef = useRef(open);
  openRef.current = open;
  const callbacks = useRef({ onOpenChange, onSnapChange, onClosed });
  callbacks.current = { onOpenChange, onSnapChange, onClosed };
  const maxHeight = heights.at(-1) ?? windowHeight - insets.top;
  const index = Math.max(0, Math.min(snapIndex, heights.length - 1));
  const sheetHeight = heights[index];
  const restingY = sheetHeight === undefined ? 0 : maxHeight - sheetHeight;

  useEffect(() => {
    let active = true;
    void AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (active) setReduceMotion(enabled);
    });
    const subscription = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      setReduceMotion
    );
    return () => {
      active = false;
      subscription.remove();
      translateY.stopAnimation();
    };
  }, [translateY]);

  const animateTo = useCallback(
    (value: number, closing = false) => {
      translateY.stopAnimation();
      Animated.timing(translateY, {
        toValue: value,
        duration: reduceMotion ? 0 : closing ? 160 : 240,
        easing: closing ? Easing.in(Easing.quad) : Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && closing && !openRef.current)
          callbacks.current.onClosed();
      });
    },
    [translateY, reduceMotion]
  );

  const wasOpen = useRef(false);
  useEffect(() => {
    const opening = open && !wasOpen.current;
    wasOpen.current = open;

    if (opening) {
      const nextIndex = Math.max(
        0,
        Math.min(initialSnapIndex ?? heights.length - 1, heights.length - 1)
      );
      const nextHeight = heights[nextIndex];
      setSnapIndex(nextIndex);
      animateTo(nextHeight === undefined ? 0 : maxHeight - nextHeight);
      return;
    }

    animateTo(open ? restingY : maxHeight, !open);
  }, [open, initialSnapIndex, heights, maxHeight, restingY, animateTo]);

  const panHandlers = useMemo(
    () =>
      heights.length
        ? PanResponder.create({
            onMoveShouldSetPanResponder: (_event, gesture) =>
              Math.abs(gesture.dy) > 4,
            onPanResponderGrant: () =>
              translateY.stopAnimation((value) => {
                startY.current = value;
              }),
            onPanResponderMove: (_event, gesture) => {
              translateY.setValue(
                Math.max(0, Math.min(maxHeight, startY.current + gesture.dy))
              );
            },
            onPanResponderRelease: (_event, gesture) => {
              const visibleHeight = maxHeight - startY.current - gesture.dy;
              if (visibleHeight < heights[0] * 0.66 || gesture.vy > 1.2) {
                callbacks.current.onOpenChange?.(false);
                if (!callbacks.current.onOpenChange) animateTo(restingY);
                return;
              }
              let nearest = 0;
              let distance = Infinity;
              heights.forEach((height, candidate) => {
                const next = Math.abs(visibleHeight - height);
                if (next < distance) {
                  distance = next;
                  nearest = candidate;
                }
              });
              setSnapIndex(nearest);
              callbacks.current.onSnapChange?.(nearest);
              animateTo(maxHeight - heights[nearest]);
            },
            onPanResponderTerminate: () => animateTo(restingY),
          }).panHandlers
        : undefined,
    [heights, translateY, maxHeight, restingY, animateTo]
  );

  return (
    <SheetContext.Provider value={{ panHandlers, sheetHeight }}>
      <View
        className="flex-1 justify-end"
        pointerEvents={open ? 'auto' : 'none'}
        accessibilityElementsHidden={!open}
        importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityRole="button"
          accessibilityLabel="Close sheet"
          onPress={() => onOpenChange?.(false)}
        >
          {showOverlay && open && (
            <View
              pointerEvents="none"
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(0,0,0,0.5)' },
              ]}
            />
          )}
        </Pressable>
        <Animated.View
          pointerEvents="box-none"
          style={{
            height: sheetHeight === undefined ? undefined : maxHeight,
            maxHeight,
            transform: [{ translateY }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </SheetContext.Provider>
  );
}

export function SheetContent({
  className,
  children,
  style,
  ...props
}: ViewProps & { className?: string }) {
  const { panHandlers, sheetHeight } = useContext(SheetContext);
  const insets = useSafeAreaInsets();
  return (
    <View
      accessibilityViewIsModal
      className={cn('rounded-t-2xl bg-background px-6 pb-6', className)}
      style={[
        {
          height: sheetHeight,
          paddingBottom: insets.bottom + 24,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
          flexShrink: 1,
        },
        style,
      ]}
      {...props}
    >
      <View
        {...panHandlers}
        collapsable={false}
        className="h-11 items-center justify-center"
        accessibilityLabel={panHandlers ? 'Drag to resize sheet' : undefined}
      >
        <View className="h-1 w-9 rounded-full bg-muted-foreground/40" />
      </View>
      {children}
    </View>
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
      accessibilityRole="header"
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
      className={cn('mt-6 flex-row flex-wrap justify-end gap-2', className)}
      {...props}
    />
  );
}
