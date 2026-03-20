"use strict";
/**
 * Motion tokens — animation presets for Reanimated 3.
 * Import these in components instead of hardcoding spring/timing configs.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusRingAnimation = exports.timingPreset = exports.motionPreset = exports.pressFeedback = exports.easing = exports.duration = exports.spring = void 0;
// ─── Spring configs ───────────────────────────────────────────────
exports.spring = {
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
};
// ─── Duration (ms) ────────────────────────────────────────────────
exports.duration = {
    instant: 50,
    fast: 100,
    normal: 200,
    slow: 300,
    slower: 500,
};
// ─── Easing curves ────────────────────────────────────────────────
// Use with withTiming — Bézier strings for Reanimated Easing
exports.easing = {
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    linear: "linear",
};
// ─── Press feedback ───────────────────────────────────────────────
exports.pressFeedback = {
    // Scale down on press
    scaleDown: { pressed: 0.96, released: 1, spring: exports.spring.snappy },
    // Subtle scale for list items
    scaleDownSubtle: { pressed: 0.98, released: 1, spring: exports.spring.snappy },
    // Opacity only (no scale) — for icon buttons
    opacityOnly: { pressed: 0.6, released: 1, duration: exports.duration.fast },
};
// ─── Enter/exit presets (Reanimated Layout animations) ────────────
// Import these as: entering={motionPreset.enter.fadeUp}
// Actual Reanimated imports happen in @rnui/headless to avoid
// @rnui/tokens depending on react-native-reanimated.
exports.motionPreset = {
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
};
// ─── Duration-based animation presets ────────────────────────────
// Use with withTiming() for non-spring animations
exports.timingPreset = {
    // Fade in/out — opacity only
    fadeIn: { duration: exports.duration.fast, easing: exports.easing.easeOut },
    fadeOut: { duration: exports.duration.fast, easing: exports.easing.easeIn },
    // Scale up — micro interactions
    popIn: { duration: exports.duration.normal, easing: exports.easing.easeOut },
    popOut: { duration: exports.duration.fast, easing: exports.easing.easeIn },
    // Slide — panels, sheets
    slideIn: { duration: exports.duration.slow, easing: exports.easing.easeOut },
    slideOut: { duration: exports.duration.normal, easing: exports.easing.easeIn },
    // Color transitions — theme switch, hover
    color: { duration: exports.duration.fast, easing: exports.easing.linear },
};
// ─── Focus ring animation ─────────────────────────────────────────
exports.focusRingAnimation = {
    in: { duration: exports.duration.fast, easing: exports.easing.easeOut },
    out: { duration: exports.duration.fast, easing: exports.easing.easeIn },
};
//# sourceMappingURL=motion.js.map