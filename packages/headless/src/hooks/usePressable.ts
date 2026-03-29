import { useCallback, useState } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  Gesture,
  type GestureStateChangeEvent,
  type TapGestureHandlerEventPayload,
  type LongPressGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { AccessibilityInfo, Platform, type AccessibilityRole } from "react-native";
import { spring, pressFeedback } from "@truongdq01/tokens";

// ─── Types ────────────────────────────────────────────────────────

export type PressFeedbackMode = "scale" | "scaleSubtle" | "opacity" | "none";

export interface UsePressableOptions {
  /** Called when press completes */
  onPress?: () => void;
  /** Called when long press fires (default 500ms) */
  onLongPress?: () => void;
  /** Minimum duration in ms for long press */
  longPressMinDuration?: number;
  /** Prevent all interaction */
  disabled?: boolean;
  /** Visual feedback style on press */
  feedbackMode?: PressFeedbackMode;
  /** Accessibility label (required for icon-only buttons) */
  accessibilityLabel?: string;
  /** Accessibility hint */
  accessibilityHint?: string;
  /** Override the accessibility role */
  accessibilityRole?: AccessibilityRole;
  /** Haptic feedback — requires expo-haptics or react-native-haptic-feedback */
  haptic?: boolean;
  /** Expand the touch target area without changing visual layout */
  hitSlop?: number | { top?: number; left?: number; bottom?: number; right?: number };
  /** Test identifier for automation testing */
  testID?: string;
}

export interface UsePressableReturn {
  /** Attach to Reanimated.View as animatedStyle */
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
  /** Pass to GestureDetector gesture prop */
  gesture: ReturnType<typeof Gesture.Simultaneous>;
  /** Spread onto View for accessibility */
  accessibilityProps: {
    accessible: boolean;
    accessibilityRole: AccessibilityRole;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityState: { disabled: boolean };
    testID?: string;
  };
  /** True while finger is down */
  isPressed: boolean;
  /** Original onPress for testing */
  onPress?: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────

export function usePressable({
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  disabled = false,
  feedbackMode = "scale",
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = "button",
  haptic = false,
  hitSlop,
  testID,
}: UsePressableOptions = {}): UsePressableReturn {
  const [isPressed, setIsPressed] = useState(false);

  // Shared values live on the UI thread
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // ── Press callbacks (JS thread) ────────────────────────────────
  const handlePress = useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("light");
    onPress?.();
  }, [disabled, haptic, onPress]);

  const handleLongPress = useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic("medium");
    onLongPress?.();
  }, [disabled, haptic, onLongPress]);

  const setPressedState = useCallback((pressed: boolean) => {
    setIsPressed(pressed);
  }, []);

  // ── Animated style (UI thread) ────────────────────────────────
  const animatedStyle = useAnimatedStyle(() => {
    if (feedbackMode === "opacity") {
      return { opacity: opacity.value };
    }
    if (feedbackMode === "none") {
      return {};
    }
    return { transform: [{ scale: scale.value }] };
  });

  // ── Gesture (UI thread) ───────────────────────────────────────

  // Cache these outside the worklet so Reanimated doesn't have to serialize the entire module objects
  const scaleDownPressed = pressFeedback.scaleDown.pressed;
  const scaleSubtlePressed = pressFeedback.scaleDownSubtle.pressed;
  const opacityOnlyPressed = pressFeedback.opacityOnly.pressed;
  const snappySpring = spring.snappy;

  const tapGesture = Gesture.Tap()
    .enabled(!disabled)
    .hitSlop(hitSlop ?? 0)
    .onBegin(() => {
      "worklet";
      runOnJS(setPressedState)(true);
      if (feedbackMode === "scale") {
        scale.value = withSpring(scaleDownPressed, snappySpring);
      } else if (feedbackMode === "scaleSubtle") {
        scale.value = withSpring(scaleSubtlePressed, snappySpring);
      } else if (feedbackMode === "opacity") {
        opacity.value = withTiming(opacityOnlyPressed, { duration: 60 });
      }
    })
    .onFinalize((_event, success) => {
      "worklet";
      runOnJS(setPressedState)(false);
      if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
        scale.value = withSpring(1, snappySpring);
      } else if (feedbackMode === "opacity") {
        opacity.value = withTiming(1, { duration: 100 });
      }
      if (success) {
        scheduleOnRN(handlePress);
      }
    });

  const longPressGesture = Gesture.LongPress()
    .enabled(!disabled && !!onLongPress)
    .minDuration(longPressMinDuration)
    .onStart(() => {
      "worklet";
      scheduleOnRN(handleLongPress);
    });

  const gesture = Gesture.Simultaneous(tapGesture, longPressGesture);

  // ── Accessibility props ────────────────────────────────────────
  const accessibilityProps = {
    accessible: true,
    accessibilityRole,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState: { disabled },
    testID,
  };

  return {
    animatedStyle,
    gesture,
    accessibilityProps,
    isPressed,
    onPress: handlePress,
  };
}

// ─── Haptic helper ────────────────────────────────────────────────
// Soft dependency — no crash if haptics not available

type HapticType = "light" | "medium" | "heavy";

function triggerHaptic(type: HapticType) {
  try {
    // Try expo-haptics first
    const Haptics = require("expo-haptics");
    const map = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
    };
    Haptics.impactAsync(map[type]);
    return;
  } catch { }

  try {
    // Fallback: react-native-haptic-feedback
    const HapticFeedback = require("react-native-haptic-feedback").default;
    HapticFeedback.trigger(
      Platform.OS === "ios" ? "impactLight" : "notificationSuccess",
      { enableVibrateFallback: true, ignoreAndroidSystemSettings: false }
    );
  } catch { }
}
