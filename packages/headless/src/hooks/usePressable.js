"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePressable = usePressable;
const react_1 = require("react");
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_worklets_1 = require("react-native-worklets");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_1 = require("react-native");
const tokens_1 = require("@truongnat/tokens");
// ─── Hook ─────────────────────────────────────────────────────────
function usePressable({ onPress, onLongPress, longPressMinDuration = 500, disabled = false, feedbackMode = "scale", accessibilityLabel, accessibilityHint, accessibilityRole = "button", haptic = false, } = {}) {
    const [isPressed, setIsPressed] = (0, react_1.useState)(false);
    // Shared values live on the UI thread
    const scale = (0, react_native_reanimated_1.useSharedValue)(1);
    const opacity = (0, react_native_reanimated_1.useSharedValue)(1);
    // ── Press callbacks (JS thread) ────────────────────────────────
    const handlePress = (0, react_1.useCallback)(() => {
        if (disabled)
            return;
        if (haptic)
            triggerHaptic("light");
        onPress?.();
    }, [disabled, haptic, onPress]);
    const handleLongPress = (0, react_1.useCallback)(() => {
        if (disabled)
            return;
        if (haptic)
            triggerHaptic("medium");
        onLongPress?.();
    }, [disabled, haptic, onLongPress]);
    const setPressedState = (0, react_1.useCallback)((pressed) => {
        setIsPressed(pressed);
    }, []);
    // ── Animated style (UI thread) ────────────────────────────────
    const animatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        if (feedbackMode === "opacity") {
            return { opacity: opacity.value };
        }
        if (feedbackMode === "none") {
            return {};
        }
        return { transform: [{ scale: scale.value }] };
    });
    // ── Gesture (UI thread) ───────────────────────────────────────
    // Cache these outside the worklet so Reanimated doesn't have to serialize the entire module objects
    const scaleDownPressed = tokens_1.pressFeedback.scaleDown.pressed;
    const scaleSubtlePressed = tokens_1.pressFeedback.scaleDownSubtle.pressed;
    const opacityOnlyPressed = tokens_1.pressFeedback.opacityOnly.pressed;
    const snappySpring = tokens_1.spring.snappy;
    const tapGesture = react_native_gesture_handler_1.Gesture.Tap()
        .enabled(!disabled)
        .onBegin(() => {
        "worklet";
        (0, react_native_reanimated_1.runOnJS)(setPressedState)(true);
        if (feedbackMode === "scale") {
            scale.value = (0, react_native_reanimated_1.withSpring)(scaleDownPressed, snappySpring);
        }
        else if (feedbackMode === "scaleSubtle") {
            scale.value = (0, react_native_reanimated_1.withSpring)(scaleSubtlePressed, snappySpring);
        }
        else if (feedbackMode === "opacity") {
            opacity.value = (0, react_native_reanimated_1.withTiming)(opacityOnlyPressed, { duration: 60 });
        }
    })
        .onFinalize((_event, success) => {
        "worklet";
        (0, react_native_reanimated_1.runOnJS)(setPressedState)(false);
        if (feedbackMode === "scale" || feedbackMode === "scaleSubtle") {
            scale.value = (0, react_native_reanimated_1.withSpring)(1, snappySpring);
        }
        else if (feedbackMode === "opacity") {
            opacity.value = (0, react_native_reanimated_1.withTiming)(1, { duration: 100 });
        }
        if (success) {
            (0, react_native_worklets_1.scheduleOnRN)(handlePress);
        }
    });
    const longPressGesture = react_native_gesture_handler_1.Gesture.LongPress()
        .enabled(!disabled && !!onLongPress)
        .minDuration(longPressMinDuration)
        .onStart(() => {
        "worklet";
        (0, react_native_worklets_1.scheduleOnRN)(handleLongPress);
    });
    const gesture = react_native_gesture_handler_1.Gesture.Simultaneous(tapGesture, longPressGesture);
    // ── Accessibility props ────────────────────────────────────────
    const accessibilityProps = {
        accessible: true,
        accessibilityRole,
        accessibilityLabel,
        accessibilityHint,
        accessibilityState: { disabled },
    };
    return {
        animatedStyle,
        gesture,
        accessibilityProps,
        isPressed,
    };
}
function triggerHaptic(type) {
    try {
        // Try expo-haptics first
        const Haptics = require("expo-haptics");
        const map = {
            light: Haptics.ImpactFeedbackStyle.Light,
            medium: Haptics.ImpactFeedbackStyle.Medium,
            heavy: Haptics.ImpactFeedbackStyle.Heavy,
        };
        Haptics.impactAsync(map[type]);
        return;
    }
    catch { }
    try {
        // Fallback: react-native-haptic-feedback
        const HapticFeedback = require("react-native-haptic-feedback").default;
        HapticFeedback.trigger(react_native_1.Platform.OS === "ios" ? "impactLight" : "notificationSuccess", { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
    }
    catch { }
}
//# sourceMappingURL=usePressable.js.map