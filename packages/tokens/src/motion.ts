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
// Use with withTiming — Bézier strings for Reanimated Easing
export const easing = {
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  linear: "linear",
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
// Actual Reanimated imports happen in @rnui/headless to avoid
// @rnui/tokens depending on react-native-reanimated.
export const motionPreset = {
  enter: {
    fadeUp: "FadeInUp",
    fadeDown: "FadeInDown",
    fadeIn: "FadeIn",
    scaleIn: "ZoomIn",
    slideFromBottom: "SlideInDown",
    slideFromTop: "SlideInUp",
    slideFromRight: "SlideInRight",
  },
  exit: {
    fadeDown: "FadeOutDown",
    fadeUp: "FadeOutUp",
    fadeOut: "FadeOut",
    scaleOut: "ZoomOut",
    slideToBottom: "SlideOutDown",
    slideToTop: "SlideOutUp",
    slideToRight: "SlideOutRight",
  },
} as const;

export type SpringConfig = typeof spring[keyof typeof spring];
export type PressFeedback = typeof pressFeedback[keyof typeof pressFeedback];