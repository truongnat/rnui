"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusRingAnimation = exports.timingPreset = exports.heroTransition = exports.motionEasing = exports.motionPresets = void 0;
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_reanimated_2 = require("react-native-reanimated");
const tokens_1 = require("@rnui/tokens");
Object.defineProperty(exports, "timingPreset", { enumerable: true, get: function () { return tokens_1.timingPreset; } });
Object.defineProperty(exports, "focusRingAnimation", { enumerable: true, get: function () { return tokens_1.focusRingAnimation; } });
/**
 * Real Reanimated layout classes mapped from design tokens.
 * Use these for `entering` and `exiting` props.
 */
exports.motionPresets = {
    enter: {
        fadeUp: react_native_reanimated_2.FadeInUp,
        fadeDown: react_native_reanimated_2.FadeInDown,
        fadeIn: react_native_reanimated_2.FadeIn,
        scaleIn: react_native_reanimated_2.ZoomIn,
        slideFromBottom: react_native_reanimated_2.SlideInDown,
        slideFromTop: react_native_reanimated_2.SlideInUp,
        slideFromRight: react_native_reanimated_2.SlideInRight,
    },
    exit: {
        fadeDown: react_native_reanimated_2.FadeOutDown,
        fadeUp: react_native_reanimated_2.FadeOutUp,
        fadeOut: react_native_reanimated_2.FadeOut,
        scaleOut: react_native_reanimated_2.ZoomOut,
        slideToBottom: react_native_reanimated_2.SlideOutDown,
        slideToTop: react_native_reanimated_2.SlideOutUp,
        slideToRight: react_native_reanimated_2.SlideOutRight,
    },
};
/**
 * Real Reanimated Easing functions mapped from semantic tokens.
 * Use these in `withTiming({ easing: ... })`.
 */
exports.motionEasing = {
    easeIn: react_native_reanimated_1.Easing.bezier(0.4, 0, 1, 1),
    easeOut: react_native_reanimated_1.Easing.bezier(0, 0, 0.2, 1),
    easeInOut: react_native_reanimated_1.Easing.bezier(0.4, 0, 0.2, 1),
    linear: react_native_reanimated_1.Easing.linear,
};
/**
 * Shared Element Transition preset for Hero images and seamless navigation.
 * Usage: <Animated.View sharedTransitionTag="hero" sharedTransitionStyle={heroTransition} />
 */
exports.heroTransition = (react_native_reanimated_1.SharedTransition && react_native_reanimated_1.SharedTransition.custom)
    ? react_native_reanimated_1.SharedTransition.custom((values) => {
        "worklet";
        return {
            height: (0, react_native_reanimated_1.withSpring)(values.targetHeight, tokens_1.spring.snappy),
            width: (0, react_native_reanimated_1.withSpring)(values.targetWidth, tokens_1.spring.snappy),
            originX: (0, react_native_reanimated_1.withSpring)(values.targetGlobalOriginX, tokens_1.spring.snappy),
            originY: (0, react_native_reanimated_1.withSpring)(values.targetGlobalOriginY, tokens_1.spring.snappy),
        };
    })
    : null;
//# sourceMappingURL=motion.js.map