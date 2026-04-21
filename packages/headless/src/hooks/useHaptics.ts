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
  | 'error'
  | 'selection'
  | 'impactLight'
  | 'impactMedium'
  | 'impactHeavy';

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
}

/** Minimal contract for optional `expo-haptics` (no compile-time dependency). */
type ExpoHapticsModule = {
  ImpactFeedbackStyle: {
    Light: unknown;
    Medium: unknown;
    Heavy: unknown;
  };
  NotificationFeedbackType: {
    Success: unknown;
    Warning: unknown;
    Error: unknown;
  };
  selectionAsync: () => void | Promise<void>;
  notificationAsync: (style: unknown) => void | Promise<void>;
  impactAsync: (style: unknown) => void | Promise<void>;
};

/** Default export of optional `react-native-haptic-feedback`. */
type RnHapticFeedbackModule = {
  trigger: (
    method: string,
    options?: {
      enableVibrateFallback?: boolean;
      ignoreAndroidSystemSettings?: boolean;
    }
  ) => void;
};

// ─── Haptic Resolver (Module Level) ──────────────────────────────
// Resolved once at module load; subsequent calls skip require() overhead.

let _hapticModule: ExpoHapticsModule | RnHapticFeedbackModule | null = null;
let _hapticProvider: 'expo' | 'rn' | 'none' | undefined;

function resolveHapticProvider(): void {
  if (_hapticProvider !== undefined) return;
  try {
    const m = require('expo-haptics') as ExpoHapticsModule;
    _hapticModule = m;
    _hapticProvider = 'expo';
    return;
  } catch {
    // optional native module
  }
  try {
    const m = require('react-native-haptic-feedback')
      .default as RnHapticFeedbackModule;
    _hapticModule = m;
    _hapticProvider = 'rn';
    return;
  } catch {
    // optional native module
  }
  _hapticModule = null;
  _hapticProvider = 'none';
}

function triggerExpo(mod: ExpoHapticsModule, intensity: HapticIntensity): void {
  if (intensity === 'selection') {
    void mod.selectionAsync();
    return;
  }
  if (
    intensity === 'success' ||
    intensity === 'warning' ||
    intensity === 'error'
  ) {
    const style =
      intensity === 'success'
        ? mod.NotificationFeedbackType.Success
        : intensity === 'warning'
          ? mod.NotificationFeedbackType.Warning
          : mod.NotificationFeedbackType.Error;
    void mod.notificationAsync(style);
    return;
  }
  const impactStyle =
    intensity === 'heavy' || intensity === 'impactHeavy'
      ? mod.ImpactFeedbackStyle.Heavy
      : intensity === 'light' || intensity === 'impactLight'
        ? mod.ImpactFeedbackStyle.Light
        : mod.ImpactFeedbackStyle.Medium;
  void mod.impactAsync(impactStyle);
}

const RN_HAPTIC_METHOD: Record<HapticIntensity, string> = {
  light: 'impactLight',
  medium: 'impactMedium',
  heavy: 'impactHeavy',
  success: 'notificationSuccess',
  warning: 'notificationWarning',
  error: 'notificationError',
  selection: 'selection',
  impactLight: 'impactLight',
  impactMedium: 'impactMedium',
  impactHeavy: 'impactHeavy',
};

function triggerRn(mod: RnHapticFeedbackModule, intensity: HapticIntensity): void {
  mod.trigger(RN_HAPTIC_METHOD[intensity], {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  });
}

export function triggerHaptic(intensity: HapticIntensity): void {
  resolveHapticProvider();
  if (_hapticProvider === 'none' || !_hapticModule) return;

  try {
    if (_hapticProvider === 'expo') {
      triggerExpo(_hapticModule as ExpoHapticsModule, intensity);
    } else {
      triggerRn(_hapticModule as RnHapticFeedbackModule, intensity);
    }
  } catch (err) {
    if (__DEV__) console.warn('[Haptics] Failed to trigger:', err);
  }
}

/**
 * Hook for haptic feedback with platform-specific implementations
 */
export function useHaptics(config: HapticConfig = {}) {
  const { enabled = true } = config;

  const trigger: HapticTrigger = (intensity: HapticIntensity) => {
    if (!enabled) return;
    triggerHaptic(intensity);
  };

  return {
    trigger,
    isSupported: Platform.OS !== 'web',
    platform: Platform.OS,
  };
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
  selection: 'selection' as HapticIntensity,
} as const;
