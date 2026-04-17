import { useCallback, useRef, useMemo, useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { spring } from '@truongdq01/tokens';

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

const SCREEN_HEIGHT = Dimensions.get('window').height;

function resolveSnapPoint(point: SnapPoint): number {
  if (typeof point === 'number') return point;
  const pct = parseFloat(point) / 100;
  return SCREEN_HEIGHT * pct;
}

// ─── Hook ─────────────────────────────────────────────────────────

export function useBottomSheet({
  snapPoints: rawSnapPoints = ['50%'],
  initialSnapIndex,
  onClose,
  onSnapChange,
  enableDismissOnSwipe = true,
  enableBackdrop = true,
}: UseBottomSheetOptions = {}): UseBottomSheetReturn {
  const snapPoints = useMemo(() => {
    const resolved = rawSnapPoints.map(resolveSnapPoint);
    return resolved.length > 0 ? resolved : [SCREEN_HEIGHT * 0.5];
  }, [rawSnapPoints]);
  const maxHeight = useMemo(() => Math.max(...snapPoints), [snapPoints]);
  const defaultSnapIndex = initialSnapIndex ?? snapPoints.length - 1;

  const [isOpen, setIsOpen] = useState(false);
  const [currentSnapIndex, setCurrentSnapIndex] = useState(defaultSnapIndex);

  const isOpenRef = useRef(false);
  const currentIndexRef = useRef(defaultSnapIndex);

  // Sync ref with state just in case internally needed. Actually, better to just use refs and update state together
  const updateState = useCallback((open: boolean, index: number) => {
    isOpenRef.current = open;
    currentIndexRef.current = index;
    setIsOpen(open);
    setCurrentSnapIndex(index);
  }, []);

  // translateY: 0 = fully visible at snap, SCREEN_HEIGHT = hidden below screen
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const dragStartY = useSharedValue(0);

  const gentleSpring = spring.gentle;

  // ── JS-thread open/close/snap ────────────────────────────────
  const open = useCallback(
    (snapIndex?: number) => {
      const idx = snapIndex ?? defaultSnapIndex;
      updateState(true, idx);
      const targetHeight = snapPoints[idx] ?? snapPoints[snapPoints.length - 1];
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== 'number' || isNaN(targetY)) {
        console.warn('Invalid targetY calculated for open:', targetY);
        return;
      }
      translateY.value = withSpring(targetY, gentleSpring);
      backdropOpacity.value = withTiming(
        enableBackdrop ? (targetHeight / maxHeight) * 0.6 : 0,
        { duration: 250 }
      );
      onSnapChange?.(idx);
    },
    [
      snapPoints,
      maxHeight,
      defaultSnapIndex,
      translateY,
      backdropOpacity,
      enableBackdrop,
      onSnapChange,
      gentleSpring,
    ]
  );

  const handleCloseEnd = useCallback(() => {
    updateState(false, currentIndexRef.current);
    onClose?.();
  }, [onClose, updateState]);

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
      updateState(isOpenRef.current, index);
      const targetHeight = snapPoints[index]!;
      const targetY = SCREEN_HEIGHT - targetHeight;
      if (typeof targetY !== 'number' || isNaN(targetY)) {
        console.warn('Invalid targetY calculated for snapTo:', targetY);
        return;
      }
      translateY.value = withSpring(targetY, gentleSpring);
      backdropOpacity.value = withTiming(
        enableBackdrop ? (targetHeight / maxHeight) * 0.6 : 0,
        { duration: 200 }
      );
      onSnapChange?.(index);
    },
    [
      snapPoints,
      maxHeight,
      translateY,
      backdropOpacity,
      enableBackdrop,
      onSnapChange,
      gentleSpring,
    ]
  );

  // ── Pan gesture (UI thread) ──────────────────────────────────
  const panGesture = Gesture.Pan()
    .onStart(() => {
      'worklet';
      dragStartY.value = translateY.value;
    })
    .onUpdate((e) => {
      'worklet';
      const next = dragStartY.value + e.translationY;
      // Resistance above highest snap point
      const minY = SCREEN_HEIGHT - maxHeight;
      if (next < minY) {
        translateY.value = minY + (next - minY) * 0.15;
      } else {
        translateY.value = next;
      }
      const currentHeight = SCREEN_HEIGHT - translateY.value;
      backdropOpacity.value = enableBackdrop
        ? Math.max(0, (currentHeight / maxHeight) * 0.6)
        : 0;
    })
    .onEnd((e) => {
      'worklet';
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
    'worklet';
    scheduleOnRN(close);
  });

  // ── Animated styles ──────────────────────────────────────────
  const sheetAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
    pointerEvents: backdropOpacity.value > 0 ? 'auto' : 'none',
  }));

  return {
    isOpen,
    open,
    close,
    snapTo,
    currentSnapIndex,
    sheetAnimatedStyle,
    backdropAnimatedStyle,
    panGesture,
    backdropTapGesture,
  };
}
