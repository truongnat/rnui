import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  StyleSheet,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

const REMOVE_DURATION = 380;

type RemovableRowProps = {
  /** Row identity — resets local removal state when the cell is recycled. */
  resetKey: string;
  onRemoved: () => void;
  /** Render prop: receives a stable `remove` trigger to wire into the row. */
  children: (remove: () => void) => ReactNode;
};

/**
 * Two-phase removal wrapper.
 *
 * The list frees a row's space the instant it leaves `data`, so a plain exit
 * animation looks like the rows below "jump up" while the removed row is still
 * animating out. Instead we keep the item in `data`, collapse this wrapper's
 * measured height to 0 (which pushes the rows below up *gradually*, in sync
 * with the fade), and only remove it from `data` once the animation finishes
 * via `onRemoved`.
 *
 * Removal state is LOCAL to each row (not lifted to the screen). This keeps
 * `renderItem` stable so pressing Remove only re-renders the affected cell,
 * instead of re-rendering every visible cell (the main source of jank).
 */
export const RemovableRow = memo(function RemovableRow({
  resetKey,
  onRemoved,
  children,
}: RemovableRowProps) {
  const [removing, setRemoving] = useState(false);
  const progress = useSharedValue(1);
  const measuredHeight = useSharedValue(0);
  const hasMeasured = useSharedValue(false);
  const onRemovedRef = useRef(onRemoved);
  onRemovedRef.current = onRemoved;

  // Stable JS callback for scheduleOnRN. The worklet must NOT read `onRemovedRef`
  // directly, otherwise the ref gets captured by the worklet and mutating
  // `.current` each render triggers a Reanimated "modified key" warning.
  const handleRemoved = useCallback(() => {
    onRemovedRef.current();
  }, []);

  // Reset when the list recycles this cell to a different item.
  useLayoutEffect(() => {
    setRemoving(false);
    progress.set(1);
    hasMeasured.set(false);
  }, [resetKey, progress, hasMeasured]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const h = e.nativeEvent.layout.height;
      if (h > 0 && !hasMeasured.get()) {
        measuredHeight.set(h);
        hasMeasured.set(true);
      }
    },
    [hasMeasured, measuredHeight]
  );

  const remove = useCallback(() => setRemoving(true), []);

  useEffect(() => {
    if (!removing) return;
    progress.set(
      withTiming(
        0,
        { duration: REMOVE_DURATION, easing: Easing.out(Easing.cubic) },
        (finished) => {
          if (finished) {
            scheduleOnRN(handleRemoved);
          }
        }
      )
    );
  }, [removing, progress, handleRemoved]);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => {
    if (!removing) return {};
    const p = progress.get();
    return {
      opacity: p,
      height: hasMeasured.get() ? measuredHeight.get() * p : undefined,
    };
  });

  return (
    <Animated.View onLayout={onLayout} style={[styles.clip, animatedStyle]}>
      {children(remove)}
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  clip: { overflow: 'hidden' },
});
