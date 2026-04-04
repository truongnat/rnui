import { useAnimatedStyle } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { type AccessibilityRole } from 'react-native';
export type PressFeedbackMode = 'scale' | 'scaleSubtle' | 'opacity' | 'none';
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
    accessibilityState: {
      disabled: boolean;
    };
  };
  /** True while finger is down */
  isPressed: boolean;
}
export declare function usePressable({
  onPress,
  onLongPress,
  longPressMinDuration,
  disabled,
  feedbackMode,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  haptic,
}?: UsePressableOptions): UsePressableReturn;
//# sourceMappingURL=usePressable.d.ts.map
