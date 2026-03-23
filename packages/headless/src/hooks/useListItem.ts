import { useCallback } from "react";
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
import { spring } from "@truongdq01/tokens";

export interface SwipeAction {
  label: string;
  color: string;
  textColor?: string;
  onPress: () => void;
}

export interface UseListItemOptions {
  onPress?: () => void;
  onLongPress?: () => void;
  /** Swipe-to-reveal actions on the right side */
  trailingActions?: SwipeAction[];
  /** Swipe-to-reveal actions on the left side */
  leadingActions?: SwipeAction[];
  disabled?: boolean;
}

export interface UseListItemReturn {
  itemAnimatedStyle: ReturnType<typeof useAnimatedStyle>;
  trailingActionsStyle: ReturnType<typeof useAnimatedStyle>;
  leadingActionsStyle: ReturnType<typeof useAnimatedStyle>;
  gesture: ReturnType<typeof Gesture.Simultaneous>;
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: "button";
    accessibilityState: { disabled: boolean };
  };
  /** Snap item back to closed */
  close: () => void;
}

const ACTION_WIDTH = 80;

export function useListItem({
  onPress,
  onLongPress,
  trailingActions = [],
  leadingActions = [],
  disabled = false,
}: UseListItemOptions = {}): UseListItemReturn {
  const translateX = useSharedValue(0);
  const isRevealedValue = useSharedValue(false);

  const trailingMax = trailingActions.length * ACTION_WIDTH;
  const leadingMax = leadingActions.length * ACTION_WIDTH;

  const snappySpring = spring.snappy;

  // ── Close (snap back) ────────────────────────────────────────
  const close = useCallback(() => {
    translateX.value = withSpring(0, snappySpring);
    isRevealedValue.value = false;
  }, [translateX, isRevealedValue, snappySpring]);

  // ── Press gesture ────────────────────────────────────────────
  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .onEnd((_, success) => {
      "worklet";
      if (!success) return;
      if (isRevealedValue.value) {
        translateX.value = withSpring(0, snappySpring);
        isRevealedValue.value = false;
        return;
      }
      if (onPress) scheduleOnRN(onPress);
    });

  const longPressGesture = Gesture.LongPress()
    .enabled(!disabled && !!onLongPress)
    .minDuration(500)
    .onStart(() => {
      "worklet";
      if (onLongPress) scheduleOnRN(onLongPress);
    });

  // ── Pan gesture ──────────────────────────────────────────────
  const panGesture = Gesture.Pan()
    .activeOffsetX([-8, 8])
    .failOffsetY([-5, 5])
    .onUpdate((e) => {
      "worklet";
      const raw = e.translationX;
      if (raw < 0 && trailingMax > 0) {
        // Swipe left → reveal trailing
        translateX.value = Math.max(raw, -trailingMax - 10);
      } else if (raw > 0 && leadingMax > 0) {
        // Swipe right → reveal leading
        translateX.value = Math.min(raw, leadingMax + 10);
      }
    })
    .onEnd((e) => {
      "worklet";
      const vel = e.velocityX;
      const tx = translateX.value;

      if (tx < 0 && trailingMax > 0) {
        const snap = tx < -trailingMax / 2 || vel < -300;
        translateX.value = withSpring(snap ? -trailingMax : 0, snappySpring);
        isRevealedValue.value = snap;
      } else if (tx > 0 && leadingMax > 0) {
        const snap = tx > leadingMax / 2 || vel > 300;
        translateX.value = withSpring(snap ? leadingMax : 0, snappySpring);
        isRevealedValue.value = snap;
      } else {
        translateX.value = withSpring(0, snappySpring);
        isRevealedValue.value = false;
      }
    });

  const gesture = Gesture.Simultaneous(
    Gesture.Race(panGesture, tapGesture),
    longPressGesture
  );

  // ── Animated styles ──────────────────────────────────────────
  const itemAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const trailingActionsStyle = useAnimatedStyle(() => ({
    width: Math.abs(Math.min(translateX.value, 0)),
    opacity: interpolate(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], Extrapolation.CLAMP),
  }));

  const leadingActionsStyle = useAnimatedStyle(() => ({
    width: Math.max(translateX.value, 0),
    opacity: interpolate(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], Extrapolation.CLAMP),
  }));

  return {
    itemAnimatedStyle,
    trailingActionsStyle,
    leadingActionsStyle,
    gesture,
    accessibilityProps: {
      accessible: true,
      accessibilityRole: "button",
      accessibilityState: { disabled },
    },
    close,
  };
}