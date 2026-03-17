import { useCallback, useRef } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { Gesture } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { spring } from "@rnui/tokens";

// ─── Types ────────────────────────────────────────────────────────

export type SnapPoint = number | `${number}%`;

export interface UseBottomSheetOptions {
  /** Snap points from bottom. e.g. ['25%', '50%', '90%'] or [200, 400] */
  snapPoints?: SnapPoint[];
  /** Index of the initial snap point */
  initialSnapIndex?: number;
  /** Called when sheet fully closes */
  onClose?: () => void;
  /** Called when snap point changes */
  onSnapChange?: (index: number) => void;
  /** Allow dismissal by swiping down past lowest snap point */
  enableDismissOnSwipe?: boolean;
  /** Dim the backdrop */
  enableBackdrop?: boolean;
}

export interface UseBottomSheetReturn {
  /** Is the sheet currently visible */
  isOpen: boolean;
  /** Open to a snap point index (default: last/highest) */
  open: (snapIndex?: number) => void;
  /** Animate closed */
  close: () => void;
  /** Snap to a specific index */
  snapTo: (index: number) => void;
  /** Current snap index */
  currentSnapIndex: number;
  /** Animated translateY for the sheet container */
  sheetAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  /** Animated opacity for the backdrop */
  backdropAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  /** Pan gesture — attach to the drag handle */
  panGesture: ReturnType<typeof Gesture.Pan>;
  /** Tap gesture — attach to backdrop to close on tap */
  backdropTapGesture: ReturnType<typeof Gesture.Tap>;
}

// ─── Helpers ─────────────────────────────────────────────────────

const SCREEN_HEIGHT = Dimensions.get("window").height;

function resolveSnapPoint(point: SnapPoint): number {
  if (typeof point === "number") return point;
  const pct = parseFloat(point) / 100;
  return SCREEN_HEIGHT * pct;
}

// ─── Hook ─────────────────────────────────────────────────────────

export function useBottomSheet({
  snapPoints: rawSnapPoints = ["50%"],
  initialSnapIndex,
  onClose,
  onSnapChange,
  enableDismissOnSwipe = true,
  enableBackdrop = true,
}: UseBottomSheetOptions = {}): UseBottomSheetReturn {
  const snapPoints = rawSnapPoints.map(resolveSnapPoint);
  const defaultSnapIndex = initialSnapIndex ?? snapPoints.length - 1;

  const isOpenRef = useRef(false);
  const currentIndexRef = useRef(defaultSnapIndex);

  // translateY: 0 = fully visible at snap, SCREEN_HEIGHT = hidden below screen
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const dragStartY = useSharedValue(0);

  const gentleSpring = spring.gentle;

  // ── Animate to snap ──────────────────────────────────────────
  const animateToSnap = useCallback(
    (index: number, onDone?: () => void) => {
      "worklet";
      const targetHeight = snapPoints[index] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      translateY.value = withSpring(targetY, gentleSpring, (finished) => {
        if (finished && onDone) scheduleOnRN(onDone);
      });
      // Backdrop opacity: 0 when closed, 1 at highest snap point
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming(
        enableBackdrop ? targetHeight / maxHeight * 0.6 : 0,
        { duration: 250 }
      );
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, gentleSpring]
  );

  // ── JS-thread open/close/snap ────────────────────────────────
  const open = useCallback(
    (snapIndex?: number) => {
      const idx = snapIndex ?? defaultSnapIndex;
      isOpenRef.current = true;
      currentIndexRef.current = idx;
      const targetHeight = snapPoints[idx] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== 'number' || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for open:", targetY);
        return;
      }
      translateY.value = withSpring(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming(
        enableBackdrop ? (targetHeight / maxHeight) * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [snapPoints, defaultSnapIndex, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );

  const handleCloseEnd = useCallback(() => {
    isOpenRef.current = false;
    onClose?.();
  }, [onClose]);

  const close = useCallback(() => {
    translateY.value = withSpring(SCREEN_HEIGHT, gentleSpring, (finished) => {
      if (finished) {
        scheduleOnRN(handleCloseEnd);
      }
    });
    backdropOpacity.value = withTiming(0, { duration: 200 });
  }, [translateY, backdropOpacity, handleCloseEnd, gentleSpring]);

  const snapTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= snapPoints.length) return;
      currentIndexRef.current = index;
      const targetHeight = snapPoints[index]!;
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== 'number' || isNaN(targetY)) {
        console.warn("Invalid targetY calculated for snapTo:", targetY);
        return;
      }
      translateY.value = withSpring(targetY, gentleSpring);
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = withTiming(
        enableBackdrop ? (targetHeight / maxHeight) * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [snapPoints, translateY, backdropOpacity, enableBackdrop, onSnapChange, gentleSpring]
  );

  // ── Pan gesture (UI thread) ──────────────────────────────────
  const panGesture = Gesture.Pan()
    .onStart(() => {
      "worklet";
      dragStartY.value = translateY.value;
    })
    .onUpdate((e) => {
      "worklet";
      const next = dragStartY.value + e.translationY;
      // Resistance above highest snap point
      const minY = SCREEN_HEIGHT - Math.max(...snapPoints);
      if (next < minY) {
        translateY.value = minY + (next - minY) * 0.15;
      } else {
        translateY.value = next;
      }
      const currentHeight = SCREEN_HEIGHT - translateY.value;
      const maxHeight = Math.max(...snapPoints);
      backdropOpacity.value = enableBackdrop
        ? Math.max(0, (currentHeight / maxHeight) * 0.6)
        : 0;
    })
    .onEnd((e) => {
      "worklet";
      const velocity = e.velocityY;
      const currentHeight = SCREEN_HEIGHT - translateY.value;

      // Fast downward flick → dismiss or snap to lower
      if (velocity > 800 && enableDismissOnSwipe) {
        scheduleOnRN(close);
        return;
      }

      // Find nearest snap point
      let bestIndex = 0;
      let bestDist = Infinity;
      for (let i = 0; i < snapPoints.length; i++) {
        const dist = Math.abs(snapPoints[i]! - currentHeight);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      }

      scheduleOnRN(snapTo, bestIndex);
    });

  // ── Backdrop tap ─────────────────────────────────────────────
  const backdropTapGesture = Gesture.Tap().onEnd(() => {
    "worklet";
    scheduleOnRN(close);
  });

  // ── Animated styles ──────────────────────────────────────────
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? "auto" : "none",
  }));

  return {
    isOpen: isOpenRef.current,
    open,
    close,
    snapTo,
    currentSnapIndex: currentIndexRef.current,
    sheetAnimatedStyle,
    backdropAnimatedStyle,
    panGesture,
    backdropTapGesture,
  };
}