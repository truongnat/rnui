/**
 * Motion tokens — animation presets for Reanimated 3.
 * Import these in components instead of hardcoding spring/timing configs.
 */

// ─── Spring configs ───────────────────────────────────────────────
export const spring = {
  // Snappy — buttons, toggles, checkboxes
  snappy: {
    damping: 20,
    stiffness: 400,
    mass: 0.8,
  },
  // Bouncy — FABs, badges, notifications
  bouncy: {
    damping: 12,
    stiffness: 300,
    mass: 1,
  },
  // Gentle — modals, sheets, page transitions
  gentle: {
    damping: 28,
    stiffness: 200,
    mass: 1,
  },
  // Stiff — tooltips, dropdowns (quick in/out)
  stiff: {
    damping: 32,
    stiffness: 500,
    mass: 0.6,
  },
  // Elastic — onboarding, celebration, achievement unlocks
  elastic: {
    damping: 8,
    stiffness: 250,
    mass: 1,
  },
} as const;

// ─── Duration (ms) ────────────────────────────────────────────────
export const duration = {
  instant: 50,
  fast: 100,
  normal: 200,
  slow: 300,
  slower: 500,
} as const;

// ─── Easing curves ────────────────────────────────────────────────
// CSS cubic-bezier strings (design metadata). For `withTiming`, use `motionEasing` or
// `resolveTimingPreset` from `@truongdq01/headless` — Reanimated expects `Easing.*` functions.
export const easing = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  linear: 'linear',
} as const;

// ─── Press feedback ───────────────────────────────────────────────
export const pressFeedback = {
  // Scale down on press
  scaleDown: { pressed: 0.96, released: 1, spring: spring.snappy },
  // Subtle scale for list items
  scaleDownSubtle: { pressed: 0.98, released: 1, spring: spring.snappy },
  // Opacity only (no scale) — for icon buttons
  opacityOnly: { pressed: 0.6, released: 1, duration: duration.fast },
} as const;

// ─── Enter/exit presets (Reanimated Layout animations) ────────────
// Import these as: entering={motionPreset.enter.fadeUp}
// Actual Reanimated imports happen in @truongdq01/headless to avoid
// @truongdq01/tokens depending on react-native-reanimated.
export const motionPreset = {
  enter: {
    fadeUp: 'FadeInUp',
    fadeDown: 'FadeInDown',
    fadeIn: 'FadeIn',
    scaleIn: 'ZoomIn',
    slideFromBottom: 'SlideInDown',
    slideFromTop: 'SlideInUp',
    slideFromRight: 'SlideInRight',
  },
  exit: {
    fadeDown: 'FadeOutDown',
    fadeUp: 'FadeOutUp',
    fadeOut: 'FadeOut',
    scaleOut: 'ZoomOut',
    slideToBottom: 'SlideOutDown',
    slideToTop: 'SlideOutUp',
    slideToRight: 'SlideOutRight',
  },
} as const;

// ─── Duration-based animation presets ────────────────────────────
// Use `resolveTimingPreset(key)` from `@truongdq01/headless` to get `{ duration, easing }`
// compatible with `withTiming`.
export const timingPreset = {
  // Fade in/out — opacity only
  fadeIn: { duration: duration.fast, easing: easing.easeOut },
  fadeOut: { duration: duration.fast, easing: easing.easeIn },
  // Scale up — micro interactions
  popIn: { duration: duration.normal, easing: easing.easeOut },
  popOut: { duration: duration.fast, easing: easing.easeIn },
  // Slide — panels, sheets
  slideIn: { duration: duration.slow, easing: easing.easeOut },
  slideOut: { duration: duration.normal, easing: easing.easeIn },
  // Color transitions — theme switch, hover
  color: { duration: duration.fast, easing: easing.linear },
} as const;

// ─── Focus ring animation ─────────────────────────────────────────
export const focusRingAnimation = {
  in: { duration: duration.fast, easing: easing.easeOut },
  out: { duration: duration.fast, easing: easing.easeIn },
} as const;

// ─── Typed animation token types ─────────────────────────────────
export type MotionPresetKey = keyof typeof motionPreset.enter;
export type MotionExitKey = keyof typeof motionPreset.exit;
export type TimingPresetKey = keyof typeof timingPreset;
export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;

export type SpringConfig = (typeof spring)[keyof typeof spring];
export type PressFeedback = (typeof pressFeedback)[keyof typeof pressFeedback];
export type TimingPreset = (typeof timingPreset)[TimingPresetKey];
