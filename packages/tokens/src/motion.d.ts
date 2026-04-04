/**
 * Motion tokens — animation presets for Reanimated 3.
 * Import these in components instead of hardcoding spring/timing configs.
 */
export declare const spring: {
    readonly snappy: {
        readonly damping: 20;
        readonly stiffness: 400;
        readonly mass: 0.8;
    };
    readonly bouncy: {
        readonly damping: 12;
        readonly stiffness: 300;
        readonly mass: 1;
    };
    readonly gentle: {
        readonly damping: 28;
        readonly stiffness: 200;
        readonly mass: 1;
    };
    readonly stiff: {
        readonly damping: 32;
        readonly stiffness: 500;
        readonly mass: 0.6;
    };
    readonly elastic: {
        readonly damping: 8;
        readonly stiffness: 250;
        readonly mass: 1;
    };
};
export declare const duration: {
    readonly instant: 50;
    readonly fast: 100;
    readonly normal: 200;
    readonly slow: 300;
    readonly slower: 500;
};
export declare const easing: {
    readonly easeIn: "cubic-bezier(0.4, 0, 1, 1)";
    readonly easeOut: "cubic-bezier(0, 0, 0.2, 1)";
    readonly easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)";
    readonly linear: "linear";
};
export declare const pressFeedback: {
    readonly scaleDown: {
        readonly pressed: 0.96;
        readonly released: 1;
        readonly spring: {
            readonly damping: 20;
            readonly stiffness: 400;
            readonly mass: 0.8;
        };
    };
    readonly scaleDownSubtle: {
        readonly pressed: 0.98;
        readonly released: 1;
        readonly spring: {
            readonly damping: 20;
            readonly stiffness: 400;
            readonly mass: 0.8;
        };
    };
    readonly opacityOnly: {
        readonly pressed: 0.6;
        readonly released: 1;
        readonly duration: 100;
    };
};
export declare const motionPreset: {
    readonly enter: {
        readonly fadeUp: "FadeInUp";
        readonly fadeDown: "FadeInDown";
        readonly fadeIn: "FadeIn";
        readonly scaleIn: "ZoomIn";
        readonly slideFromBottom: "SlideInDown";
        readonly slideFromTop: "SlideInUp";
        readonly slideFromRight: "SlideInRight";
    };
    readonly exit: {
        readonly fadeDown: "FadeOutDown";
        readonly fadeUp: "FadeOutUp";
        readonly fadeOut: "FadeOut";
        readonly scaleOut: "ZoomOut";
        readonly slideToBottom: "SlideOutDown";
        readonly slideToTop: "SlideOutUp";
        readonly slideToRight: "SlideOutRight";
    };
};
export declare const timingPreset: {
    readonly fadeIn: {
        readonly duration: 100;
        readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly fadeOut: {
        readonly duration: 100;
        readonly easing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly popIn: {
        readonly duration: 200;
        readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly popOut: {
        readonly duration: 100;
        readonly easing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly slideIn: {
        readonly duration: 300;
        readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly slideOut: {
        readonly duration: 200;
        readonly easing: "cubic-bezier(0.4, 0, 1, 1)";
    };
    readonly color: {
        readonly duration: 100;
        readonly easing: "linear";
    };
};
export declare const focusRingAnimation: {
    readonly in: {
        readonly duration: 100;
        readonly easing: "cubic-bezier(0, 0, 0.2, 1)";
    };
    readonly out: {
        readonly duration: 100;
        readonly easing: "cubic-bezier(0.4, 0, 1, 1)";
    };
};
export type MotionPresetKey = keyof typeof motionPreset.enter;
export type MotionExitKey = keyof typeof motionPreset.exit;
export type TimingPresetKey = keyof typeof timingPreset;
export type DurationKey = keyof typeof duration;
export type EasingKey = keyof typeof easing;
export type SpringConfig = typeof spring[keyof typeof spring];
export type PressFeedback = typeof pressFeedback[keyof typeof pressFeedback];
export type TimingPreset = typeof timingPreset[TimingPresetKey];
//# sourceMappingURL=motion.d.ts.map