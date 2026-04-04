import { Platform } from 'react-native';

/**
 * Haptic feedback intensity levels
 */
export type HapticIntensity =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'success'
  | 'warning'
  | 'error';

/**
 * Haptic feedback trigger function
 */
export type HapticTrigger = (intensity: HapticIntensity) => void;

/**
 * Haptic configuration options
 */
export interface HapticConfig {
  /** Enable haptic feedback */
  enabled?: boolean;
  /** Custom vibration pattern for Android */
  androidPattern?: number[];
  /** iOS feedback style override */
  iosStyle?: 'light' | 'medium' | 'heavy' | 'soft' | 'rigid';
}

/**
 * Hook for haptic feedback with platform-specific implementations
 *
 * @param config - Haptic configuration options
 * @returns Object with trigger function and platform capabilities
 *
 * @example
 * ```tsx
 * const { trigger, isSupported } = useHaptics();
 *
 * if (isSupported) {
 *   trigger("success"); // User completed an action
 *   trigger("error");   // Form validation failed
 * }
 * ```
 *
 * @example With custom config
 * ```tsx
 * const { trigger } = useHaptics({
 *   enabled: true,
 *   androidPattern: [0, 50, 100, 50],
 *   iosStyle: "medium"
 * });
 * ```
 */
export function useHaptics(config: HapticConfig = {}) {
  const { enabled = true, androidPattern, iosStyle } = config;

  // Check if haptics are supported on this platform
  const isSupported = Platform.select({
    ios: true, // iOS has built-in haptic feedback
    android: true, // Android supports vibration patterns
    default: false,
  });

  const trigger: HapticTrigger = (intensity: HapticIntensity) => {
    if (!enabled || !isSupported) return;

    try {
      if (Platform.OS === 'ios') {
        // iOS implementation using native haptic feedback
        const feedbackType = iosStyle || getIOSFeedbackType(intensity);
        triggerIOSHaptics(feedbackType);
      } else if (Platform.OS === 'android') {
        // Android implementation using vibration
        const pattern = androidPattern || getAndroidVibrationPattern(intensity);
        triggerAndroidVibration(pattern);
      }
    } catch (error) {
      // Silently fail if haptic feedback is not available
      console.warn('[Haptics] Failed to trigger haptic feedback:', error);
    }
  };

  return {
    trigger,
    isSupported,
    platform: Platform.OS,
  };
}

/**
 * Get appropriate iOS haptic feedback type based on intensity
 */
function getIOSFeedbackType(
  intensity: HapticIntensity
): 'light' | 'medium' | 'heavy' {
  switch (intensity) {
    case 'light':
      return 'light';
    case 'medium':
    case 'success':
      return 'medium';
    case 'heavy':
    case 'warning':
    case 'error':
      return 'heavy';
    default:
      return 'medium';
  }
}

/**
 * Get vibration pattern for Android based on intensity
 */
function getAndroidVibrationPattern(intensity: HapticIntensity): number[] {
  switch (intensity) {
    case 'light':
      return [0, 10]; // Short vibration
    case 'medium':
      return [0, 20, 10, 20]; // Double pulse
    case 'heavy':
      return [0, 50]; // Longer vibration
    case 'success':
      return [0, 30, 50, 30]; // Success pattern
    case 'warning':
      return [0, 100, 50, 100]; // Warning pattern
    case 'error':
      return [0, 50, 50, 50, 50, 50]; // Error pattern
    default:
      return [0, 20];
  }
}

/**
 * Trigger iOS haptic feedback
 * Note: This is a placeholder - actual implementation requires react-native-haptic-feedback
 */
function triggerIOSHaptics(
  style: 'light' | 'medium' | 'heavy' | 'soft' | 'rigid'
): void {
  // Placeholder for actual iOS haptic implementation
  // Would use react-native-haptic-feedback or similar library
  if (__DEV__) {
    console.log(`[Haptics] iOS ${style} feedback triggered`);
  }
}

/**
 * Trigger Android vibration
 * Note: This is a placeholder - actual implementation requires Vibration API
 */
function triggerAndroidVibration(pattern: number[]): void {
  // Placeholder for actual Android vibration implementation
  // Would use Vibration.vibrate(pattern)
  if (__DEV__) {
    console.log(`[Haptics] Android vibration pattern: [${pattern.join(', ')}]`);
  }
}

/**
 * Predefined haptic patterns for common UI interactions
 */
export const hapticPatterns = {
  // Navigation
  navigate: 'light' as HapticIntensity,
  back: 'light' as HapticIntensity,

  // Actions
  tap: 'light' as HapticIntensity,
  press: 'medium' as HapticIntensity,
  longPress: 'medium' as HapticIntensity,

  // Feedback
  success: 'success' as HapticIntensity,
  error: 'error' as HapticIntensity,
  warning: 'warning' as HapticIntensity,

  // States
  toggleOn: 'medium' as HapticIntensity,
  toggleOff: 'medium' as HapticIntensity,
  selection: 'light' as HapticIntensity,
} as const;

/**
 * Recommended haptic usage guidelines
 */
export const hapticGuidelines = {
  /** Primary actions (submit, save, confirm) */
  primaryActions: 'medium',
  /** Secondary actions (cancel, dismiss) */
  secondaryActions: 'light',
  /** Destructive actions (delete, reset) */
  destructiveActions: 'heavy',
  /** Success states (form submitted, task completed) */
  success: 'success',
  /** Error states (validation failed, action blocked) */
  error: 'error',
  /** Warning states (unsaved changes, confirmation needed) */
  warning: 'warning',
  /** Navigation (tab switch, screen transition) */
  navigation: 'light',
  /** Selection (picker choice, radio button) */
  selection: 'light',
  /** Toggle states (switch, checkbox) */
  toggle: 'medium',
} as const;
