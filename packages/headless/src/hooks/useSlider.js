"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSlider = useSlider;
const react_1 = require("react");
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_worklets_1 = require("react-native-worklets");
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const tokens_1 = require("@truongdq01/tokens");
function snapToStep(value, min, max, step) {
    const snapped = Math.round((value - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
}
function useSlider({ min = 0, max = 100, step = 1, defaultValue = min, value: controlledValue, onChange, onChangeEnd, disabled = false, } = {}) {
    const trackWidth = (0, react_native_reanimated_1.useSharedValue)(0);
    const internalValue = (0, react_1.useRef)(controlledValue ?? defaultValue);
    const currentValue = controlledValue ?? internalValue.current;
    const percentage = (currentValue - min) / (max - min);
    // Thumb position as ratio [0..1] on the UI thread
    const thumbRatio = (0, react_native_reanimated_1.useSharedValue)(percentage);
    const isDragging = (0, react_native_reanimated_1.useSharedValue)(false);
    const dragStartRatio = (0, react_native_reanimated_1.useSharedValue)(0);
    const thumbScale = (0, react_native_reanimated_1.useSharedValue)(1);
    const onTrackLayout = (0, react_1.useCallback)((width) => {
        trackWidth.value = width;
    }, [trackWidth]);
    // JS-thread value emit
    const emitChange = (0, react_1.useCallback)((ratio) => {
        const raw = ratio * (max - min) + min;
        const snapped = snapToStep(raw, min, max, step);
        internalValue.current = snapped;
        onChange?.(snapped);
    }, [min, max, step, onChange]);
    const emitChangeEnd = (0, react_1.useCallback)((ratio) => {
        const raw = ratio * (max - min) + min;
        const snapped = snapToStep(raw, min, max, step);
        onChangeEnd?.(snapped);
    }, [min, max, step, onChangeEnd]);
    const snappySpringConfig = tokens_1.spring.snappy;
    // Track last emitted value to minimize runOnJS calls
    const lastEmittedValue = (0, react_native_reanimated_1.useSharedValue)(currentValue);
    const panGesture = react_native_gesture_handler_1.Gesture.Pan()
        .enabled(!disabled)
        .onStart(() => {
        "worklet";
        isDragging.value = true;
        thumbScale.value = (0, react_native_reanimated_1.withSpring)(1.2, snappySpringConfig);
        dragStartRatio.value = thumbRatio.value;
    })
        .onUpdate((e) => {
        "worklet";
        if (trackWidth.value === 0)
            return;
        const delta = e.translationX / trackWidth.value;
        const next = Math.max(0, Math.min(1, dragStartRatio.value + delta));
        thumbRatio.value = next;
        // Optimization: Calculate snapped value on UI thread and only emit if changed
        const raw = next * (max - min) + min;
        const snapped = Math.round((raw - min) / step) * step + min;
        const finalSnapped = Math.max(min, Math.min(max, snapped));
        if (finalSnapped !== lastEmittedValue.value) {
            lastEmittedValue.value = finalSnapped;
            (0, react_native_worklets_1.scheduleOnRN)(emitChange, next);
        }
    })
        .onEnd(() => {
        "worklet";
        isDragging.value = false;
        thumbScale.value = (0, react_native_reanimated_1.withSpring)(1, snappySpringConfig);
        const raw = thumbRatio.value * (max - min) + min;
        const snapped = Math.round((raw - min) / step) * step + min;
        const finalSnapped = Math.max(min, Math.min(max, snapped));
        const targetRatio = (finalSnapped - min) / (max - min);
        thumbRatio.value = (0, react_native_reanimated_1.withSpring)(targetRatio, snappySpringConfig);
        (0, react_native_worklets_1.scheduleOnRN)(emitChangeEnd, targetRatio);
    });
    const thumbAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        // Local copy of trackWidth to avoid capture issues
        const width = trackWidth.value;
        const ratio = thumbRatio.value;
        const scale = thumbScale.value;
        return {
            transform: [
                { translateX: ratio * width },
                { scale: scale },
            ],
        };
    });
    const fillAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const ratio = thumbRatio.value;
        return {
            width: `${ratio * 100}%`,
        };
    });
    const trackAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(() => ({
        opacity: disabled ? 0.4 : 1,
    }));
    return {
        currentValue,
        thumbAnimatedStyle,
        fillAnimatedStyle,
        trackAnimatedStyle,
        panGesture,
        onTrackLayout,
        percentage,
    };
}
//# sourceMappingURL=useSlider.js.map