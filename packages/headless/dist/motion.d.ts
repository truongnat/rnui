import { FadeInUp, FadeInDown, FadeIn, ZoomIn, SlideInDown, SlideInUp, SlideInRight, FadeOutDown, FadeOutUp, FadeOut, ZoomOut, SlideOutDown, SlideOutUp, SlideOutRight } from "react-native-reanimated";
import { timingPreset, focusRingAnimation } from "@rnui/tokens";
/**
 * Real Reanimated layout classes mapped from design tokens.
 * Use these for `entering` and `exiting` props.
 */
export declare const motionPresets: {
    readonly enter: {
        readonly fadeUp: typeof FadeInUp;
        readonly fadeDown: typeof FadeInDown;
        readonly fadeIn: typeof FadeIn;
        readonly scaleIn: typeof ZoomIn;
        readonly slideFromBottom: typeof SlideInDown;
        readonly slideFromTop: typeof SlideInUp;
        readonly slideFromRight: typeof SlideInRight;
    };
    readonly exit: {
        readonly fadeDown: typeof FadeOutDown;
        readonly fadeUp: typeof FadeOutUp;
        readonly fadeOut: typeof FadeOut;
        readonly scaleOut: typeof ZoomOut;
        readonly slideToBottom: typeof SlideOutDown;
        readonly slideToTop: typeof SlideOutUp;
        readonly slideToRight: typeof SlideOutRight;
    };
};
/**
 * Real Reanimated Easing functions mapped from semantic tokens.
 * Use these in `withTiming({ easing: ... })`.
 */
export declare const motionEasing: {
    readonly easeIn: import("react-native-reanimated").EasingFunctionFactory;
    readonly easeOut: import("react-native-reanimated").EasingFunctionFactory;
    readonly easeInOut: import("react-native-reanimated").EasingFunctionFactory;
    readonly linear: (t: number) => number;
};
/**
 * Shared Element Transition preset for Hero images and seamless navigation.
 * Usage: <Animated.View sharedTransitionTag="hero" sharedTransitionStyle={heroTransition} />
 */
export declare const heroTransition: any;
export { timingPreset, focusRingAnimation };
//# sourceMappingURL=motion.d.ts.map