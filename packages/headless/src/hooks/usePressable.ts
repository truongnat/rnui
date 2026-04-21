import { pressFeedback, spring } from '@truongdq01/tokens';
import { useCallback, useState } from 'react';
import { type AccessibilityRole, Platform } from 'react-native';
import {
  Gesture,
  type GestureStateChangeEvent,
  type LongPressGestureHandlerEventPayload,
  type TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { triggerHaptic } from './useHaptics';
import { useId } from './useId';
import { useReduceMotionEnabled } from './useMotionPreference';

// ─── Types ────────────────────────────────────────────────────────

export type PressFeedbackMode =
  | 'scale'
  | 'scaleSubtle'
  | 'opacity'
  | 'highlight'
  | 'none';

export interface UsePressableOptions {
  /** Unique identifier for the pressable element */
  id?: string;
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
  hitSlop?:
    | number
    | { top?: number; left?: number; bottom?: number; right?: number };
  /** Test identifier for automation testing */
  testID?: string;
}

export interface UsePressableReturn {
  /** Attach to Reanimated.View as animatedStyle */
  animatedStyle: ReturnType<typeof useAnimatedStyle>;
  /** Pass to GestureDetector gesture prop */
  gesture: ReturnType<typeof Gesture.Simultaneous>;
  /** Spread onto View for accessibility and identification */
  accessibilityProps: {
    nativeID: string;
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
  id: idProp,
  onPress,
  onLongPress,
  longPressMinDuration = 500,
  disabled = false,
  feedbackMode = 'scale',
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  haptic = false,
  hitSlop,
  testID,
}: UsePressableOptions = {}): UsePressableReturn {
  const id = useId(idProp, 'pressable');
  const [isPressed, setIsPressed] = useState(false);
  const reduceMotion = useReduceMotionEnabled();
  const effectiveFeedbackMode: PressFeedbackMode =
    reduceMotion && feedbackMode !== 'none' ? 'none' : feedbackMode;

  // Shared values live on the UI thread
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const highlightOpacity = useSharedValue(0);

  // ── Press callbacks (JS thread) ────────────────────────────────
  const handlePress = useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic('light');
    onPress?.();
  }, [disabled, haptic, onPress]);

  const handleLongPress = useCallback(() => {
    if (disabled) return;
    if (haptic) triggerHaptic('medium');
    onLongPress?.();
  }, [disabled, haptic, onLongPress]);

  const setPressedState = useCallback((pressed: boolean) => {
    setIsPressed(pressed);
  }, []);

  // ── Animated style (UI thread) ────────────────────────────────
  const animatedStyle = useAnimatedStyle(() => {
    if (effectiveFeedbackMode === 'opacity') {
      return { opacity: opacity.value };
    }
    if (effectiveFeedbackMode === 'highlight') {
      return {
        backgroundColor: `rgba(0,0,0,${highlightOpacity.value * 0.08})`,
      };
    }
    if (effectiveFeedbackMode === 'none') {
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
      'worklet';
      scheduleOnRN(setPressedState, true);
      if (effectiveFeedbackMode === 'scale') {
        scale.value = withSpring(scaleDownPressed, snappySpring);
      } else if (effectiveFeedbackMode === 'scaleSubtle') {
        scale.value = withSpring(scaleSubtlePressed, snappySpring);
      } else if (effectiveFeedbackMode === 'opacity') {
        opacity.value = withTiming(opacityOnlyPressed, { duration: 60 });
      } else if (effectiveFeedbackMode === 'highlight') {
        highlightOpacity.value = withTiming(1, { duration: 60 });
      }
    })
    .onFinalize((_event, success) => {
      'worklet';
      scheduleOnRN(setPressedState, false);
      if (
        effectiveFeedbackMode === 'scale' ||
        effectiveFeedbackMode === 'scaleSubtle'
      ) {
        scale.value = withSpring(1, snappySpring);
      } else if (effectiveFeedbackMode === 'opacity') {
        opacity.value = withTiming(1, { duration: 100 });
      } else if (effectiveFeedbackMode === 'highlight') {
        highlightOpacity.value = withTiming(0, { duration: 200 });
      }
      if (success) {
        scheduleOnRN(handlePress);
      }
    });

  const longPressGesture = Gesture.LongPress()
    .enabled(!disabled && !!onLongPress)
    .minDuration(longPressMinDuration)
    .onStart(() => {
      'worklet';
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
    nativeID: id,
  };

  return {
    animatedStyle,
    gesture,
    accessibilityProps,
    isPressed,
    onPress: handlePress,
  };
}
