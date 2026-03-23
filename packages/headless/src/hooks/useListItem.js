"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useListItem = useListItem;
const react_1 = require("react");
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_worklets_1 = require("react-native-worklets");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const tokens_1 = require("@truongdq01/tokens");
const ACTION_WIDTH = 80;
function useListItem({ onPress, onLongPress, trailingActions = [], leadingActions = [], disabled = false, } = {}) {
    const translateX = (0, react_native_reanimated_1.useSharedValue)(0);
    const isRevealedValue = (0, react_native_reanimated_1.useSharedValue)(false);
    const trailingMax = trailingActions.length * ACTION_WIDTH;
    const leadingMax = leadingActions.length * ACTION_WIDTH;
    const snappySpring = tokens_1.spring.snappy;
    // ── Close (snap back) ────────────────────────────────────────
    const close = (0, react_1.useCallback)(() => {
        translateX.value = (0, react_native_reanimated_1.withSpring)(0, snappySpring);
        isRevealedValue.value = false;
    }, [translateX, isRevealedValue, snappySpring]);
    // ── Press gesture ────────────────────────────────────────────
    const tapGesture = react_native_gesture_handler_1.Gesture.Tap()
        .enabled(!disabled)
        .onEnd((_, success) => {
        "worklet";
        if (!success)
            return;
        if (isRevealedValue.value) {
            translateX.value = (0, react_native_reanimated_1.withSpring)(0, snappySpring);
            isRevealedValue.value = false;
            return;
        }
        if (onPress)
            (0, react_native_worklets_1.scheduleOnRN)(onPress);
    });
    const longPressGesture = react_native_gesture_handler_1.Gesture.LongPress()
        .enabled(!disabled && !!onLongPress)
        .minDuration(500)
        .onStart(() => {
        "worklet";
        if (onLongPress)
            (0, react_native_worklets_1.scheduleOnRN)(onLongPress);
    });
    // ── Pan gesture ──────────────────────────────────────────────
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .activeOffsetX([-8, 8])
        .failOffsetY([-5, 5])
        .onUpdate((e) => {
        "worklet";
        const raw = e.translationX;
        if (raw < 0 && trailingMax > 0) {
            // Swipe left → reveal trailing
            translateX.value = Math.max(raw, -trailingMax - 10);
        }
        else if (raw > 0 && leadingMax > 0) {
            // Swipe right → reveal leading
            translateX.value = Math.min(raw, leadingMax + 10);
        }
    })
        .onEnd((e) => {
        "worklet";
        const vel = e.velocityX;
        const tx = translateX.value;
        if (tx < 0 && trailingMax > 0) {
            const snap = tx < -trailingMax / 2 || vel < -300;
            translateX.value = (0, react_native_reanimated_1.withSpring)(snap ? -trailingMax : 0, snappySpring);
            isRevealedValue.value = snap;
        }
        else if (tx > 0 && leadingMax > 0) {
            const snap = tx > leadingMax / 2 || vel > 300;
            translateX.value = (0, react_native_reanimated_1.withSpring)(snap ? leadingMax : 0, snappySpring);
            isRevealedValue.value = snap;
        }
        else {
            translateX.value = (0, react_native_reanimated_1.withSpring)(0, snappySpring);
            isRevealedValue.value = false;
        }
    });
    const gesture = react_native_gesture_handler_1.Gesture.Simultaneous(react_native_gesture_handler_1.Gesture.Race(panGesture, tapGesture), longPressGesture);
    // ── Animated styles ──────────────────────────────────────────
    const itemAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        transform: [{ translateX: translateX.value }],
    }));
    const trailingActionsStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        width: Math.abs(Math.min(translateX.value, 0)),
        opacity: (0, react_native_reanimated_1.interpolate)(translateX.value, [-trailingMax, -20, 0], [1, 0.6, 0], react_native_reanimated_1.Extrapolation.CLAMP),
    }));
    const leadingActionsStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        width: Math.max(translateX.value, 0),
        opacity: (0, react_native_reanimated_1.interpolate)(translateX.value, [0, 20, leadingMax], [0, 0.6, 1], react_native_reanimated_1.Extrapolation.CLAMP),
    }));
    return {
        itemAnimatedStyle,
        trailingActionsStyle,
        leadingActionsStyle,
        gesture,
        accessibilityProps: {
            accessible: true,
            accessibilityRole: "button",
            accessibilityState: { disabled },
        },
        close,
    };
}
//# sourceMappingURL=useListItem.js.map