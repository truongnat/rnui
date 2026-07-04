// Preset animations removed in react-native-reanimated v4
// These were part of the design system but are not currently used in UI components
// Keeping for future implementation with new animation builders
// Previous imports: FadeInUp, FadeInDown, FadeIn, ZoomIn, SlideInDown, SlideInUp,
// SlideInRight, FadeOutDown, FadeOutUp, FadeOut, ZoomOut, SlideOutDown, SlideOutUp, SlideOutRight
import {
  durationScale,
  type DurationScaleKey,
  easing as easingTokens,
  focusRingAnimation,
  type TimingPresetKey,
  timingPreset,
} from '@truongdq01/tokens';
import type { ViewStyle } from 'react-native';
import {
  Easing,
  type AnimatedStyle,
  type EasingFunction,
  type EasingFunctionFactory,
} from 'react-native-reanimated';

/** Animated styles safe for `Animated.View` (view-only, not `DefaultStyle`). */
export type ViewAnimatedStyle = AnimatedStyle<ViewStyle>;

/** Alias for {@link import('@truongdq01/tokens').motionPreset} — layout animation name metadata from tokens. */
export { motionPreset as motionPresets } from '@truongdq01/tokens';

/**
 * Shared transition animations for layout animations.
 * Note: Preset animations removed in react-native-reanimated v4.
 * These would need to be reimplemented using the new animation builders.
 * Previous implementation used FadeIn/FadeOut/ZoomIn/ZoomOut/SlideIn/SlideOut presets.
 */
/**
 * @deprecated Reanimated v4 removed preset layout enter/exit helpers from v3.
 * `enter`/`exit` are empty stubs and have no visual effect.
 * Will be reimplemented with react-native-reanimated v4 animation builders in a future release.
 * Do not rely on this export for actual transition animations.
 */
export const sharedTransition = {
  enter: {},
  exit: {},
} as const;

/**
 * Real Reanimated Easing functions mapped from semantic tokens.
 * Use these in `withTiming({ easing: ... })`.
 */
export const motionEasing = {
  easeIn: Easing.bezier(0.4, 0, 1, 1),
  easeOut: Easing.bezier(0, 0, 0.2, 1),
  easeInOut: Easing.bezier(0.4, 0, 0.2, 1),
  linear: Easing.linear,
  /** Astryx `--ease-standard` — default expressive curve. */
  standard: Easing.bezier(0.24, 1, 0.4, 1),
} as const;

/**
 * Resolve an Astryx duration-tier key (`fast`, `medium`, `slow`, plus min/max
 * variants) to milliseconds for `withTiming`.
 */
export function resolveDuration(tier: DurationScaleKey): number {
  return durationScale[tier];
}

/**
 * Maps a {@link timingPreset} entry to arguments safe for `withTiming`.
 * Token `easing` fields are CSS curve strings; this pairs them with Reanimated `Easing` functions.
 */
export function resolveTimingPreset(key: TimingPresetKey): {
  duration: number;
  easing: EasingFunction | EasingFunctionFactory;
} {
  const preset = timingPreset[key];
  let easingFn: EasingFunction | EasingFunctionFactory = motionEasing.easeInOut;
  if (preset.easing === easingTokens.easeIn) easingFn = motionEasing.easeIn;
  else if (preset.easing === easingTokens.easeOut)
    easingFn = motionEasing.easeOut;
  else if (preset.easing === easingTokens.linear)
    easingFn = motionEasing.linear;
  return { duration: preset.duration, easing: easingFn };
}

/**
 * Shared Element Transition preset for Hero images and seamless navigation.
 * Note: SharedTransition removed in react-native-reanimated v4.
 * Hero transitions now use the new Shared Element API.
 * Previous implementation attempted custom shared transition with spring animations.
 */
/**
 * @deprecated Reanimated v4 removed SharedTransition from v3.
 * Currently `null` — will be reimplemented with the new Shared Element API.
 * Consumers must null-check before using.
 */
export const heroTransition = null;

export {
  durationScale,
  type DurationScaleKey,
  focusRingAnimation,
  type TimingPresetKey,
  timingPreset,
};
