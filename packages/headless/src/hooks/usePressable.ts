import { useCallback, useState } from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  Gesture,
  type GestureStateChangeEvent,
  type TapGestureHandlerEventPayload,
  type LongPressGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import { Platform, type AccessibilityRole } from 'react-native';
import { useReduceMotionEnabled } from './useMotionPreference';
import { spring, pressFeedback } from '@truongdq01/tokens';

// ─── Types ────────────────────────────────────────────────────────

export type PressFeedbackMode =
  | 'scale'
  | 'scaleSubtle'
  | 'opacity'
  | 'highlight'
  | 'none';

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
  feedbackMode = 'scale',
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
  haptic = false,
  hitSlop,
  testID,
}: UsePressableOptions = {}): UsePressableReturn {
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
// Resolved once at module load; subsequent calls skip require() overhead.

type HapticType = 'light' | 'medium' | 'heavy';

let _hapticModule: any = null;
let _hapticProvider: 'expo' | 'rn' | 'none' | undefined;

function resolveHapticProvider() {
  if (_hapticProvider !== undefined) return;
  try {
    _hapticModule = require('expo-haptics');
    _hapticProvider = 'expo';
    return;
  } catch {}
  try {
    _hapticModule = require('react-native-haptic-feedback').default;
    _hapticProvider = 'rn';
    return;
  } catch {}
  _hapticProvider = 'none';
}

function triggerHaptic(type: HapticType) {
  resolveHapticProvider();
  if (_hapticProvider === 'expo') {
    const map = {
      light: _hapticModule.ImpactFeedbackStyle.Light,
      medium: _hapticModule.ImpactFeedbackStyle.Medium,
      heavy: _hapticModule.ImpactFeedbackStyle.Heavy,
    };
    _hapticModule.impactAsync(map[type]);
  } else if (_hapticProvider === 'rn') {
    _hapticModule.trigger(
      Platform.OS === 'ios' ? 'impactLight' : 'notificationSuccess',
      { enableVibrateFallback: true, ignoreAndroidSystemSettings: false }
    );
  }
}
