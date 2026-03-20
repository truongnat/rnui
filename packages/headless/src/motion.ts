import { Easing, SharedTransition, withSpring, withTiming } from "react-native-reanimated";
import {
    FadeInUp,
    FadeInDown,
    FadeIn,
    ZoomIn,
    SlideInDown,
    SlideInUp,
    SlideInRight,
    FadeOutDown,
    FadeOutUp,
    FadeOut,
    ZoomOut,
    SlideOutDown,
    SlideOutUp,
    SlideOutRight,
} from "react-native-reanimated";
import { motionPreset, spring, timingPreset, focusRingAnimation } from "@rnui/tokens";

/**
 * Real Reanimated layout classes mapped from design tokens.
 * Use these for `entering` and `exiting` props.
 */
export const motionPresets = {
    enter: {
        fadeUp: FadeInUp,
        fadeDown: FadeInDown,
        fadeIn: FadeIn,
        scaleIn: ZoomIn,
        slideFromBottom: SlideInDown,
        slideFromTop: SlideInUp,
        slideFromRight: SlideInRight,
    },
    exit: {
        fadeDown: FadeOutDown,
        fadeUp: FadeOutUp,
        fadeOut: FadeOut,
        scaleOut: ZoomOut,
        slideToBottom: SlideOutDown,
        slideToTop: SlideOutUp,
        slideToRight: SlideOutRight,
    },
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
} as const;


/**
 * Shared Element Transition preset for Hero images and seamless navigation.
 * Usage: <Animated.View sharedTransitionTag="hero" sharedTransitionStyle={heroTransition} />
 */
export const heroTransition = (SharedTransition && (SharedTransition as any).custom)
    ? (SharedTransition as any).custom((values: any) => {
        "worklet";
        return {
            height: withSpring(values.targetHeight, spring.snappy),
            width: withSpring(values.targetWidth, spring.snappy),
            originX: withSpring(values.targetGlobalOriginX, spring.snappy),
            originY: withSpring(values.targetGlobalOriginY, spring.snappy),
        };
    })
    : null;

export { timingPreset, focusRingAnimation };
